const express = require('express')
const multer = require('multer')
var cors = require('cors')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.options('/upload', cors())
app.get('/', (req, res) => {
  res.send('hello nodejs')
})
app.post('/upload', cors(), upload.single('file'), (req, res) => {
  let object = { id: req.file.filename }
  // 安全写法
  // 序列化
  res.send(JSON.stringify(object))
})
app.get('/preview/:key', cors(), (req, res) => {
  // 遍历获取文件
  res.sendFile(
    `uploads/${req.params.key}`,
    {
      root: __dirname,
      headers: {
        'Content-Type': 'images/jpeg',
      },
    },
    (error) => {
      if (error) {
        console.log(error)
        res.status(404).send('file not found')
      } else {
        console.log('success, file:' + req.params.key)
      }
    }
  )
})
var port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('监听端口：' + port)
})
