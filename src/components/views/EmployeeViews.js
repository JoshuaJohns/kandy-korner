import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationsList"
import { ProductsList } from "../products/productsList"
import { NewProductForm } from "../products/productForm"
import { EmployeesList } from "../Employees/EmployeesList"
import { EmployeeDetails } from "../Employees/EmployeeDetails"
import { NewEmployeeForm } from "../Employees/EmployeeForm"
import { CustomerList } from "../Employees/Customers/CustomerList"
import { CustomerDetails } from "../Employees/Customers/CustomerDetails"
export const EmployeeViews = () => {
    return <>
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>Your one-stop-shop to get your favorite candies!</div>

                    <Outlet />
                </>
            }>

                <Route path="locations" element={<LocationList />} />
                <Route path="products" element={<ProductsList />} />
                <Route path="employees" element={<EmployeesList />} />
                <Route path="customers" element={<CustomerList />} />
                <Route path="products/create" element={<NewProductForm />} />
                <Route path="employee/create" element={<NewEmployeeForm />} />
                <Route path="employees/:employeeId" element={<EmployeeDetails />} />
                <Route path="customer/:customerId" element={<CustomerDetails />} />
                {/* <Route path="ticket/create" element={<TicketForm />} /> */}
            </Route>
        </Routes>
    </>
}