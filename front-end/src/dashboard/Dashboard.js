import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery";
//import formatReservationDate from "../utils/format-reservation-date"
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({defaultDate}) {
  const query = useQuery();
  const queryDate = query.get("date")
 
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(queryDate || defaultDate);
  
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <button onClick={() => setDate(previous(date))} className="btn btn-secondary">Previous Day</button>
        <button className="mx-3 btn btn-success" onClick={() => setDate(today())}>
        Today
      </button>
      <button onClick={() => setDate(next(date))} className="btn btn-secondary">Next Day</button>
      </div>
      <label htmlFor="reservation_date" className="form-label m-3">
        <input
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
          name="reservation_date"
          onChange={handleDateChange}
          value={date}
        />
      </label>
      <h4 className="mb-0">Reservations for {new Date(next(date)).toDateString()}</h4>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
