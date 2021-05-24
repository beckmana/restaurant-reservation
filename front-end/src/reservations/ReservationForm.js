import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function ReservationForm() {
    const history = useHistory();
    
    const initForm = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_data: "",
        reservation_time: "",
        people: "",
    };

    const [reservationForm, setReservationForm] = useState({ ...initForm });
    
    const handleChange = ({ target }) => {
        setReservationForm({
            ...reservationForm,
            [target.name]: target.value,
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setReservationForm({ ...initForm });
        history.push(`/dashboard?date=${reservationForm.reservation_date}`)
    };

    const handleCancel = event => {
        event.preventDefault();
        history.goBack();
    };

    return (
        <div>
            <h3>New Reservation</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className = "form-group col-md-5">
                        <label htmlFor="first_name"> First Name: </label>
                        <input
                            className = "form-control"
                            id = "first_name"
                            type="text"
                            name="first_name"
                            placeholder="First name..."
                            onChange={handleChange}
                            value={reservationForm.first_name}
                            required
                        />
                    </div>
                    <div className = "form-group col-md-5">
                        <label htmlFor="last_name">Last Name:</label>
                        <input
                            className = "form-control"
                            id = "last_name"
                            type="text"
                            name="last_name"
                            placeholder="Last name..."
                            onChange={handleChange}
                            value={reservationForm.last_name}
                            required
                        />
                    </div>
                    <br />
                    <div className = "form-group col-md-5">
                        <label htmlFor="mobile_number">Phone Number:</label>
                        <input
                            className = "form-control"
                            id = "mobile_number"
                            type="tel"
                            name="mobile_number"
                            placeholder="xxx-xxx-xxxx"
                            onChange={handleChange}
                            value={reservationForm.mobile_number}
                            required
                        />
                    </div>
                    <div className = "form-group col-md-5">
                        <label htmlFor="people">Number of People:</label>
                        <select
                            className = "form-control"
                            id="people"
                            name="people"
                            onChange={handleChange}
                            value={reservationForm.people}
                            required
                        >
                            <option value="">-- Select --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <br />
                    <div className = "form-group col-md-5">
                        <label htmlFor="reservation_date">Date:</label>
                        <input
                            className = "form-control"
                            id = "reservation_date"
                            type="date"
                            placeholder="YYYY-MM-DD"
                            pattern="\d{4}-\d{2}-\d{2}"
                            name="reservation_date"
                            onChange={handleChange}
                            value={reservationForm.reservation_date}
                            required
                        />
                    </div>
                    <div className = "form-group col-md-5">
                        <label htmlFor="reservation_time">Time:</label>
                        <input
                            className = "form-control"
                            id = "reservation_time"
                            type="time"
                            placeholder="HH:MM"
                            pattern="[0-9]{2}:[0-9]{2}"
                            name="reservation_time"
                            onChange={handleChange}
                            value={reservationForm.reservation_time}
                            required
                        />
                    </div>
                </div>
                <div className="">
                    <button type="submit" className="btn btn-primary mr-2"> Submit </button>
                    <button className="btn btn-secondary mr-2" onClick={handleCancel}> Cancel </button>
                </div>
            </form>
        </div>
    );
};