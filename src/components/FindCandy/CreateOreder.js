import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const CreateOreder = () => {
  /* http://localhost:8088/purchases?_expand=productLocation
      {
      "id": 1,
      "userId": 2,
      "productLocationId": 1,
      "quantity": 3,
      "totalPrice": 9.6,
      "datePurchased": "02-15-2022",
      "productLocation": {
        "id": 1,
        "productId": 6,
        "locationId": 2
      }
    }
  */


  const { candyId } = useParams()
  const [userChoices, update] = useState({

    quantity: 0,
    image: "",
    totalPrice: 0

  })
  const [products, setProducts] = useState([])

  const navigate = useNavigate()


  useEffect(
    () => {
      fetch(`http://localhost:8088/products?id=${candyId}&_embed=productLocations`)
        .then((response) => response.json())
        .then((data) => {
          const productObj = data[0]
          setProducts(productObj)
        })
    }, []
  )

  const totalPrice = `${products.price * userChoices.quantity}`

  const localKandyUser = localStorage.getItem("kandy_user")
  const KandyUserObject = JSON.parse(localKandyUser)

  const handleSubmitButton = (event) => {
    event.preventDefault()
    const productToSendToAPI = {
      userId: KandyUserObject.id,
      productLocationId: products?.productLocations[0].id,
      totalPrice: parseFloat(totalPrice, 2),
      datePurchased: new Date(),
      quantity: userChoices.quantity,
    }
    return fetch(`http://localhost:8088/purchases`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productToSendToAPI)
    })
      .then(res => res.json())
      .then(() => {
        navigate("/findCandy")
      })
  }



  return (
    <form className="productForm">
      <h2 className="productForm__title">Adding New Product</h2>
      <div>{`${products.name}`}</div>



      <fieldset>
        <div className="form-group">
          <label htmlFor="price">Quantity:</label>
          <input
            required autoFocus
            type="number"
            className="form-control"
            placeholder="How many"
            value={userChoices.quantity}
            onChange={
              (evt) => {
                const copy = { ...userChoices }
                copy.quantity = Number(evt.target.value)
                update(copy)
              }
            } />
        </div>
      </fieldset>
      <div>
        {`Total Price= ${products.price * userChoices.quantity}`}
      </div>


      <button
        onClick={(clickEvent) => handleSubmitButton(clickEvent)}
        className="btn-primary">
        Add to Cart
      </button>


    </form>
  )


}
