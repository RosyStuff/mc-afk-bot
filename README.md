24/7 minecraft afk bot (mineflayer)

basically a super stable bot i built to keep my server online 24/7 it's perfect for aternos or minehut i added a custom 15s physics delay becuse purpur and paper servers kept breaking with coordinate sync errors

what it does
1 fixes spawn errors: stops those annoying 'true/false' packet crashes when you first join
2 login support: it handles /login and /register commands automaticly if you're on a cracked server
3 stay undetected: it moves its head around at random times so afk kickers don't catch it
4 runs forever: works with .github/workflows so it just restarts itself if it ever goes down

how to use it
1 throw your server ip/port into index.js (i left comments in the code to show you where)
2 fire it up: node index.js

github actions
this repo is already set up with a workflow the code is designed to kill the process if it gets disconected, which lets github actions automatically reboot it and get it back in the game

from
rosy da minecrafter
