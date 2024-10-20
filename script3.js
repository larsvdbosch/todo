// Get DOM elements
const addToDoButton = document.getElementById('add-todo');
const toDoContainer = document.getElementById('todos-container');
const inputField = document.getElementById('input-field');
const list = document.getElementById('itemList');

// Confetti function
function triggerConfetti() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }
  
  // Get the button element
  const confettiButton = document.getElementById('add-todo');
  
  // Add click event listener to the button
  confettiButton.addEventListener('click', triggerConfetti);






// Function to add a new task
function addTask() {
    if (inputField.value.trim() === '') {
        alert("Please enter a task!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${inputField.value}</span>
            <div class="task-actions">
                <input type="checkbox" class="task-checkbox">
                <span class="delete-btn">×</span>
            </div>
        `;
        list.appendChild(li);
        inputField.value = '';
        saveData();
    }
}

// Event listener for the list
list.addEventListener("click", (e) => {
    const target = e.target;
    const listItem = target.closest('li');

    if (!listItem) return;

    if (target.classList.contains('task-checkbox')) {
        listItem.classList.toggle("checked");
        if (listItem.classList.contains("checked")) {
            triggerConfetti();
        }
        saveData();

        console.log('Hello')

    } else if (target.classList.contains('delete-btn')) {
        listItem.remove();
        saveData();
    }
});

// Event listener for the add button
addToDoButton.addEventListener("click", addTask);

// Function to save data to localStorage
function saveData() {
    localStorage.setItem("data", list.innerHTML);
}

// Function to load and display saved tasks
function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        list.innerHTML = savedData;
    }
}

// Load saved tasks when the page loads
window.addEventListener("load", showTask);