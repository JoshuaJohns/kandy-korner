import { useEffect, useState } from "react"
import "./Orders.css"


export const OrderList = () => {
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases?userId=${KandyUserObject.id}&_expand=productLocation`)
                .then((response) => response.json())
                .then((purchasesArray) => {
                    setOrders(purchasesArray)
                })
        }, []
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then((response) => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        }, []
    )



    return <>
        <h2>Your Orders</h2>
        <div className="orders-div">{
            orders.map((order) => {
                return products.map((product) => {
                    if (product.id === order.productLocation.productId) {
                        return <section className="orders-sec" key={order.id}>
                            <div><img className="orders-img" src={`${product.image}`} alt="Store" /></div>
                            <ul className="orders-ul">
                                <li className="orders-li">{product.name}</li>
                                <li className="orders-li">Quantity: {order.quantity}</li>
                                <li className="orders-li"> Total Price: ${order.totalPrice}</li>
                            </ul>
                        </section>
                    }
                })
            })
        }
        </div>


    </>

}

// {orders.map((order) => {
//     return <section className="orders-sec" key={order.id}>
//         {/* <div><img className="orders-img" src={`../../images/${order.image}`} alt="Store" /></div> */}
//         <ul className="orders-ul">
//             {/* <li className="orders-li">{order.}</li> */}
//             <li className="orders-li"> Total: {order.totalPrice}</li>
//         </ul>
//     </section>
// })}



