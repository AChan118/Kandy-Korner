
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"


export const EmployeeForm = () => {
    const [user, updateUser] = useState({

        fullName: "",
        email: "",
        isStaff: true
    })
    const [employee, updateEmployee] = useState({

        rate: "",
        startDate: "",
        locationId: (0),
        userId: ""


    })
    const [locations, updateLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    updateLocations(locationArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )


    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API

        const userToSendToAPI = {

            fullName: user.fullName,
            email: user.email,
            isStaff: true


        }

        return fetch(`http://localhost:8088/users`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(response => response.json())
            .then((userObject) => {
                postEmployee(userObject.id)

            })
    }

    const postEmployee = (userId) => {


        const employeeToSendToAPI = {
            rate: employee.rate,
            startDate: employee.startDate,
            locationId: employee.locationId,
            userId: userId


        }
        fetch(`http://localhost:8088/employees`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employeeToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {

                navigate("/employees")
            })
    }



    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee Form</h2>
            <fieldset class="proFormField">
                <div className="form-group">
                    <label htmlFor="employeeName">Employee Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Our new employee"
                        value={user.fullName}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.fullName = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeEmail">Employee Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="New employee email"
                        value={user.email}
                        onChange={
                            (evt) => {
                                const copy = { ...user }
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeRate">Employee Pay Rate:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="New employee pay rate"
                        value={employee.rate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.rate = evt.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeStartDate">Employee Start Date:</label>
                    <input
                        required autoFocus
                        type="date"
                        className="form-control"
                        placeholder="New employee start date"
                        value={employee.startDate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.startDate = evt.target.value
                                updateEmployee(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset class="selectLocation">
                <label class="locationLabel" htmlFor="location">Location:</label>
                {
                    locations.map(
                        (location) => {
                            return <div className="form-group">

                                <input

                                    onChange={
                                        (evt) => {
                                            const copy = { ...employee }
                                            copy.locationId = evt.target.value

                                            updateEmployee(copy)
                                        }
                                    } type="checkbox" value={location.id} /> {location.address}
                            </div>
                        }
                    )


                }
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Employee
            </button>
        </form>
    )
}