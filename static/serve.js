const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

// 跨域处理
app.use(cors());
app.use(express.static('public'));

// 路由匹配
app.get('/', function(req, res) { console.log('A user connection') })

// 错误处理
app.use((req, res, next) => { res.status(404).send('404') })

app.listen(port, '0.0.0.0', () => {
    console.log('this is to provide e-book resource..')
    console.log('NodeJS Service On http://localhost:' + port)
})