import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationsList"
import { ProductsList } from "../products/productsList"
import { NewProductForm } from "../products/productForm"
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
                <Route path="products/create" element={<NewProductForm />} />
                {/* <Route path="ticket/create" element={<TicketForm />} /> */}
            </Route>
        </Routes>
    </>
}