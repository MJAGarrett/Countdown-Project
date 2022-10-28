// const countdown = require("../test.js");
const assert = require("assert");

const Game = require("../classes/Game");
const Player = require("../classes/Player");

let game;

before(function () {
  game = new Game(2);
  game.players = [];
  game.players.push(new Player("Michael"));
  game.players.push(new Player("Steven"));
  game.players.push(new Player("Victor"));
});

describe("Game setup", function () {
  describe("#gameOn", function () {
    it("gameOn should be true on startup", function gameOn() {
      assert.equal(game.gameOn, true);
    });
  });
});

// describe("Game Endings", function () {
//   describe("#ties", function () {
//     it("should log out a tie and list the names of tying players.", function gameTie() {

//     });
//   });
// });
