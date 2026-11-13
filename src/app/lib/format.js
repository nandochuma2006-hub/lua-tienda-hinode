/** "Bs 1.234" con punto de miles, igual en servidor y navegador. */
export function formatBs(value) {
  return "Bs " + String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/** Minúsculas y sin tildes, para buscar "serum" y encontrar "Sérum". */
export function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}
