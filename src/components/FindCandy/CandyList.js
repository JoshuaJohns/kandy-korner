import { useEffect, useState } from "react"
// import "./Candy.css"


export const CandyList = ({ seachTermState }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])




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
            const searchedTickets = products.filter(product => {
                return product.name.toLowerCase().startsWith(seachTermState.toLowerCase())
            })
            setFilteredProducts(searchedTickets)
        }, [seachTermState, products]
    )



    return <>

        <h2>Products</h2>
        <section className="products-sec" >
            {filteredProducts.map((product) => {
                return <div className="products-div" key={product.id}>
                    <div><img className="products-img" src={product.image} alt="Image" /></div>
                    <ul className="products-ul">
                        <li className="products-li">{product.name}</li>
                        <li className="products-li">${product.price}</li>
                    </ul>
                </div>
            })}
        </section>

    </>

}