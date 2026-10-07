// Confirm that the website has loaded
console.log("ApexBuild website loaded successfully!");

// Mobile navigation
const navLinks = document.querySelector(".nav-links");

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// Contact button
const contactButton = document.querySelector(".contact .button");

if (contactButton) {
    contactButton.addEventListener("click", () => {
        console.log("Customer clicked the contact button.");
    });
});
