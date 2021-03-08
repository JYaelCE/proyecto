const express = require('express')
const datos_base = express.Router()
const mysql = require ('mysql')
const bodyParser = require('body-parser')
datos_base.use(bodyParser.urlencoded({extended: false}))



datos_base.get("/checar_correo/:correo", (req, res) => {
    const conexion = conectar()
    conexion.query("select * from usuario u where u.correo = ?", [req.params.correo], (err, rows, fields) =>{
        if(err){
            console.log("hubo un error: " + err)
            conexion.end()
            res.redirect('/error');
        }
        if (rows && rows.length){
            conexion.end()
            res.redirect('../cv.html?correo=' + req.params.correo);
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
    const conexion = conectar()
    conexion.query("select * from usuario u where u.correo = ?", [req.body.correo], (err, rows, fields) =>{
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
                conexion.query("insert into usuario (nombre, puesto, descripcion, nacimiento, direccion, telefono, correo, website) values (?, ?, ?, ?, ?, ?, ?, ?)", [req.body.nombre,req.body.puesto,req.body.descripcion,req.body.nacimiento,req.body.direccion,req.body.telefono,req.body.correo,req.body.web])
                conexion.query("insert into experiencia (nombre_empresa, puesto_e, ano_inicio_e, ano_final_e, descripcion_e, correo) values (?, ?, ?, ?, ?, ?)", [req.body.empresa,req.body.puesto_empresa,req.body.ano_inicio_trabajo,req.body.ano_final_trabajo,req.body.descripcion_puesto,req.body.correo])
                conexion.query("insert into educacion (nombre_escuela, carrera, ano_inicio_c, ano_final_c, descripcion_c, correo) values (?, ?, ?, ?, ?, ?)", [req.body.escuela,req.body.carrera,req.body.ano_inicio_escuela,req.body.ano_final_escuela,req.body.descripcion_carrera ,req.body.correo]) 
                conexion.query("insert into software (software, nivel_s, correo) values (?, ?, ?)", [req.body.software, parseInt(req.body.nivel,10),req.body.correo])
                conexion.query("insert into skills (skill, nivel_h, correo) values (?, ?, ?)", [req.body.skills, parseInt(req.body.nivel_s,10) ,req.body.correo])
                conexion.query("insert into redes (link, tipo, correo) values (?, ?, ?)", [req.body.facebook, "facebook",req.body.correo])
                conexion.query("insert into redes (link, tipo, correo) values (?, ?, ?)", [req.body.twitter, "Twitter" ,req.body.correo])
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