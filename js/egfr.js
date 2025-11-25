// egfr.js
import { $, show, hide } from "./dom.js";
import { currentMode } from "./mode.js";

export function initEgfr() {
  $("#scrNotAvailable").onchange = updateEgfr;
  $("#scr").oninput = updateEgfr;
  $("#age").oninput = updateEgfr;
  $("#sex").onchange = updateEgfr;
  $("#height").oninput = updateEgfr;
}

export function updateEgfr() {
  const pending = $("#scrNotAvailable").checked;
  const out = $("#egfrBox");

  if (pending) return (out.textContent = "Pending");

  let scr = parseFloat($("#scr").value);
  let age = parseFloat($("#age").value);
  let sex = $("#sex").value;
  let height = parseFloat($("#height").value);

  if (!scr || !age || !sex) return (out.textContent = "—");

  scr /= 88.4; // µmol/L to mg/dL

  let value;

  if (currentMode === "adult") {
    value = calcAdultEgfr(age, sex, scr);
  } else {
    if (!height) return (out.textContent = "Enter height");
    value = calcPedsEgfr(height, scr);
  }

  out.textContent = `${value.toFixed(1)} mL/min/1.73m²`;
}

export function calcAdultEgfr(age, sex, scr) {
  const k = sex === "female" ? 0.7 : 0.9;
  const alpha = sex === "female" ? -0.241 : -0.302;

  return 142 *
    Math.pow(Math.min(scr/k,1), alpha) *
    Math.pow(Math.max(scr/k,1), -1.2) *
    Math.pow(0.9938, age) *
    (sex === "female" ? 1.012 : 1);
}

export function calcPedsEgfr(height, scr) {
  return 0.413 * (height / scr);
}
