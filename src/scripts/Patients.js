import { Modal } from "./UI/Modal.js";
import { updateUi } from "./UI/UpdateUi.js";

export class Patients {
  constructor() {
    this.patients = [
      {
        name: "John Doe",
        gender: "male",
        patientType: "group",
        contact: "065000000",
      },
      {
        name: "Jane Doe",
        gender: "female",
        patientType: "individual",
        contact: "065111111",
      },
    ];
    this.modal = new Modal();
    const addPatientBtnHandler = this.modal.addPatientBtnHandler;
    this.patientsListTable = document.getElementById("patient-list");
    //EVENT LISTENERS
    addPatientBtnHandler.addEventListener("click", this.addPatient.bind(this));
  }

  addPatientToTable(name, gender, type, contact) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${name}</td>
      <td>${gender}</td>
      <td>${type}</td>
      <td>${contact}</td>
      `;
    this.patientsListTable.append(tr);
  }

  updateChart() {
    let ctx = document.getElementById("myChart").getContext("2d");
    let individualAmount = this.patients.filter(
      (patient) => patient.patientType === "individual"
    ).length;
    let groupsAmount = this.patients.filter(
      (patient) => patient.patientType === "group"
    ).length;
    //console.log(patientsClass);
    console.log(`individual: ${individualAmount} , groups: ${groupsAmount}`);
    Chart.defaults.doughnut;
    let myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: [`Group (${groupsAmount})`, `Individual (${individualAmount})`],
        datasets: [
          {
            data: [groupsAmount, individualAmount],
            backgroundColor: ["rgba(95,121,169,1)", "rgba(242,120,10,1)"],
            hoverBackgroundColor: [
              "rgba(95,121,169,0.7)",
              "rgba(242,120,10,0.7)",
            ],
            borderColor: ["rgba(241,235,238,1)", "rgba(241,235,238,1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          labels: {
            fontColor: "rgba(242,120,10,1)",
            fontSize: 16,
          },
        },
      },
    });
  }

  addPatient(event) {
    event.preventDefault();
    const patientName = document.getElementById("patient-name");
    const patientGender = document.getElementsByName("gender");
    let patientGenderValue = [];
    patientGender.forEach((gender) => {
      if (gender.checked) {
        patientGenderValue.push(gender.value);
      }
    });
    const patientType = document.getElementsByName("patient-type");
    let patientTypeValue = [];
    patientType.forEach((type) => {
      if (type.checked) {
        patientTypeValue.push(type.value);
      }
    });
    const patientContact = document.getElementById("patient-contact");
    const targetedList = this.modal.targetedList;
    const newPatient = {
      name: patientName.value,
      gender: patientGenderValue[0],
      patientType: patientTypeValue[0],
      contact: patientContact.value,
    };
    this.patients.push(newPatient);
    targetedList.textContent = `${newPatient.name}`;
    updateUi();
    this.updateChart();
    this.addPatientToTable(
      newPatient.name,
      newPatient.gender,
      newPatient.patientType,
      newPatient.contact
    );
    this.modal.hide;
  }
}
