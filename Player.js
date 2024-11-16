import readline from "readline-sync";
import Generator from "./Generator.js";
import Menu from "./Menu.js";
import chalk from "chalk";
import GeneratorKey from "./GeneratorKey.js";
import GeneratorHMAC from "./GeneratorHMAC.js";
import Help from './Help.js';

class Player {
  constructor(name) {
    this.name = name;
    this.dice = null;
  }
}

class User extends Player {
  constructor() {
    super();
  }

  chooses(str) {
    const answer = readline.question(str);
    return answer;
  }

  chooseMove() {
    console.log(chalk.yellow("Try to guess my selection."));
    const userChoise = this.chooses(`${Menu.getMenu([0, 1])}\n`);
    return userChoise;
  }

  chooseDice(dices) {
    console.log(chalk.yellow("Choose your dice:"));
    const index = this.chooses(`${Menu.getMenu(dices)}\n`);
    if (index === "X") {
      console.log("Goodbye!");
      process.exit();
    }

    if (index === "?") {
      console.log(Help.getHelp());
      process.exit();
    }
    this.dice = dices[index];
    console.log(`Your selection: ${index}`);
    console.log(`You choose the [${this.dice}] dice.`);
  }

  throwDice() {
    console.log(chalk.yellow("Add your number modulo 6."));
    const userFace = this.chooses(`${Menu.getMenu([0, 5])}\n`);
    if (userFace === "X") {
      console.log("Goodbye!");
      process.exit();
    }

    if (userFace === "?") {
      console.log(Help.getHelp());
      process.exit();
    }
    return userFace;
  }
}

class Computer extends Player {
  constructor() {
    super();
  }

  chooseMove(min, max) {
    const key = GeneratorKey.get();
    const number = Generator.getRandomNumber(min, max);
    const HMAC = GeneratorHMAC.getHMAC(key, number);
    console.log(`I selected a random value in the range ${min}..${max} (HMAC=${HMAC})`);
    return `${number} (KEY=${key})`;
  }

  chooseDice(dices) {
    const randomIndex = Generator.getRandomNumber(0, dices.length - 1);
    this.dice = dices[randomIndex];
    return this.dice;
  }
}

export { Player, User, Computer };
