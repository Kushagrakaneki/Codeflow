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
//it does not save empty data/empty space🛑🛑🛑
function saveData() {

  return new Promise((resolve, reject) => {

    let content = inputBox.value;

    if (content) {

      lastSavedData();
      localStorage.setItem('content', content)
      resolve(true);

    } else {

      outputBox.innerText = "Error: Enter something to save.❌";
      outputBox.style.color = 'red';
      reject(false);

    }
  })


}

//function for getting last saved data
let lastData = '';

function lastSavedData() {
  lastData = localStorage.getItem('content');

}
document.body.addEventListener('keydown', (e) => {
  if ((e.key == 'Z' || e.key == 'z') && e.ctrlKey) {
    inputBox.value = lastData;
    outputBox.innerHTML = 'Restored last saved data☁️';
    outputBox.style.color = 'purple';
    setTimeout(() => {
      outputBox.innerText = "";
    }, 3000);
  }
})
//creating promise for just waiting
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  })
}

let currentController = null;

function abortableDelay(ms, signal) {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(resolve, ms);

    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}


//async function that runs with when save button is clicked
async function saveDataToCloud() {

  if (currentController) {

    currentController.abort();
    currentController = null;

  }

  currentController = new AbortController();
  const { signal } = currentController;


  try {

    outputBox.innerText = "saving to cloud ☁️... ";
    outputBox.style.color = 'orange';

    // simulate delay and aborts previous request if user types in those 5 seconds and also helps in testing if abort works or not strictly when debounce delay< abortDelay delay(5000)
    await abortableDelay(5000, signal);

    //⭐⭐⭐we dont need this just for setting up signal so we can use abort because it already works perfectly fine with abortdelay because with abortdelay,  every request is waiting for 5 seconds and signal is listening for abort event and the moment user sends another request while first request is still waiting for 5 seconds to resolve then that request will be aborted
    // await fetch("https://jsonplaceholder.typicode.com/posts", {//just so that we can use abortcontroller becuase we need post request for signal
    //   method:'POST',
    //   headers:{'Content-Type':'application/json'},
    //   body:JSON.stringify({
    //     content:inputBox.value,
    //     savedAt:Date.now()
    //   }),
    //   signal,

    // }) 

    const result = await saveData();


    outputBox.innerText = "saved to cloud ☁️";
    outputBox.style.color = 'green';

    setTimeout(() => {
      outputBox.innerText = "";
    }, 3000);



  } catch (error) { //dont write Error because Error is built in object

    if (error.name === "AbortError") {
      outputBox.innerText = "⏸️ Save cancelled (typing...)";
      outputBox.style.color = "gray";
      console.log("Request cancelled/aborted🛑🛑🛑.");
    }

    console.log(error);
  }

}

//code for retry, 🛑haven't used it yet
async function retry(func, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await func();
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      console.log(error);
    }
  }

}
//⭐⭐⭐⭐so when we type someething and wait 500ms then saveToCloud will be called and inside it abortableDelay will be called and it will wait for 5 seconds before resolving the promise and then saveData will be called but at the same in those 5 seconds signal is listening for abort event and when user sends another request while first request is still waiting for 5 seconds to resolve then that request will be aborted and saveData will not be called for that request and instead outputBox will be set to "Saving cancelled by user." and then latest request will go through same way and saveData will be called and outputBox will be set to "saved to cloud ☁️" if no other request is sent in those 5 seconds

//code for saving using shift+S shortcut
document.addEventListener('keydown', function (event) {
  if (event.shiftKey && event.key === 'S') {
    event.preventDefault();
    saveDataToCloud();

  }
})
//⭐⭐⭐⭐⭐⭐⭐⭐⭐ when you type it will save 1 second after your last typing/input
function debounce(func, wait) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  }
}
let debouncedSave = debounce(saveDataToCloud, 500);
inputBox.addEventListener('input', debouncedSave);
//⭐⭐⭐⭐⭐⭐⭐⭐⭐

//code for loading data using load button
function loadData() {
  let content = localStorage.getItem('content');
  if (content) {
    inputBox.value = content;
    outputBox.innerHTML = 'Loaded from local storage';

  } else {
    outputBox.innerHTML = 'No data found';
    setTimeout(() => {
      outputBox.innerText = "";
    }, 3000);
  }
}

//code for clearing data
function clearData() {
  localStorage.removeItem('content');
  lastData = '';
  inputBox.value = '';
  outputBox.innerHTML = 'Data cleared from cloud☁️ and last saved data cleared';
  outputBox.style.color = 'red';
  setTimeout(() => {
    outputBox.innerText = "";
  }, 3000);
}

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

//code for replacing words
let replaceBox = document.querySelector('#replaceBox');
let replaceButton = document.querySelector('.replaceButton');
replaceButton.addEventListener('click', () => {
  if (findBox.value) {
    if (replaceBox.value) {
      if (inputBox.value) {
        inputBox.value = inputBox.value.replaceAll(findWord, replaceBox.value);
        console.log("replaced");
        console.log(findWord);
        debouncedSave();

      }
    } else {
      replaceBox.placeholder = 'Enter word to replace';
    }
  } else {
    findBox.value = '';
    replaceBox.value = '';
    replaceBox.placeholder = 'Enter word in find box to replace';
  }
})

//changing placeholder after no typing for 3 seconds
if (inputBox.value.length < 1) {
  setTimeout(() => {
    inputBox.focus();//puts cursor in input box and outlines the box
    inputBox.placeholder = 'Press [Shift + S] to save data to cloud\nPress [Shift + L] to load previously saved data from cloud not current data and to undo changes\nDelete button to clear data from cloud and last saved data';
  }, 3000);
}

//emojiBox


const emojiBox = document.querySelector('.emojiBox');
function makeHappy() {
  emojiBox.innerHTML = 'Typing...😌';
  emojiBox.classList.add('typing');
}
function makeSad() {
  emojiBox.innerHTML = 'Not typing...🥲';
  emojiBox.classList.remove('typing');
}
const debouncedMakeSad = debounce(makeSad, 500);

inputBox.addEventListener('input', () => {
  makeHappy();

  debouncedMakeSad();
})