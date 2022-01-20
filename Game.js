function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

class Game {
  constructor(dailyWord) {
    // reference to each <tr> in the board
    this.rows = generateBoard();
    this.numGuess = 0;
    this.guess = ''; // current guess 
    this.truth = dailyWord;

    document.addEventListener('keydown', (event) => {
      // listen for keyboard input and fill guess
      const key = event.key.toLowerCase();
      if (/^[A-Za-z]{1}$/.test(key)) {
        // letter was pressed
        if (this.guess.length < 6) {
          // append character to guess
          this.guess += key;
          this.fillTable();
        }
      } else if (event.key === 'Enter') {
        if (words.has(this.guess)) {
            this.submitGuess();
        } else {
          alert("not a word!");
        }
      } else if (event.key === 'Backspace') {
        // remove last character
        this.guess = this.guess.slice(0, -1);
        this.fillTable();
      }
    });
  }
  
  // Fill the current row with the letters of the current guess
  fillTable() {
    for (let index = 0; index < this.guess.length; index++) {
      this.rows[this.numGuess].cells[index].innerHTML = this.guess.charAt(index);
    }
    for (let index = this.guess.length; index < this.rows[0].cells.length; index++) {
      this.rows[this.numGuess].cells[index].innerHTML = " ";
    }
  }

  // Evaluate the guess
  submitGuess() {
    const result = this.evaluateGuess();
    this.changeCell(result);
    this.numGuess += 1;
    if (result.every(x => x == 2)) {
      alert("you r a WALTER! :DDD");
      this.numGuess += 100;
    } else if (this.numGuess > 5) {
      alert(`you r a bingus :(\nthe word was ${this.truth}`);
    }
    this.guess = "";
  }

  // Compares the guess with the answer, returns an array A where A[i] =
  // 0 if wrong letter wrong spot,
  // 1 if right letter wrong spot,
  // 2 if right letter right spot
  evaluateGuess() {
    let res = new Array(6);
    // count occurences of each char
    let truth = `${this.truth}`;
    // scan for greens
    for (let i = 0; i < this.guess.length; ++i) {
      const c = this.guess[i];
      if (c === truth[i]) {
        res[i] = 2;
        truth = setCharAt(truth, i, '-');
      }
    }
    // scan for yellow/gray
    for (let i = 0; i < this.guess.length; ++i) {
      if (res[i] == 2) {
        continue;
      }
      const c = this.guess[i];
      if (truth.includes(c)) {
        truth = setCharAt(truth, truth.indexOf(c), '-');
        res[i] = 1;
      } else {
        res[i] = 0;
      }
    }
    return res;
  }

  // takes cell index and truth value, changes to yellow or green
  changeCell(values) {
    for (let index = 0; index < values.length; index++) {
      if (values[index] === 2) {
        this.rows[this.numGuess].cells[index].classList.add("rightPosition");
      }
      else if (values[index] === 1) {
        this.rows[this.numGuess].cells[index].classList.add("rightLetter");
      }
    }
  }

  
};