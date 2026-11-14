import { CATEGORIES, FAMILIES } from "../data/products";

export const EMPTY_FILTERS = {
  categoria: "todos",
  q: "",
  genero: "",
  familia: "",
  max: 0,
  orden: "destacados",
};

export const PRICE_LIMITS = [110, 200, 300, 400];

const SORTS = ["destacados", "precio-asc", "precio-desc", "nombre"];

// Última URL que escribió el propio catálogo al filtrar. Sirve para distinguir
// esos cambios de los que llegan desde un enlace del menú.
let lastWrittenQuery = null;

export function markWrittenByExplorer(query) {
  lastWrittenQuery = query;
}

export function wasWrittenByExplorer(query) {
  return query === lastWrittenQuery;
}

/** Convierte los parámetros de la URL en filtros válidos (ignora valores raros). */
export function parseFilters(params) {
  const get = (key) => {
    const value = params[key];
    return typeof value === "string" ? value : "";
  };

  const categoria = get("categoria");
  const genero = get("genero");
  const familia = get("familia");
  const max = Number(get("max"));
  const orden = get("orden");

  return {
    categoria: CATEGORIES.some((c) => c.id === categoria) ? categoria : "todos",
    q: get("q").slice(0, 80),
    genero: genero === "Femenino" || genero === "Masculino" ? genero : "",
    familia: FAMILIES.some((f) => f.id === familia) ? familia : "",
    max: PRICE_LIMITS.includes(max) ? max : 0,
    orden: SORTS.includes(orden) ? orden : "destacados",
  };
}
