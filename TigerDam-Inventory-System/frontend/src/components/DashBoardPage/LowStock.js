
const LowStock = ({item}) => {
   

    return (
        <><div className="itemDetails-DashBoard">
            <div className="itemsDisplayed-DashBoard"><p><strong>{item.name}</strong></p></div>
            <div className="itemsDisplayed-DashBoard"> <p><strong>Unit price: </strong>{item.unitPrice}</p></div>
            <div className="itemsDisplayed-DashBoard">  <p><strong>Quantity: </strong>{item.quantity}</p></div>
        </div>
        <div className="splitter-DashBoard"></div>
        
        </>
    )
}

export default LowStock