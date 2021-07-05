const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')

const authRouter = require('./routes/auth.routes')
const customerRouter = require('./routes/customer.routes')
const lockRouter = require('./routes/lock.routes')
const typeCanvasRouter = require('./routes/type-canvas.routes')
const padColorRouter = require('./routes/pad-color.routes')

const app = express()

const PORT = config.get('port') || 4000

app.use(cors())
app.use(express.json())

app.use('/api', authRouter)
app.use('/api/customer', customerRouter)
app.use('/api/typecanvas', typeCanvasRouter)
app.use('/api/lock', lockRouter)
app.use('/api/padcolor', padColorRouter)

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log('Error in start server', e)
    }
}

start()