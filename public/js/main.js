(async function getBMI() {
  const request = await fetch("/get-bmi");
  const data = await request.json();
  console.log(data);
  populateTable(data);
})();

function populateTable(bmis) {
  let table = document.getElementById("table");
  bmis.forEach((bmi) => {
    let row = document.createElement("tr");

    let value = document.createElement("td");
    let bval = document.createTextNode(bmi.bmi);
    value.appendChild(bval);

    row.appendChild(value);
    table.appendChild(row);
  });
}
