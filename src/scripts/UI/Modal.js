import { updateUi } from "./UpdateUi.js";
export class Modal {
  constructor() {
    this.individualSection = document.querySelector(".individual-wrapper");
    this.individualDaysSection = this.individualSection.querySelectorAll(
      ".day"
    );
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
    this.closeModalBtnHandler = this.modalElements.getElementById(
      "close-modal"
    );
    this.modalBackdrop = this.modalElements.querySelector(".backdrop");
    this.modalInputs = this.modalElements.querySelectorAll("input");
    //EVENT LISTENERS
    for (const lists of this.individualDaysSection) {
      const list = lists.querySelectorAll("li");
      for (const listEl of list) {
        listEl.addEventListener("click", this.show.bind(this));
      }
    } //Event listeners to all li's inside days section!
    //this.addPatientBtnHandler.addEventListener("click", this.hide.bind(this));
    this.closeModalBtnHandler.addEventListener("click", this.hide.bind(this));
    this.modalBackdrop.addEventListener("click", this.hide.bind(this));
  }

  show() {
    if ("content" in document.createElement("template")) {
      document.body.insertAdjacentElement("afterbegin", this.modalElement);
    } else {
      throw new Error("Please use newer version browser");
    }
  }

  hide(e) {
    e.stopPropagation();
    if (
      (e.currentTarget === this.closeModalBtnHandler ||
        e.target === this.modalBackdrop) &&
      this.modalElement
    ) {
      updateUi();
      document.body.removeChild(this.modalElement);
    }
  }
}
