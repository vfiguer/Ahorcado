//declaraciones 
const contenidor = document.querySelector('.contenidor');
const lletra = document.querySelectorAll('.fila .letra:not(.ocupat)');
const contador = document.getElementById('contador');
let paraula = document.getElementById("paraula")
let vidas = 7
let reset = document.getElementById("reset")
let resetpop = document.getElementById("reset2")
let secreto = document.getElementById("secreto")
let textoInferior = document.getElementById("textoInferior")
let textoInferior2 = document.getElementById("textoInferior2")
let popup = document.getElementById("env-popup")

let tabla = ["hidrogeno", "zinc", "germanio", "cloro", "neon", "cobre", "aluminio", "silicio", "bromo", "livermorio", "organeson"]
let nom = ["pepe", "jose", "penelope", "daniel", "juan", "valentin", "ivan", "francisco", "sidney", "sergi", "alvaro"]
let anim = ["perro", "gato", "coballa", "papagayo", "lince", "ligre", "pato", "emu", "frances", "jirafa", "rinoceronte"]

let tabla_periodica = document.getElementById("tabla_periodica")
let nombres = document.getElementById("nombres")
let animales = document.getElementById("animales")

let categoria = 0;

const puntos = document.getElementById('puntos');
let perder = false;
contenidor.classList.add("pointerNone");
let resultadosPuntos = document.getElementById("puntuacion")

reset.disabled = true;
reset.hidden = true
contador.innerText = vidas;
textoInferior.hidden = true;
textoInferior2.hidden = true;

let palabra = "";

let letrasAcertadas = 0
let puntuacion = 0;

//reiniciamos todo al principio para que quede bien
reiniciar();

//los 3 botones para poder elegir las categorias
tabla_periodica.addEventListener('click', (e) => {
    categoria = 1
    start();
})

nombres.addEventListener('click', (e) => {
    categoria = 2
    start();
})

animales.addEventListener('click', (e) => {
    categoria = 3
    start();
})

//funcion de inicio del juego, esconde los botones de categoria y muestra la puntuacion, las vidass, la palabra
//y el boton de reset
function start() {
    reset.disabled = false;
    reset.hidden = false;
    tabla_periodica.hidden = true;
    tabla_periodica.disabled = true;
    nombres.hidden = true;
    nombres.disabled = true;
    animales.hidden = true;
    animales.disabled = true;
    contenidor.classList.remove("pointerNone")
    textoInferior.hidden = false;
    textoInferior2.hidden = false;
    startgame();
}

//boton de reset
reset.addEventListener('click', (e) => {
    reiniciar();
})

//boton de reset del popup
resetpop.addEventListener('click', (e) => {
    popup.style.display = "none";
    reiniciar();
})

//funcion que actualiza el texto de las vidas
function actualitzaVidas() {
    contador.innerText = vidas;
}

//funcion que actualiza la puntuacion en pantalla
function actualitzaPuntuacion(){
    puntos.innerText = puntuacion;
}

//el event listener que permite que si le das a las letras se marquen y se pongan bien o mal
contenidor.addEventListener('click', (e) => {
    if (vidas === 0) {
        perder = true;
        finalizar();
    }

    if (e.target.classList.contains('lletra') && !e.target.classList.contains('equivocado')) {
        const letraSeleccionada = e.target.innerText;
        if (palabra.includes(letraSeleccionada)) {
            e.target.classList.add('correcto');
            actualizarPalabraEncriptada(letraSeleccionada);
        } else {
            e.target.classList.add('equivocado');
            vidas--;
        actualitzaVidas();
        }
    }
});

//funcion que se activa cuando adivinas la palabra o te quedas sin vidas para finalizar el juego
function finalizar() {
    contenidor.hidden = true;
    textoInferior.hidden = true;
    textoInferior2.hidden = true;
    reset.hidden = true;
    secreto.hidden= true;
    popup.style.display = "flex";
    if(!perder){
        resultado.innerText = "Has ganado!";
    }else{
        resultado.innerText = "Has perdido!";
    }
    resultadosPuntos.innerText = puntuacion;
}

//funcion que inicia el juego, busca la palabra la encripta y la pone en pantalla
function startgame() {
    if(categoria===1){
        palabra = tabla[Math.floor(Math.random() * tabla.length)];  
    } else if(categoria===2){
        palabra = nom[Math.floor(Math.random() * nom.length)];  
    } else if (categoria===3){
        palabra = anim[Math.floor(Math.random() * anim.length)];  
    }
    let palabra_encriptada = palabra.replace(/./g, "-");
    palabra = palabra.toUpperCase();
    console.log(palabra, palabra_encriptada);
    secreto.innerText = palabra_encriptada;
}

//funcion para reiniciar todo y devolverlo al estado original
function reiniciar() {
    contenidor.classList.add("pointerNone");
    reset.disabled = true;
    reset.hidden = true;
    tabla_periodica.hidden = false;
    tabla_periodica.disabled = false;
    nombres.hidden = false;
    nombres.disabled = false;
    animales.hidden = false;
    animales.disabled = false;
    vidas = 7;

    contenidor.hidden = false;
    textoInferior.hidden = false;
    textoInferior2.hidden = false;
    secreto.hidden= false;

    actualitzaVidas();
    textoInferior.hidden = true
    textoInferior2.hidden = true
    //el codigo que cambia el color de las letras
    let letras = document.querySelectorAll(".lletra")
    letras.forEach((lletra) => {
        lletra.classList.remove('correcto');
        lletra.classList.remove('equivocado');
    })
    secreto.innerText = "";
    puntuacion = 0;
    actualitzaPuntuacion();

}

//funcion funcion que actualiza la palabra secreta que cuando pongas una letra bien
//se escribira por pantalla
function actualizarPalabraEncriptada(letra) {
    const indices = [];
    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
            indices.push(i);
            letrasAcertadas++;
        }
    }

    //llamadas a funciones para actualizar la puntuacion
    calcularPuntuacion();
    actualitzaPuntuacion();

    //el codigo que cambia la letra oculta por la letra correcta
    let palabra_encriptada_array = secreto.innerText.split('');
    indices.forEach((indice) => {
        palabra_encriptada_array[indice] = letra;
    });
    secreto.innerText = palabra_encriptada_array.join('');
    //if que acaba el juego si la palabra esta acabada
    if (!secreto.innerText.includes('-') && vidas>=0) {
        finalizar()
    }
}

function calcularPuntuacion(){
    puntuacion = letrasAcertadas * vidas * 100
}