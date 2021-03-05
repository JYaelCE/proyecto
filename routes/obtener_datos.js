const express = require('express')
const obtener_datos = express.Router()
const mysql = require ('mysql')

obtener_datos.get("/obtener_datos_usuario/:correo", (req, res) => {
    const conexion = conectar()
    const dato = req.params.correo
    console.log(dato)
    const solicitud_usuario = "select * from usuario u where u.correo = ?"
    conexion.query(solicitud_usuario, [dato], (err, rows, fields) =>{
        if(err){
            console.log("hubo un error: " + err)
            res.redirect('/error')
            return
        }
        res.json(rows)
        conexion.end()
    })    
})

obtener_datos.get("/obtener_datos_experiencia/:correo", (req, res) => {
    const conexion = conectar()
    const dato = req.params.correo
    const solicitud_experiencia = "select nombre_empresa, puesto_e, ano_inicio_e, ano_final_e, descripcion_e from experiencia e where e.correo = ?"
    conexion.query(solicitud_experiencia, [dato], (err, rows, fields) => {
        if (err) {
            console.log("hubo un error: " + err)
            res.redirect('/error')
            return
        }
        res.json(rows)
        conexion.end()
    })
})

obtener_datos.get("/obtener_datos_educacion/:correo", (req, res) => {
    const conexion = conectar()
    const dato = req.params.correo
    const solicitud_experiencia = "select nombre_escuela, carrera, ano_inicio_c, ano_final_c, descripcion_c from educacion e where e.correo = ?"
    conexion.query(solicitud_experiencia, [dato], (err, rows, fields) => {
        if (err) {
            console.log("hubo un error: " + err)
            res.redirect('/error')
            return
        }
        res.json(rows)
        conexion.end()
    })
})

obtener_datos.get("/obtener_datos_software/:correo", (req, res) => {
    const conexion = conectar()
    const dato = req.params.correo
    const solicitud_experiencia = "select software, nivel_s from software s where s.correo = ?"
    conexion.query(solicitud_experiencia, [dato], (err, rows, fields) => {
        if (err) {
            console.log("hubo un error: " + err)
            res.redirect('/error')
            return
        }
        res.json(rows)
        conexion.end()
    })
})

obtener_datos.get("/obtener_datos_skills/:correo", (req, res) => {
    const conexion = conectar()
    const dato = req.params.correo
    const solicitud_experiencia = "select skill, nivel_h from skills s where s.correo = ?"
    conexion.query(solicitud_experiencia, [dato], (err, rows, fields) => {
        if (err) {
            console.log("hubo un error: " + err)
            res.redirect('/error')
            return
        }
        res.json(rows)
        conexion.end()
    })
})

obtener_datos.get("/obtener_datos_redes/:correo", (req, res) => {
    const conexion = conectar()
    const dato = req.params.correo
    const solicitud_experiencia = "select link, tipo from redes r where r.correo = ?"
    conexion.query(solicitud_experiencia, [dato], (err, rows, fields) => {
        if (err) {
            console.log("hubo un error: " + err)
            res.redirect('/error')
            return
        }
        res.json(rows)
        conexion.end()
    })
})

function conectar(){
    return mysql.createConnection({
        host: 'us-cdbr-east-03.cleardb.com',
        port: 3306,
        user: 'b397fa81c3e63e',
        password: '55fa30c9',
        database: 'heroku_db6d03f4c17b138'
    })
}

module.exports = obtener_datos