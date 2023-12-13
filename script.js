const contenidor = document.querySelector('.contenidor');
const lletra = document.querySelectorAll('.fila .letra:not(.ocupat)');
const contador = document.getElementById('contador');
let paraula = document.getElementById("paraula")
let vidas = 10
let start = document.getElementById("start")
let reset = document.getElementById("reset")
let secreto =document.getElementById("secreto")
let textoInferior =document.getElementById("textoInferior")
let palabras = ["Amigos","Peregrino","Bebida","Separar","Voltear","Celos","perro", "conejo", "pneurotorax", "diafragma", "oftalmologia"]

contenidor.classList.add("pointerNone");
reset.disabled = true;
reset.hidden = true
contador.innerText = vidas;
textoInferior.hidden =true;

start.addEventListener('click', (e) => {
    reset.disabled = false;
    reset.hidden =false;
    start.hidden =true;
    start.disabled = true;
    contenidor.classList.remove("pointerNone")
    textoInferior.hidden =false;
    startgame();
})

reset.addEventListener('click', (e) => {
    reiniciar();
})

function actualitzaVidas(){
    contador.innerText = vidas;
}

contenidor.addEventListener('click', (e) => {
    vidas--;
    actualitzaVidas();

    if(vidas===0){
        perder()
    }

    if(e.target.classList.contains('lletra')
    && !e.target.classList.contains('equivocado')){
    e.target.classList.toggle('correcto')
    actualitzaSelecciolletra();

}}
)

function perder(){
    reiniciar();
    alert("PERDISTE");
}

function startgame(){
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    let palabra_encriptada = palabra.replace(/./g, "-");
    console.log(palabra, palabra_encriptada);
    secreto.innerText = palabra_encriptada;
}

function reiniciar(){
    contenidor.classList.add("pointerNone");
    reset.disabled = true;
    reset.hidden =true;
    start.hidden =false;
    start.disabled = false;
    vidas = 10;
    actualitzaVidas();
    textoInferior.hidden =true
    let letras = document.querySelectorAll(".lletra")
    letras.forEach((lletra) =>{
        lletra.classList.remove('correcto');
        lletra.classList.remove('equivocado');
    })
    secreto.innerText = "";
}