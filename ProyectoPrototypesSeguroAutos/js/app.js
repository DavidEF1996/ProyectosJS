//Objeto de seguro
function Seguro(marca, ano, tipo) {
  this.marca = marca;
  this.ano = ano;
  this.tipo = tipo;
}
//prototype de objeto seguro para realizar la cotización
Seguro.prototype.cotizando = function () {
  /***
   * 1 = Americano * 1.15
   * 2 = Asiatico * 1.05
   * 3 = Europeo *1.35
   */
  let cantidad;
  const base = 2000;
  switch (this.marca) {
    case "1":
      console.log("Americano");
      cantidad = base * 1.15;
      break;
    case "2":
      console.log("Asiático");
      cantidad = base * 1.05;
      break;
    case "3":
      console.log("Europeo");
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  //Mermar valor por cada año que este de viejo
  let diferenciaAños = new Date().getFullYear() - this.ano;
  let valormermar = ((cantidad * 3) / 100) * diferenciaAños;
  cantidad = cantidad - valormermar;

  //Multiplicar por el tipo de seguro
  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }
  console.log(cantidad);
  return cantidad;
};

//Objeto y prototype para la interfaz
function Interfaz() {}

//Este prototype inicia cuando el documento carga y se encarga de llenar los años en la interfaz
Interfaz.prototype.anos = () => {
  const anoActual = new Date().getFullYear();
  const anoBase = anoActual - 20;

  for (let index = anoActual; index > anoBase; index--) {
    const elementoano = document.createElement("option");
    elementoano.textContent = index;
    elementoano.value = index;
    const year = document.querySelector("#year");
    year.appendChild(elementoano);
  }
};

//instancia del objeto interfaz y llamada al método cuando carga el documento
const inter = new Interfaz();
document.addEventListener("DOMContentLoaded", inter.anos);

Principal();
function Principal() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", extraerDatos);
}

function extraerDatos(e) {
  e.preventDefault();
  limpiarHtml();
  const formulario = document.querySelector("#cotizar-seguro"); //variable con el formulario

  //las 3 variables de la interfaz para la cotizacion
  const marca = document.querySelector("#marca").value;
  const ano = document.querySelector("#year").value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === "" || ano === "" || tipo === "") {
    const mensajeError = document.createElement("p");
    mensajeError.classList.add("mensaje", "error", "mt-10");
    mensajeError.textContent = "Falta agregar campos";
    formulario.insertBefore(mensajeError, document.querySelector("#resultado"));
    setTimeout(() => {
      mensajeError.remove();
    }, 3000);
    return;
  }
  const seguro = new Seguro(marca, ano, tipo);
  const resultadoFinal = seguro.cotizando(seguro);
  const mensajeCorrecto = document.createElement("p");
  mensajeCorrecto.classList.add("mensaje", "correcto", "mt-10");
  mensajeCorrecto.textContent = "Cotizando";
  formulario.insertBefore(
    mensajeCorrecto,
    document.querySelector("#resultado")
  );
  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";
  setTimeout(() => {
    mensajeCorrecto.remove();
    spinner.style.display = "none";

    //Div para mostrar los resultados en pantalla
    const mostarResultados = document.createElement("div");
    mostarResultados.classList.add("mt-10");
    mostarResultados.innerHTML = `
    <p class="header">Resumen</p>
    <p class = "font-bold">Total: <span class="font-normal">${resultadoFinal}</span></p>
    <p class = "font-bold">Marca: <span class="font-normal">${tipoDeMarca(
      marca
    )}</span></p>
    <p class = "font-bold">Año: <span class="font-normal">${ano}</span></p>
    <p class = "font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
    `;
    const divResult = document.querySelector("#resultado");
    divResult.appendChild(mostarResultados);
  }, 3000);
}

function tipoDeMarca(tipo) {
  switch (tipo) {
    case "1":
      return "Americano";
      break;
    case "2":
      return "Asiático";
      break;

    case "3":
      return "Europeo";
      break;
    default:
      break;
  }
}

function limpiarHtml() {
  const resumenes = document.querySelector("#resultado");
  while (resumenes.firstChild) {
    resumenes.removeChild(resumenes.firstChild);
  }
}
