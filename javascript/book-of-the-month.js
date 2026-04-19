window.onload = function () {
    const book = {
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        price: "$17.00",
        genre: "Dystopian Fiction",
        rating: "4.8 / 5",
        description: "A powerful novel about censorship, knowledge, and society. It is one of the most important classic dystopian books.",
        recommendation: "Our team recommends this book because it is classic, deep, and still very relevant today."
    };

    document.getElementById("featured-book-title").textContent = book.title;
    document.getElementById("featured-book-author").textContent = book.author;
    document.getElementById("featured-book-price").textContent = book.price;
    document.getElementById("featured-book-genre").textContent = book.genre;
    document.getElementById("featured-book-rating").textContent = book.rating;
    document.getElementById("featured-book-description").textContent = book.description;

    document.getElementById("recommend-btn").onclick = function () {
        document.getElementById("recommend-text").textContent = book.recommendation;
    };
};