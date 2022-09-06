export const ProductSearch = ({ setterFunction }) => {
    return (<>
    <h2>What candy are you looking for?</h2>
        <div>
            <input 
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        
        type="text" placeholder="Enter Search terms" />
        </div></>
    )
}