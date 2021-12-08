(function () {
  const formulario = document.querySelector("#formulario");
  const parametros = new URLSearchParams(window.location.search);
  document.addEventListener("DOMContentLoaded", () => {
    conectarBD();
    setTimeout(() => {
      obtenerUsuario();
    }, 100);

    formulario.addEventListener("submit", obtenerNuevosDatos);
  });

  function obtenerUsuario() {
    //console.log(parametros.get("id"));

    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    const cliente = objectStore.openCursor();

    cliente.onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {
        if (cursor.value.id === Number(parametros.get("id"))) {
          const { nombre, correo, telefono, empresa } = cursor.value;
          console.log(nombre);
          document.querySelector("#nombre").value = nombre;
          document.querySelector("#email").value = correo;
          document.querySelector("#telefono").value = telefono;
          document.querySelector("#empresa").value = empresa;
        }

        cursor.continue();
      }
    };

    cliente.onerror = () => {
      console.log("Hubo un error");
    };
  }

  function obtenerNuevosDatos() {
    const nombre = document.querySelector("#nombre").value;
    const correo = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    if (nombre === "" || correo === "" || telefono === "" || empresa === "") {
      mostrarMensaje("No puede haber campos vacíos", "error");
      return;
    }

    const cliente = {
      nombre,
      correo,
      telefono,
      empresa,
      id: Number(parametros.get("id")),
    };

    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");
    objectStore.put(cliente);
    transaction.onerror = () => {
      mostrarMensaje("Ha ocurrido un error", "error");
    };
    transaction.oncomplete = () => {
      formulario.reset();

      mostrarMensaje("Se agrego correctamente");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    };
  }
})();
