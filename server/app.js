const {PORT} = require ('dotenv').config().parsed

const express = require ('express')


const router = require('./routes/index')

//const fileUpload = require ('express-fileupload')



const app = express()

app.use('/api', router) // дле роутера


app.use (express.json ()) //миделвейер(встроенный в express) для коректного парсинга (в json формате) req.body в auth.routes
//

//
// app.use (express.static(path.resolve(__dirname, 'static'))) //указываем папку для express откуда их можно забирать
//
//
// app.use (fileUpload({})) //для загрузки файлов на сервер














const start = async () => {
    try {
        app.listen(PORT, () => console.log(`📢 Сервер запущен на порту ${PORT}`))
    } catch (error) {
        console.log('📢 [index.js:15]', error);
    }
}

start()




