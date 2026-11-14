"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { parseFilters, wasWrittenByExplorer } from "../lib/filters";
import CatalogExplorer from "./CatalogExplorer";

/**
 * Lee los filtros de la URL en el navegador (la página se publica como sitio estático).
 * Reinicia el explorador solo cuando se llega desde un enlace, no cuando el propio
 * explorador actualiza la URL mientras el usuario escribe o filtra.
 */
export default function CatalogFromUrl() {
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const [view, setView] = useState({ query, version: 0 });

  if (query !== view.query) {
    setView({
      query,
      version: wasWrittenByExplorer(query) ? view.version : view.version + 1,
    });
  }

  return (
    <CatalogExplorer
      key={view.version}
      initial={parseFilters(Object.fromEntries(searchParams))}
    />
  );
}
