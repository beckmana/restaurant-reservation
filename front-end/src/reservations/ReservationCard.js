import React from "react";
import { Link } from "react-router-dom";
import {formatAsTime} from "../utils/date-time"

export default function ReservationCard({ reservation, seat }) {
    const resTime = formatAsTime(reservation.reservation_time);
    //const resTime = reservation.reservation_time
    const resPhone = formatPhoneNumber(reservation.mobile_number);

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          var intlCode = (match[1] ? '+1 ' : '');
          return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
      }
    /*
    const handleCancel = async () => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? \n \n \nThis cannot be undone."
      )
    ) {
      try {
        await updateStatus(reservation.reservation_id, {
          data: { status: "cancelled" },
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };
    */
    const handleCancel = () => {
        console.log(`cancel reservation ${reservation.reservation_id}`)
    }
    
    return (
        <>
          <div className="card mx-2 " style={{ width: "18rem" }}>
              <div className="card-header p-0">
                <h4>
                  {reservation.first_name} {reservation.last_name}
                </h4>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h6>
                  <span className="oi oi-people mr-1"> </span>
                  {reservation.people}
                </h6>
              <h5 data-reservation-id-status={reservation.reservation_id}>
                  {reservation.status}
              </h5>
            </div>
                
              <div className="d-flex justify-content-between">
                <h6>Date: {reservation.reservation_date}</h6>
                <h6>Time: {resTime}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Phone: {resPhone}</h6>
    
                
              </div>
              <div className="d-flex justify-content-center">
                {reservation.status === "booked" ? (
                    <>
                    <Link
                        to={`/reservations/${reservation.reservation_id}/seat`}
                        className="btn btn-info btn-sm"
                    >
                        Seat
                    </Link>
                    <button
                        data-reservation-id-cancel={reservation.reservation_id}
                        className="mx-2 btn btn-danger btn-sm"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <Link
                        to={`/reservations/${reservation.reservation_id}/edit`}
                        className="btn btn-success btn-sm"
                    >
                        Edit
                    </Link>
                    </>
                    ) : null}
                </div>
            </div>
          </div>
        </>
      );
}