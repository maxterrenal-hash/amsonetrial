//  app.js
import { buildDrugLists } from "./drugs.js";
import { initModeToggle, applyModeMode } from "./mode.js";
import { initEgfr } from "./egfr.js";
import { initMonograph } from "./monograph.js";
import { initDynamicBlocks } from "./dynamicRows.js";
import { initValidation } from "./validation.js";
import { initSubmit } from "./submit.js";

window.addEventListener("DOMContentLoaded", () => {
  buildDrugLists();
  initModeToggle();
  initEgfr();
  initMonograph();
  initDynamicBlocks();
  initValidation();
  initSubmit();

  applyModeMode();
});
