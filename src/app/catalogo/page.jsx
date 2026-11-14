import { Suspense } from "react";
import CatalogExplorer from "../components/CatalogExplorer";
import CatalogFromUrl from "../components/CatalogFromUrl";
import { TIENDA } from "../config/tienda";
import { EMPTY_FILTERS } from "../lib/filters";

export const metadata = {
  title: "Catálogo",
  description: `Todos los productos Hinode del ${TIENDA.ciclo}: busca por nombre, aroma, precio o categoría.`,
};

export default function CatalogoPage() {
  return (
    <>
      <section className="page-head">
        <p className="eyebrow">
          {TIENDA.campana} · {TIENDA.ciclo}
        </p>
        <h1>Catálogo Hinode</h1>
        <p className="sub">
          Busca por nombre, aroma o código, filtra por categoría y precio, y agrega a tu pedido lo
          que te guste.
        </p>
      </section>

      <section className="section section--tight">
        {/* Mientras se leen los filtros de la URL se muestra el catálogo completo. */}
        <Suspense fallback={<CatalogExplorer initial={EMPTY_FILTERS} />}>
          <CatalogFromUrl />
        </Suspense>
      </section>
    </>
  );
}
