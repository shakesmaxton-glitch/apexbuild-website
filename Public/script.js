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
// Contact form handling
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (!name || !email || !message) {
            alert("Please complete all fields before sending.");
            return;
        }

        alert(
            "Thank you, " + name +
            "! Your message has been received. We will contact you soon."
        );

        contactForm.reset();
    });
}
