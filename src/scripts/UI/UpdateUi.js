export function updateUi() {
  const addPatientModalInputs = document.querySelectorAll("input");
  addPatientModalInputs.forEach((input) => {
    if (input.type == "text" || input.type == "tel") {
      input.value = "";
    }
  });
}
