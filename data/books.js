// async function loadBook(isbn) {
//     const res = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
//     const Bookdata = await res.json();
//     console.log(Bookdata); //what it looks like in consoleS
//     }

// loadBook("9780142407332");

// The data turns into HTML to display the content
/*This includes: 
cover image
title
author
button
and price
inputs: cover image, title, author, button, and price
info needed: book data, the ISBN, and the price(need to add those values myself)
What if the API is missing something?
if the cover fails put a palceholder imgae
if the author is missing: UNKNOWN AUTHOR 
return a string of HTML*/
async function displayBook(bookData, isbn, price)
{
    //gets the cover from Open Library
    const cover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
    let title;
    if(bookData.title)
    {
        title = bookData.title;
    }
    else
        title = "Untitled";
    let author;
    // There are some different formats when retrieving the author
    //some retrieve a string ("author":[]) and other retrive objects (authors: [])
    //Case 1: Objects
    if(bookData.authors && bookData.authors.length > 0 && bookData.authors[0].name)
    {
        author = bookData.authors[0].name;
    }
    //Case 2: string
    else if(bookData.author && bookData.author.length > 0)
    {
        author = bookData.author[0];
    }
    //Case 3:  authors array that contains a 'key'
    else if(bookData.authors && bookData.authors.length> 0 && bookData.authors[0].key)
    {
        let authorKey = bookData.authors[0].key;
        let authorUrl = `https://openlibrary.org${authorKey}.json`;
        try{
            let response = await fetch(authorUrl);
            let authorData = await response.json();
            if(authorData && authorData.name)
            {
                author = authorData.name;
            }
        }
        catch(err)
        {
            console.log("Error fetching the author:", err);
        }
    }
    // missing author
    else
        author = "Unknown Author";
    
    return `
    <div class="books">
        <a href="book.html?isbn=${isbn}&price=${price}"><img src="${cover}" alt="${title}"></a>
        <p>${title}</p>
        <p>${author}</p>
        <p>$${price}</p>
        <button onclick="addToCart('${isbn}', '${title}', ${price})">Add to Cart</button>
    </div>`;
}



// TESTING displayBook()
// document.querySelector(".team-fav-books").innerHTML += displayBook(
//     {
//         title: "Fahrenheit 451",
//         author: ["Ray Bradbury"],
//         isbn: "9781451673319"
//     },
//     "9781451673319",
//     17.00
// );


/*Add to cart
the cart array should contain the isbn, title, price, cover, and quantity[should default to one]
put this in the main js file */
