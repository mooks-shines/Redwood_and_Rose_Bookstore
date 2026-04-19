
wish = JSON.parse(localStorage.getItem("wish")) || [];

function saveWish()
{
    localStorage.setItem("wish", JSON.stringify(wish));
}

function addToWishlist(isbn, title, price)
{
    const wishBook = {cover: `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`, isbn: isbn, title: title, price: parseFloat(price)};
    wish.push(wishBook);
    saveWish();
    alert(title + " Added to your wishlist!");
}

function removeWishItem(isbn)
{
    wish = wish.filter(item => item.isbn !== isbn);
    saveWish();
    displayWishlist();
}

function displayWishlist()
{
    const container = document.getElementById("wishlist-container");
    container.innerHTML = "";
    for(let w of wish)
    {
        const card = document.createElement("div");
        card.classList.add("book-card");

        card.innerHTML = `
        <img src="${w.cover}" alt=${w.title}>
        <h3>${w.title}</h3>
        <p>${w.price}</p>
        <button class="add-cart" onclick="addToCart('${w.isbn}', '${w.title}', '${w.price}')">Add to Cart</button>
        <button class="remove" onclick="removeWishItem('${w.isbn}')">Remove</button>
        `;

        container.appendChild(card);
    }
    
}
if (window.location.pathname.includes("wishlistpage.html")) {
    displayWishlist();
}
