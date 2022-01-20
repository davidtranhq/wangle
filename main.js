// Returns an array of references to each of the table rows 0-5
function generateBoard() {
  const table = document.getElementById('board');
  // references to table rows
  const rows = [];
  for (let i = 0; i < 6; ++i) {
    // insert row at the end of the table
    const row = table.insertRow(-1);
    rows.push(row);
    for (let j = 0; j < 6; ++j) {
      const cell = row.insertCell();
      const text = document.createTextNode("");
      cell.appendChild(text);
    }
  }
  return rows;
}

document.addEventListener('DOMContentLoaded', function () {
  const wordList = Array.from(words.values());
  const date = new Date();
  const seed = new Math.seedrandom(`${date.getDay()}${date.getFullYear()}${date.getMonth()}`)
  const dailyWord = wordList[(Math.random() * wordList.length) % wordList.length];
  const game = new Game(dailyWord);
});



/*
listen for key press =>
  letter => fill guess
  enter => submit guess (if full)




*/