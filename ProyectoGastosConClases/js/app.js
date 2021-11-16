//Variables
const listado = document.querySelector("#gastos ul");
const formulario = document.querySelector("#agregar-gasto");

//Eventos
document.addEventListener("DOMContentLoaded", preguntar);
principal();
function principal() {
  formulario.addEventListener("submit", agregarGasto);
}

//Clases
class PresupuestoCliente {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(objeto) {
    this.gastos = [...this.gastos, objeto];
    console.log("se agrego");
    console.log(this.gastos);
  }

  calcularRestante() {
    const resultado = this.gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );
    this.restante = this.presupuesto - resultado;
    console.log(this.restante);
  }
  eliminarGasto(id) {
    this.gastos = this.gastos.filter((elemento) => elemento.id !== id);
    this.calcularRestante();
  }
}

class Interfaz {
  mostrarPresupuesto(respuesta) {
    document.querySelector("#total").textContent = respuesta;
    document.querySelector("#restante").textContent = respuesta;
  }

  mostrarMensaje(mensaje, tipo) {
    const div = document.createElement("div");
    div.classList.add("text-center", "alert");
    if (tipo === "error") {
      div.classList.add("alert-danger");
      div.textContent = mensaje;
    } else {
      div.classList.add("alert-success");
      div.textContent = mensaje;
    }

    document.querySelector(".primario").insertBefore(div, formulario);
    setTimeout(() => {
      div.remove();
    }, 3000);
  }

  mostrarListadoGastos(objeto) {
    limpiarHtml();
    const { gastos } = objeto;
    gastos.forEach((element) => {
      const { cantidad, gasto, id } = element;
      const fila = document.createElement("li");
      fila.className =
        "list-group-item d-flex justify-content-between aling-items-center";
      fila.setAttribute("data-id", id);
      fila.innerHTML = `

            ${gasto} <span class="badge badge-primary badge-pill">${cantidad}</span>
     `;

      const botonBorrar = document.createElement("button");
      botonBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
      botonBorrar.textContent = "Borrar";
      botonBorrar.onclick = () => {
        eliminar(id);
      };
      fila.appendChild(botonBorrar);
      listado.appendChild(fila);
    });
  }

  actualizarRestante(restante) {
    console.log("lo que llega a restante es: " + restante);
    document.querySelector("#restante").textContent = restante;
  }

  cambiarColores(presupuesto, restante) {
    const restanteDiv = document.querySelector(".restante");
    if (presupuesto / 4 > restante) {
      restanteDiv.classList.remove("alert-success", "alert-warning");
      restanteDiv.classList.add("alert-danger");
    } else if (presupuesto / 2 > restante) {
      restanteDiv.classList.remove("alert-success");
      restanteDiv.classList.add("alert-warning");
    } else {
      restanteDiv.classList.remove("alert-warning", "alert-danger");
      restanteDiv.classList.add("alert-success");
    }
    if (restante <= 0) {
      this.mostrarMensaje("El presupuesto se ha agotado", "error");
      formulario.querySelector('button[type="submit"]').disabled = true;
    } else {
      formulario.querySelector('button[type="submit"]').disabled = false;
    }
  }
}

const interface = new Interfaz();

let presupuesto;

//Funciones0
function preguntar() {
  const respuesta = window.prompt("Ingrese su presupuesto");

  if (respuesta === "" || respuesta === null || isNaN(respuesta)) {
    window.location.reload();
  } else {
  }
  //let gast;
  //gast = JSON.parse(localStorage.getItem("gastos")) || [];
  presupuesto = new PresupuestoCliente(respuesta);
  //presupuesto.gastos = gast;
  interface.mostrarListadoGastos(presupuesto);
  interface.mostrarPresupuesto(respuesta);
}

function agregarGasto(e) {
  e.preventDefault();

  const cantidad = Number(document.querySelector("#cantidad").value);
  const gasto = document.querySelector("#gasto").value;

  if (cantidad === "" || gasto === "") {
    interface.mostrarMensaje("No puede tener campos vacíos", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    interface.mostrarMensaje("Cantidad no válida", "error");
    return;
  } else {
    interface.mostrarMensaje("Correcto", "succes");
  }

  const objeto = { cantidad, gasto, id: Date.now() };

  //agrega un nuevo gasto al objeto
  presupuesto.nuevoGasto(objeto);

  //muestra el gasto en pantalla
  interface.mostrarListadoGastos(presupuesto);

  //calcular el restante
  presupuesto.calcularRestante();

  const { gastos, restante } = presupuesto;
  //actualizar el restanten en la interfaz
  interface.actualizarRestante(restante);

  //cambia los colores según el estado del restante
  interface.cambiarColores(presupuesto.presupuesto, restante);
  almacenarEnMemoria();

  formulario.reset();
}

function limpiarHtml() {
  while (listado.firstChild) {
    listado.removeChild(listado.firstChild);
  }
}

function eliminar(id) {
  presupuesto.eliminarGasto(id);
  limpiarHtml();
  interface.mostrarListadoGastos(presupuesto);
  //calcular el restante
  presupuesto.calcularRestante();

  const { gastos, restante } = presupuesto;
  //actualizar el restanten en la interfaz
  interface.actualizarRestante(restante);
  interface.cambiarColores(presupuesto.presupuesto, restante);
}

function almacenarEnMemoria() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}
