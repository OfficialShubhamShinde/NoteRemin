showNotes();
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {

    let addtext = document.getElementById('addText')
    let addtitle = document.getElementById('addtitle')
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let myobj = {
        title : addtitle.value,
        text :addtext.value
    }
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addtext.value = "";
    addtitle.value = "";
    // console.log(notesObj)
    showNotes();
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card " style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title} </h5>
          <p class="card-text">${element.text}</p>
          <button id = "${index}"onclick ="deleteNote(this.id)"  class="btn btn-primary">Delet Note</button>
        </div>
      </div>`;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "add a note" section aboveto add note `
    }
}

function deleteNote(index) {
    // console.log('I am deleting', index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes",JSON.stringify(notesObj))
    showNotes();
}

let search = document.getElementById('searchTxt');
search.addEventListener("input", function() {
    let inputVal = search.value.toLowerCase();
    console.log('Input event fired!', inputVal);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if(cardText.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })

})
