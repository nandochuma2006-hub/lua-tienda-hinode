import { TIENDA } from "../config/tienda";
import { formatBs } from "./format";

/** Texto del pedido que se envía por WhatsApp. */
export function buildOrderMessage(lines, customer) {
  const total = lines.reduce((sum, line) => sum + line.subtotal, 0);
  const rows = lines.map(
    ({ product, qty, subtotal }) =>
      `• ${qty} x ${product.name} ${product.size} (cód. ${product.code}) — ${formatBs(subtotal)}` +
      (product.checkStock ? " *consultar disponibilidad*" : ""),
  );

  return [
    `¡Hola! Quiero hacer este pedido del catálogo Hinode (${TIENDA.ciclo}):`,
    "",
    ...rows,
    "",
    `*Total: ${formatBs(total)}*`,
    customer.nombre ? `\nNombre: ${customer.nombre}` : "",
    customer.entrega ? `Entrega: ${customer.entrega}` : "",
    customer.nota ? `Nota: ${customer.nota}` : "",
  ]
    .filter((line, index, all) => line !== "" || all[index - 1] !== "")
    .join("\n")
    .trim();
}

/** Mensaje para preguntar por un solo producto. */
export function buildProductQuestion(product) {
  return `¡Hola! Me interesa *${product.name}* ${product.size} (cód. ${product.code}, ${formatBs(product.price)}). ¿Está disponible?`;
}
