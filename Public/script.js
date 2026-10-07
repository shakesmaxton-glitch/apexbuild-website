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
const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (!name || !email || !message) {
            alert("Please complete all fields before sending.");
            return;
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || "Something went wrong.");
                return;
            }

            alert("Thank you, " + name + "! Your message has been received.");

            contactForm.reset();

        } catch (error) {
            alert("Unable to send your message right now. Please try again.");
            console.error(error);
        }
    });
}
