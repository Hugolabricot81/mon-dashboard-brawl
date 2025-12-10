export const CLUBS = [
    { name: "Etoilée", tag: "29UPLG8QQ" },
    { name: "Fleurie", tag: "2C9Y28JPP" },
    { name: "Celeste", tag: "2JUVYQ0YV" },
    { name: "Gelée", tag: "2CJJLLUQ9" },
    // Placeholders for the remaining 2 clubs if needed
    { name: "Club 5", tag: "placeholder5" },
    { name: "Club 6", tag: "placeholder6" }
];

// In a real scenario, this should be in an environment variable.
// For this demo/GitHub Pages, we might need a proxy.
// Users can set their token in localStorage for testing if not hardcoded.
export const API_BASE_URL = "https://api.brawlstars.com/v1";

// We'll use a proxy by default to avoid CORS on localhost/gh-pages if the direct API fails.
// A common public proxy or a local one. For now, let's try direct or a specific proxy if known.
// Often 'https://cors-anywhere.herokuapp.com/' is used but requires activation.
// We will implement a switch or just use direct and warn user.
export const PROXY_URL = "https://corsproxy.io/?";

export const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImU0YzczMTNlLWVkYWItNGE5My1iZDIyLTkwNzdiYTUzY2EwYiIsImlhdCI6MTc2NTM5ODI1Niwic3ViIjoiZGV2ZWxvcGVyL2ZiNDViNGRlLTE5YmUtNTY0Ny01MjUxLTZmYThmNGIxYTg2MiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMjAuMjAxLjI4LjE1MSIsIjIwLjIwNS4yNDMuMTY2IiwiMjAuMjA3LjczLjgyIiwiMjAuMTc1LjE5Mi4xNDciXSwidHlwZSI6ImNsaWVudCJ9XX0.oYUQImyhdKuVy05W9VSWpZ8pfj5WIt2R1nDKpioj8SYLh76vGeBr0YY221-z_3HqnaoZdt2rs47nC4nSJrIHpg";

