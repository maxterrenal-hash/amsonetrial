//  drugs.js
import { currentMode } from "./mode.js";
import { $ } from "./dom.js";

export const DRUG_LISTS = { adult: [], pediatric: [] };

export function buildDrugLists() {
  DRUG_LISTS.adult = Object.entries(ADULT_MONOGRAPHS).map(([name, m]) => ({
    value: name,
    label: name,
    type: m.restriction || (m.restricted ? "restricted" : "monitored")
  }));

  DRUG_LISTS.pediatric = Object.entries(PEDIATRIC_MONOGRAPHS).map(([name, m]) => ({
    value: name,
    label: name,
    type: m.restriction || (m.restricted ? "restricted" : "monitored")
  }));

  DRUG_LISTS.adult.sort((a,b)=>a.label.localeCompare(b.label));
  DRUG_LISTS.pediatric.sort((a,b)=>a.label.localeCompare(b.label));
}

export function populateDrugOptions() {
  const sel = $("#antimicrobialSelect");
  sel.innerHTML = `<option value="">Select drug</option>`;

  const list = DRUG_LISTS[currentMode];

  list.forEach(d => {
    const opt = document.createElement("option");
    opt.value = d.value;
    opt.textContent = `${d.label} (${d.type === "restricted" ? "Restricted" : "Monitored"})`;
    sel.appendChild(opt);
  });
}
