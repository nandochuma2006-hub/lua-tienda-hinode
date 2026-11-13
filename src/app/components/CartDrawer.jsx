"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "../config/tienda";
import { productImage } from "../data/products";
import { cart, cartLines, useCart } from "../lib/cart";
import { formatBs } from "../lib/format";
import { buildOrderMessage } from "../lib/order";

export default function CartDrawer() {
  const { items, open } = useCart();
  const [nombre, setNombre] = useState("");
  const [entrega, setEntrega] = useState("");
  const [nota, setNota] = useState("");
  const closeRef = useRef(null);

  const lines = cartLines(items);
  const total = lines.reduce((sum, line) => sum + line.subtotal, 0);
  const count = lines.reduce((sum, line) => sum + line.qty, 0);

  // Cerrar con Escape, enfocar el botón de cerrar y bloquear el scroll del fondo.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") cart.close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const message = buildOrderMessage(lines, { nombre, entrega, nota });

  return (
    <div className={open ? "drawer is-open" : "drawer"} aria-hidden={!open} inert={!open}>
      <div className="drawer__overlay" onClick={() => cart.close()} />

      <aside
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="drawer__head">
          <h2 id="drawer-title">Mi pedido {count > 0 && <span>({count})</span>}</h2>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={() => cart.close()}
            aria-label="Cerrar pedido"
          >
            ✕
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <p className="drawer__empty-icon" aria-hidden="true">
              🛍️
            </p>
            <p>Tu pedido está vacío.</p>
            <p className="muted">
              Agrega productos del catálogo y envíalos por WhatsApp en un solo mensaje.
            </p>
            <Link href="/catalogo" className="btn btn--primary" onClick={() => cart.close()}>
              Ver catálogo
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer__list">
              {lines.map(({ product, qty, subtotal }) => (
                <li key={product.code} className="line">
                  <Image
                    src={productImage(product)}
                    alt=""
                    width={64}
                    height={80}
                    className="line__img"
                  />
                  <div className="line__info">
                    <Link
                      href={`/catalogo/${product.code}`}
                      onClick={() => cart.close()}
                      className="line__name"
                    >
                      {product.name}
                    </Link>
                    <p className="muted">
                      {product.size} · cód. {product.code}
                    </p>
                    <div className="line__row">
                      <div
                        className="qty qty--sm"
                        role="group"
                        aria-label={`Cantidad de ${product.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => cart.setQty(product.code, qty - 1)}
                          aria-label="Quitar uno"
                        >
                          −
                        </button>
                        <span>{qty}</span>
                        <button
                          type="button"
                          onClick={() => cart.setQty(product.code, qty + 1)}
                          aria-label="Agregar uno"
                        >
                          +
                        </button>
                      </div>
                      <strong>{formatBs(subtotal)}</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="line__remove"
                    onClick={() => cart.remove(product.code)}
                    aria-label={`Quitar ${product.name}`}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>

            <div className="drawer__foot">
              <details className="drawer__form">
                <summary>Agregar mis datos (opcional)</summary>
                <label>
                  Nombre
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="¿Cómo te llamas?"
                  />
                </label>
                <label>
                  Zona o punto de entrega
                  <input
                    value={entrega}
                    onChange={(e) => setEntrega(e.target.value)}
                    placeholder="Ej. Zona Sur, cerca de…"
                  />
                </label>
                <label>
                  Nota
                  <input
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                    placeholder="Es para regalo, horario…"
                  />
                </label>
              </details>

              <div className="drawer__total">
                <span>Total</span>
                <strong>{formatBs(total)}</strong>
              </div>
              <a
                className="btn btn--whatsapp btn--block"
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener"
              >
                Enviar pedido por WhatsApp
              </a>
              <button type="button" className="link-btn" onClick={() => cart.clear()}>
                Vaciar pedido
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
