//global variables
let outputBox = document.querySelector("#output");
let inputBox = document.querySelector('.textarea');

//code for loading data on page load
window.onload = loadData();
//code for changing theme
function changeColour() {
  if (document.body.style.backgroundColor === 'black') {
    document.body.style.backgroundColor = 'white';
  }
  else document.body.style.backgroundColor = 'black';
}
let totalLines = 0;
function countLines(event) {
  if (event.key === 'Enter') {
    totalLines++;

  }
}

function printLines() {
  outputBox.innerHTML = totalLines;
}

//code for saving data using save button
function saveData() {//it does not save empty data/empty space

  let content = inputBox.value;
  if (content) {
    localStorage.setItem('content', content);
    outputBox.innerHTML = 'Saved to local storage';
  } else {
    outputBox.innerHTML = 'Enter something to save';
  }

}
//code for loading data using load button
function loadData() {
  let content = localStorage.getItem('content');
  if (content) {
    inputBox.value = content;
    outputBox.innerHTML = 'Loaded from local storage';

  } else {
    outputBox.innerHTML = 'No data found';
  }
}
//code for clearing data
function clearData() {
  localStorage.removeItem('content');
  outputBox.innerHTML = 'Cleared from local storage';
}
//code for saving using shift+S shortcut
document.addEventListener('keydown', function (event) {
  if (event.shiftKey && event.key === 'S') {
    event.preventDefault();
    saveData();
    outputBox.value = 'Saved to local storage using shortcut';
  }
})

function countWords() {
  let text = inputBox.value.trim();


  if (text.length === 0) {
    outputBox.innerHTML = '0';
  } else {

    let wordList = text.split(/\s+/);
    let countLinesList = text.split(/\n/);
    outputBox.innerHTML = `<p>Total Words: ${wordList.length}</p>
    <p>Total Lines: ${countLinesList.length}</p>`;
  }

};
//code for finding words using find button
let findWord;
let findBox = document.querySelector('#findBox');
let findButton = document.querySelector('.findButton');
findButton.addEventListener('click', function (event) {
  if (findBox.value) {
    if (findBox.value.trim().split(/\s+/).length > 1) {
      findBox.value = '';
      findBox.placeholder = 'Enter only one word to find';
    } else {

      if (inputBox.value) {
        let occurences = 0;
        let text = inputBox.value.trim();
        let wordList = text.split(/\s+/);
        findWord = findBox.value.trim();
        for (let i = 0; i < wordList.length; i++) {
          if (wordList[i] === findWord || wordList[i] === `${findWord}.`) {
            occurences++;

          }
        }
        outputBox.innerHTML = `Total Occurences: ${occurences}`;
      } else {
        findBox.placeholder = 'Enter some code';
      }
    }
  }
  else {
    findBox.placeholder = 'Enter word to find';
  }




});

let replaceBox = document.querySelector('#replaceBox');
let replaceButton = document.querySelector('.replaceButton');
replaceButton.addEventListener('click', (event) => {
  if (findBox.value) {
    if (replaceBox.value) {
      if (inputBox.value) {
        inputBox.value = inputBox.value.replaceAll(findWord, replaceBox.value);
        console.log("replaced");
        console.log(findWord);
      }
    } else {
      replaceBox.placeholder = 'Enter word to replace';
    }
  }else{
    findBox.value = '';
    replaceBox.value = '';
    replaceBox.placeholder = 'Enter word in find box to replace';
  }
})

