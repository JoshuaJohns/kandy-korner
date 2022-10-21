import { useState } from "react"
import { FindCandy } from "./FindCandy"
import { CandyList } from "./CandyList"



export const FindCandyContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")


    return <>
        <FindCandy setterFunction={setSearchTerms} />
        <CandyList seachTermState={searchTerms} />
    </>
}