import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"

export const NavBar = () => {
    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)

    if (KandyUserObject.staff) {
        return <EmployeeNav />
    }
    else {
        return <CustomerNav />
    }
}

