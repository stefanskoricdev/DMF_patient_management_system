import { updateUi } from "./UpdateUi.js";
import { Patients } from "../Patients.js";
export class AddPatientModal {
  constructor() {
    this.individualSection = document.querySelector(".individual-wrapper");
    this.individualDaysSection = this.individualSection.querySelectorAll(
      ".day"
    );
    this.groupsSection = document.querySelector(".groups-wrapper");
    this.groupsSectionEvents = document.querySelectorAll(".events");
    this.modalTemplateEl = document.getElementById(
      "add-patient-modal-template"
    );
    this.modalElements = document.importNode(
      this.modalTemplateEl.content,
      true
    );
    this.modalElement = this.modalElements.querySelector(".add-patient-modal");
    this.addPatientBtnHandler = this.modalElements.getElementById(
      "add-patient-btn"
    );
    this.closeModalBtnHandler = this.modalElements.querySelectorAll(
      ".close-modal"
    );
    this.modalBackdrop = this.modalElements.querySelector(".backdrop");
    this.addPatientFirstPage = this.modalElement.querySelector(".first-page");
    this.addPatientSecondPage = this.modalElement.querySelector(".second-page");
    this.switchAddPatientPageBtns = this.modalElement.querySelectorAll(
      "button"
    );
    //this.modalInputs = this.modalElements.querySelectorAll("input");
    //EVENT LISTENERS
    this.individualDaysSection.forEach((day) => {
      day.addEventListener("click", (e) => {
        if (e.target.closest("li")) {
          const listEl = e.target.closest("li");
          const patNameEl = listEl.querySelector("p");
          if (!listEl.contains(patNameEl)) {
            this.show(listEl);
          }
        }
      });
    }); //Event listeners to all li's inside days section! (Event delegation used)
    this.groupsSectionEvents.forEach((event) => {
      event.addEventListener("click", (e) => {
        if (e.target.closest("li")) {
          const listEl = e.target.closest("li");
          const patNameEl = listEl.querySelector("p");
          if (!listEl.contains(patNameEl)) {
            this.show(listEl);
          }
        }
      });
    }); //Event listeners to all li's inside days section!
    this.switchAddPatientPageBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this.addPatientFirstPage.classList.toggle("active");
        this.addPatientSecondPage.classList.toggle("active");
      });
    }); //Switches between pages inside ADD PATIENT MODAL
    this.closeModalBtnHandler.forEach((closeBtn) => {
      closeBtn.addEventListener("click", this.hide.bind(this));
    });
    this.modalBackdrop.addEventListener("click", this.hide.bind(this));
  }

  show(listEl) {
    this.targetedList = listEl;
    if ("content" in document.createElement("template")) {
      document.body.insertAdjacentElement("afterbegin", this.modalElement);
      this.hide.bind(this);
    } else {
      throw new Error("Please use newer version browser");
    }
  }

  hide(e) {
    if (
      e.currentTarget === this.closeModalBtnHandler[0] ||
      e.currentTarget === this.closeModalBtnHandler[1] ||
      e.target === this.modalBackdrop ||
      e.target === this.addPatientBtnHandler
    ) {
      updateUi();
      document.body.removeChild(this.modalElement);
    }
  }
}
