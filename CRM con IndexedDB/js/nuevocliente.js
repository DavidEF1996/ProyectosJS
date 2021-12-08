(function () {
  const formulario = document.querySelector("#formulario");
  document.addEventListener("DOMContentLoaded", () => {
    conectarBD();
    formulario.addEventListener("submit", validarFormulario);
  });

  function validarFormulario(e) {
    e.preventDefault();

    const nombre = document.querySelector("#nombre").value;
    const correo = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    if (nombre === "" || correo === "" || telefono === "" || empresa === "") {
      mostrarMensaje("Los datos no pueden estar vacío", "error");

      return;
    }

    const cliente = {
      nombre,
      correo,
      telefono,
      empresa,
      id: Date.now(),
    };
    crearCliente(cliente);
  }

  function crearCliente(cliente) {
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");
    objectStore.add(cliente);
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
