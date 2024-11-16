import Help from './Help.js';
import { User } from "./Player.js";
import { Computer } from "./Player.js";
import chalk from "chalk";

class Game {
  constructor(dices) {
    this.dices = dices;
    this.user = new User("User");
    this.computer = new Computer("Computer");
  }

  async play() {
    console.log("Let's determine who makes the first move.");

    const computerChoice = this.computer.chooseMove(0, 1);
    const userChoise = this.user.chooseMove();

    if (userChoise === "X") {
      console.log("Goodbye!");
      process.exit();
    }

    if (userChoise === "?") {
      console.log(Help.getHelp());
      process.exit();
    }

    console.log(`Your selection: ${userChoise}`);
    console.log(`My selection: ${computerChoice}`);

    if (Number(userChoise) !== parseInt(computerChoice, 10)) {
      this.computer.chooseDice(this.dices);
      console.log(
        `I make the first move and choose the [${this.computer.dice}] dice.`
      );
      this.user.chooseDice(this.dices);
      console.log("It's time for my throw.");
      const compThrow = this.throw(this.computer);
      console.log(chalk.red.bold(`My throw is ${compThrow}.`));
      console.log("It's time for your throw.");
      const userThrow = this.throw(this.user);
      console.log(chalk.blue.bold(`Your throw is ${userThrow}.`));
      this.end(userThrow, compThrow);
    } else {
      console.log(`You guessed right and make the first move.`);
      this.user.chooseDice(this.dices);
      this.computer.chooseDice(this.dices);
      console.log(`I chose the [${this.computer.dice}] dice.`);
      console.log("It's time for your throw.");
      const userThrow = this.throw(this.user);
      console.log(chalk.blue.bold(`Your throw is ${userThrow}.`));
      console.log("It's time for my throw.");
      const compThrow = this.throw(this.computer);
      console.log(chalk.red.bold(`My throw is ${compThrow}.`));
      this.end(userThrow, compThrow);
    }
  }

  throw(player) {
    const compResult = parseInt(this.computer.chooseMove(0, 5), 10);
    const userResult = parseInt(this.user.throwDice(), 10);
    const result = this.result(compResult, userResult);
    return player.dice.split(",")[result];
  }

  result(comp, user) {
    console.log(`Your selection: ${user}`);
    console.log(`My number is: ${comp}`);
    const result = (comp + user) % 6;
    console.log(
      chalk.gray.bold(`The result is ${comp} + ${user} = ${result} (mod 6).`)
    );
    return result;
  }

  end(userScore, compScore) {
    if (userScore > compScore) {
      console.log(chalk.green(`You win (${userScore} > ${compScore})!`));
    } else if (userScore < compScore) {
      console.log(chalk.red(`You lost (${userScore} < ${compScore})!`));
    } else if (userScore === compScore) {
      console.log(chalk.blue(`Draw!`));
    }
  }
}

export default Game;
