const botonEnviar = document.querySelector("#enviar");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");
const botonResetear = document.querySelector("#resetBtn");

addEvenListeners();
function addEvenListeners() {
  document.addEventListener("DOMContentLoaded", iniciarApp);
  email.addEventListener("blur", verificarCampos);
  asunto.addEventListener("blur", verificarCampos);
  mensaje.addEventListener("blur", verificarCampos);
  botonResetear.addEventListener("click", resetear);
  // formulario.addEventListener("submit", enviarF);

  formulario.addEventListener("click", resetear2);
}

function iniciarApp() {
  botonEnviar.disabled = true;
  botonEnviar.classList.add("opacity-50");
}

function verificarCampos(e) {
  const er =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (e.target.value.length > 0) {
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }
    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mensajeError("Campo Vacío");
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      console.log("bien");
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mensajeError("Correo no válido");
    }
  }

  if (
    er.test(email.value) &&
    asunto.value.length > 0 &&
    mensaje.value.length > 0
  ) {
    console.log("Bien todo");
    botonEnviar.disabled = false;
    botonEnviar.classList.remove("opacity-50");
  }
}

function mensajeError(texto) {
  const errores = document.querySelectorAll(".error");

  if (errores.length < 1) {
    const mensajeE = document.createElement("p");
    mensajeE.textContent = texto;
    mensajeE.classList.add(
      "border",
      "border-red-500",
      "background-color-100",
      "text-red-500",
      "p-3",
      "error"
    );
    formulario.insertBefore(mensajeE, document.querySelector(".mb-10"));
  }
}

function enviarF(e) {
  e.preventDefault();
  const spinner = document.querySelector("#spinner");

  spinner.style.display = "flex";
  setTimeout(() => {
    spinner.style.display = "none";
    const mensajeBien = document.createElement("p");
    mensajeBien.textContent = "Mensaje Enviado";
    mensajeBien.classList.add(
      "text-center",
      "my-10",
      "p-5",
      "bg-green-500",
      "text-white"
    );
    formulario.insertBefore(mensajeBien, spinner);
    setTimeout(() => {
      mensajeBien.remove();
      resetear();
    }, 5000);
  }, 3000);
}

function resetear() {
  formulario.reset();
  iniciarApp();
}

function resetear2() {
  e.preventDefault();
  const error = document.querySelector("p.error");
  if (error) {
    error.remove();
  }

  email.classList.remove("border", "border-red-500");
  email.classList.remove("border", "border-green-500");
  mensaje.classList.remove("border", "border-red-500");
  mensaje.classList.remove("border", "border-green-500");
  asunto.classList.remove("border", "border-red-500");
  asunto.classList.remove("border", "border-green-500");
  formulario.reset();
  iniciarApp();
}
