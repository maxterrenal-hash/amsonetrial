//  submit.js
import { $, show, hide } from "./dom.js";
import { currentMode } from "./mode.js";
import { validateForm } from "./validation.js";

const API =
  "https://script.google.com/macros/s/AKfycbwONf1cXzlTDOOHBcuo0j0us-bb074G_UBXytkGHNp3IpUChWwqUWSjq3TVV264fLac/exec";

export function initSubmit() {
  $("#reviewBtn").onclick = openReviewModal;
  $("#confirmSubmitBtn").onclick = submitData;
  $("#closeModal").onclick = () => hide($("#reviewModalBackdrop"));
}

function collectPayload() {
  return {
    timestamp: new Date().toISOString(),
    mode: currentMode,
    patientName: $("#patientName").value,
    service: $("#service").value,
    sex: $("#sex").value,
    age: $("#age").value,
    height: $("#height").value,
    scr: $("#scrNotAvailable").checked ? "" : $("#scr").value,
    egfr: $("#egfrBox").textContent,
    antimicrobial: $("#antimicrobialSelect").value,
    indication: $("#indication").value,
    basis: $("#basisIndication").value,
    prevAbx: collectPrevAbx(),
    organisms: collectOrganisms()
  };
}

function collectPrevAbx() {
  return [...document.querySelectorAll("#prevAbxContainer .dyn-row")].map(r => ({
    drug: r.children[0].value,
    dose: r.children[1].value,
    date: r.children[2].value
  }));
}

function collectOrganisms() {
  return [...document.querySelectorAll(".organism-block")].map(b => ({
    name: b.querySelector(".org-name").value,
    susc: [...b.querySelectorAll(".susc-row")].map(r => ({
      drug: r.children[0].value,
      result: r.children[1].value
    }))
  }));
}

function openReviewModal() {
  const payload = collectPayload();
  if (!validateForm(payload)) return;

  $("#reviewContent").textContent = JSON.stringify(payload, null, 2);
  show($("#reviewModalBackdrop"));
}

async function submitData() {
  const payload = collectPayload();
  hide($("#reviewModalBackdrop"));

  try {
    const res = await fetch(API, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    alert("Submitted successfully.");
  } catch (err) {
    alert("Error submitting data.");
  }
}
