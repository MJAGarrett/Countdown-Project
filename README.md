# Countdown-Project
This is a simple command line app that allows you to play the letters round from Countdown.

## Launch
This requires NPM and Nodejs. From the command line, navigate to the directory containing the gameStart.js file and run <code>npm install</code>, then run it using <code>node gameStart.js</code>.


## General Info

- [Project Status](#status)
- [How It Works](#How-It-Works)

## Project Status<a name="status" />
This project is one of the first projects I ever attempted, and as such there is a lot to improve on. However, this was mainly a training project to get used to working with command line I/O. As such, I do not have major plans for it.

## How It Works<a name="How-It-Works" />
The game will start up and ask for input on the number of players and their names. After this it will prompt the first player for vowels or consonants until 9 letters have been chosen. The player that picks the letters will switch between rounds. 

The game defaults to 2 rounds, however, this can be adjusted by changing the constructor in gameStart.js from <code>const game = new Game(2)</code> to <code>const game = new Game(n)</code> where n is the desired number of rounds. 

After all letters have been selected, the game will prompt each player for their best word given the selection of letters. It will then determine whether that word is possible with the given letters and award each player points based on the length of their respective word. There is no time limit for finding a word. 

After all the rounds have been played, the game will tally scores and declare the winner, or winners in the case of a tie.
