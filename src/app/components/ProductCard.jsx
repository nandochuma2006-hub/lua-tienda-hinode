import Image from "next/image";
import Link from "next/link";
import { BADGE_LABELS, productImage } from "../data/products";
import { formatBs } from "../lib/format";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product, priority = false }) {
  const href = `/catalogo/${product.code}`;
  const badge = product.badges?.[0];

  return (
    <article className="product">
      <Link href={href} className="product__media" aria-label={product.name}>
        <Image
          src={productImage(product)}
          alt={`${product.name} ${product.size}`}
          width={560}
          height={700}
          sizes="(max-width: 600px) 50vw, (max-width: 960px) 33vw, 25vw"
          priority={priority}
        />
        {badge && <span className={`badge badge--${badge}`}>{BADGE_LABELS[badge]}</span>}
        {product.gender && (
          <span className="product__gender">{product.gender === "Femenino" ? "Ella" : "Él"}</span>
        )}
      </Link>

      <div className="product__body">
        <p className="product__line">
          {product.line}
          {product.family && <> · {product.family}</>}
        </p>
        <h3>
          <Link href={href}>{product.name}</Link>
        </h3>
        <p className="product__size">
          {product.size} · cód. {product.code}
        </p>
        {product.checkStock && <p className="product__stock">Consultar disponibilidad</p>}

        <div className="product__foot">
          <p className="price">
            {product.oldPrice && <s>{formatBs(product.oldPrice)}</s>}
            {formatBs(product.price)}
          </p>
          <AddToCartButton code={product.code} name={product.name} />
        </div>
      </div>
    </article>
  );
}
