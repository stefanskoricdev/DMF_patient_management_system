import { Modal } from "./UI/Modal.js";
import { updateUi } from "./UI/UpdateUi.js";

export class Patients {
  constructor() {
    this.patients = [];
    const modal = new Modal();
    this.addPatientBtnHandler = modal.addPatientBtnHandler;
    //EVENT LISTENERS
    this.addPatientBtnHandler.addEventListener(
      "click",
      this.addPatient.bind(this)
    );
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
    const newPatient = {
      name: patientName.value,
      gender: patientGenderValue[0],
      patientType: patientTypeValue[0],
      contact: patientContact.value,
    };
    this.patients.push(newPatient);
    updateUi();
  }
}

const patients = new Patients();
