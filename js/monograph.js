//  monograph.js
import { currentMode } from "./mode.js";
import { DRUG_LISTS } from "./drugs.js";
import { $, show, hide } from "./dom.js";

export function initMonograph() {
  $("#antimicrobialSelect").onchange = onDrugChange;
}

export function onDrugChange() {
  const drug = $("#antimicrobialSelect").value;
  const box = $("#monographBox");

  if (!drug) return (box.innerHTML = "<p>Select an antimicrobial.</p>");

  const mono =
    currentMode === "adult"
      ? ADULT_MONOGRAPHS[drug] || PEDIATRIC_MONOGRAPHS[drug]
      : PEDIATRIC_MONOGRAPHS[drug] || ADULT_MONOGRAPHS[drug];

  if (!mono) {
    box.innerHTML = `<p><strong>${drug}</strong>: No monograph found.</p>`;
    return;
  }

  let html = `<h3>${drug}</h3>`;

  ["spectrum", "dosing", "renal", "hepatic", "duration", "monitoring"]
    .forEach(key => {
      if (mono[key]) html += `<p><strong>${key}:</strong> ${mono[key]}</p>`;
    });

  box.innerHTML = html;

  const entry = DRUG_LISTS[currentMode].find(d => d.value === drug);
  const isRestricted = entry?.type === "restricted";

  isRestricted ? show($("#serviceResidentCard")) : hide($("#serviceResidentCard"));
}
