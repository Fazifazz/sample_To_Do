// // server.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const pool = require('./db')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

// Get all todos
app.get('/api/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos')
  res.json(result.rows)
})
app.get('/api/todos/:id', async (req, res) => {
  const { id } = req.params
  const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id])
  res.json(result.rows)
})

// Add a new todo
app.post('/api/todos', async (req, res) => {
  const { task } = req.body
  const result = await pool.query(
    'INSERT INTO todos (task) VALUES ($1) RETURNING *',
    [task]
  )
  res.json(result.rows[0])
})

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
    const todo = result.rows[0];

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const updatedCompleted = !todo.completed;

    await pool.query('UPDATE todos SET completed = $1 WHERE id = $2', [
      updatedCompleted,
      id,
    ]);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'An error occurred while updating the todo' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM todos WHERE id = $1', [id])
  res.sendStatus(200)
})

app.listen(4000, () => console.log('Server running on http://localhost:4000'))







// server.js for mysql
// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const pool = require('./db') // MySQL pool

// const app = express()
// app.use(cors())
// app.use(express.json())
// app.use(express.static('public'))

// // Helper function to handle async database calls
// const queryAsync = (sql, params = []) => {
//   return pool.execute(sql, params)
// }

// // Get all todos
// app.get('/api/todos', async (req, res) => {
//   try {
//     const result = await queryAsync('SELECT * FROM todos')
//     res.json(result[0]) // MySQL returns an array of rows directly
//   } catch (error) {
//     console.error('Error fetching todos:', error)
//     res.status(500).json({ error: 'An error occurred while fetching todos' })
//   }
// })

// // Get a specific todo
// app.get('/api/todos/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     const result = await queryAsync('SELECT * FROM todos WHERE id = ?', [id])
//     res.json(result[0]) // Send the first row if it exists
//   } catch (error) {
//     console.error('Error fetching todo:', error)
//     res.status(500).json({ error: 'An error occurred while fetching the todo' })
//   }
// })

// // Add a new todo
// app.post('/api/todos', async (req, res) => {
//   const { task } = req.body
//   try {
//     const result = await queryAsync('INSERT INTO todos (task) VALUES (?)', [
//       task,
//     ])
//     res.json(result)
//   } catch (error) {
//     console.error('Error adding todo:', error)
//     res.status(500).json({ error: 'An error occurred while adding the todo' })
//   }
// })

// // Update a todo's `completed` status
// app.put('/api/todos/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const [todo] = await queryAsync('SELECT * FROM todos WHERE id = ?', [id])
//     console.log('todo', todo)

//     if (!todo[0]) {
//       return res.status(404).json({ error: 'Todo not found' })
//     }

//     const updatedCompleted = !todo[0].completed

//     await queryAsync('UPDATE todos SET completed = ? WHERE id = ?', [
//       updatedCompleted,
//       id,
//     ])
//     res.sendStatus(200)
//   } catch (error) {
//     console.error('Error updating todo:', error)
//     res.status(500).json({ error: 'An error occurred while updating the todo' })
//   }
// })

// // Delete a todo
// app.delete('/api/todos/:id', async (req, res) => {
//   const { id } = req.params
//   try {
//     await queryAsync('DELETE FROM todos WHERE id = ?', [id])
//     res.sendStatus(200)
//   } catch (error) {
//     console.error('Error deleting todo:', error)
//     res.status(500).json({ error: 'An error occurred while deleting the todo' })
//   }
// })

// app.listen(4000, () => console.log('Server running on http://localhost:4000'))
