export default {
    async fetch(request) {
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type"
                }
            });
        }

        if (request.method !== "POST") {
            return new Response("Method Not Allowed", {
                status: 405
            });
        }

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

        } catch (error) {
            return Response.json(
                { error: "Invalid request." },
                { status: 400 }
            );
        }
    }
};
