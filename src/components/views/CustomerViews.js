import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationsList"
import { TicketContainer } from "../Customers/FindCandyContainer"


export const CustomerViews = () => {
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
                <Route path="findCandy" element={< TicketContainer />} />
                {/* <Route path="ticket/create" element={<TicketForm />} /> */}
            </Route>
        </Routes>
    </>
}