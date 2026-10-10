export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // Handle contact form
        if (url.pathname === "/api/contact" && request.method === "POST") {
            try {
                const data = await request.json();

                const name = String(data.name || "").trim();
                const email = String(data.email || "").trim();
                const message = String(data.message || "").trim();

                if (!name || !email || !message) {
                    return Response.json(
                        { error: "All fields are required." },
                        { status: 400 }
                    );
                }

                // Send the message to Supabase
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
                            name: name,
                            email: email,
                            message: message
                        })
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Supabase error:", errorText);

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
    console.error("Contact form error:", error);

    return Response.json(
        { error: "The server could not process your request. Please try again." },
        { status: 500 }
    );
            }

        // Serve the website
        return env.ASSETS.fetch(request);
    }
};
