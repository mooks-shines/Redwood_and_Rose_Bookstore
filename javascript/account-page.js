window.onload = function () {
    const today = new Date();
    const lastLogin = today.toLocaleDateString();
    document.getElementById("last-login").textContent = lastLogin;

    const editButton = document.getElementById("edit-btn");
    const editInfoButton = document.getElementById("edit-info-btn");

    editButton.onclick = function () {
        const currentName = document.getElementById("user-name").textContent;
        const newName = prompt("Enter your new name:", currentName);

        if (newName !== null && newName.trim() !== "") {
            document.getElementById("user-name").textContent = newName;
            alert("Profile updated successfully!");
        }
    };

    editInfoButton.onclick = function () {
        const currentEmail = document.getElementById("user-email").textContent;
        const currentGenre = document.getElementById("user-genre").textContent;
        const currentAddress = document.getElementById("user-address").textContent;

        const newEmail = prompt("Enter your email:", currentEmail);
        const newGenre = prompt("Enter your favorite genre:", currentGenre);
        const newAddress = prompt("Enter your address:", currentAddress);

        if (newEmail !== null && newEmail.trim() !== "") {
            document.getElementById("user-email").textContent = newEmail;
        }

        if (newGenre !== null && newGenre.trim() !== "") {
            document.getElementById("user-genre").textContent = newGenre;
        }

        if (newAddress !== null && newAddress.trim() !== "") {
            document.getElementById("user-address").textContent = newAddress;
        }

        alert("Account information updated successfully!");
    };

    updateCartCount();
    updateWishCount();
};
function updateCartCount()
    {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        document.getElementById("cart-count").textContent = cart.length + " Items";
    }
    function updateWishCount()
    {
        const wish = JSON.parse(localStorage.getItem("wish")) || [];
        document.getElementById("wishlist-count").textContent = wish.length + " Books";
    }