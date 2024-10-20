const addToDoButton = document.getElementById('add-todo');
const toDoContainer = document.getElementById('todos-container');
const inputField = document.getElementById('input-field');
const list = document.getElementById('itemList')
// let confetti = new Confetti('content-container');
let confetti = new Confetti('checkbox');


// Edit given parameters
confetti.setCount(75);
confetti.setSize(1);
confetti.setPower(25);
confetti.setFade(false);
confetti.destroyTarget(true);

// query selector all inputs
// foreach loopen
// aan al die checkboxes een eventlisten hangen en dan je checken of die checked.
// dan kan je confetti afvuren 


// de JSON laden en alle todo's renderen
// laten zien in de html

// hou je de todos bij in de HTML of hou je het bij in een array met todo.
// remove from html
// array remove of array push

// zet in een array en render de array met todos
// functie nodig die heet render die krijgt een array met todo's en die poept ze uit in de html

// add, remove functie aanroept
// opnieuw render

// let todos = ["asdasdasd", "asdasdsa", "asdasd"];


/* addToDoButton.addEventListener('click', function() {
  
    const newItem = inputField.value;

    if (newItem.trim() !== '') {

        const li = document.createElement('li');

        li.textContent = newItem;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        li.prepend(checkbox);

        itemList.appendChild(li);

        itemList.style.display = 'block';

        // Hier leeg ik het tekstveld na invullen van todo en gebruik ik localstorage
	    inputField.value = "";
	    saveData();

    }
    }); */

    function addTask(){
        if(inputField.value === ''){
            alert("Noem een taak!");
        }else{
            let li = document.createElement("li");
            li.innerHTML = inputField.value;
            list.appendChild(li);
            inputField.value = '';
            let span = document.createElement("span");
            span.innerHTML = "x";
            li.appendChild(span);
        }
        saveData();
    }
    list.addEventListener("click", (e)=>{
        if(e.target.tagName === "LI"){
            e.target.classList.toggle("checked");
            saveData();
        }else if(e.target.tagName === "SPAN"){
            e.target.parentElement.remove();
            saveData();
        }
    });

    addToDoButton.addEventListener("click", addTask);

    console.log("Hello world!");

function saveData(){
    localStorage.setItem("data", list.innerHTML);
}
function showTask(){
    const savedData = localStorage.getItem("data");
    if(savedData){
        list.innerHTML = savedData;
    }
}
window.addEventListener("load", showTask);
   


