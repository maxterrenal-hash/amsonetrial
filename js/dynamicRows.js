// dynamicRows.js
import { $, show, hide } from "./dom.js";

export function initDynamicBlocks() {
  $("#addPrevAbxBtn").onclick = addPrevAbxRow;
  $("#addOrganismBtn").onclick = addOrganismBlock;
}

function v(value) {
  return value.trim();
}

/* -----------------------------
   PREVIOUS ANTIBIOTICS
----------------------------- */
export function addPrevAbxRow() {
  const container = $("#prevAbxContainer");

  const row = document.createElement("div");
  row.className = "dyn-row";

  row.innerHTML = `
    <input type="text" placeholder="Drug">
    <input type="text" placeholder="Dose/Freq">
    <input type="date">
    <button class="icon-btn danger">✕</button>
  `;

  row.querySelector("button").onclick = () => row.remove();

  container.appendChild(row);
}

/* -----------------------------
   ORGANISMS + SUSCEPTIBILITY
----------------------------- */
export function addOrganismBlock() {
  const container = $("#organismContainer");

  const block = document.createElement("div");
  block.className = "organism-block";

  block.innerHTML = `
    <div class="organism-header">
      <input type="text" class="org-name" placeholder="Organism name">
      <button class="icon-btn danger remove-organism">✕</button>
    </div>
    <div class="susc-container"></div>
    <button class="icon-btn add-susc">➕</button>
  `;

  block.querySelector(".remove-organism").onclick = () => block.remove();
  block.querySelector(".add-susc").onclick = () => addSusceptibility(block);

  container.appendChild(block);
}

function addSusceptibility(block) {
  const container = block.querySelector(".susc-container");

  const row = document.createElement("div");
  row.className = "susc-row";

  row.innerHTML = `
    <input type="text" placeholder="Drug">
    <select>
      <option>S</option>
      <option>I</option>
      <option>R</option>
    </select>
    <button class="icon-btn danger">✕</button>
  `;

  row.querySelector("button").onclick = () => row.remove();

  container.appendChild(row);
}
