import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Products.css"



export const ProductList = ({ searchTermState}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [overTwo, setOverTwo] = useState(false)
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)


    useEffect(
        () => {
            if(searchTermState === ""){
                setFiltered([])
            } else {
                const searchedProducts = products.filter(product => {
                    return product.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
                setFiltered(searchedProducts)
            }
        },[ searchTermState ]
        
    )


    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=type`)
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )



    useEffect(
        () => {
            if (kandyUserObject.staff) {
                //for employees
                setFiltered(products)

            }
            else {
                //for customers
                
                setFiltered([])
            }
        },
        [products]
    )
    useEffect(
        () => {
            if(overTwo) {
               const productsOverTwo = products.filter(product => product.price > 2)
               setFiltered(productsOverTwo)
            }
            else{
                setFiltered(products)
            }
        },
        [overTwo]
    )
        if(kandyUserObject.staff) {
            return <>
    {
        kandyUserObject.staff
        ? <>
            <button onClick={ ()=> {  setOverTwo(true) } }> Top Priced</button>
            <button onClick={ ()=> {  setOverTwo(false) } }> Show All</button>
            <button onClick={() => navigate("/product/create")}>Add Product</button>
        </>
        
        :<>
        
        </>
     }   
        
    
        <h2>List of Products</h2>
        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product">
                            <header>{product.name}</header>
                            
                            <footer>Price: ${product.price}</footer>
                            <aside class="productType">{product.type.type}</aside>

                        </section>
                    }
                )
            }
            <p>“Mr Kandy can make marshmallows that taste of violets, and 
            rich caramels that change colour every ten seconds as you suck 
            them, and little feathery sweets that melt away deliciously the 
            moment you put them between your lips. He can make chewing-gum 
            that never loses its taste, and sugar balloons that you can 
            blow up to enormous sizes before you pop them with a pin and 
            gobble them up. And, by a most secret method, he can make 
            lovely blue birds' eggs with black spots on them, and when you 
            put one of these in your mouth, it gradually gets smaller and 
            smaller until suddenly there is nothing left except a tiny 
            little DARKRED sugary baby bird sitting on the tip of your 
            tongue.” -Guy from down the street</p>
        </article>
    </>
        }else {
            return <>
    
        <article className="products">
            {
                filteredProducts.map(
                    (product) => {
                        return <section className="product">
                            <header>{product.name}</header>
                            
                            <footer>Price: ${product.price}</footer>
                            
                        </section>
                    }
                )
            }
            <p>“Mr Kandy can make marshmallows that taste of violets, and 
            rich caramels that change colour every ten seconds as you suck 
            them, and little feathery sweets that melt away deliciously the 
            moment you put them between your lips. He can make chewing-gum 
            that never loses its taste, and sugar balloons that you can 
            blow up to enormous sizes before you pop them with a pin and 
            gobble them up. And, by a most secret method, he can make 
            lovely blue birds' eggs with black spots on them, and when you 
            put one of these in your mouth, it gradually gets smaller and 
            smaller until suddenly there is nothing left except a tiny 
            little DARKRED sugary baby bird sitting on the tip of your 
            tongue.” -Guy from down the street</p>
        </article>
    </>
        }
    
}