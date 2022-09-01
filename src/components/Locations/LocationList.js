import { useEffect, useState } from "react"
import "./Location.css"


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
                        <footer>{location.squareFeet}sq Feet</footer>
                        
                    </section>
                    
                }
            )
        }
        
    </article>
    </>



















}