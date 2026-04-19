/*The home page code oncluding the slide show and the book arrays */

let slideIndex = 0;

showSlides();

function showSlides()
{
    let slides = document.getElementsByClassName("slide");
    for(let i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }
    slideIndex++;

    if(slideIndex > slides.length)
    {
        slideIndex = 1;
    }
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 10000);
}
function plusSlides(n)
{
    showSlides(slideIndex += n);
}

const teamFavBooks = [
    {isbn: 9780142001745, price: 19},
    {isbn: 9781451673319, price: 17.00},
    {isbn: 9780385737951, price: 13.99},
    {isbn: 9781635575569, price: 19.00} ,
    {isbn: 9781419711329, price: 10.99},
    {isbn: 9781635575583, price:13.99}
];
async function loadteamFavBooks(){
    for(const book of teamFavBooks)
    {
        let response = await fetch(`https://openlibrary.org/isbn/${book.isbn}.json`)
        let data = await response.json();

        document.querySelector(".team-fav-books").innerHTML += await displayBook(
                data,
                book.isbn,
                book.price
            );
        
    }
};
loadteamFavBooks();


const bestSeller = [
    {isbn: 9780593798430, price: 28.00},
    {isbn: 9780593135228, price: 22.00},
    {isbn: 9781682816752, price: 27.99},
    {isbn: 9781546171461, price: 30.00},
    {isbn: 9781401971366, price: 30.00}
];
//error here
async function loadBestSellers(){
    for(const book of bestSeller)
    {
        let response = await fetch(`https://openlibrary.org/isbn/${book.isbn}.json`)
        let data = await response.json();

        document.querySelector(".best-seller").innerHTML += await displayBook(
                data,
                book.isbn,
                book.price
            );
        
    }
};
loadBestSellers();

const classics = [
    {isbn:9781594481925, price:17.00},
    {isbn:9780142407332, price:14.99},
    {isbn:9780743273565, price:9.99},
    {isbn:9780060837020, price:17.99},
    {isbn:9780451526342, price:12.00}
];
async function loadclassics(){
    for(const book of classics)
    {
        let response = await fetch(`https://openlibrary.org/isbn/${book.isbn}.json`)
        let data = await response.json();

        document.querySelector(".classics").innerHTML += await displayBook(
                data,
                book.isbn,
                book.price
            );
        
    }
};
loadclassics();