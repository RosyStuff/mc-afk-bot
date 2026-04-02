const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'FinalLifeRun.aternos.me', 
  port: 62549,             
  username: 'AFK_Bot',     
  version: '1.20.1'        
});

bot.on('spawn', () => {
  console.log('Bot joined the server!');
  // AuthMe Login Logic
  bot.chat('/register MyPassword123 MyPassword123');
  setTimeout(() => {
    bot.chat('/login MyPassword123');
  }, 2000);
});

// Anti-AFK: Moves the bot every 30 seconds
setInterval(() => {
  bot.setControlState('jump', true);
  setTimeout(() => bot.setControlState('jump', false), 500);
}, 30000);

bot.on('error', (err) => console.log('Error:', err));
bot.on('end', () => console.log('Bot disconnected.'));
