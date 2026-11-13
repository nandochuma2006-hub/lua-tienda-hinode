import CatalogExplorer from "../components/CatalogExplorer";
import { TIENDA } from "../config/tienda";
import { parseFilters } from "../lib/filters";

export const metadata = {
  title: "Catálogo",
  description: `Todos los productos Hinode del ${TIENDA.ciclo}: busca por nombre, aroma, precio o categoría.`,
};

export default async function CatalogoPage(props) {
  const searchParams = await props.searchParams;
  const initial = parseFilters(searchParams);

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
        {/* La key reinicia los filtros cuando se llega desde otro enlace del menú. */}
        <CatalogExplorer key={JSON.stringify(initial)} initial={initial} />
      </section>
    </>
  );
}
