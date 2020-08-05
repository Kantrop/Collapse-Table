import data from "./default.js";
import ColapseTable from "./components/CollaspseTable.js";

const table = new ColapseTable(document.querySelector("table tbody"), data);

document
  .querySelector(".table-filter")
  .addEventListener("change", table.filter);
