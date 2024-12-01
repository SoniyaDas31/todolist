document.addEventListener('DOMContentLoaded', () => {
    const loginPage = document.getElementById('loginPage');
    const mainPage = document.getElementById('mainPage');
    const loginForm = document.getElementById('loginForm');
    const todoMenu = document.getElementById('todoMenu');
    const logout = document.getElementById('logout');
    const contentArea = document.getElementById('contentArea');
  
    let completedTodos = 0;
  
    // Login Functionality
    const loginValidation = (callback) => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      if (username === 'admin' && password === '12345') {
        callback();
      } else {
        alert('Invalid Username or Password!');
      }
    };
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginValidation(() => {
        loginPage.classList.add('d-none');
        mainPage.classList.remove('d-none');
      });
    });
  
    // LogOut Functionality
    logout.addEventListener('click', () => {
      mainPage.classList.add('d-none');
      loginPage.classList.remove('d-none');
      loginForm.reset();
    });
  
    // Fetch Todos and Display
    const fetchTodos = () => {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((todos) => {
          contentArea.innerHTML = `
            <h2>To-Do List</h2>
            <ul class="list-group" id="todoList"></ul>
          `;
          const todoList = document.getElementById('todoList');
          todos.forEach((todo) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
              <span>${todo.title}</span>
              <input type="checkbox" ${todo.completed ? 'checked disabled' : ''} class="todoCheckbox">
            `;
            todoList.appendChild(listItem);
          });
  
          const checkboxes = document.querySelectorAll('.todoCheckbox');
          checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', () => {
              if (checkbox.checked) {
                completedTodos++;
              } else {
                completedTodos--;
              }
              validateCompletion();
            });
          });
        });
    };
  
    // Validate 5 Completed Todos
    const validateCompletion = () => {
      return new Promise((resolve, reject) => {
        if (completedTodos === 5) {
          resolve();
        }
      }).then(() => {
        alert('Congrats. 5 Tasks have been Successfully Completed');
      });
    };
  
    // Navigate to Todo List
    todoMenu.addEventListener('click', (e) => {
      e.preventDefault();
      fetchTodos();
    });
  });
  