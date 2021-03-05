const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser') 
const datos_base = require('./routes/datos_base.js')
const obtener_datos = require('./routes/obtener_datos.js')

app.use(datos_base)
app.use(obtener_datos)
app.use('/', express.static('./paginas'))
app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.redirect('registro.html');
})

app.post("/cv", (req, res) => {
    res.redirect('/checar_correo/' + req.body.correo_visualizar);
})

app.get("/error", (req, res) => {
    res.redirect('mensajes.html');
})

const PORT = process.env.PORT || 5329
app.listen(PORT, () => {
    console.log("esta corriendo")
})

