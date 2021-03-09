class PageRender {
  constructor() {
    this.mainList = document.querySelector(".main-list");
    this.navLinks = this.mainList.querySelectorAll("a");
    this.patientsLink = document.querySelector(".patients-link");
    this.main = document.querySelector("main");
    this.mainSections = this.main.querySelectorAll("section");
    this.groupRenderHandler = document.querySelector(".group-patients");
    this.groupsNavLinks = document.querySelectorAll(".physio-link");
    this.groupsShedule = document.querySelector(".groups-shedule");
    this.groupsSheduleArea = this.groupsShedule.querySelectorAll("div");

    this.navLinks.forEach((link) => {
      link.addEventListener("click", this.pageRender.bind(this));
    });
    this.groupRenderHandler.addEventListener(
      "click",
      this.pageRender.bind(this)
    );
    this.groupsNavLinks.forEach((link) => {
      link.addEventListener("click", this.groupsSheduleRender.bind(this));
    });
    this.patientsLink.addEventListener("click", (e) => {
      const lists = e.currentTarget.querySelectorAll("li");
      lists.forEach((list) => {
        list.classList.toggle("active");
      });
    }); //Toggles patients link submenu in main nav
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
  groupsSheduleRender(event) {
    const target = event.currentTarget;
    const handler = target.dataset.handler;
    const targetSection = document.getElementById(handler);
    console.log(handler);
    this.groupsSheduleArea.forEach((area) => {
      area.classList.remove("active");
    });
    targetSection.classList.add("active");
  } //Rendering content inside patients > groups page (between physios)
}

new PageRender();
