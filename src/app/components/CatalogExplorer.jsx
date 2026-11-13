"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, FAMILIES, PRODUCTS } from "../data/products";
import { EMPTY_FILTERS, PRICE_LIMITS } from "../lib/filters";
import { normalize } from "../lib/format";
import ProductCard from "./ProductCard";

/** Productos con insignias primero (ofertas, nuevos, premiados). */
function highlightScore(product) {
  const badges = product.badges ?? [];
  return (
    (badges.includes("oferta") ? 4 : 0) +
    (badges.includes("nuevo") ? 3 : 0) +
    (badges.length ? 1 : 0)
  );
}

function filterProducts(f) {
  const terms = normalize(f.q).split(/\s+/).filter(Boolean);
  const result = PRODUCTS.filter((product) => {
    if (f.categoria !== "todos" && product.category !== f.categoria) return false;
    // El género solo descarta productos de otro género; los unisex (cremas, sérums…) siguen.
    if (f.genero && product.gender && product.gender !== f.genero) return false;
    if (f.familia && product.family !== f.familia) return false;
    if (f.max && product.price > f.max) return false;
    if (terms.length) {
      const haystack = normalize(
        [
          product.name,
          product.line,
          product.code,
          product.family,
          product.mood,
          product.description,
          product.notes && Object.values(product.notes).join(" "),
        ].join(" "),
      );
      return terms.every((term) => haystack.includes(term));
    }
    return true;
  });

  const sorted = [...result];
  if (f.orden === "precio-asc") sorted.sort((a, b) => a.price - b.price);
  if (f.orden === "precio-desc") sorted.sort((a, b) => b.price - a.price);
  if (f.orden === "nombre") sorted.sort((a, b) => a.name.localeCompare(b.name, "es"));
  if (f.orden === "destacados") sorted.sort((a, b) => highlightScore(b) - highlightScore(a));
  return sorted;
}

/** Refleja los filtros en la URL para poder compartir o volver atrás. */
function syncUrl(f) {
  const params = new URLSearchParams();
  if (f.categoria !== "todos") params.set("categoria", f.categoria);
  if (f.q) params.set("q", f.q);
  if (f.genero) params.set("genero", f.genero);
  if (f.familia) params.set("familia", f.familia);
  if (f.max) params.set("max", String(f.max));
  if (f.orden !== "destacados") params.set("orden", f.orden);
  const query = params.toString();
  window.history.replaceState(null, "", query ? `/catalogo?${query}` : "/catalogo");
}

export default function CatalogExplorer({ initial }) {
  const [filters, setFilters] = useState(initial);
  const results = useMemo(() => filterProducts(filters), [filters]);

  function change(patch) {
    const next = { ...filters, ...patch };
    // Género y familia solo aplican a fragancias.
    if (next.categoria !== "todos" && next.categoria !== "fragancias") {
      next.genero = "";
      next.familia = "";
    }
    setFilters(next);
    syncUrl(next);
  }

  const showScentFilters = filters.categoria === "todos" || filters.categoria === "fragancias";
  const isFiltered =
    filters.categoria !== "todos" || filters.q || filters.genero || filters.familia || filters.max;

  return (
    <div className="explorer">
      <div className="toolbar">
        <label className="search">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="m20 20-3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span className="sr-only">Buscar productos</span>
          <input
            type="search"
            value={filters.q}
            onChange={(e) => change({ q: e.target.value })}
            placeholder="Busca por nombre, aroma o código… (ej. vainilla, Empire, 10209)"
          />
        </label>

        <div className="chips" role="group" aria-label="Categorías">
          {[{ id: "todos", title: "Todos" }, ...CATEGORIES].map((category) => {
            const active = filters.categoria === category.id;
            const total =
              category.id === "todos"
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.category === category.id).length;
            return (
              <button
                key={category.id}
                type="button"
                className={active ? "chip is-active" : "chip"}
                aria-pressed={active}
                onClick={() => change({ categoria: category.id })}
              >
                {category.title} <span className="chip__count">{total}</span>
              </button>
            );
          })}
        </div>

        <div className="selects">
          {showScentFilters && (
            <>
              <div className="segmented" role="group" aria-label="Para quién">
                {[
                  ["", "Todos"],
                  ["Femenino", "Ella"],
                  ["Masculino", "Él"],
                ].map(([value, label]) => (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={filters.genero === value}
                    className={filters.genero === value ? "is-active" : undefined}
                    onClick={() => change({ genero: value })}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <label className="select">
                <span>Aroma</span>
                <select
                  value={filters.familia}
                  onChange={(e) => change({ familia: e.target.value })}
                >
                  <option value="">Todas las familias</option>
                  {FAMILIES.map((family) => (
                    <option key={family.id} value={family.id}>
                      {family.id}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          <label className="select">
            <span>Precio</span>
            <select value={filters.max} onChange={(e) => change({ max: Number(e.target.value) })}>
              <option value={0}>Cualquier precio</option>
              {PRICE_LIMITS.map((limit) => (
                <option key={limit} value={limit}>
                  Hasta Bs {limit}
                </option>
              ))}
            </select>
          </label>

          <label className="select">
            <span>Ordenar</span>
            <select value={filters.orden} onChange={(e) => change({ orden: e.target.value })}>
              <option value="destacados">Destacados</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="nombre">Nombre A–Z</option>
            </select>
          </label>
        </div>
      </div>

      <div className="results-bar">
        <p aria-live="polite">
          <strong>{results.length}</strong> {results.length === 1 ? "producto" : "productos"}
        </p>
        {isFiltered ? (
          <button type="button" className="link-btn" onClick={() => change(EMPTY_FILTERS)}>
            Limpiar filtros
          </button>
        ) : null}
      </div>

      {results.length > 0 ? (
        <div className="products">
          {results.map((product, index) => (
            <ProductCard key={product.code} product={product} priority={index < 4} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>No encontramos productos con esos filtros.</p>
          <button type="button" className="btn btn--outline" onClick={() => change(EMPTY_FILTERS)}>
            Ver todo el catálogo
          </button>
        </div>
      )}
    </div>
  );
}
