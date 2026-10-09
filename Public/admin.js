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
    } else {
        loginSection.style.display = "block";
        dashboardSection.style.display = "none";
    }
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
