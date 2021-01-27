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
  res.send(req.file.filename)
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
      console.log(error)
      //   res.status(404).send('file not fount')
    }
  )
})
var port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('监听端口：' + port)
})
