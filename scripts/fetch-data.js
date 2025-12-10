import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLUBS = [
    { name: "Etoilée", tag: "29UPLG8QQ" },
    { name: "Fleurie", tag: "2C9Y28JPP" },
    { name: "Celeste", tag: "2JUVYQ0YV" },
    { name: "Gelée", tag: "2CJJLLUQ9" },
];

const API_BASE_URL = "https://api.brawlstars.com/v1";
const API_KEY = process.env.BRAWL_STARS_API_KEY;

async function fetchClubData(clubTag) {
    const formattedTag = clubTag.startsWith('#') ? clubTag.replace('#', '%23') : '%23' + clubTag;
    const url = `${API_BASE_URL}/clubs/${formattedTag}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Accept': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch ${clubTag}: ${error}`);
    }

    return response.json();
}

async function main() {
    console.log('Fetching club data...');

    const results = [];

    for (const club of CLUBS) {
        try {
            console.log(`Fetching ${club.name}...`);
            const data = await fetchClubData(club.tag);
            results.push({
                ...data,
                configName: club.name,
                fetchedAt: new Date().toISOString(),
            });
            console.log(`✓ ${club.name} fetched successfully`);
        } catch (error) {
            console.error(`✗ Error fetching ${club.name}:`, error.message);
            results.push({
                configName: club.name,
                tag: club.tag,
                error: true,
                errorMessage: error.message,
                fetchedAt: new Date().toISOString(),
            });
        }
    }

    // Save to public directory
    const outputPath = path.join(__dirname, '../public/clubs-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\nData saved to ${outputPath}`);
    console.log(`Total clubs: ${results.length}`);
    console.log(`Successful: ${results.filter(r => !r.error).length}`);
    console.log(`Failed: ${results.filter(r => r.error).length}`);
}

main().catch(console.error);
