export class PageRender {
  constructor() {
    this.mainList = document.querySelector(".main-list");
    this.navLinks = this.mainList.querySelectorAll("a");
    this.patientsLink = document.querySelector(".patients-link");
    this.main = document.querySelector("main");
    this.mainSections = this.main.querySelectorAll("section");
    this.groupRenderHandler = document.querySelector(".group-patients");
    this.groupsNavLinks = document.querySelectorAll(
      ".groups-wrapper .physio-link"
    );
    this.individualRenderHandler = document.querySelector(
      ".individual-patients"
    );
    this.individualNavLinks = document.querySelectorAll(
      ".individual-wrapper .physio-link"
    );
    //EVENT LISTENERS
    this.navLinks.forEach((link) => {
      link.addEventListener("click", this.pageRender.bind(this));
    });
    this.groupRenderHandler.addEventListener(
      "click",
      this.pageRender.bind(this)
    );
    this.groupsNavLinks.forEach((link) => {
      link.addEventListener("click", this.sheduleRender.bind(this));
    });
    this.individualRenderHandler.addEventListener(
      "click",
      this.pageRender.bind(this)
    );
    this.individualNavLinks.forEach((link) => {
      link.addEventListener("click", this.sheduleRender.bind(this));
    });
    this.patientsLink.addEventListener("click", this.submenuRender.bind(this)); //Toggles patients link submenu in main nav
  }

  submenuRender(event) {
    const lists = event.currentTarget.querySelectorAll("li");
    const chevron = this.patientsLink.querySelector(".fa-chevron-down");
    chevron.classList.toggle("active");
    lists.forEach((list) => {
      list.classList.toggle("active");
    });
  }

  pageRender(event) {
    const target = event.currentTarget;
    const handler = target.dataset.handler;
    const targetSection = document.querySelector("." + handler);
    this.mainSections.forEach((section) => {
      section.classList.remove("active");
    });
    targetSection.classList.add("active");
  } // Renders between main pages

  sheduleRender(event) {
    const target = event.currentTarget;
    target.classList.add("active");
    const targetSiblings = target.parentNode.children;
    for (const sibling of targetSiblings) {
      if (!sibling.contains(target)) {
        sibling.classList.remove("active");
      }
    }
    const handler = target.dataset.handler;
    const targetSection = target.closest("section");
    const targetShedule = targetSection.querySelector("." + handler);
    const sheduleArea = targetShedule
      .closest(".patients-shedule")
      .querySelectorAll("div");
    sheduleArea.forEach((area) => {
      area.classList.remove("active");
    });
    targetShedule.classList.add("active");
  } //Rendering content inside patients > groups and individuals page (between physios)
}

new PageRender();
