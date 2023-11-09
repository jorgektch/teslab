//import { simplificar } from "funciones.js";

function principal(event) {
    //log.textContent = `Form Submitted! Timestamp: ${event.timeStamp}`;
    //log.textContent = `Form Submitted! Timestamp: ${entrada}`;
    //event.preventDefault();
    const entrada = document.getElementById('entrada').value;
    const salida = procesar(entrada);
    document.getElementById("resultado").innerHTML = salida;
    event.preventDefault();
}

function procesar(entrada) {
    // Set de expresiones
    let comandos = ["simplify", "solve"];

    // 
    
    for(let i=0; i<comandos.length; ++i){
        let comando = comandos[i];
        console.log(comando)
        let pos = entrada.search(comando);
        console.log(pos!=-1)
        
        if(pos != -1){
            let expresion = entrada.substring(comando.length,entrada.length);
            //return "comando: "+comando+", expresion: "+expresion;
            if(comando == comandos[0]) return simplificar(expresion);
            if(comando == comandos[1]) return resolver(expresion);
        }
        
        //return "No se puede procesar";
    }
    
    //let position = text.search(/blue/);
    //let comando = str.substring(0, 3);

    //const arreglo = entrada.split(" ");
    //return "entrada: "+entrada+", expresion: "+expresion;
    //return "hola a todos".search(/xola/);
}

const form = document.getElementById("formulario");
const log = document.getElementById("resultado");

const expresiones = ["simplify", "solve"];
const fuciones = ["simplify", "solve"];

form.addEventListener("submit", principal);

/*
function procesar(p1, p2) {
    return p1 * p2;
}

let entrada = document.getElementById('entrada').value;
let result = analizar(4, 3);
document.getElementById("resultado").innerHTML = result;
document.getElementById("otro-resultado").innerHTML = entrada;
*/