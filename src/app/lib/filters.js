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
