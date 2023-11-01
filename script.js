const board = document.querySelector(".guitarneck");
const frets = document.querySelector(".fret");
const fretnote = document.querySelectorAll("#note");

const initwidth = 70;
const fretCount = 21;
const octavesCount = 4;
// keyboard
const keyboards = document.querySelector(".keyboard");
const octaves = document.querySelector(".octave");
const pnote = document.querySelectorAll(".pnote");

const rolletter = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
];

// let elm1 = document.querySelector(".elm1");
// let elm2 = document.querySelector(".elm2");

// const referenceNotes = {
//   color1: "red",
// };

// elm1.style.backgroundColor = referenceNotes.color1;
// elm2.style.backgroundColor = referenceNotes.color1;

fretnote.forEach((notes, i) => {
  notes.addEventListener("click", () => {
    //   if (notes.style.backgroundColor == "chocolate") {
    //     notes.style.backgroundColor = "burlywood";
    //   } else {
    //     notes.style.backgroundColor = "chocolate";
    //   }
    changeGuitar(notes.className);
    changePiano(notes.className);
  });
  //   notes.textContent = notes.id;
});

pnote.forEach((notes, i) => {
  notes.addEventListener("click", () => {
    if (
      notes.style.backgroundColor == "dodgerblue" &&
      notes.classList.contains("white")
    ) {
      notes.style.backgroundColor = "white";
    } else if (notes.style.backgroundColor == "dodgerblue") {
      notes.style.backgroundColor = "black";
    } else {
      notes.style.backgroundColor = "dodgerblue";
    }
    changeGuitar(notes.id);
  });
  //   notes.textContent = notes.id;
});

function fill() {
  let newfrets;
  let afterfret;
  for (let i = 0; i < fretCount - 1; i++) {
    newfrets = newfrets ? afterfret : frets.cloneNode(true);
    if (newfrets.style.width != "") {
      let newValue = parseInt(afterfret.style.width) / Math.pow(2, 1 / 12);
      newfrets.style.width = newValue + "px";
    } else {
      newfrets.style.width = initwidth / Math.pow(2, 1 / 12) + "px";
    }
    // newfrets.style.width =
    //   newfrets.style.width != ""
    //     ? parseInt(afterfret.style.width) + 10 + "px"
    //     : initwidth + 10 + "px";
    for (let notes of newfrets.children) {
      // incresing note
      let noteId = notes.className.split("-");
      let scaleIndex = rolletter.indexOf(noteId[0]);

      noteId[0] = rolletter[wrap(scaleIndex + 1)];
      if (!wrap(scaleIndex + 1, true)) {
        noteId[1] = parseInt(noteId[1]) + 1;
      }
      notes.className = noteId.join("-");

      // eventlisteners
      notes.addEventListener("click", () => {
        // if (notes.style.backgroundColor == "chocolate") {
        //   notes.style.backgroundColor = "burlywood";
        // } else {
        //   notes.style.backgroundColor = "chocolate";
        // }
        changeGuitar(notes.className);
        changePiano(notes.className);
      });

      //   notes.textContent = notes.id;
    }

    board.appendChild(newfrets);
    afterfret = newfrets.cloneNode(true);
  }
}

function fillPiano() {
  let newOct;
  let afterOct;
  for (let i = 0; i < octavesCount - 1; i++) {
    newOct = newOct ? afterOct : octaves.cloneNode(true);
    for (let notes of newOct.children) {
      let noteId = notes.id.split("-");
      noteId[1] = parseInt(noteId[1]) + 1;
      notes.id = noteId.join("-");
      notes.addEventListener("click", () => {
        if (
          notes.style.backgroundColor == "dodgerblue" &&
          notes.classList.contains("white")
        ) {
          notes.style.backgroundColor = "white";
        } else if (notes.style.backgroundColor == "dodgerblue") {
          notes.style.backgroundColor = "black";
        } else {
          notes.style.backgroundColor = "dodgerblue";
        }
        changeGuitar(notes.id);
      });
    }
    keyboards.appendChild(newOct);
    afterOct = newOct.cloneNode(true);
  }
}

function wrap(value, check = false, limit = 12) {
  if (value > limit - 1 && check) return 0;
  return value % limit;
}

fill();
fillPiano();

function changeGuitar(classname) {
  let guitarNote = document.querySelectorAll("." + classname);
  //   console.log(classname, guitarNote);
  guitarNote.forEach((gnote, id) => {
    if (gnote.style.backgroundColor == "chocolate") {
      gnote.style.backgroundColor = "burlywood";
    } else {
      gnote.style.backgroundColor = "chocolate";
    }
  });
}

function changePiano(id) {
  let pianote = document.querySelector("#" + id);
  //   console.log(classname, guitarNote);
  if (
    pianote.style.backgroundColor == "dodgerblue" &&
    pianote.classList.contains("white")
  ) {
    pianote.style.backgroundColor = "white";
  } else if (pianote.style.backgroundColor == "dodgerblue") {
    pianote.style.backgroundColor = "black";
  } else {
    pianote.style.backgroundColor = "dodgerblue";
  }
}

// ruler
const fretnum = document.querySelector(".fretnum");
const ruler = document.querySelector(".ruler");

function rule() {
  let newfrets;
  let afterfret;
  for (let p = 0; p < fretCount - 1; p++) {
    newfrets = newfrets ? afterfret : fretnum.cloneNode(true);
    if (newfrets.style.width != "") {
      let newValue = parseInt(afterfret.style.width) / Math.pow(2, 1 / 12);
      let newFont = parseFloat(afterfret.style.fontSize) / 1.03;
      newfrets.style.width = newValue + "px";
      newfrets.style.fontSize = newFont + "px";
    } else {
      newfrets.style.width = initwidth / Math.pow(2, 1 / 12) + "px";
      newfrets.style.fontSize = 20 / 1.03 + "px";
    }

    newfrets.textContent = parseInt(newfrets.textContent) + 1;

    ruler.appendChild(newfrets);
    afterfret = newfrets.cloneNode(true);
  }
}

rule();
