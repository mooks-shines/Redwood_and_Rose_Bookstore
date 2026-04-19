cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCheckoutSummary()
{
    let subtotal = 0;
    for(let c of cart)
    {
        subtotal += c.price * c.quantity;
    }

    const tax = subtotal * 0.07;
   
    const selectedShipping = document.querySelector("input[name='shippingMethod']:checked");
    let shipping;
    if(selectedShipping)
    {
        shipping = parseFloat(selectedShipping.value);
    }
    else
        shipping = 0;
    
    const total = subtotal + tax + shipping; 

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("shipping").textContent = `$${shipping.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;

}

loadCheckoutSummary();

//addEventListener to see which one the shipping method has been used
let shippingMethod = document.querySelectorAll("input[name='shippingMethod']");
for(let radio of shippingMethod)
{
    radio.addEventListener("change", loadCheckoutSummary)
}