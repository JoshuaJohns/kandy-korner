import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const { employeeId } = useParams()
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

    return <section className="employee">
        <header className="employee-header">{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Location: {employee?.location?.name}</div>
        <div>Rate: {employee.payRate}</div>
    </section>
}