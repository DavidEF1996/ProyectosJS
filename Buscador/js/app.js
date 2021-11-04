//Variables
const contenedorProductos = document.querySelector("#resultado");
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");

const objetoResultado = {
  marca: "",
  modelo: "",
  year: "",
  precio: "",
  minimo: "",
  maximo: "",
  puertas: "",
  color: "",
  transmision: "",
};

//Eventos
Principal();
function Principal() {
  llenarAnos();
  document.addEventListener("DOMContentLoaded", mostrarProductos(autos));
  marca.addEventListener("change", (e) => {
    objetoResultado.marca = e.target.value;
    filtrarAutos();
  });

  year.addEventListener("change", (e) => {
    objetoResultado.year = e.target.value;

    filtrarAutos();
  });

  minimo.addEventListener("change", (e) => {
    objetoResultado.minimo = e.target.value;
    filtrarAutos();
  });

  maximo.addEventListener("change", (e) => {
    objetoResultado.maximo = e.target.value;
    filtrarAutos();
  });

  puertas.addEventListener("change", (e) => {
    objetoResultado.puertas = e.target.value;
    filtrarAutos();
  });

  transmision.addEventListener("change", (e) => {
    objetoResultado.transmision = e.target.value;
    filtrarAutos();
  });

  color.addEventListener("change", (e) => {
    objetoResultado.color = e.target.value;
    filtrarAutos();
  });
}

//Funcines

function limpiarHtml() {
  while (contenedorProductos.firstChild) {
    contenedorProductos.removeChild(contenedorProductos.firstChild);
  }
}

function mostrarProductos(autos) {
  limpiarHtml();
  for (let index = 0; index < autos.length; index++) {
    const { marca, modelo, year, precio, puertas, color, transmision } =
      autos[index];
    const producto = document.createElement("p");
    producto.textContent = `${marca} - ${modelo} - ${year} - ${precio} - ${puertas} - ${color} - ${transmision}`;
    contenedorProductos.appendChild(producto);
  }
}

function filtrarAutos(e) {
  const resultado = autos
    .filter(filtrarPorMarca)
    .filter(filtrarPorYear)
    .filter(filtrarPorMinimo)
    .filter(filtrarPorMaximo)
    .filter(filtrarPorPuertas)
    .filter(filtrarPorTransmision)
    .filter(filtrarPorColor);

  if (resultado.length > 0) {
    mostrarProductos(resultado);
    console.log(resultado);
  } else {
    limpiarHtml();
    const mensajeError = document.createElement("p");
    mensajeError.classList.add("error");
    mensajeError.textContent = "No hay resultados, pruebe con otras opciones";
    contenedorProductos.appendChild(mensajeError);
  }
}

function filtrarPorMarca(auto) {
  if (objetoResultado.marca) {
    return objetoResultado.marca === auto.marca;
  } else {
    return auto;
  }
}

function filtrarPorYear(auto) {
  const { year } = auto;

  if (objetoResultado.year) {
    return parseInt(objetoResultado.year) === year;
  } else {
    return auto;
  }
}

function llenarAnos() {
  for (let i = 2020; i >= 2010; i--) {
    const ano = document.createElement("option");
    ano.value = i;
    ano.textContent = i;
    year.appendChild(ano);
  }
}

function filtrarPorMinimo(auto) {
  const { minimo } = objetoResultado;

  if (minimo) {
    return auto.precio >= minimo;
  } else {
    return auto;
  }
}

function filtrarPorMaximo(auto) {
  const { maximo } = objetoResultado;

  if (maximo) {
    return auto.precio <= maximo;
  } else {
    return auto;
  }
}

function filtrarPorPuertas(auto) {
  const { puertas } = objetoResultado;

  if (puertas) {
    return parseInt(puertas) === auto.puertas;
  } else {
    return auto;
  }
}

function filtrarPorTransmision(auto) {
  const { transmision } = objetoResultado;
  if (transmision) {
    return transmision === auto.transmision;
  } else {
    return auto;
  }
}

function filtrarPorColor(auto) {
  const { color } = objetoResultado;
  if (color) {
    return color === auto.color;
  } else {
    return auto;
  }
}
