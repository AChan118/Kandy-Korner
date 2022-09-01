import { Outlet, Route, Routes } from "react-router-dom"
import { HomeHTML } from "../home/Home"
import { LocationList } from "../Locations/LocationList"
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/ProductList"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Kandy Korner</h1>
                    <div>Hey come get some candy.</div>
					
                    <Outlet />
                </>
            }>

                <Route path="Locations" element={ <LocationList/> } />
				<Route path="products" element={ <ProductList /> } />
				<Route path="product/create" element={ <ProductForm/> } />
				<Route path="login/home" element={ <HomeHTML /> } />
				
            </Route>
        </Routes>
    )
}


