(function () {
  let DB; //Variable con la base de datos
  const listado = document.querySelector("#listado-clientes");
  document.addEventListener("DOMContentLoaded", conectarBD);

  //Conexión a la base de datos
  function conectarBD() {
    console.log("llego");
    const crearBD = window.indexedDB.open("crm", 1); //Se crea la base con el nombre y la versión, si ya existe inicia conexion

    crearBD.onerror = () => {
      console.log("Hubo un error");
    };

    crearBD.onsuccess = () => {
      DB = crearBD.result;
      listar();
    };

    crearBD.onupgradeneeded = (e) => {
      //función que se ejecuta una sola vez para la configuración de la base
      const db = e.target.result;

      const objectStore = db.createObjectStore("crm", {
        keyPath: "id",
        autoIncrement: true,
      });

      objectStore.createIndex("nombre", "nombre", { unique: false });
      objectStore.createIndex("email", "email", { unique: true });
      objectStore.createIndex("telefono", "telefono", { unique: false });
      objectStore.createIndex("empresa", "empresa", { unique: false });
      objectStore.createIndex("id", "id", { unique: true });
      console.log("Base de datos creada");
    };
  }

  function listar() {
    const objec = DB.transaction("crm").objectStore("crm");
    objec.openCursor().onsuccess = function (e) {
      const cursor = e.target.result;
      if (cursor) {
        const { nombre, telefono, correo, empresa, id } = cursor.value;
        listado.innerHTML += ` <tr>
       <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
           <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
           <p class="text-sm leading-10 text-gray-700"> ${correo} </p>
       </td>
       <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
           <p class="text-gray-700">${telefono}</p>
       </td>
       <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
           <p class="text-gray-600">${empresa}</p>
       </td>
       <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
           <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
           <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
       </td>
   </tr>`;
        cursor.continue();
      } else {
        console.log("No hay mas");
      }
    };
  }
})();
