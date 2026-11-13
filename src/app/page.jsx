import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./components/AddToCartButton";
import ProductCard from "./components/ProductCard";
import { TIENDA, WHATSAPP_URL, whatsappLink } from "./config/tienda";
import { CATEGORIES, FAMILIES, getProduct, PRODUCTS } from "./data/products";
import { formatBs } from "./lib/format";

/** Selección de la portada: ofertas, novedades y premiados. */
const FAVORITE_CODES = ["11081", "10224", "111091", "10209", "60050", "11015", "36086", "10262"];

const GIFT_IDEAS = [
  {
    max: 110,
    title: "Detalles hasta Bs 110",
    text: "Perfumes pocket, cremas de manos y pinceles.",
  },
  { max: 200, title: "Regalos hasta Bs 200", text: "Body splash, cuidado corporal y facial." },
  { max: 400, title: "Perfumes hasta Bs 400", text: "Empire, Grace, Lattitude, Feelin' y más." },
];

const STEPS = [
  {
    title: "Elige tus productos",
    text: "Busca en el catálogo y toca “Agregar”. Tu pedido se guarda aunque cierres la página.",
  },
  {
    title: "Envíalo por WhatsApp",
    text: "Abre “Mi pedido” y envíalo con un toque: llega con códigos, cantidades y total.",
  },
  {
    title: "Coordinamos la entrega",
    text: "Te confirmo disponibilidad, forma de pago y el punto de entrega que te quede mejor.",
  },
];

export default function Home() {
  const offer = getProduct("11066");
  const favorites = FAVORITE_CODES.map((code) => getProduct(code)).filter(Boolean);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero__text">
          <p className="eyebrow">Emprendedora independiente Hinode · {TIENDA.ciudad}</p>
          <h1>
            Belleza que se regala,
            <br />
            <em>aromas que se recuerdan.</em>
          </h1>
          <p className="lead">
            Fragancias, cuidado facial, cuerpo y bienestar del catálogo Hinode. Arma tu pedido aquí
            y envíamelo por WhatsApp en un solo mensaje.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary" href="/catalogo">
              Ver catálogo completo
            </Link>
            <Link className="btn btn--outline" href="/catalogo?categoria=fragancias">
              Buscar mi perfume
            </Link>
          </div>
          <ul className="hero__facts">
            <li>
              <strong>{PRODUCTS.length}</strong> productos del ciclo
            </li>
            <li>
              <strong>Bs</strong> precios del catálogo
            </li>
            <li>
              <strong>1</strong> mensaje para pedir
            </li>
          </ul>
        </div>

        <div className="hero__visual">
          <div className="arch">
            <Image
              src="/banners/portada.jpg"
              alt="Fragancias Empire y Empire Woman en la campaña de Navidad de Hinode"
              fill
              priority
              sizes="(max-width: 720px) 90vw, 45vw"
            />
          </div>
          <div className="float-card">
            <strong>✨ {TIENDA.campana}</strong>
            <span>{TIENDA.ciclo}</span>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="section section--alt" id="categorias">
        <div className="section__head">
          <p className="eyebrow">Explora por categoría</p>
          <h2>Todo lo que te encanta, en un solo lugar</h2>
        </div>
        <div className="categories">
          {CATEGORIES.map((category) => (
            <Link key={category.id} href={`/catalogo?categoria=${category.id}`} className="cat">
              <div className="cat__media">
                <Image
                  src={`/banners/${category.banner}.jpg`}
                  alt=""
                  fill
                  sizes="(max-width: 720px) 50vw, 20vw"
                />
              </div>
              <h3>
                {category.title} <span aria-hidden="true">↗</span>
              </h3>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* MEJOR PRECIO DEL AÑO */}
      <section className="section">
        <div className="spotlight">
          <div className="spotlight__media">
            <Image
              src="/banners/mejor-precio.jpg"
              alt={offer.name}
              fill
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </div>
          <div className="spotlight__text">
            <p className="eyebrow eyebrow--light">Mejor precio del año</p>
            <h2>{offer.name}</h2>
            <p>{offer.description}</p>
            {offer.notes && (
              <p className="spotlight__notes">
                {offer.notes.salida} · {offer.notes.corazon} · {offer.notes.fondo}
              </p>
            )}
            <p className="spotlight__price">
              <s>{formatBs(offer.oldPrice)}</s>
              <strong>{formatBs(offer.price)}</strong>
              <span className="pill">Ahorras {formatBs(offer.oldPrice - offer.price)}</span>
            </p>
            <div className="spotlight__actions">
              <AddToCartButton code={offer.code} name={offer.name} className="btn btn--light" />
              <Link href={`/catalogo/${offer.code}`} className="btn btn--ghost">
                Ver detalle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAVORITOS */}
      <section className="section section--alt">
        <div className="section__head section__head--row">
          <div>
            <p className="eyebrow">Favoritos de la temporada</p>
            <h2>Los más pedidos para Navidad</h2>
          </div>
          <Link className="link" href="/catalogo">
            Ver los {PRODUCTS.length} productos ↗
          </Link>
        </div>
        <div className="products">
          {favorites.map((product) => (
            <ProductCard key={product.code} product={product} />
          ))}
        </div>
      </section>

      {/* ENCUENTRA TU AROMA */}
      <section className="section">
        <div className="finder">
          <div>
            <p className="eyebrow">Mapa olfativo</p>
            <h2>Encuentra tu aroma</h2>
            <p className="sub">
              ¿No sabes cuál elegir? Empieza por cómo quieres sentirte. Cada familia olfativa tiene
              su personalidad.
            </p>
          </div>
          <div className="finder__grid">
            {FAMILIES.map((family) => {
              const total = PRODUCTS.filter((p) => p.family === family.id).length;
              return (
                <Link
                  key={family.id}
                  href={`/catalogo?categoria=fragancias&familia=${family.id}`}
                  className="family"
                >
                  <strong>{family.id}</strong>
                  <span>{family.hint}</span>
                  <small>
                    {total} {total === 1 ? "producto" : "productos"} →
                  </small>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* IDEAS DE REGALO */}
      <section className="section section--alt">
        <div className="section__head">
          <p className="eyebrow">Ideas de regalo</p>
          <h2>Un detalle para cada presupuesto</h2>
        </div>
        <div className="gifts">
          {GIFT_IDEAS.map((gift) => (
            <Link
              key={gift.max}
              href={`/catalogo?max=${gift.max}&orden=precio-desc`}
              className="gift"
            >
              <span className="gift__price">≤ Bs {gift.max}</span>
              <h3>{gift.title}</h3>
              <p>{gift.text}</p>
              <span className="link">Ver opciones ↗</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CÓMO PEDIR */}
      <section className="section" id="como-pedir">
        <div className="section__head">
          <p className="eyebrow">Así de fácil</p>
          <h2>Cómo hacer tu pedido</h2>
        </div>
        <ol className="steps">
          {STEPS.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step__num">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="section section--alt cta">
        <p className="eyebrow">¿Buscas algo que no ves aquí?</p>
        <h2>Te envío el catálogo completo</h2>
        <p className="sub">
          Escríbeme y te comparto el catálogo del ciclo con todos los tonos, líneas y promociones.
        </p>
        <div className="hero__actions">
          <a
            className="btn btn--whatsapp"
            href={whatsappLink("¡Hola! ¿Me puedes enviar el catálogo Hinode de este ciclo?")}
            target="_blank"
            rel="noopener"
          >
            Pedir catálogo por WhatsApp
          </a>
          <a className="btn btn--outline" href={WHATSAPP_URL} target="_blank" rel="noopener">
            Hacer una consulta
          </a>
        </div>
      </section>
    </>
  );
}
