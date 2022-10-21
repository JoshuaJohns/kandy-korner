import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationsList"
// import { FindCandyContainer } from "../FindCandy/FindCandyContainer"
import { CreateOreder } from "../FindCandy/CreateOreder"
import { FindCandyContainer } from "../FindCandy/FindCandyContainer"
import { OrderList } from "../MyOrders/OrderList"


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
                <Route path="orders" element={<OrderList />} />
                <Route path="findCandy" element={< FindCandyContainer />} />
                <Route path="findCandy/:candyId" element={< CreateOreder />} />
                {/* <Route path="ticket/create" element={<TicketForm />} /> */}
            </Route>
        </Routes>
    </>
}