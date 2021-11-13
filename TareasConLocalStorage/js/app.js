//Variables
const formulario = document.querySelector("#formulario");
const lista = document.querySelector("#lista-tweets");
const botonBorrar = document.querySelector(".borrar");
let tweets = [];

//Eventos y función principal
principal();
function principal() {
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    extraerTexto();
  });
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    crearElemento();
  });
}

//funciones
function extraerTexto() {
  const textArea = document.querySelector("#tweet").value;
  //  objetoTweet.tweet = textArea;
  //objetoTweet.id = Date.now();
  if (textArea > 0) {
    const objetoTweet = {
      tweet: textArea,
      id: Date.now(),
    };

    tweets = [...tweets, objetoTweet];
    almacenarEnMemoria();
    crearElemento();
  } else {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = "No puede ir vacío";
    mensajeError.classList.add("error");
    formulario.appendChild(mensajeError);
    setTimeout(() => {
      mensajeError.remove();
    }, 3000);
  }
}

function crearElemento() {
  limpiarHTML();
  console.log(tweets);
  tweets.forEach((tweet) => {
    const li = document.createElement("li");
    const eliminar = document.createElement("a");
    eliminar.classList.add("borrar-tweet", "borrar");
    eliminar.textContent = "X";
    eliminar.onclick = () => {
      eliminarTwee(tweet.id);
    };

    li.innerText = tweet.tweet;
    li.appendChild(eliminar);
    lista.appendChild(li);
  });
}

function limpiarHTML() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
}

function eliminarTwee(id) {
  tweets = tweets.filter((p) => p.id !== id);
  localStorage.setItem("tweets", JSON.stringify(tweets));
  crearElemento();
}

function almacenarEnMemoria() {
  console.log("almacene");
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
