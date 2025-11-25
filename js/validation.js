// validation.js
import { $ } from "./dom.js";

export function initValidation() {}

export function validateForm(payload) {
  let errors = [];

  if (!payload.patientName) errors.push("Patient name is required.");
  if (!payload.antimicrobial) errors.push("Select an antimicrobial.");
  if (!payload.service) errors.push("Select a service.");
  if (!payload.mode) errors.push("Select adult or pediatric mode.");
  if (!payload.age) errors.push("Age is required.");
  if (!payload.sex) errors.push("Sex is required.");

  if (errors.length) {
    alert(errors.join("\n"));
    return false;
  }

  return true;
}
