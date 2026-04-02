const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'FinalLifeRun.aternos.me', // CHANGE IP
  port: 62549,             // CHANGE PORT
  username: 'AFK_Bot',     // CHANGE THE USERNAME
  version: '1.20.1'        // CHANGE THE VERSION IF YOUR SERVER SUPPORTS A DIFFERENT VERSION
});

// 1. SAFE LOGIN LOGIC
// THE FIX: We wait for the server to sync our position before sending ANY data
bot.on('move', () => {
  if (!bot.hasSpawned) {
    bot.hasSpawned = true;
    console.log('Bot synced with Purpur! Starting AuthMe in 10s...');
    
    // Send AuthMe commands
    // REMOVE THEM IF YOU DONT USE LOGIN
    setTimeout(() => {
      bot.chat('/register MyPassword123 MyPassword123'); // CHANGE TO THE PASSWORD YOU LIKE
      bot.chat('/login MyPassword123'); // CHANGE TO YOUR PASSWORD
      console.log('Login commands sent!');
      
      // Start anti-AFK only AFTER login and a small delay
      startAntiAFK();
    }, 10000); // MODIFY THIS DELAY PART - Set to 10s to fix Purpur errors
  }
});

// 2. SAFE ANTI-AFK (No glitchy packets)
function startAntiAFK() {
  setInterval(() => {
    // Instead of jumping (which causes packet errors), 
    // just look around randomly
    if (bot.entity) {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch, false);
      console.log('Bot looked around to stay active');
    }
  }, 30000); // Every 30 seconds
}

bot.on('error', (err) => console.log('Error:', err));
bot.on('kicked', (reason) => console.log('Kicked for:', reason));
bot.on('end', () => {
  console.log('Bot disconnected. GitHub will restart this in 10s.');
  setTimeout(() => process.exit(1), 10000); 
});
