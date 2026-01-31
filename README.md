# VUE A1

## Run Instructions
- open the command line in the project folder and execute the command 'npm install'
- open the command line in the frontend folder and execute the command 'npm install'
- open the command line in the backend folder and execute the command 'npm install'
- open the command line in the backend folder and execute the command 'npm run dev'
- open command line in the frontend folder and execute the command 'npm run dev'
- ctrl click the local host link in the frontend command line to open the project

## Screens Added
- Leaderboard Screen (LeaderboardTable component, LightDarkToggle component, FunnyButton component)
- Contact Screen (ContactWidget component)

## Components Created
- Contact Widget: Takes in text input, submit button executes a console.log()
- Funny Button: Opens a link to a funny video
- Leaderboard Table: Reads json file and displays as a table
- Light Dark Toggle: div class reads theme.value to determine styling, button changes the value and it read and changes the theme in run time
  
## Stores Created
- theme.ts: holds a const ref that is either "light or "dark" and a function 'toggle' to switch between them
