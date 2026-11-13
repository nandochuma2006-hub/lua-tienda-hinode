import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section cta">
      <p className="eyebrow">Error 404</p>
      <h1>No encontramos esta página</h1>
      <p className="sub">Puede que el producto ya no esté en el catálogo de este ciclo.</p>
      <Link href="/catalogo" className="btn btn--primary">
        Ir al catálogo
      </Link>
    </section>
  );
}
