import AsciiTable from "ascii-table";

class Help {
  static assignDices(dices) {
    this.dices = dices;
  }

  static calculateWinProbability(d1, d2) {
    let wins = 0;
    d1.split(',').forEach((v1) => {
      d2.split(',').forEach((v2) => {
        if (v1 > v2) {
          wins++;
        }
      });
    });
    return (wins / 36).toFixed(4);
  }

  static getHelp() {
    let table = new AsciiTable("Probability of the wins for the user:");
    let cols = this.dices.map((d) => d.split(',').join(","));
    table.setHeading("User \\ Computer", ...cols);

    this.dices.forEach((d1, i) => {
      let r = [d1.split(',').join(",")];
      this.dices.forEach((d2, j) => {
        if (i === j) {
          r.push(`- (${(1 / this.dices.length).toFixed(4)})`);
        } else {
          let prob = this.calculateWinProbability(d1, d2);
          r.push(prob);
        }
      });
      table.addRow(...r);
    });

    return table.toString();
  }
}

export default Help;
