import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const NewEmployeeForm = () => {

    const [userChoices, update] = useState({
        fullName: "",
        locationId: 0,
        date: "",
        payRate: '',
        email: ''

    })
    const [locations, setLocations] = useState([])

    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then((response) => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        }, []
    )


    const handleSubmitButton = (event) => {
        event.preventDefault()
        const userObject = {
            fullName: userChoices.fullName,
            date: userChoices.date,
            email: userChoices.email,
            isStaff: true
        }

        const employeeObj = {
            locationId: userChoices.locationId,
            payRate: userChoices.payRate,
            userId: 0

        }
        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userObject)
        })
            .then(res => res.json())
            .then((userArray) => {
                employeeObj.userId = userArray.id
            })
            .then(() => {
                fetch(`http://localhost:8088/employees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeObj)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate("/employees")
                    })



            })


    }



    return (
        <form className="productForm">
            <h2 className="productForm__title">Adding New Employee</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Full Name:</label>
                    <input
                        required autoFocus
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Name of Employee"
                        value={userChoices.fullName}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.fullName = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Email:</label>
                    <input
                        required autoFocus
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="example@gmail.com"
                        value={userChoices.email}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.email = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Store Location:</label>
                    {locations.map((location) => {
                        return <div key={location.id} className="radio">

                            <label>{location.name}</label>
                            <input
                                name="locationId"
                                type="radio"
                                value={location.id}
                                checked={userChoices.locationId === location.id}
                                onChange={
                                    (evt) => {
                                        const copy = { ...userChoices }
                                        copy.locationId = parseInt(evt.target.value)
                                        update(copy)
                                    }
                                }
                            />
                        </div>
                    })}
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Start Date:</label>
                    <input
                        required autoFocus
                        name="name"
                        type="date"
                        className="form-control"
                        value={userChoices.date}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.date = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Hourly Rate:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Employee Hourly Rate"
                        value={userChoices.payRate}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.payRate = parseInt(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>


            <button
                onClick={(clickEvent) => handleSubmitButton(clickEvent)}
                className="btn-primary">
                Confirm New Employee
            </button>


        </form>
    )


}
