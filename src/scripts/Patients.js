import { AddPatientModal } from "./UI/AddPatientModal.js";
import {
  updateUi,
  addPatientToTable,
  updatePatientInfoModal,
} from "./UI/UpdateUi.js";

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

    this.addPatientModal = new AddPatientModal();
    const addPatientBtnHandler = this.addPatientModal.addPatientBtnHandler;
    const individualDaysSection = this.addPatientModal.individualDaysSection;
    const groupsSectionEvents = this.addPatientModal.groupsSectionEvents;
    this.patientsListTable = document.getElementById("patient-list");

    this.patientInfoModalTempl = document.getElementById(
      "patient-info-modal-template"
    );
    this.patientInfoModalElems = document.importNode(
      this.patientInfoModalTempl.content,
      true
    );
    this.patientInfoModalEl = this.patientInfoModalElems.querySelector(
      ".patient-info-modal"
    );
    this.patientInfoModalBackdrop = this.patientInfoModalEl.querySelector(
      ".backdrop"
    );

    //EVENT LISTENERS
    addPatientBtnHandler.addEventListener("click", this.addPatient.bind(this));
    individualDaysSection.forEach((day) => {
      day.addEventListener("click", (e) => {
        if (e.target.closest("p")) {
          this.showPatientInfoModal(e);
        }
      });
    });
    groupsSectionEvents.forEach((event) => {
      event.addEventListener("click", (e) => {
        if (e.target.closest("p")) {
          this.showPatientInfoModal(e);
        }
      });
    });
    this.patientInfoModalBackdrop.addEventListener(
      "click",
      this.hidePatientInfoModal.bind(this)
    );
  }

  showPatientInfoModal(e) {
    const filteredPatient = this.patients.filter((patient) => {
      return patient.name === e.target.textContent;
    });
    const { name, gender, patientType, contact } = filteredPatient[0];
    if ("content" in document.createElement("template")) {
      document.body.insertAdjacentElement(
        "afterbegin",
        this.patientInfoModalEl
      );
    }
    const patientInfoName = this.patientInfoModalEl.querySelector(
      ".patient-name"
    );
    const patientInfoGender = this.patientInfoModalEl.querySelector(
      ".patient-gender-age"
    );
    const patientInfoContact = this.patientInfoModalEl.querySelector(
      ".patient-contact"
    );
    patientInfoName.textContent = `${name}`;
    patientInfoGender.textContent = `${gender} - 28 years 01 months old`;
    patientInfoContact.textContent = `${contact}`;
  }

  hidePatientInfoModal(e) {
    if (e.target === this.patientInfoModalBackdrop) {
      document.body.removeChild(this.patientInfoModalEl);
    }
  }

  updateChart() {
    let ctx = document.getElementById("myChart").getContext("2d");
    let individualAmount = this.patients.filter(
      (patient) => patient.patientType === "individual"
    ).length;
    let groupsAmount = this.patients.filter(
      (patient) => patient.patientType === "group"
    ).length;
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
    //Accessing form inputs and creating newPatient
    const patientName = document.getElementById("patient-name");
    const patientGender = document.getElementsByName("gender");
    const patientType = document.getElementsByName("patient-type");
    const patientGenderValue = [];
    const patientTypeValue = [];
    patientGender.forEach((gender) => {
      if (gender.checked) {
        patientGenderValue.push(gender.value);
      }
    });
    patientType.forEach((type) => {
      if (type.checked) {
        patientTypeValue.push(type.value);
      }
    });
    const patientContact = document.getElementById("patient-contact");
    const newPatient = {
      name: patientName.value,
      gender: patientGenderValue[0],
      patientType: patientTypeValue[0],
      contact: patientContact.value,
    };
    this.patients.push(newPatient);
    //Locating clicked LI element
    const targetedList = this.addPatientModal.targetedList;
    //Creating new P element and appending it to clicked LI with a newPatient name.
    const patNameEl = document.createElement("p");
    patNameEl.textContent = `${newPatient.name}`;
    targetedList.append(patNameEl);
    updateUi();
    this.updateChart();
    addPatientToTable(
      newPatient.name,
      newPatient.gender,
      newPatient.patientType,
      newPatient.contact,
      this.patientsListTable
    );
    this.addPatientModal.hide;
  }
}
