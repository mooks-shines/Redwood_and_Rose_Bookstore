window.onload = function ()
{
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    //Added localStorage so we have the array on all pages
    if (window.location.pathname.includes("shopping-cart.html")) {
    displayCart();
}
};

//this will save the cart after every function
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}



function addToCart(isbn, title, price)
{
    const book = {cover: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`, isbn: isbn, title: title, price: parseFloat(price), quantity: 1};
    cart.push(book);
    saveCart();
    alert(title + " Added to cart!");
}
function quanttotal()
{
    return price * qunatity;
}

//remove the item wth the ISBN, then rebuilds the cart table, what does filter do?
// it gets the cart and filter out the item you want to remove
//it returns a new array containing only the items that passed the test
//the test: runs every item in the cart, either if it stays or get removed
//for each item return tue if the isbn does not match
function removeFromCart(isbn) 
{
    cart = cart.filter(item => item.isbn !== isbn);
    saveCart();
    displayCart();
}
//find the item of that isbn, add or subtract from quantity
function changeQuantity(isbn, amount) 
{
    const item = cart.find(i => i.isbn === isbn);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(isbn);
        return;
    }
    saveCart();
    displayCart();
}


function displayCart() {
    const container = document.getElementById("book-items");
    container.innerHTML = "";

    let subtotal = 0;

    for(item of cart)
    {
        const row = document.createElement("tr");
        row.classList.add("cart-item");

        row.innerHTML = `
            <td><img src="${item.cover}" alt="${item.title}"><p>${item.title}</p></td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
            <button onclick="changeQuantity('${item.isbn}', -1)">-</button>
            ${item.quantity}
            <button onclick="changeQuantity('${item.isbn}', 1)">+</button>
            </td>
            <td>$${item.price * item.quantity}</td>
            <td><button onclick="removeFromCart('${item.isbn}')">Remove</button></td>
            <hr>
        `;

        container.appendChild(row);

        subtotal += item.price * item.quantity;
    }

    const tax = subtotal * 0.07;
    const total = subtotal + tax;

    document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

