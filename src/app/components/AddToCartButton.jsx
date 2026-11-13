"use client";

import { useEffect, useRef, useState } from "react";
import { cart } from "../lib/cart";

export default function AddToCartButton({
  code,
  name,
  withQuantity = false,
  className = "btn btn--primary btn--sm",
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function handleAdd() {
    cart.add(code, qty);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
    if (withQuantity) cart.open();
  }

  return (
    <div className={withQuantity ? "add add--detail" : "add"}>
      {withQuantity && (
        <div className="qty" role="group" aria-label="Cantidad">
          <button
            type="button"
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Quitar uno"
          >
            −
          </button>
          <span aria-live="polite">{qty}</span>
          <button
            type="button"
            onClick={() => setQty(Math.min(99, qty + 1))}
            aria-label="Agregar uno"
          >
            +
          </button>
        </div>
      )}
      <button
        type="button"
        className={added ? `${className} is-added` : className}
        onClick={handleAdd}
        aria-label={`Agregar ${name} a mi pedido`}
      >
        {added ? "✓ Agregado" : withQuantity ? "Agregar a mi pedido" : "Agregar"}
      </button>
    </div>
  );
}
