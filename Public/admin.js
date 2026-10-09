const SUPABASE_URL = "https://bglqdgjhubxisgiugbio.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_eSsdQ52CHShjJr7vbywkRw_bS9aaapX";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const loginForm = document.querySelector("#loginForm");
const loginSection = document.querySelector("#loginSection");
const dashboardSection = document.querySelector("#dashboardSection");
const loginMessage = document.querySelector("#loginMessage");
const logoutButton = document.querySelector("#logoutButton");


async function checkLogin() {
    const { data: { session } } =
        await supabaseClient.auth.getSession();

    if (session) {
        loginSection.style.display = "none";
        dashboardSection.style.display = "block";
        await loadMessages();
    } else {
        loginSection.style.display = "block";
        dashboardSection.style.display = "none";
    }
}

async function loadMessages() {
    const messagesDiv = document.querySelector("#messages");
    messagesDiv.textContent = "Loading messages...";

    const { data, error } = await supabaseClient
        .from("contact_messages")
        .select("id, name, email, message, status, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        messagesDiv.textContent =
            "Could not load messages: " + error.message;
        return;
    }

    if (!data || data.length === 0) {
        messagesDiv.textContent = "No customer messages yet.";
        return;
    }

    messagesDiv.replaceChildren();

    data.forEach(function(item) {
        const card = document.createElement("article");
        const heading = document.createElement("h3");
        const email = document.createElement("p");
        const message = document.createElement("p");
        const status = document.createElement("p");
        const date = document.createElement("p");

        heading.textContent = item.name;
        email.textContent = "Email: " + item.email;
        message.textContent = "Message: " + item.message;
        status.textContent = "Status: " + (item.status || "new");
        date.textContent = "Received: " +
            new Date(item.created_at).toLocaleString();

        card.append(heading, email, message, status, date);
        card.style.border = "1px solid #ccc";
        card.style.padding = "16px";
        card.style.marginTop = "12px";
        card.style.borderRadius = "8px";

        messagesDiv.appendChild(card);
    });
}
loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    loginMessage.textContent = "Signing in...";

    const { error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        loginMessage.textContent = error.message;
        return;
    }

    loginMessage.textContent = "";

    await checkLogin();
});

logoutButton.addEventListener("click", async function() {
    await supabaseClient.auth.signOut();
    await checkLogin();
});

checkLogin();
<!-- Admin page deployment check -->
