// dom.js
export const $ = (id) => document.getElementById(id);
export const $$ = (query) => document.querySelectorAll(query);

export function show(el) {
  el.style.display = "";
}

export function hide(el) {
  el.style.display = "none";
}
