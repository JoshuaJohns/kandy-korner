import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EdditLoyaltyNumber = () => {
    // TODO: This state object should not be blank
    const [originalCustomer, updateOriginal] = useState([])
    const [customer, currentCustomer] = useState({
        loyaltyNumber: 0,

    })

    const [feedback, setFeedback] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    // TODO: What is the variable in which you stored the route parameter?
    const { customerId } = useParams()

    // TODO: Get the customer state from the API.
    useEffect(() => {
        fetch(`http://localhost:8088/customers?id=${customerId}`)
            .then(res => res.json())
            .then((data) => {
                const ticketObject = data[0]
                currentCustomer(ticketObject)
            })
    }, [customerId])
    useEffect(() => {
        fetch(`http://localhost:8088/customers?id=${customerId}&_expand=user`)
            .then(res => res.json())
            .then((data) => {
                const ticketObject = data[0]
                updateOriginal(ticketObject)
            })
    }, [customerId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(() => {
                setFeedback("Customer customer successfully saved")
                navigate(`/customer/${originalCustomer.user.id}`)
            })
    }


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Customer</h2>
        <fieldset>
            <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                {feedback}
            </div>
            <div className="form-group">
                <label htmlFor="description">Loyalty Number:</label>
                <textarea
                    required autoFocus
                    type="number"
                    style={{
                        height: "10rem"
                    }}
                    className="form-control"
                    value={customer.loyaltyNumber}
                    onChange={
                        (evt) => {
                            const copy = { ...customer }
                            copy.loyaltyNumber = Number(evt.target.value)
                            currentCustomer(copy)
                        }
                    }>{customer.loyaltyNumber}</textarea>
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Change
        </button>
    </form>
}