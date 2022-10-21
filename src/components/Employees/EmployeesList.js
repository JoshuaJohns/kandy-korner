import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import { useNavigate } from "react-router-dom"
import "./Employees.css"


export const EmployeesList = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch("http://localhost:8088/users?isStaff=true")
                .then(res => res.json())
                .then((employesArray) => {
                    setEmployees(employesArray)
                })
        }, []
    )


    return <article className="employees">
        <button onClick={() => navigate("/employee/create")}>Add Employee</button>
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id}
                fullName={employee.fullName}
                email={employee.email} />)
        }
    </article>
}