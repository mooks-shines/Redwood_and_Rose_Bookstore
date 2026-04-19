//ghets the  query string of the urls URL ex. www.google/?books, books is what they will get
//cant use queryselector becasue this (book.html) isbn doesnt exist in the HTML/DOM. It only exist in the URL 
const params = new URLSearchParams(window.location.search);
const isbn = params.get("isbn");
const price = parseFloat(params.get("price"));
console.log(isbn);
console.log(price);

async function loadBook() 
{
    const response = await fetch(`https://openlibrary.org/isbn/${isbn}.json`);
    const detailsData = await response.json();
    displayBookDetails(detailsData);
}

loadBook();

async function displayProductDetails(detailsData)
{
    let classification;
    if(detailsData.lc_classifications)
    {
        classification = detailsData.lc_classifications;
    }
    else if(detailsData.dewey_decimal_class)
    {
        classification = detailsData.dewey_decimal_class;
    }
    let pages = detailsData.number_of_pages;
    let publishDate = detailsData.publish_date;
    let publisher = detailsData.publishers;
    let subject = detailsData.subjects;
    //there was a genere one

    document.getElementById("publisher").textContent = "Publisher: " + publisher;
    document.getElementById("Pdate").textContent = "Publish Date: " + publishDate;
    document.getElementById("pages").textContent = pages + " pages";
    document.getElementById("classification").textContent = "Classification: " + classification;
    document.getElementById("genre-subject").textContent = "Subject/Genre: " + subject;
}


async function displayBookDetails(detailsData)
{
    const cover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;

    // Title
    let title = detailsData.title || "Untitled";

    // Author
    let author;
    if(detailsData.authors && detailsData.authors[0].name) {
        author = detailsData.authors[0].name;
    }
    else if(detailsData.author && detailsData.author.length > 0) {
        author = detailsData.author[0];
    }
    else if(detailsData.authors && detailsData.authors[0].key) {
        let authorKey = detailsData.authors[0].key;
        let authorUrl = `https://openlibrary.org${authorKey}.json`;
        try {
            let response = await fetch(authorUrl);
            let authorData = await response.json();
            author = authorData.name || "Unknown Author";
        } catch {
            author = "Unknown Author";
        }
    }
    else {
        author = "Unknown Author";
    }

    let description;

    if (detailsData.description) 
    {
        description = detailsData.description.value || detailsData.description;
    } 
    else 
    {
        description = "No description available";
    }


    // Update DOM
    document.getElementById("book-cover").innerHTML = `<img src="${cover}">`;
    document.getElementById("book-title").textContent = title;
    document.getElementById("book-author").textContent = "by "+ author;
    document.getElementById("price").textContent = "$" + price.toFixed(2);
    document.getElementById("book-description").textContent = description;

    await displayProductDetails(detailsData);
}




// function displayBookDetails(detailsData)
// {
//     document.getElementById("book-cover").innerHTML = `<img src="https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg">`;
//     document.getElementById("book-title").textContent = detailsData.title;
//     document.getElementById("book-author").textContent = detailsData.author;
//     document.getElementById("price").textContent = price;
//     document.getElementById("book-description").textContent = detailsData.description;

// }   
document.getElementById("cart").addEventListener("click", () => 
    {
        addToCart(isbn, document.getElementById("book-title").textContent, price);
    });

    document.getElementById("wish").addEventListener("click", () => 
    {
        addToWishlist(isbn, document.getElementById("book-title").textContent, price);
    });