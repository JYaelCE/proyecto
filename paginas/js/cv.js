async function Obtenerdatos (correo){
    try {
        let peticion_personal = await fetch("https://ejercicio-club.herokuapp.com/obtener_datos_usuario/" + correo);
        let peticion_experiencia = await fetch("https://ejercicio-club.herokuapp.com/obtener_datos_experiencia/" + correo);
        let peticion_educacion = await fetch("https://ejercicio-club.herokuapp.com/obtener_datos_educacion/" + correo);
        let peticion_software = await fetch("https://ejercicio-club.herokuapp.com/obtener_datos_software/" + correo);
        let peticion_skills = await fetch("https://ejercicio-club.herokuapp.com/obtener_datos_skills/" + correo);
        let peticion_redes = await fetch("https://ejercicio-club.herokuapp.com/obtener_datos_redes/" + correo);
        if(peticion_personal.ok){
            let datos_personal = await peticion_personal.json();
            let datos_experiencia = await peticion_experiencia.json();
            let datos_educacion = await peticion_educacion.json();
            let datos_software = await peticion_software.json();
            let datos_skills = await peticion_skills.json();
            let datos_redes = await peticion_redes.json();
            insertar_datos(datos_personal, datos_experiencia, datos_educacion, datos_software, datos_skills, datos_redes);
        }
    }
    catch (error) {
        console.log("hubo un error: " + error)
        return
    }
    finally{
        console.log("sentao de pana")
    }
}

function insertar_datos(datos_personal, datos_experiencia, datos_educacion, datos_software, datos_skills, datos_redes){
    insertar_datos_personales(datos_personal);
    insertar_datos_experiencia(datos_experiencia);
    insertar_datos_educacion(datos_educacion);
    insertar_datos_software(datos_software);
    insertar_datos_skills(datos_skills);
}

function insertar_datos_personales(datos){
    document.getElementById("nombre").innerHTML = datos[0].nombre;
    document.getElementById("descripcion").innerHTML = datos[0].descripcion;
    document.getElementById("nacimiento").innerHTML = datos[0].nacimineto;
    document.getElementById("direccion").innerHTML = datos[0].direccion;
    document.getElementById("telefono").innerHTML = datos[0].telefono;
    document.getElementById("correo").innerHTML = datos[0].correo;
    document.getElementById("web").innerHTML = datos[0].website;
}

function insertar_datos_experiencia(datos){
    var numero = datos.length;
    var empresa = document.createElement('h3');
    empresa.className = "empresa";
    var puesto = document.createElement('h5');
    puesto.className = "puesto";
    var fecha = document.createElement('p');
    fecha.className = "fecha";
    var descripcion = document.createElement('p');
    descripcion.className = "descripcion";
    var guion = " - ";
    var experiencia = document.getElementById("experiencia");
    for(i = 0 ; i < numero; i++){
        empresa.innerHTML = datos[i].nombre_empresa;
        puesto.innerHTML = datos[i].puesto_e;
        fecha.innerHTML = datos[i].ano_inicio_e.concat(guion, datos[i].ano_final_e);
        descripcion.innerHTML = datos[i].descripcion_e;
        experiencia.appendChild(empresa);
        experiencia.appendChild(puesto);
        experiencia.appendChild(fecha);
        experiencia.appendChild(descripcion);
    }
}

function insertar_datos_educacion(datos){
    var numero = datos.length;
    var escuela = document.createElement('h3');
    escuela.className = "escuela";
    var carrera = document.createElement('h5');
    carrera.className = "carrera";
    var fecha = document.createElement('p');
    fecha.className = "fecha";
    var descripcion = document.createElement('p');
    descripcion.className = "descripcion";
    var guion = " - ";
    var educacion = document.getElementById("educacion");
    for(i = 0 ; i < numero; i++){
        escuela.innerHTML = datos[i].nombre_escuela;
        carrera.innerHTML = datos[i].carrera;
        fecha.innerHTML = datos[i].ano_inicio_c.concat(guion, datos[i].ano_final_c);
        descripcion.innerHTML = datos[i].descripcion_c;
        educacion.appendChild(escuela);
        educacion.appendChild(carrera);
        educacion.appendChild(fecha);
        educacion.appendChild(descripcion);
    }
}

function insertar_datos_software(datos){
    var numero = datos.length;
    var num_circulos = '';
    var nombre = document.createElement('p');
    nombre.className = "nombre";
    var software = document.getElementById("software");
    for(i = 0 ; i < numero; i++){
        nombre.innerHTML = datos[i].software;
        num_circulos = parseInt(datos[i].nivel_s,10)
        for(j = 0 ; j < num_circulos; j++){
            var lleno = document.createElement('span');
            lleno.className = "lleno";
            software.appendChild(lleno);
        }
        num_circulos = 6 - num_circulos
        for(k = 0 ; k < num_circulos; k++){
            var vacio = document.createElement("span");
            vacio.className = "vacio";
            software.appendChild(vacio);
        }
        software.appendChild(nombre);
    }
}

function insertar_datos_skills(datos){
    var numero = datos.length;
    var num_circulos = '';
    var nombre = document.createElement('p');
    nombre.className = "nombre";
    var skills = document.getElementById("skills");
    for(i = 0 ; i < numero; i++){
        nombre.innerHTML = datos[i].skill;
        num_circulos = parseInt(datos[i].nivel_h,10)
        for(j = 0 ; j < num_circulos; j++){
            var lleno = document.createElement('span');
            lleno.className = "lleno";
            skills.appendChild(lleno);
        }
        num_circulos = 6 - num_circulos
        for(k = 0 ; k < num_circulos; k++){
            var vacio = document.createElement("span");
            vacio.className = "vacio";
            skills.appendChild(vacio);
        }
        skills.appendChild(nombre);
    }
}

const url = window.location.search;
const parametros = new URLSearchParams(url);
const correo = parametros.get('correo')
Obtenerdatos(correo);