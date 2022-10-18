import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const NewProductForm = () => {

    const [userChoices, update] = useState({
        name: "",
        productTypeId: 0,
        image: "",
        price: ""

    })
    const [productTypes, setProductTypes] = useState([])

    const navigate = useNavigate()


    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
                .then((response) => response.json())
                .then((ProductTypesArray) => {
                    setProductTypes(ProductTypesArray)
                })
        }, []
    )

    // const localKandyUser = localStorage.getItem("kandy_user")
    // const KandyUserObject = JSON.parse(localKandyUser)

    const handleSubmitButton = (event) => {
        event.preventDefault()
        const productToSendToAPI = {
            name: userChoices.name,
            image: userChoices.image,
            productTypeId: userChoices.productTypeId,
            price: userChoices.price
        }
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/products")
            })
    }



    return (
        <form className="productForm">
            <h2 className="productForm__title">Adding New Product</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Name of Product"
                        value={userChoices.name}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="typeId">Product Type:</label>
                    {productTypes.map((type) => {
                        return <div key={type.id} className="radio">

                            <label>{type.type}</label>
                            <input
                                name="productTypeId"
                                type="radio"
                                value={type.id}
                                checked={userChoices.productTypeId === type.id}
                                onChange={
                                    (evt) => {
                                        const copy = { ...userChoices }
                                        copy.productTypeId = parseInt(evt.target.value)
                                        update(copy)
                                    }
                                }
                            />
                        </div>
                    })}
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Image Url:</label>
                    <input
                        required autoFocus
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="https://www.example.com"
                        value={userChoices.image}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.image = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>


            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Price of Product"
                        value={userChoices.price}
                        onChange={
                            (evt) => {
                                const copy = { ...userChoices }
                                copy.price = Number(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>


            <button
                onClick={(clickEvent) => handleSubmitButton(clickEvent)}
                className="btn-primary">
                Submit Product
            </button>


        </form>
    )


}

