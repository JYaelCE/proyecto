const express = require('express')
const datos_base = express.Router()
const mysql = require ('mysql')
const bodyParser = require('body-parser')
datos_base.use(bodyParser.urlencoded({extended: false}))



datos_base.get("/checar_correo/:correo", (req, res) => {
    var correo = req.params.correo
    console.log(correo)
    const conexion = conectar()
    const solicitud_usuario = "select * from usuario u where u.correo = ?"
    conexion.query(solicitud_usuario, [correo], (err, rows, fields) =>{
        if(err){
            console.log("hubo un error: " + err)
            conexion.end()
            res.redirect('/error');
        }
        if (rows && rows.length){
            conexion.end()
            res.redirect('../cv.html?correo=' + correo);
        }
        else{
            conexion.end()
            res.redirect('/error');
        }
    })    
})

datos_base.post("/registrar", (req, res) => {
    guardar_datos(req,res)
})

function guardar_datos(req, res){
    //tabla usuario
    const solicitud_usuario = "insert into usuario (nombre, puesto, descripcion, nacimiento, direccion, telefono, correo, website) values (?, ?, ?, ?, ?, ?, ?, ?)"
    var nombre = req.body.nombre
    var nacimiento = req.body.nacimiento
    var correo = req.body.correo
    var telefono = req.body.telefono
    var web = req.body.web
    var puesto = req.body.puesto
    var direccion = req.body.direccion
    var descripcion = req.body.descripcion
    //tabla experiencia
    const solicitud_experiencia = "insert into experiencia (nombre_empresa, puesto_e, ano_inicio_e, ano_final_e, descripcion_e, correo) values (?, ?, ?, ?, ?, ?)"
    var nombre_empresa = req.body.empresa
    var puesto_empresa = req.body.puesto_empresa
    var ano_inicio_empresa = req.body.ano_inicio_trabajo
    var ano_final_empresa = req.body.ano_final_trabajo
    var descripcion_empresa = req.body.descripcion_puesto
    //tabla escuela
    const solicitud_educacion = "insert into educacion (nombre_escuela, carrera, ano_inicio_c, ano_final_c, descripcion_c, correo) values (?, ?, ?, ?, ?, ?)"
    var nombre_escuela = req.body.escuela
    var carrera_escuela = req.body.carrera
    var ano_inicio_escuela = req.body.ano_inicio_escuela
    var ano_final_escuela = req.body.ano_final_escuela
    var descripcion_carrera = req.body.descripcion_carrera
    //tabla software
    const solicitud_software = "insert into software (software, nivel_s, correo) values (?, ?, ?)"
    var software = req.body.software
    var nivel = parseInt(req.body.nivel,10)
    //tabla skills
    const solicitud_skills = "insert into skills (skill, nivel_h, correo) values (?, ?, ?)"
    var skill = req.body.skills
    var nivel_s = parseInt(req.body.nivel_s,10)
    //tabla redes
    const solicitud_redes = "insert into redes (link, tipo, correo) values (?, ?, ?)"
    var facebook = req.body.facebook
    var twitter = req.body.twitter
    var tipo = "facebook"
    var tipo2 = "Twitter"
    //conexion mysql
    const conexion = conectar()
    const checar_correo = "select * from usuario u where u.correo = ?"
    conexion.query(checar_correo, [correo], (err, rows, fields) =>{
        if(err){
            console.log("hubo un error: " + err)
            conexion.end()
            res.redirect('/error');
        }
        if (rows && rows.length){
            console.log("ya existe krnal")
            conexion.end()
            res.redirect('/error')
        }
        else{
            try{
                conexion.query(solicitud_usuario, [nombre,puesto,descripcion,nacimiento,direccion,telefono,correo,web])
                conexion.query(solicitud_experiencia, [nombre_empresa,puesto_empresa,ano_inicio_empresa,ano_final_empresa,descripcion_empresa,correo]) 
                conexion.query(solicitud_educacion, [nombre_escuela,carrera_escuela,ano_inicio_escuela,ano_final_escuela,descripcion_carrera,correo]) 
                conexion.query(solicitud_software, [software, nivel,correo]) 
                conexion.query(solicitud_skills, [skill, nivel_s,correo]) 
                conexion.query(solicitud_redes, [facebook, tipo,correo])
                conexion.query(solicitud_redes, [twitter, tipo2,correo])
                console.log("Los datos se guardaron exitosamente")
                conexion.end()
                res.redirect('../ok.html')
            }
            catch (err){
                console.log("hubo un error: " + err)
                conexion.end()
                res.redirect('/error');
            }
        }
    })
}

function conectar(){
    return mysql.createConnection({
        host: 'us-cdbr-east-03.cleardb.com',
        port: 3306,
        user: 'b397fa81c3e63e',
        password: '55fa30c9',
        database: 'heroku_db6d03f4c17b138'
    })
}

module.exports = datos_base