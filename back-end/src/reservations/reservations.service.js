const { insert } = require("../db/connection");
const knex = require("../db/connection");

function list(date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .whereNot('status', 'finished')
        .orderBy("reservation_time", "asc")
}

function read(reservation_id) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .first();
}

function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then(newReservation => newReservation[0]);
}

function update(reservation_id, reservation) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update(reservation, "*")
        .then(reservation => reservation[0]);
}

function updateStatus(reservation_id, status) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id })
        .update({ status: status })
        .returning("status");
}

module.exports = {
    list,
    read,
    create,
    update,
    updateStatus,
}