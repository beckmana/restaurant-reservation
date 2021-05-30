import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
// import {today} from "../utils/date-time"

export default function ReservationForm() {
    const history = useHistory();
    
    const initForm = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    };
   // console.log("today "  + today())
   // console.log("new date " + new Date())
    
    const [reservationForm, setReservationForm] = useState({ ...initForm });
    const [resErrors, setResErrors] = useState([]);

    // let reservationDate = new Date(
    //     `${reservationForm.reservation_date}T${reservationForm.reservation_time}:00.000`
    // );

   // console.log("res date: " + reservationForm.reservation_date);
   // console.log("day of week: " + reservationDate.getDay())

    const checkValidInputs = async () => {
        const { reservation_date, reservation_time } = reservationForm;
        const errors = [];

        const reservationDate = new Date(
            `${reservation_date}T${reservation_time}:00.000`
        );
        const todaysDate = new Date();

        // console.log("res date: " + parseInt(reservation_date.match(/\d+/g)))
        // console.log("td date: " + parseFloat(today().match(/\d+/g)))
        // console.log("res date < td date: " + reservation_date < today())
        // console.log("res date - td date: " + reservation_date - today())
        if (reservationDate < todaysDate) {
            errors.push({message: "Please choose a future date!"})
            //setResErrors([...resErrors, ]);
          }
      
        let reservationTime = Number(reservation_time.replace(":", ""));
        console.log("res time: " + reservationTime)
          if (reservationTime < 1030 || reservationTime > 2130) {
            errors.push({message: "Please choose a time between 10:30 am - 9:30 pm!"})
            // setResErrors([...resErrors, "Please choose a time between 10:30 am - 9:30 pm!"]);
          }
        
        if (reservationDate.getDay() === 2) {
            errors.push({message: "Closed on Tuesdays! Please choose a different day!"})
            // setResErrors([...resErrors, "Closed on Tuesdays! Please choose a differnt day!"]);
            
        }

        setResErrors(errors)
        console.log(errors)
        //console.log(resErrors)
        if (errors.length > 0) {
            return false;
          } else {
            return true;
          }
    }
    
    
    const errorMessages = () => {
        return resErrors.map((err, index) => <ErrorAlert key={index} error={err} />);
      };


    const handleChange = ({ target }) => {
        if (target.name === "people") {
            setReservationForm({
                ...reservationForm,
                [target.name]: Number(target.value)
            })
        } else {
            setReservationForm({
                ...reservationForm,
                [target.name]: target.value,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //checkValidInputs();
        console.log(reservationForm)
        let valid = await checkValidInputs();
        console.log(valid)
        
        if (valid) {
        await createReservation(reservationForm)
                .then((res) =>
                    history.push(`/dashboard?date=${reservationForm.reservation_date}`)
            );
        }
    };

    const handleCancel = event => {
        event.preventDefault();
        history.goBack();
    };

    return (
        <div>
            <h3>New Reservation</h3>
            {errorMessages()}
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
                        <input
                            className = "form-control"
                            id="people"
                            type="text"
                            name="people"
                            onChange={handleChange}
                            value={reservationForm.people}
                            required
                         />
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
                    <button type="submit" className="btn btn-primary mr-2"> Submit </button>
                    <button className="btn btn-secondary mr-2" onClick={handleCancel}> Cancel </button>
            </form>
        </div>
    );
};

/*
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
 */