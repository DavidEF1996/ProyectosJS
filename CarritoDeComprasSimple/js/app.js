const tarjeta = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciar1 = document.querySelector("#vaciar-carrito");
vaciar1.addEventListener("click", (e) => {
  e.stopPropagation();
  vaciar(e);
});

let arregloCursos = [];

principal();
function principal() {
  tarjeta.addEventListener("click", AgregarEvento);
  carrito.addEventListener("click", EliminarProducto);
}

function AgregarEvento(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const valores = e.target.parentElement.parentElement;
    ExtraerInformacion(valores);
  }
}

function ExtraerInformacion(valores) {
  //Crear objeto

  const cursoSeleccionado = {
    imagen: valores.querySelector("img").src,
    titulo: valores.querySelector("h4").textContent,
    precio: valores.querySelector(".precio span").textContent,
    cantidad: 1,
    id: valores.querySelector("a").getAttribute("data-id"),
  };
  const existe = arregloCursos.some(
    (curso) => curso.id === cursoSeleccionado.id
  ); //retorna true o false
  console.log(existe);
  if (existe) {
    const cantidad = arregloCursos.map((curso) => {
      if (curso.id === cursoSeleccionado.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });

    arregloCursos = [...cantidad];
  } else {
    arregloCursos = [...arregloCursos, cursoSeleccionado];
  }

  console.log(arregloCursos);
  CrearFilaCarrito(arregloCursos);
}

function CrearFilaCarrito() {
  limpiar();
  arregloCursos.forEach((element) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>
      <img src="${element.imagen}" alt="imagen">  
      </td>
    <td> ${element.titulo}</td>
    <td> ${element.precio}</td>
    <td> ${element.cantidad}</td>
    <td> <a href="#" class="borrar-curso" data-id="${element.id}"> X </a> </>
      `;
    contenedorCarrito.appendChild(fila);
  });
}

function limpiar() {
  while (contenedorCarrito.firstChild)
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
}

function vaciar() {
  arregloCursos = [];
  limpiar();
}

function EliminarProducto(e) {
  limpiar();
  e.stopPropagation();
  let arre = [];
  if (e.target.classList.contains("borrar-curso")) {
    const aux = e.target.getAttribute("data-id");
    const nuevo = arregloCursos.map((produ) => {
      if (produ.id === aux && produ.cantidad > 1) {
        produ.cantidad--;
        arre = [...arre, produ];
      }
    });

    console.log("/");
    console.log(arre);
    console.log("/");

    if (arre.length > 0) {
      arre.cantidad--;
      let arr = arregloCursos.filter((producto) => producto.id !== aux);
      arregloCursos = [...arr, ...arre];
    } else {
      let arr = arregloCursos.filter((producto) => producto.id !== aux);
      arregloCursos = arr;
    }
  }
  CrearFilaCarrito();
}
