import { useEffect, useState } from "react"
import "./Locations.css"
import { useNavigate } from "react-router-dom"

export const LocationList = () => {
    const [locations, setLocations] = useState([])
    




    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
            .then(response => response.json())
            .then((locationArray) => {
                    setLocations(locationArray)
            })
        },
        [] // When this array is empty, you are observing initial component state
    )

    return <>
    <h2>List of Locations</h2>
    <article className="locations">
        {
            locations.map(
                (location) => {
                    return <section className="location">
                        <header>{location.address}</header>
                        <p>{location.squareFeet}sq Feet</p>
                        
                    </section>
                }
            )
        }
    </article>
    </>



















}