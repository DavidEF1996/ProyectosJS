const formulario = document.querySelector("#formulario");
const resultados = document.querySelector("#resultado");
const espacioPaginacion = document.querySelector("#paginacion");
const registrosPorPágina = 40;
let totalPages;
let iterador;
let paginaActual = 1;

principal();
function principal() {
  formulario.addEventListener("submit", extraer);
}

function extraer(e) {
  e.preventDefault();
  const imagenParametro = document.querySelector("#termino").value;

  if (imagenParametro === "") {
    mostrarAlerta();
  } else {
    consumirApi();
  }
}

function mostrarAlerta(texto) {
  const mensaje = document.createElement("p");
  mensaje.classList.add(
    "bg-red-100",
    "border-red-400",
    "text-red-700",
    "px-4",
    "py-3",
    "rounded",
    "max-w-lg",
    "mx-auto",
    "mt-6",
    "text-center"
  );
  mensaje.innerHTML = `
  <strong class="font-bold">Error!</strong>
  <span class="block sm:inline"> ${texto} </span>
  `;
  formulario.appendChild(mensaje);
  setTimeout(() => {
    mensaje.remove();
  }, 3000);
}

async function consumirApi() {
  const imagenParametro = document.querySelector("#termino").value;
  const key = "24819422-a49c08ae8a8afd23f4417aaea";
  const url = `https://pixabay.com/api/?key=${key}&q=${imagenParametro}&per_page=${registrosPorPágina}&page=${paginaActual}`;

  try {
    const respuesta = await fetch(url);
    const result = await respuesta.json();
    totalPages = calcularPaginas(result.totalHits);
    console.log(totalPages);
    crearImagenes(result.hits);
    crearBotonesIterador(totalPages);
  } catch (error) {
    mostrarAlerta(error);
  }
}

function crearImagenes(result) {
  while (resultados.firstChild) {
    resultados.removeChild(resultados.firstChild);
  }

  console.log(result);
  result.forEach((element) => {
    const { previewURL, likes, views, largeImageURL } = element;
    resultados.innerHTML += `
    <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
    <div class= "bg-white">
        <img class= "w-full" src="${previewURL}">

        <div class="p-4">
            <p class="font-light"> <span class="font-bold"> Me gusta </span> ${likes}</p> 
            <p class="font-light"> <span class="font-bold"> Views </span> ${views}</p>   
            <a class ="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" 
            href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Enlace</a>      
        </div>
      
        </div>
    </div>
    `;
  });
}

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / registrosPorPágina));
}

function* generadorPaginador(total) {
  console.log("llegoa  paginador: " + total);
  for (let index = 1; index <= total; index++) {
    yield index;
  }
}

function crearBotonesIterador(logitud) {
  while (espacioPaginacion.firstChild) {
    espacioPaginacion.removeChild(espacioPaginacion.firstChild);
  }
  iterador = generadorPaginador(logitud);
  while (true) {
    const { value, done } = iterador.next();
    if (done) {
      return;
    }
    const enlace = document.createElement("a");
    enlace.href = "#";
    enlace.dataset.pagina = value;
    enlace.textContent = value;
    enlace.classList.add(
      "siguiente",
      "bg-yellow-400",
      "px-4",
      "py-1",
      "mr-2",
      "font-bold",
      "mb-4",
      "uppercase",
      "rounded"
    );
    enlace.onclick = () => {
      paginaActual = value;
      consumirApi();
    };
    espacioPaginacion.appendChild(enlace);
  }
}
