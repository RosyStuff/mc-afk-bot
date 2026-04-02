const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'FinalLifeRun.aternos.me', // CHANGE IP
  port: 62549,             // CHANGE PORT
  username: 'AFK_Bot',     // CHANGE THE USERNAME
  version: '1.20.1'        // CHANGE THE VERSION IF YOUR SERVER SUPPORTS A DIFFERENT VERSION
});

// 1. SAFE LOGIN LOGIC
bot.on('spawn', () => {
  // THE FIX: Immediately stop all movement states to prevent 'true/false' packet errors
  bot.clearControlStates(); 
  
  if (!bot.hasSpawned) {
    bot.hasSpawned = true;
    console.log('Bot spawned! Syncing coordinates as numbers...');
    
    // Send AuthMe commands
    // REMOVE THEM IF YOU DONT USE LOGIN
    setTimeout(() => {
      // We manually update the position one time to ensure numbers are sent
      const pos = bot.entity.position;
      bot.lookAt(pos.offset(0, 1.6, 0)); 

      bot.chat('/register MyPassword123 MyPassword123'); // CHANGE TO THE PASSWORD YOU LIKE
      bot.chat('/login MyPassword123'); // CHANGE TO YOUR PASSWORD
      console.log('Login commands sent!');
      
      // Start anti-AFK only AFTER login and a small delay
      startAntiAFK();
    }, 10000); // MODIFY THIS DELAY PART
  }
});

// 2. SAFE ANTI-AFK (No glitchy packets)
function startAntiAFK() {
  setInterval(() => {
    // We ONLY use look() with 'false' for 'force' to prevent Purpur packet errors
    if (bot.entity && typeof bot.entity.position.x === 'number') {
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
