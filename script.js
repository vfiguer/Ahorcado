const contenidor = document.querySelector('.contenidor');
const lletra = document.querySelectorAll('.fila .letra:not(.ocupat)');
const contador = document.getElementById('contador');
const total = document.getElementById('total');
const peliculaSelect = document.getElementById('pelicula');


function actualitzaSelecciolletra(){
    const lletraSeleccionats = document.querySelectorAll('.fila .lletra.seleccionat');
    
    const lletraIndex = [...lletraSeleccionats].map(function(lletra) {
        return [...lletra].indexOf(lletra);
    })

    localStorage.setItem('lletraSeleccionats', JSON.stringify(lletraIndex))

    const contadorlletraSeleccionats = lletraSeleccionats.length;
    contador.innerText = contadorlletraSeleccionats;
}

contenidor.addEventListener('click', (e) => {
    if(e.target.classList.contains('lletra')
    && !e.target.classList.contains('ocupat')){
    e.target.classList.toggle('seleccionat')
    actualitzaSelecciolletra();    
}
})
