import { useEffect, useState } from "react"


export const LocationList = () => {
    const [locations, setLocations] = useState([])


    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then((response) => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        }, []
    )

    return <>
        <h2>List of Store Locations</h2>
        {locations.map((location) => {
            return <section className="locations-sec" key={location.id}>
                <div><img className="locations-img" src={`../../images/${location.image}`} alt="Store" /></div>
                <ul className="locations-ul">
                    <li className="locations-li">{location.name}</li>
                    <li className="locations-li"> Address: {location.address}</li>
                    <li className="locations-li">{location.squareFootage} Squarefoot</li>
                </ul>
            </section>
        })}
    </>

}
