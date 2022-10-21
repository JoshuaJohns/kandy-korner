import { Link } from "react-router-dom"
import { EdditLoyaltyNumber } from "./EdditLoyaltyNumber"

export const Customer = ({ id, fullName, email }) => {
    return <section className="employee">
        <div>
            <Link to={`/customer/${id}`}>Name: {fullName}</Link>
        </div>
        <div>Email: {email}</div>
    </section>

}