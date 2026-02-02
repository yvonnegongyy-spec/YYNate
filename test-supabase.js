
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://mrrywhgrdnpygzrffcor.supabase.co';
// Note: In non-Vite env (like node), import.meta.env doesn't work, so we'll just check if we can read .env or just use the values from the file we know.
// Actually, let's just use the values we see in .env.local because Node doesn't pick up .env.local automatically without a package.

import fs from 'fs';
import path from 'path';

// Simple .env parser since we can't depend on dotenv being installed
const envPath = path.resolve(process.cwd(), '.env.local');
let envConfig = {};
try {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) envConfig[key.trim()] = value.trim();
    });
} catch (e) {
    console.error("Could not read .env.local");
}

const url = envConfig['VITE_SUPABASE_URL'];
const key = envConfig['VITE_SUPABASE_ANON_KEY'];

console.log("Using URL:", url);
console.log("Using Key (first 10 chars):", key ? key.substring(0, 10) + '...' : 'MISSING');

const supabase = createClient(url, key);

async function testConnection() {
    console.log("Testing connection & INSERT...");

    // Test Insert
    const { data: insertData, error: insertError } = await supabase
        .from('sessions')
        .insert([{
            user_id: '00000000-0000-0000-0000-000000000000',
            venue: 'Test Venue',
            game: 'Test Game',
            profit: 100,
            duration: '1h',
            date: new Date().toISOString(),
            is_live: false
        }])
        .select();

    if (insertError) {
        console.error("Insert FAILED:", insertError);
    } else {
        console.log("Insert SUCCESS! Data:", insertData);
    }
}

testConnection();
