class DiceValidator {
  static validate(dices) {
    if (dices.length < 3) {
      throw new Error("Error: There must be at least three sets of dices");
    }

    dices.forEach((dice) => {
      const faces = dice.split(",").map(Number);
      if (faces.length !== 6) {
        throw new Error("Error. The dice should have 6 sides.");
      }
      if (faces.some((el) => isNaN(el) || !Number.isInteger(el))) {
        throw new Error("Error: The dice faces must be whole numbers");
      }
    });

    return dices;
  }
}

export default DiceValidator;