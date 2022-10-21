import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const { employeeId } = useParams()
    const navigate = useNavigate()
    const [employee, updateEmployee] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_expand=location&userId=${employeeId}`)
                .then(res => res.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    updateEmployee(singleEmployee)
                })
        }, [employeeId]
    )

    const fireButton = () => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/users/${employeeId}`, {
                method: "DELETE"
            })
                .then(() => {
                    navigate("/employees")

                })
        }}
            className="ticket_finish">Fire Employee</button>

    }



    return <section className="employee">
        <header className="employee-header">{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Location: {employee?.location?.name}</div>
        <div>Rate: {employee.payRate}</div>
        {
            fireButton()
        }
    </section>
}