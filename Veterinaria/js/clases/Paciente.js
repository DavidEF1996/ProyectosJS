export class Paciente {
  constructor() {
    this.pacientes = [];
  }

  agregarCita(cita) {
    this.pacientes = [...this.pacientes, cita];
  }

  eliminarCita(id) {
    this.pacientes = this.pacientes.filter((cita) => cita.id !== id);
  }

  actualizarCita(cita) {
    this.pacientes = this.pacientes.map((paciente) =>
      paciente.id === cita.id ? cita : paciente
    );
  }
}
