export const FindCandy = ({ setterFunction }) => {
    return <>
        {
            <div>
                <input
                    onChange={
                        (event) => {
                            setterFunction(event.target.value)
                        }
                    }
                    type="text" placeholder="What candy are you looking for?" />

            </div>

        }

    </>
}