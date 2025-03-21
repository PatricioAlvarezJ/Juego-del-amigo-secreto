function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

asignarTextoElemento('h1','Juego Del Amigo Secreto');
asignarTextoElemento('h2','Agrege el nombre de sus amigos');


let amigos = [];
let ganadores = new Set();
let ultimoGanador = null;

// funcion para agregar participante con boton "Enter"
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarParticipante();
    }
})

function agregarParticipante() {
    let participante = document.getElementById('amigo').value;
    if (participante.trim() === "") {
        alert("Por favor, inserte un nombre.");
        return; 
    } else if (amigos.includes(participante)) {
        alert("Este Nombre ya fue Ingresado");
        return;
    } else {
        amigos.push(participante);
        document.getElementById('amigo').value = "";
        mostrarAmigosDeLista();
    }
}

function sortearAmigo() {
    if (amigos.length === 0) {
        alert("No hay amigos para sortear.");
        return;
    }
    if (ganadores.size === amigos.length) {
        alert("Ya todos fueron ganadores.");
        return;
    }
    let indiceAleatorio;
    do {
        indiceAleatorio = Math.floor(Math.random() * amigos.length);
    } while (amigos[indiceAleatorio] === ultimoGanador || ganadores.has(amigos[indiceAleatorio]));
    
    let amigoSecreto = amigos[indiceAleatorio];
    document.getElementById('resultado').innerHTML = `Tu amigo secreto es: ${amigoSecreto}`;
    ultimoGanador = amigoSecreto;
    ganadores.add(amigoSecreto);
    return amigoSecreto;
}

function mostrarAmigosDeLista() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    for (let i = 0; i < amigos.length; i++) {
        let elementoLI = document.createElement('li');
        elementoLI.textContent = amigos[i];
        lista.appendChild(elementoLI);
    }

// si la lista de amigos es mayor a 5, se activa un scroll
    if (amigos.length > 3) {
        lista.classList.add('scrollable');
    } else {
        lista.classList.remove('scrollable');
    } 
}
// una funcion para reiniciar la lista de amigos
function reiniciar() {
    amigos = [];
    ganadores.clear();
    ultimoGanador = null;
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    lista.classList.remove('scrollable');
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').value = '';
}