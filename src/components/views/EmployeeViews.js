import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { EmployeeForm } from "../Employees/EmployeeForm"

import { EmployeeList } from "../employees/EmployeeList"

import { HomeHTML } from "../home/Home"
import { LocationList } from "../Locations/LocationList"
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/ProductList"

export const EmployeeViews = () => {
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
                <Route path="employee/create" element={ <EmployeeForm/> } />
                <Route path="employees" element={ <EmployeeList /> }/>
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> }/>
                <Route path="customers" element={ <CustomerList /> }/>
                <Route path="customers/:customerId" element={ <CustomerDetails /> }/>
                
				<Route path="login/home" element={ <HomeHTML /> } />
				
            </Route>
        </Routes>
    )
}
