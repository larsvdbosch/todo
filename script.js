let todos = [];
let isDarkMode = false;

        window.onload = function() {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
        todos = JSON.parse(storedTodos);
        displayTodos();
        }

        
    }

        // hier maak ik een functie voor het toevoegen van de todo
        // het werkt alleen als er data in de input-field staat.
        // vervolgens herhaal ik steeds de functies van saveTodos en displayTodos voor het updaten van de localstorage en het renderen van de functie.
        
        function addTodo() {
            const input = document.getElementById('input-field');
            const newTodo = input.value.trim();
            
            if (newTodo) {
                todos.push({ text: newTodo, completed: false });
                input.value = '';
                saveTodos();
                displayTodos();
            }

            isDarkMode = localStorage.getItem('darkMode') === 'true';
            setMode(isDarkMode);
        }


        // ik heb triggerConfetti gebruikt om een simple confetti animatie af te spelen.
        // dit werkt alleen als de todo is afgevinkt als completed.

        function toggleTodo(index) {
            todos[index].completed = !todos[index].completed;
            saveTodos();
            displayTodos();
            if (todos[index].completed) {
                triggerConfetti();
            }
        }

        // met deze code kan ik een todo verwijderen door middel van een kruisje.

        function deleteTodo(index) {
            todos.splice(index, 1);
            saveTodos();
            displayTodos();
        }

        // hier gebruik ik een functie die steeds de todo list update. Deze functie brengt ook een stukje HTML mee voor elke toegevoegde todo.
        // dit is dus in principe een stukje HTML in mijn javascript.

        function displayTodos() {
            const todoList = document.getElementById('itemList');
            todoList.innerHTML = '';
            
            for (let i = 0; i < todos.length; i++) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <input type="checkbox" onchange="toggleTodo(${i})" ${todos[i].completed ? 'checked' : ''}>
                    <span class="${todos[i].completed ? 'completed' : ''}">${todos[i].text}</span>
                    <span class="delete-btn" onclick="deleteTodo(${i})">❌</span>
                `;
                // hier voeg ik de list-item mee toe. hier staat letterlijk: child item toevoegen. de UL is dus de ouder en de LI het kind (ezelsbruggetje)
                todoList.appendChild(li);
            }
        }

        // standaard code voor het vormgeven van de animatie

        function triggerConfetti() {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }

        // deze code gebruik ik om een JSON File te kunnen exporteren
        // ik had eerst een andere functie gemaakt die de JSON op de website plakte onder de todo's
        // het leek mij handiger om de json te kunnen exporteren van de pagina.
        // stringify heb ik gebruikt om javascript code om te zetten naar een JSON string.

        function downloadJSON() {
            const jsonString = JSON.stringify(todos, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'allTodos.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        function saveTodos() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function toggleMode() {
            isDarkMode = !isDarkMode;
            setMode(isDarkMode);
            localStorage.setItem('darkMode', isDarkMode);
        }

        function setMode(dark) {
            document.body.classList.toggle('dark-mode', dark);
            document.getElementById('mode-switch').textContent = dark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
        }

        // Event listener for mode switch button
        document.getElementById('mode-switch').addEventListener('click', toggleMode);