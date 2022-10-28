module.exports = class Player {
  name;
  score;
  constructor(name) {
    this.score = 0;
    this.currentWord = null;
    this.name = name;
  }
  addPoints(points) {
    this.score += points;
  }
  getPoints() {
    return this.points;
  }
};
