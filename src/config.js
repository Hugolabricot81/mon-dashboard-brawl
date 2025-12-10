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

export const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM3MDJjZWM3LWY0ZjItNGQwYS1hYWZiLWQxOTQ4MjE4OWJkYyIsImlhdCI6MTc2NTM4ODgyNSwic3ViIjoiZGV2ZWxvcGVyL2ZiNDViNGRlLTE5YmUtNTY0Ny01MjUxLTZmYThmNGIxYTg2MiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTg1LjE5OS4xMDguMTUzIiwiMTg1LjE5OS4xMDkuMTUzIiwiMTg1LjE5OS4xMTAuMTUzIiwiMTg1LjE5OS4xMTEuMTUzIl0sInR5cGUiOiJjbGllbnQifV19.CFNe-gd1b3m-XP54SC59JXb7TNNAVjjuTxfwJlt1rNMjOSdLyVhRy8F2hgl0IJoJQQP_g9DgjLW29YAEfl8YUA";
