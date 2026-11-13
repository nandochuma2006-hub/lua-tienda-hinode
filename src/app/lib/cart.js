"use client";

import { useSyncExternalStore } from "react";
import { getProduct } from "../data/products";

/**
 * Pedido (carrito) compartido por toda la página.
 * Se guarda en el navegador para que no se pierda al recargar.
 */

const STORAGE_KEY = "lua-pedido";
const SERVER_STATE = { items: [], open: false };

let state = SERVER_STATE;
let loaded = false;
const listeners = new Set();

function isValid(item) {
  if (!item || typeof item !== "object") return false;
  const { code, qty } = item;
  return typeof code === "string" && !!getProduct(code) && Number.isInteger(qty) && qty > 0;
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (Array.isArray(saved)) state = { ...state, items: saved.filter(isValid) };
  } catch {
    // Sin almacenamiento disponible: el pedido vive solo en esta visita.
  }
}

function update(next) {
  state = { ...state, ...next };
  if (next.items) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignorar: modo privado o almacenamiento bloqueado.
    }
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  load();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  load();
  return state;
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_STATE);
}

export const cart = {
  add(code, qty = 1) {
    const existing = state.items.find((item) => item.code === code);
    const items = existing
      ? state.items.map((item) =>
          item.code === code ? { ...item, qty: Math.min(item.qty + qty, 99) } : item,
        )
      : [...state.items, { code, qty }];
    update({ items });
  },
  setQty(code, qty) {
    if (qty <= 0) return cart.remove(code);
    update({
      items: state.items.map((item) =>
        item.code === code ? { ...item, qty: Math.min(qty, 99) } : item,
      ),
    });
  },
  remove(code) {
    update({ items: state.items.filter((item) => item.code !== code) });
  },
  clear() {
    update({ items: [] });
  },
  open() {
    update({ open: true });
  },
  close() {
    update({ open: false });
  },
};

/** Líneas del pedido con su producto y subtotal. */
export function cartLines(items) {
  return items.flatMap((item) => {
    const product = getProduct(item.code);
    return product ? [{ ...item, product, subtotal: product.price * item.qty }] : [];
  });
}
