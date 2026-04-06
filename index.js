const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'FinalLifeRun.aternos.me', // CHANGE IP
  port: 62549,             // CHANGE PORT
  username: 'AFK_Bot',     // CHANGE THE USERNAME
  version: '1.20.1'        // CHANGE THE VERSION IF YOUR SERVER SUPPORTS A DIFFERENT VERSION
});

// 1. SAFE LOGIN LOGIC
bot.on('spawn', () => {
  // THE FIX: Completely disable physics to stop 'true/false' boolean packets
  bot.physicsEnabled = false; 
  console.log('Physics disabled to prevent Boolean packet errors...');

  if (!bot.hasSpawned) {
    bot.hasSpawned = true;
    console.log('Bot spawned! Waiting for Purpur coordinate sync...');
    
    // Send AuthMe commands
    // REMOVE THEM IF YOU DONT USE LOGIN
    setTimeout(() => {
      // Re-enable physics only AFTER we are sure we have real numbers
      if (typeof bot.entity.position.x === 'number') {
        bot.physics.enabled = true;
        console.log('Coordinates synced as numbers. Sending login...');
        bot.chat('/login MyPassword123'); // CHANGE TO YOUR PASSWORD
        bot.chat('/register MyPassword123 MyPassword123'); // CHANGE TO THE PASSWORD YOU LIKE
        setTimeout(() => {
          bot.chat('/login MyPassword123'); // CHANGE TO YOUR PASSWORD
        }, 10);
        
        startAntiAFK();
      }
    }, 15000); // 15s delay to fix 'wasnt online' and 'x=true' errors
  }
});

// 2. SAFE ANTI-AFK (No glitchy packets)
async function startAntiAFK() {
  setInterval(async () => {
    if (!bot.entity?.position) return;

    try {
      // Randomized looking
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      await bot.look(yaw, pitch, false);

      // Physics jump
      bot.setControlState('jump', true);
      await bot.waitForTicks(2);
      bot.setControlState('jump', false);

      bot.swingArm('right');
    } catch (e) {
      // Ignore errors if bot is dead/unspawned
    }
  }, 15000); // 15s interval to bypass most server anti-afk checks
}


bot.on('error', (err) => console.log('Error:', err));
bot.on('kicked', (reason) => console.log('Kicked for:', reason));
bot.on('end', () => {
  console.log('Bot disconnected. GitHub will restart this in 10s.');
  setTimeout(() => process.exit(1), 10000); 
});
