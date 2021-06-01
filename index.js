const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth.routes')

const app = express()

const PORT = config.get('port') || 4000

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log('Error in start server', e)
    }
}

start()