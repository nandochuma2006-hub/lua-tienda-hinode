import Link from "next/link";
import { TIENDA, WHATSAPP_URL } from "../config/tienda";
import { CATEGORIES } from "../data/products";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <span className="logo__name">{TIENDA.nombre}</span>
          <p className="footer__text">
            {TIENDA.asesora} · Emprendedora Independiente Hinode en {TIENDA.ciudad}.
            {TIENDA.idHinode && <> ID {TIENDA.idHinode}.</>}
          </p>
        </div>

        <div>
          <h2 className="footer__title">Catálogo</h2>
          <ul className="footer__list">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link href={`/catalogo?categoria=${category.id}`}>{category.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Pedidos</h2>
          <ul className="footer__list">
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener">
                Escríbeme por WhatsApp
              </a>
            </li>
            <li>
              <Link href="/#como-pedir">Cómo hacer tu pedido</Link>
            </li>
            <li>
              <Link href="/catalogo">Ver todos los productos</Link>
            </li>
          </ul>
        </div>
      </div>

      <p className="footer__legal">
        Precios del catálogo Hinode Bolivia {TIENDA.ciclo}, sujetos a cambio sin previo aviso.
        Imágenes ilustrativas. Hinode es una marca de Grupo Hinode; esta es la tienda de una
        emprendedora independiente. © {year} {TIENDA.nombre}.
      </p>
    </footer>
  );
}
