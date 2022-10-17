import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./products.css"


export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [highPriceProducts, setHighPriceProducts] = useState(false)

    const navigate = useNavigate()






    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType`)
                .then((response) => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
        }, []
    )

    useEffect(
        () => {
            if (highPriceProducts) {
                const filteredProductsArray = products.filter(product => parseInt(product.price) > 1.00)
                setFilteredProducts(filteredProductsArray)
            }
            else {

                setFilteredProducts(products)
            }

        }, [highPriceProducts, products]

    )

    //Stores the user object in a variable
    const localKandyUser = localStorage.getItem("kandy_user")
    const KandyUserObject = JSON.parse(localKandyUser)



    return <>
        {
            KandyUserObject.staff
                ? <>
                    <button onClick={() => { setHighPriceProducts(true) }}>High price</button>
                    <button onClick={() => navigate("/products/create")}>Add Product</button>
                    <button onClick={() => { setHighPriceProducts(false) }}>All Product</button>

                </>
                : <>

                </>
        }
        <h2>Products</h2>
        <section className="products-sec" >
            {filteredProducts.map((product) => {
                return <div className="products-div" key={product.id}>
                    <div><img className="products-img" src={product.image} alt="Image" /></div>
                    <ul className="products-ul">
                        <li className="products-li">{product.productType.type}</li>
                        <li className="products-li">{product.name}</li>
                        <li className="products-li">${product.price}</li>
                    </ul>
                </div>
            })}
        </section>

    </>
}