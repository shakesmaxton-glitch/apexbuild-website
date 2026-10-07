export default {
    async fetch(request, env) {
        const url = new URL(request.url);

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

                return Response.json({
                    success: true,
                    message: "Message received successfully."
                });

            } catch {
                return Response.json(
                    { error: "Invalid request." },
                    { status: 400 }
                );
            }
        }

        return env.ASSETS.fetch(request);
    }
};
