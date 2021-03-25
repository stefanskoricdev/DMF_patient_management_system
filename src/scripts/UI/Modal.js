import { updateUi } from "./UpdateUi.js";
export class Modal {
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
    this.closeModalBtnHandler = this.modalElements.getElementById(
      "close-modal"
    );
    this.modalBackdrop = this.modalElements.querySelector(".backdrop");
    this.modalInputs = this.modalElements.querySelectorAll("input");
    //EVENT LISTENERS
    this.individualDaysSection.forEach((day) => {
      day.addEventListener("click", (e) => {
        if (e.target.closest("li")) {
          const listEl = e.target.closest("li");
          this.show(listEl);
        }
      });
    }); //Event listeners to all li's inside days section! (Event delegation used)
    this.groupsSectionEvents.forEach((event) => {
      event.addEventListener("click", (e) => {
        if (e.target.closest("li")) {
          const listEl = e.target.closest("li");
          this.show(listEl);
        }
      });
    }); //Event listeners to all li's inside days section!
    this.closeModalBtnHandler.addEventListener("click", this.hide.bind(this));
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
    e.stopPropagation();
    if (
      (e.currentTarget === this.closeModalBtnHandler ||
        e.target === this.modalBackdrop ||
        e.target === this.addPatientBtnHandler) &&
      this.modalElement
    ) {
      updateUi();
      document.body.removeChild(this.modalElement);
    }
  }
}
