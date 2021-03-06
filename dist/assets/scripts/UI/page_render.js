const mainList = document.querySelector(".main-list");
const navLinks = mainList.querySelectorAll("a");
const main = document.querySelector("main");
const mainSections = main.querySelectorAll("section");
const groupRenderHandler = document.querySelector(".group-patients");
const groupsNavLinks = document.querySelectorAll(".physio-link");
const groupsShedule = document.querySelector(".groups-shedule");
const groupsSheduleArea = groupsShedule.querySelectorAll("div");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const target = this.dataset.handler;
    const handler = document.querySelector("." + target);
    mainSections.forEach((section) => {
      section.classList.remove("active");
    });
    handler.classList.add("active");
  });
}); // Rendering pages with navigation.

groupRenderHandler.addEventListener("click", () => {
  const target = groupRenderHandler.dataset.handler;
  const handler = document.querySelector("." + target);
  mainSections.forEach((section) => {
    section.classList.remove("active");
  });
  handler.classList.add("active");
}); //Selecting individual or groups page trough patients page

groupsNavLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const target = this.dataset.handler;
    const handler = document.querySelector("." + target);
    groupsSheduleArea.forEach((area) => {
      area.classList.remove("active");
    });
    handler.classList.add("active");
  });
}); //Rendering content inside patients > groups page (between physios)
