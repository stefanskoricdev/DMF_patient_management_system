export function updateUi() {
  const addPatientModalInputs = document.querySelectorAll("input");
  addPatientModalInputs.forEach((input) => {
    if (input.type == "text" || input.type == "tel") {
      input.value = "";
    }
  });
}
export function updatePatientTable(patients, table) {
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
