// Pharos Auto Daily Check-in Script
// Sumber: https://github.com/shotiko209/Pharos-Auto-Bot

const { execSync } = require('child_process');
const fs = require('fs');

async function main() {
    console.log('[+] Starting Pharos Daily Check-in...');
    
    // Clone repository jika belum ada
    if (!fs.existsSync('./pharos-bot')) {
        console.log('[+] Cloning Pharos bot...');
        execSync('git clone https://github.com/shotiko209/Pharos-Auto-Bot.git pharos-bot', { stdio: 'inherit' });
    }
    
    // Install dependencies
    console.log('[+] Installing dependencies...');
    execSync('cd pharos-bot && npm install', { stdio: 'inherit' });
    
    // Create .env file with private key from secrets
    const privateKey = process.env.PHAROS_PRIVATE_KEY;
    if (!privateKey) {
        console.error('[-] PHAROS_PRIVATE_KEY not set in secrets!');
        process.exit(1);
    }
    
    fs.writeFileSync('./pharos-bot/.env', `PRIVATE_KEY_1=${privateKey}\n`);
    
    // Run the bot
    console.log('[+] Running daily check-in...');
    execSync('cd pharos-bot && node index.js', { stdio: 'inherit' });
    
    console.log('[+] Pharos daily check-in completed!');
}

main().catch(console.error);
