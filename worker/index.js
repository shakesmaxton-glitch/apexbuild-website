
export default {
    async fetch(request, env) {
        const url = new URL(request.url);
console.log("Supabase bindings check:", {
    urlPresent: Boolean(env.SUPABASE_URL),
    keyPresent: Boolean(env.SUPABASE_KEY)
});
        if (
            url.pathname === "/api/contact" &&
            request.method === "POST"
        ) {
            let data;

            try {
                data = await request.json();
            } catch (error) {
                console.error("Invalid JSON:", error?.message);
                return Response.json(
                    { error: "The request body is not valid JSON." },
                    { status: 400 }
                );
            }

            const name = String(data.name || "").trim();
            const email = String(data.email || "").trim();
            const message = String(data.message || "").trim();

            if (!name || !email || !message) {
                return Response.json(
                    { error: "All fields are required." },
                    { status: 400 }
                );
            }

            try {
                const response = await fetch(
                    `${env.SUPABASE_URL}/rest/v1/contact_messages`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "apikey": env.SUPABASE_KEY,
                            "Authorization": `Bearer ${env.SUPABASE_KEY}`,
                            "Prefer": "return=minimal"
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            message
                        })
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Supabase error:", response.status, errorText);

                    return Response.json(
                        { error: "Unable to save your message." },
                        { status: 500 }
                    );
                }

                return Response.json({
                    success: true,
                    message: "Message received successfully."
                });
            } catch (error) {
                console.error(
                    "Contact form error:",
                    error?.message,
                    error?.stack
                );

                return Response.json(
                    { error: "The server could not process your request." },
                    { status: 500 }
                );
            }
        }

        return env.ASSETS.fetch(request);
    }
};
