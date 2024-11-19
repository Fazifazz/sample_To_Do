// // app.js for pg
document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input')
  const todoForm = document.getElementById('todo-form')
  const todoList = document.getElementById('todo-list')

  async function fetchTodos() {
    const response = await fetch('/api/todos')
    const todos = await response.json()
    renderTodos(todos)
  }

  function renderTodos(todos) {
    todoList.innerHTML = ''
    todos.forEach((todo) => {
      const li = document.createElement('li')
      li.innerHTML = `
        <span ${
          todo.completed ? 'style="text-decoration: line-through"' : ''
        }>${todo.task}</span>
        <input type="checkbox" ${
          todo.completed ? 'checked' : ''
        } onclick="toggleComplete(${todo.id})">
        <button class="delete-btn" onclick="deleteTodo(${
          todo.id
        })">Delete</button>
      `
      todoList.appendChild(li)
    })
  }

  todoForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const task = taskInput.value.trim()
    if (!task) return

    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task }),
    })

    const newTodo = await response.json()

    renderTodos([...(await fetchTodos()), newTodo])

    taskInput.value = ''
  })

  window.deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    renderTodos([...(await fetchTodos())])
  }

  window.toggleComplete = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
    fetchTodos()
  }

  fetchTodos()
})


// for mysql
// document.addEventListener('DOMContentLoaded', () => {
//   const taskInput = document.getElementById('task-input')
//   const todoForm = document.getElementById('todo-form')
//   const todoList = document.getElementById('todo-list')

//   async function fetchTodos() {
//     try {
//       const response = await fetch('/api/todos')
//       if (!response.ok) throw new Error('Failed to fetch todos')
//       const todos = await response.json()
//       renderTodos(todos)
//     } catch (error) {
//       console.error('Error fetching todos:', error)
//       alert('Failed to fetch todos. Please try again.')
//     }
//   }



//   function renderTodos(todos) {
//     todoList.innerHTML = ''
//     todos.forEach((todo) => {
//       const li = document.createElement('li')
//       li.innerHTML = `
//         <span ${
//           todo.completed ? 'style="text-decoration: line-through"' : ''
//         }>${todo.task}</span>
//         <input type="checkbox" ${
//           todo.completed ? 'checked' : ''
//         } onclick="toggleComplete(${todo.id})">
//         <button class="delete-btn" onclick="deleteTodo(${
//           todo.id
//         })">Delete</button>
//       `
//       todoList.appendChild(li)
//     })
//   }



//   todoForm.addEventListener('submit', async (e) => {
//     e.preventDefault()
//     const task = taskInput.value.trim()
//     if (!task) return

//     const response = await fetch('/api/todos', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ task }),
//     })
//     if (!response) throw new Error('Failed to add todo')

//     const newTodo = await response.json()
//     renderTodos([...(await fetchTodos()), newTodo])

//     taskInput.value = ''
//   })



//   window.deleteTodo = async (id) => {
//     const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
//     if (!response.ok) throw new Error('Failed to delete todo')
//     fetchTodos()
//   }


//   window.toggleComplete = async (id) => {
//     const response = await fetch(`/api/todos/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//     })
//     if (!response.ok) throw new Error('Failed to toggle todo')
//     fetchTodos()
//   }

//   fetchTodos()
// })
