const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'FinalLifeRun.aternos.me', // CHANGE IP
  port: 62549,             // CHANGE PORT
  username: 'AFK_Bot',     // CHANGE THE USERNAME
  version: '1.20.1'        // CHANGE THE VERSION IF YOUR SERVER SUPPORTS A DIFFERENT VERSION
});

// 1. SAFE LOGIN LOGIC
bot.on('spawn', () => {
  // THE FIX: Reset all movement packets to prevent 'x=true' Purpur errors
  bot.clearControlStates();
  
  if (!bot.hasSpawned) {
    bot.hasSpawned = true;
    console.log('Bot spawned! Waiting for Purpur to confirm presence...');
    
    // Send AuthMe commands
    // REMOVE THEM IF YOU DONT USE LOGIN
    // WE USE A LONGER DELAY (15s) so AuthMe doesn't say "wasn't online"
    setTimeout(() => {
      console.log('Sending AuthMe commands now...');
      bot.chat('/register MyPassword123 MyPassword123'); // CHANGE TO THE PASSWORD YOU LIKE
      
      // Delay the login by 2 more seconds to prevent "Aborted" error
      setTimeout(() => {
        bot.chat('/login MyPassword123'); // CHANGE TO YOUR PASSWORD
        console.log('Login successful!');
        startAntiAFK();
      }, 2000);
    }, 15000); // 15s delay ensures the bot is "fully online" for AuthMe
  }
});

// 2. SAFE ANTI-AFK (No glitchy packets)
function startAntiAFK() {
  setInterval(() => {
    // Only look around if x, y, and z are REAL NUMBERS (Fixes x=true error)
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
