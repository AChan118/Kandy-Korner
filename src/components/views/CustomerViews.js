import { Outlet, Route, Routes } from "react-router-dom"
import { HomeHTML } from "../home/Home"
import { LocationList } from "../Locations/LocationList"
import { ProductContainer } from "../products/ProductContainer"


export const CustomerViews = () => {
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
				<Route path="products" element={ <ProductContainer /> }/>
				<Route path="login/home" element={ <HomeHTML /> } />
				
            </Route>
        </Routes>
    )
}
