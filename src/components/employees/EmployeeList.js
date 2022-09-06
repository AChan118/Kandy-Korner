import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Employee } from "./Employee";
import "./Employee.css"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
            .then(response => response.json())
            .then((employeeArray) => {
                    setEmployees(employeeArray)
            })
        },
        []
    )

  
    
    if(kandyUserObject.staff) {
        return <>
{
    kandyUserObject.staff
    ? <>
        
        <button onClick={() => navigate("/employee/create")}>Add Employee</button>
    </>
    
    :<>
    
    </>
 }   
    
    <article class="employees">
    {
        employees.map(employee => <Employee key={`employee--${employee.id}`}
            id={employee.id} 
            fullName={employee.fullName} 
            email={employee.email} 
            locationId={employee.locationId}/>)
    }
    </article>
    </>
}
}