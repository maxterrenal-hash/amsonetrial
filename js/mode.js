// mode.js
import { $, $$, show, hide } from "./dom.js";
import { populateDrugOptions } from "./drugs.js";
import { updateEgfr } from "./egfr.js";
import { onDrugChange } from "./monograph.js";

export let currentMode = "adult";

export function initModeToggle() {
  $$("#modeToggle .toggle-btn").forEach(btn => {
    btn.onclick = () => {
      $$("#modeToggle .toggle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentMode = btn.dataset.mode;
      applyModeMode();
    };
  });
}

export function applyModeMode() {
  if (currentMode === "pediatric") show($("#heightField"));
  else hide($("#heightField"));

  $("#egfrLabel").textContent =
    currentMode === "adult"
      ? "Renal Function (CKD-EPI eGFR)"
      : "Renal Function (CKiD eGFR)";

  $("#egfrBox").textContent = "—";

  populateDrugOptions();
  onDrugChange();
  updateEgfr();
}
