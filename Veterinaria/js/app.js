//VARIABLES
const formulario = document.querySelector("#nueva-cita");
const listado = document.querySelector("#citas");
/////Datos
const nombre = document.querySelector("#mascota");
const propietario = document.querySelector("#propietario");
const telefono = document.querySelector("#telefono");
const fecha = document.querySelector("#fecha");
const hora = document.querySelector("#hora");
const sintomas = document.querySelector("#sintomas");

let estadoActualizar = false;

//LISTENERS
document.addEventListener("DOMContentLoaded", scrolbar);
principal();
function principal() {
  formulario.addEventListener("submit", obtenerDatosPaciente);

  //agregar al objeto mientras se esta dijitando
  nombre.addEventListener("input", datosCita);
  propietario.addEventListener("input", datosCita);
  telefono.addEventListener("input", datosCita);
  fecha.addEventListener("input", datosCita);
  hora.addEventListener("input", datosCita);
  sintomas.addEventListener("input", datosCita);
}

//OBJETOS Y CLASES
const cita = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

//Clases
class Paciente {
  constructor() {
    this.pacientes = [];
  }

  agregarCita(cita) {
    this.pacientes = [...this.pacientes, cita];
    console.log(this.pacientes);
  }

  eliminarCita(id) {
    this.pacientes = this.pacientes.filter((cita) => cita.id !== id);
  }

  actualizarCita(cita) {
    this.pacientes = this.pacientes.map((paciente) =>
      paciente.id === cita.id ? cita : paciente
    );
    console.log(this.pacientes.length);
  }
}

class UI {
  mostrarMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("DIV");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    divMensaje.textContent = mensaje;

    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  mostrarCita(citas) {
    this.limpiarHtml();
    citas.pacientes.forEach((element) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        element;
      //Contenedor principal
      const mensajeCita = document.createElement("Div");
      mensajeCita.classList.add("cita", "p-3");
      mensajeCita.dataset.id = id;
      //Nombre del Perro
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      const propietarioLista = document.createElement("p");
      propietarioLista.innerHTML = `
        <span class="font-weigth-bolder"> Propietario: </span> ${propietario}

      `;

      const telefonoLista = document.createElement("p");
      telefonoLista.innerHTML = `
        <span class="font-weigth-bolder"> Telefono: </span> ${telefono}

      `;

      const fechaLista = document.createElement("p");
      fechaLista.innerHTML = `
        <span class="font-weigth-bolder"> Fecha: </span> ${fecha}

      `;

      const horaLista = document.createElement("p");
      horaLista.innerHTML = `
        <span class="font-weigth-bolder"> Hora: </span> ${hora}

      `;

      const sintomasLista = document.createElement("p");
      sintomasLista.innerHTML = `
        <span class="font-weigth-bolder"> Sintomas: </span> ${sintomas}

      `;

      const btnEliminar = document.createElement("button");
      btnEliminar.onclick = () => eliminarCita(id); // añade la opción de eliminar
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEliminar.innerHTML =
        'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

      // Añade un botón de editar...
      const btnEditar = document.createElement("button");
      btnEditar.onclick = () => cargarEdicion(element);

      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML =
        'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

      mensajeCita.appendChild(mascotaParrafo);
      mensajeCita.appendChild(propietarioLista);
      mensajeCita.appendChild(telefonoLista);
      mensajeCita.appendChild(fechaLista);
      mensajeCita.appendChild(horaLista);
      mensajeCita.appendChild(sintomasLista);
      mensajeCita.appendChild(btnEliminar);
      mensajeCita.appendChild(btnEditar);
      listado.appendChild(mensajeCita);
    });
  }

  limpiarHtml() {
    while (listado.firstChild) {
      listado.removeChild(listado.firstChild);
    }
  }
}
//Instancias
const ui = new UI();
const adminPaciente = new Paciente();

//FUNCIONES

function obtenerDatosPaciente(e) {
  e.preventDefault();

  const { nombre, propietario, telefono, fecha, hora, sintomas } = cita;
  if (
    nombre === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.mostrarMensaje("No puede haber campos vacíos", "error");
  } else {
    if (!estadoActualizar == true) {
      ui.limpiarHtml();
      cita.id = Date.now();
      adminPaciente.agregarCita({ ...cita });
      ui.mostrarMensaje("Cita agregada correctamente", "success");
    } else {
      console.log("Estoy editando");
      adminPaciente.actualizarCita({ ...cita });
      ui.mostrarMensaje("Se actualizo correctamente", "success");
      estadoActualizar = false;
      document.querySelector('button[type="submit"]').textContent =
        "Crear Cita";
      estadoActualizar = false;
    }
    //Como usamos un objeto global, js agrega el ultimo que se agrego como todas las copias en el arreglo
    //para evitar esto pasamos una copia del ultimo objeto al metodo agregar  y no el objeto global

    ui.mostrarCita(adminPaciente);
    formulario.reset();
    reiniciarObjeto();
  }
}
function datosCita(e) {
  cita[e.target.name] = e.target.value;
}

function reiniciarObjeto() {
  cita.mascota = "";
  cita.propietario = "";
  cita.telefono = "";
  cita.fecha = "";
  cita.hora = "";
  cita.sintomas = "";
}

function eliminarCita(id) {
  adminPaciente.eliminarCita(id);
  ui.mostrarCita(adminPaciente);
}

function cargarEdicion(citaEditar) {
  const id = citaEditar.id;
  nombre.value = citaEditar.mascota;
  propietario.value = citaEditar.propietario;
  telefono.value = citaEditar.telefono;
  fecha.value = citaEditar.fecha;
  hora.value = citaEditar.hora;
  sintomas.value = citaEditar.sintomas;

  cita.mascota = nombre.value;
  cita.propietario = propietario.value;
  cita.telefono = telefono.value;
  cita.fecha = fecha.value;
  cita.hora = hora.value;
  cita.sintomas = sintomas.value;
  cita.id = id;

  document.querySelector('button[type="submit"]').textContent =
    "Guardar Cambios";
  estadoActualizar = true;
}

function scrolbar() {
  console.log(listado.clientWidth);
}
