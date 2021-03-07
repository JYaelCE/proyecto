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
    insertar_datos_redes(datos_redes);
}

function insertar_datos_personales(datos){
    document.getElementById("nombre").innerHTML = datos[0].nombre;
    document.getElementById("puesto").innerHTML = datos[0].puesto;
    document.getElementById("descripcion").innerHTML = datos[0].descripcion;
    document.getElementById("nacimiento").innerHTML = datos[0].nacimiento;
    document.getElementById("direccion").innerHTML = datos[0].direccion;
    document.getElementById("telefono").innerHTML = datos[0].telefono;
    document.getElementById("correo").innerHTML = datos[0].correo;
    document.getElementById("web").innerHTML = datos[0].website;
}

function insertar_datos_experiencia(datos){
    var numero = datos.length;
    var empresa = '';
    var puesto = '';
    var fecha = '';
    var descripcion = '';
    const guion = " - ";
    var experiencia = document.getElementById("experiencia");
    for(i = 0 ; i < numero; i++){
        empresa = document.createElement('h3');
        empresa.className = "empresa";
        puesto = document.createElement('h5');
        puesto.className = "puesto";
        fecha = document.createElement('p');
        fecha.className = "fecha";
        descripcion = document.createElement('p');
        descripcion.className = "descripcion";
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
    var escuela ='';
    var carrera = '';
    var fecha = '';
    var descripcion = '';
    const guion = " - ";
    var educacion = document.getElementById("educacion");
    for(i = 0 ; i < numero; i++){
        escuela = document.createElement('h3');
        escuela.className = "escuela";
        carrera = document.createElement('h5');
        carrera.className = "carrera";
        fecha = document.createElement('p');
        fecha.className = "fecha";
        descripcion = document.createElement('p');
        descripcion.className = "descripcion";
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
    var software = document.getElementById("software");
    var num_circulos = '';
    var label_s = '';
    var id_l = '';
    var id_c = '';
    var div_s = '';
    for(i = 0 ; i < numero; i++){
        label_s = document.createElement("label");
        label_s.className = "puntos_l";
        id_l = "label_c_s"+i;
        label_s.id = id_l;
        id_c = "circulo_s"+i;
        label_s.setAttribute("for", id_c);
        software.appendChild(label_s)
        label_s.innerHTML += datos[i].software;
        label_s = document.getElementById(id_l);
        div_s = document.createElement('div');
        div_s.id = id_c;
        label_s.appendChild(div_s);
        div_s = document.getElementById(id_c);
        num_circulos = parseInt(datos[i].nivel_s,10)
        for(j = 0 ; j < num_circulos; j++){
            var lleno = document.createElement('span');
            lleno.className = "lleno";
            div_s.appendChild(lleno);
        }
        num_circulos = 6 - num_circulos
        for(k = 0 ; k < num_circulos; k++){
            var vacio = document.createElement("span");
            vacio.className = "vacio";
            div_s.appendChild(vacio);
        }
    }
}

function insertar_datos_skills(datos){
    var numero = datos.length;
    var skills = document.getElementById("skills");
    var num_circulos = '';
    var label_sk = '';
    var id_l = '';
    var id_c = ';';
    var div_sk = '';
    for(i = 0 ; i < numero; i++){
        label_sk = document.createElement("label");
        label_sk.className = "puntos_l";
        id_l = "label_c"+i;
        label_sk.id = id_l;
        id_c = "circulo"+i;
        label_sk.setAttribute("for", id_c);
        skills.appendChild(label_sk)
        label_sk = document.getElementById(id_l);
        div_sk = document.createElement('div');
        div_sk.id = id_c;
        label_sk.appendChild(div_sk);
        div_sk = document.getElementById(id_c);
        num_circulos = parseInt(datos[i].nivel_h,10)
        for(j = 0 ; j < num_circulos; j++){
            var lleno = document.createElement('span');
            lleno.className = "lleno";
            div_sk.appendChild(lleno);
        }
        num_circulos = 6 - num_circulos
        for(k = 0 ; k < num_circulos; k++){
            var vacio = document.createElement("span");
            vacio.className = "vacio";
            div_sk.appendChild(vacio);
        }
        label_sk.innerHTML += datos[i].skill;
    }
}

function insertar_datos_redes(datos){
    var numero = datos.length;
    var redes = document.getElementById("redes");
    var label_r = '';
    var svg_r = '';
    var path_r = '';
    var id_l = '';
    var id_s = ';'
    const view = "0 0 24 24";
    const icono_f = "M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
    const icono_o = "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z"
    const icono_t = "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
    for(i = 0 ; i < numero; i++){
        console.log(datos[i].tipo);
        label_r = document.createElement("label");
        label_r.className = "red";
        id_l = "label"+i;
        label_r.id = id_l;
        id_s = "red"+i;
        label_r.setAttribute("for", id_s);
        redes.appendChild(label_r)
        label_r = document.getElementById(id_l);
        svg_r = document.createElement("svg");
        svg_r.id = id_s;
        svg_r.setAttribute("viewBox", view);
        label_r.appendChild(svg_r);
        svg_r = document.getElementById(id_s);
        path_r = document.createElement("path");
        if (datos[i].tipo == 'facebook'){
            path_r.setAttribute("d", icono_f);
        }
        else if (datos[i].tipo == 'Twitter'){
            path_r.setAttribute("d", icono_t);
        }
        else if (datos[i].tipo == 'otro'){
            path_r.setAttribute("d", icono_o);
        }
        svg_r.appendChild(path_r);
        label_r.innerHTML += datos[i].link;
    }
}

const url = window.location.search;
const parametros = new URLSearchParams(url);
const correo = parametros.get('correo')
Obtenerdatos(correo);