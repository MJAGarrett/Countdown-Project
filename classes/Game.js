const Player = require("./Player.js");

const countdown = require("../challenge");
const readline = require("readline");
const util = require("util");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = util.promisify(rl.question).bind(rl);

const vowels = ["a", "e", "i", "o", "u"];

const consonents = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];

module.exports = class Game {
  whoGetsToPickLetters;
  players;
  gameOn;
  numberOfRounds;

  constructor(rounds) {
    this.gameOn = true;
    this.numberOfRounds = rounds;
    this.currentRound = 0;
  }
  async playGame() {
    await this.setupPlayers();
    while (this.currentRound < this.numberOfRounds) {
      await this.playRound();
      this.currentRound++;
    }
    let highscore = -999;
    // let playerHasWon = false;
    let highestScorers = new Set();
    for (const player of this.players) {
      if (player.score > highscore) {
        highscore = player.score;
        if (highestScorers.size > 0) highestScorers.clear();
        highestScorers.add(player);
      }
      if (player.score === highscore) {
        highestScorers.add(player);
      }
    }
    if (highestScorers.size > 1) {
      console.log(`There is a tie between: `);
      for (const player of highestScorers) {
        console.log(player.name);
      }
    } else {
      const winner = highestScorers.values().next().value;
      console.log(`The winner is ${winner.name}`);
    }
    // console.log(`The winner is ${winner.name}`);
    this.closeGame();
  }
  async setupPlayers() {
    let players = [];
    let numOfPlayers = 0;
    await question("How many players are there?\n")
      .then((answer) => {
        numOfPlayers = parseInt(answer);
      })
      .catch((err) => {
        console.log(err);
        rl.close();
        process.exit();
      })
      .finally(() => {
        rl.pause();
      });

    for (let p = 1; p <= numOfPlayers; p++) {
      await question(`What is player ${p}'s name?\n`)
        .then((name) => {
          players.push(new Player(name));
        })
        .catch((err) => {
          rl.close();
          console.log(err);
          process.exit();
        })
        .finally(() => {
          rl.pause();
        });
    }
    console.log(players);
    this.players = players;
    this.whoGetsToPickLetters = players[0];
  }

  async playRound() {
    let letters = "";
    while (letters.length < 9) {
      await question(`${this.whoGetsToPickLetters.name}, vowel or consonent?\n`)
        .then((answer) => {
          if (answer === "vowel" || answer === "v") {
            letters += vowels[Math.round(Math.random() * (vowels.length - 1))];
          } else if (answer === "consonent" || answer === "c") {
            letters +=
              consonents[Math.round(Math.random() * (consonents.length - 1))];
          } else {
            rl.close();
            console.log("Closing process");
            process.exit();
          }
        })
        .catch((err) => {
          rl.close();
          console.log(err);
          process.exit();
        });

      console.log(letters);
    }
    rl.pause();

    const answerPool = countdown.findAllWords(letters);

    for (const player of this.players) {
      await question(
        `${player.name} what is your best word using these letters?\n`
      )
        .then((answer) => {
          if (answerPool[answer]) {
            console.log("Good job, thats in there.");
            player.addPoints(answer.length);
          } else
            console.log(
              "Sorry, that answer is not possible with these letters."
            );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          rl.pause();
        });
    }
    console.log(countdown.findLongestWords(letters));
    this.switchPicker();
  }

  switchPicker() {
    const index = this.players.indexOf(this.whoGetsToPickLetters) + 1;
    index === this.players.length
      ? (this.whoGetsToPickLetters = this.players[0])
      : (this.whoGetsToPickLetters = this.players[index]);
  }

  closeGame() {
    this.gameOn = false;
    rl.close();
  }
};
