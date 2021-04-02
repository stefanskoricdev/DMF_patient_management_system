import { PageRender } from "./scripts/UI/PageRender.js";
import { AddPatientModal } from "./scripts/UI/AddPatientModal.js";
import { Patients } from "./scripts/Patients.js";
import { updatePatientTable } from "./scripts/UI/UpdateUi.js";

class App {
  constructor() {
    this.patients = new Patients();
    this.updateChart = this.patients.updateChart();
    this.updatePatientTable = updatePatientTable(
      this.patients.patients,
      this.patients.patientsListTableBody
    );
  }
}
new App();
