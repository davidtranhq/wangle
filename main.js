// Returns an array of references to each of the table rows 0-5
function generateBoard() {
  const table = document.getElementById('board');
  // references to table rows
  const rows = [];
  for (let i = 0; i < 7; ++i) {
    // insert row at the end of the table
    const row = table.insertRow(-1);
    rows.push(row);
    for (let j = 0; j < 6; ++j) {
      const cell = row.insertCell();
      const text = document.createTextNode("");
      cell.classList.add("cell")
      cell.appendChild(text);
    }
  }
  return rows;
}

// insertLetter: callback function called when a letter is pressed
function generateKeyboard(insertLetter) {
  const table = document.getElementById("keyboard");
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z", "backspace", "enter"];
  var counter = 1;
  var row = table.insertRow(-1);
  alphabet.forEach(letter => {
    var cell = row.insertCell();
    cell.classList.add(letter);
    if (letter == "backspace") {cell.innerHTML = "⌫";}
    else if (letter == "enter") {cell.innerHTML = "↵";}
    else {cell.innerHTML = letter;}
    cell.addEventListener('click', () => insertLetter(letter));
    if (counter % 7 == 0) { row = table.insertRow(-1); }
    counter += 1;
  });
  return 0;
}

document.addEventListener('DOMContentLoaded', function () {
  const wordList = Array.from(words.values());
  const date = new Date();
  Math.seedrandom(`${date.getDay()}${date.getFullYear()}${date.getMonth()}`);
  const randIdx = (Math.random() * wordList.length) % wordList.length;
  const dailyWord = wordList[Math.floor(randIdx)];
  const game = new Game(dailyWord);
  generateKeyboard(game.insertLetter.bind(game));
});



/*
listen for key press =>
  letter => fill guess
  enter => submit guess (if full)




*/