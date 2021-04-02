export function updateUi() {
  const addPatientModalInputs = document.querySelectorAll("input");
  const addPatientModalTextArea = document.querySelector("textarea");
  addPatientModalInputs.forEach((input) => {
    if (input.type == "text" || input.type == "tel") {
      input.value = "";
    }
    if (input.type == "radio") {
      input.checked = false;
    }
  });
  addPatientModalTextArea.value = "";
}

export function addPatientToTable(name, gender, type, contact, elem) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${name}</td>
    <td>${gender}</td>
    <td>${type}</td>
    <td>${contact}</td>
    `;
  elem.append(tr);
}

export function updatePatientTable(patients, table) {
  table.innerHTML = "";
  for (const patient of patients) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${patient.name}</td>
      <td>${patient.gender}</td>
      <td>${patient.patientType}</td>
      <td>${patient.contact}</td>
      `;
    table.append(tr);
  }
}

export function removePatientName(filteredPatientName) {
  const main = document.querySelector("main");
  const patientSheduleLists = main.querySelectorAll("li");
  patientSheduleLists.forEach((list) => {
    const listEl = list.querySelector("p");
    if (list.contains(listEl)) {
      if (list.innerText === filteredPatientName) {
        list.removeChild(listEl);
      }
    }
  });
}
