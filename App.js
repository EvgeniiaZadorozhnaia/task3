import DiceValidator from './DiceValidator.js';
import Game from './Game.js'

const args = process.argv.slice(2);

try {
  const validatedDices = DiceValidator.validate(args);
  const game = new Game(validatedDices);
  game.play();
} catch (error) {
  console.error(error.message);
}