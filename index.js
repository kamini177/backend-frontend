const express = require('express')
const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')
const connectDB = require('./db')
const port = 8000
const cors = require('cors')

connectDB()
const app = express()
app.use(cors())

app.use(express.json())
app.use('/api/tasks', taskRoutes)
app.use('/api/users', userRoutes)


app.listen(port, () => {
  console.log(`Sovellus kuuntelee porttia ${port}`)
})