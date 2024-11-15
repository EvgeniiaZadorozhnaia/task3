class Menu {
  static getMenu(options) {
    let menu = "";
    if (options.every((el) => typeof el === "number")) {
      for (let i = options[0]; i <= options[1]; i++) {
        menu += `${i} - ${i}\n`;
      }
    } else {
      options.forEach((dice, index) => {
        menu += `${index} - ${dice}\n`;
      });
    }
    menu += "X - exit";
    menu += "\n? - help";
    return menu;
  }
}

export default Menu;
