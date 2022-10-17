import { useState } from "react"
import { FindCandy } from "../Customers/FindCandy"
import { CandyList } from "../Customers/CandyList"



export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")


    return <>
        <FindCandy setterFunction={setSearchTerms} />
        <CandyList seachTermState={searchTerms} />
    </>
}