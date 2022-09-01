
import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {
    
        /*
            TODO: Add the correct default properties to the
            initial state object
        */
        const [product, update] = useState({
            name: "",
            price: "",
            typeId: (0),
            
        })
        const [types, updateTypes] = useState([])

        useEffect(
            () => {
                fetch(`http://localhost:8088/types`)
                    .then(response => response.json())
                    .then((typeArray) => {
                        updateTypes(typeArray)
                    })
            },
            [] // When this array is empty, you are observing initial component state
        )

        /*
            TODO: Use the useNavigation() hook so you can redirect
            the employee to the product list
        */
    
         const navigate = useNavigate()
    
        const localKandyUser = localStorage.getItem("kandy_user")
        const kandyUserObject = JSON.parse(localKandyUser)

        const handleSaveButtonClick = (event) => {
            event.preventDefault()

        // TODO: Create the object to be saved to the API
        
        const productToSendToAPI = {
           
            typeId: product.typeId,
            name: product.name,
            price: product.price,
            
            
        }
        //Fetch to pull type in
        
        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/products`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
    }

    return (
        <form className="productForm">
        <h2 className="productForm__title">New Product Form</h2>
        <fieldset class= "proFormField">
            <div className="form-group">
                <label htmlFor="productName">Product Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    placeholder="Our new product"
                    value={product.name}
                    onChange={
                        (evt) => {
                            const copy = {...product}
                            copy.name = evt.target.value
                            update(copy)
                        }
                    } />
            </div>
            <div className="form-group">
                <label htmlFor="productPrice">Product Price:</label>
                <input
                    required autoFocus
                    type="number"
                    className="form-control"
                    placeholder="New product price"
                    value={product.price}
                    onChange={
                        (evt) => {
                            const copy = {...product}
                            copy.price = evt.target.value
                            update(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset class="selectType"> 
            <label class="typeLabel" htmlFor="type">Type:</label>
            {
                types.map(
                    (type) => {
                        return <div className="form-group">
               
                <input 
                   
                    onChange={
                        (evt) => {
                            const copy = {...product}
                            copy.typeId = evt.target.value
                            
                            update(copy)
                        }
                    } type="checkbox" value={type.id}/> {type.type}
            </div>
                    }
                )
            
            
            }
        </fieldset>
        <button
        onClick = {(clickEvent)=> handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
            Submit Product
        </button>
    </form> 
    )
}


// useEffect(
//     () => {
//         fetch(`http://localhost:8088/products?_expand=type`)
//             .then(response => response.json())
//             .then((productArray) => {
//                 setProducts(productArray)
//             })
//     },
//     [] // When this array is empty, you are observing initial component state
// )