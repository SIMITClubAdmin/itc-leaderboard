import Papa from "papaparse";

export async function GET() {
    try {
        const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTctgjERbiG2EsS1sBx4-J3GV2uDY9jGjHhNpMZ2HMobLwzIT7k02oNkigSRQSI5Omx6mUwvp2NwECo/pub?gid=0&single=true&output=csv";
        const res = await fetch(csvUrl);
        const csvText = await res.text();

        // Parse CSV properly
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const data = parsed.data;

        return new Response(JSON.stringify({ responses: data }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// HOW TO CALL:
// const response = await fetch("/api/responses");
// const data = await response.json();
// console.log(data.responses); // Your parsed responses here