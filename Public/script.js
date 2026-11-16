
// ========================================
// APEXBUILD WEBSITE
// ========================================

console.log("ApexBuild website loaded successfully!");

// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL = "https://bglqdgjhubxisgiugbio.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_eSsdQ52CHShjJr7vbywkRw_bS9aaapX";

// ========================================
// MOBILE NAVIGATION
// ========================================

const navLinks = document.querySelector(".nav-links");

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (navLinks) {
            navLinks.classList.remove("open");
        }
    });
});

// ========================================
// CONTACT BUTTON
// ========================================

const contactButton = document.querySelector(".contact .button");

if (contactButton) {
    contactButton.addEventListener("click", () => {
        console.log("Customer clicked the contact button.");
    });
}

// ========================================
// SUPABASE CONTACT FORM
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.querySelector("#contactForm");

    if (!contactForm) {
        console.error("Contact form was not found.");
        return;
    }

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const message = document.querySelector("#message").value.trim();

        if (!name || !email || !message) {
            alert("Please complete all fields before sending.");
            return;
        }

        if (
            SUPABASE_URL.includes("YOUR_SUPABASE") ||
            SUPABASE_PUBLISHABLE_KEY.includes("YOUR_SUPABASE")
        ) {
            alert("Supabase configuration is incomplete.");
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
        }

        try {

            const cleanURL = SUPABASE_URL.replace(/\/+$/, "");

            const response = await fetch(
                `${cleanURL}/rest/v1/contact_messages`,
                {
                    method: "POST",

                    headers: {
                        "apikey": SUPABASE_PUBLISHABLE_KEY,
                        "Content-Type": "application/json",
                        "Prefer": "return=minimal"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                }
            );

            if (!response.ok) {
                const errorText = await response.text();

                console.error("Supabase error:", errorText);

                throw new Error(
                    "Your message could not be saved. Please try again."
                );
            }

            alert(
                "Thank you, " + name +
                "! Your message has been received."
            );

            contactForm.reset();

        } catch (error) {

            console.error("Contact form error:", error);

            alert(error.message || "Unable to send your message.");

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
            }

        }

    });

});
