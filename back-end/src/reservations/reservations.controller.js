const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
]

const hasRequiredProperties = hasProperties(...VALID_PROPERTIES)

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(field => !VALID_PROPERTIES.includes(field));
  
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function validatePeople(req, res, next){
  const {people} = req.body.data;
  if(!people || people<1 || typeof people !== "number"){
    return next({
      status: 400,
      message: `number of people is invalid`
    })
  }
  next();
}

function validateDateAndTime(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const reservationDate = new Date(`${reservation_date}T${reservation_time}:00.000`);
  const todaysDate = new Date();
  const reservationTime = Number(reservation_time.replace(":", ""));

  if (!reservation_date.match(/\d{4}-\d{2}-\d{2}/)) {
    return next({ status: 400, message: 'reservation_date is invalid!' });
  }

  if (reservationDate < todaysDate) {
    return next({status: 400, message: "Requested reservation is in the future"})
  }

  if (reservationDate.getDay() === 2) {
    return next({status: 400, message: "Restaurant is closed on Tuesdays"})
  }
  
  if (!reservation_time.match(/\d{2}:\d{2}/)) {
    return next({ status: 400, message: 'reservation_time is invalid!' });
  }
  
  if (reservationTime < 1030 || reservationTime > 2130) {
    return next({ status: 400, message: 'Restaurant is closed during requested reservation time.'})
  }
  
  next();
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (!reservation) {
    return next({ status: 404, message: `Reservation ${reservation_id} cannot be found` })
  }
  
  res.locals.reservation = reservation;
  next();
}

async function validateStatus(req, res, next) {
  const currentStatus = res.locals.reservation.status;
  const { status } = req.body.data;

  if (status === "cancelled") return next();
  
  if (currentStatus === "finished") {
    return next({ status: 400, message: "A finished reservation cannot be updated." });
  };

  if (status !== "booked" && status !== "seated" && status !== "finished") {
    return next({ status: 400, message: "unknown status." });
  };

  next();
};



/**
 * List handler for reservation resources
 */
async function list(req, res, next) {
  let date = req.query.date;
  if (!date) {
    //date = "2020-12-30T06:00:00.000Z"
    
    return next();
  }

  res.json({
    data: await service.list(date)
  });
}

async function create(req, res) {
  const newReservation = req.body.data
  res.status(201).json({data: await service.create(newReservation)})
}

function read(req, res) {
  res.json({data: res.locals.reservation})
}

async function updateStatus(req, res, next) {
  const { reservation_id } = req.params;
  const { status } = req.body.data;
  const data = await reservationsService.updateStatus(reservation_id, status);

  res.status(200).json({ data: { status: data[0] }});
};

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(validatePeople),
    asyncErrorBoundary(validateDateAndTime),
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(validateStatus),
    asyncErrorBoundary(updateStatus)
  ]
};
