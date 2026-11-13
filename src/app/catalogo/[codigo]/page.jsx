import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "../../components/AddToCartButton";
import ProductCard from "../../components/ProductCard";
import { whatsappLink } from "../../config/tienda";
import {
  BADGE_LABELS,
  getCategory,
  getProduct,
  getRelated,
  productImage,
  PRODUCTS,
} from "../../data/products";
import { formatBs } from "../../lib/format";
import { buildProductQuestion } from "../../lib/order";

// Cada producto se genera como página estática al compilar.
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ codigo: product.code }));
}

export const dynamicParams = false;

export async function generateMetadata(props) {
  const { codigo } = await props.params;
  const product = getProduct(codigo);
  if (!product) return {};
  return {
    title: `${product.name} ${product.size}`,
    description: `${product.description} ${formatBs(product.price)} · cód. ${product.code}`,
  };
}

export default async function ProductPage(props) {
  const { codigo } = await props.params;
  const product = getProduct(codigo);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelated(product);

  return (
    <>
      <nav className="breadcrumb" aria-label="Ruta">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/catalogo?categoria=${category.id}`}>{category.title}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <section className="detail">
        <div className="detail__media">
          <Image
            src={productImage(product)}
            alt={`${product.name} ${product.size}`}
            width={560}
            height={700}
            priority
            sizes="(max-width: 860px) 100vw, 45vw"
          />
          {product.badges?.length ? (
            <div className="detail__badges">
              {product.badges.map((badge) => (
                <span key={badge} className={`badge badge--${badge}`}>
                  {BADGE_LABELS[badge]}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="detail__info">
          <p className="eyebrow">
            {product.line}
            {product.gender && <> · {product.gender}</>}
          </p>
          <h1>{product.name}</h1>
          <p className="detail__meta">
            {product.size} · Código {product.code} · Catálogo pág. {product.page}
          </p>

          <p className="detail__price">
            {product.oldPrice && <s>{formatBs(product.oldPrice)}</s>}
            {formatBs(product.price)}
            {product.oldPrice && (
              <span className="pill">Ahorras {formatBs(product.oldPrice - product.price)}</span>
            )}
          </p>

          <p className="detail__desc">{product.description}</p>

          {product.checkStock && (
            <p className="notice">
              El catálogo indica <strong>consultar disponibilidad</strong>. Agrégalo a tu pedido y
              te confirmo por WhatsApp.
            </p>
          )}

          {(product.family || product.mood) && (
            <div className="tags">
              {product.family && <span className="tag">Familia: {product.family}</span>}
              {product.mood && <span className="tag">Sensación: {product.mood}</span>}
            </div>
          )}

          {product.notes && (
            <div className="pyramid">
              <h2>Pirámide olfativa</h2>
              <dl>
                <div>
                  <dt>Salida</dt>
                  <dd>{product.notes.salida}</dd>
                </div>
                <div>
                  <dt>Corazón</dt>
                  <dd>{product.notes.corazon}</dd>
                </div>
                <div>
                  <dt>Fondo</dt>
                  <dd>{product.notes.fondo}</dd>
                </div>
              </dl>
            </div>
          )}

          <AddToCartButton
            code={product.code}
            name={product.name}
            withQuantity
            className="btn btn--primary"
          />
          <a
            className="btn btn--whatsapp-outline btn--block"
            href={whatsappLink(buildProductQuestion(product))}
            target="_blank"
            rel="noopener"
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--alt">
          <div className="section__head">
            <p className="eyebrow">También te puede gustar</p>
            <h2>Productos parecidos</h2>
          </div>
          <div className="products">
            {related.map((item) => (
              <ProductCard key={item.code} product={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
