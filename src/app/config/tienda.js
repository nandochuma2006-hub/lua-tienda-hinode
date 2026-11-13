/**
 * Datos de la tienda. Cambia aquí el número de WhatsApp, el nombre y el ID
 * de emprendedora Hinode: toda la página se actualiza sola.
 */
export const TIENDA = {
  nombre: "lúa",
  lema: "Belleza a tu manera",
  /** Nombre de quien atiende los pedidos. */
  asesora: "Tu asesora Hinode",
  /** Número con código de país, sin "+" ni espacios (591 = Bolivia). */
  whatsapp: "59100000000",
  /** ID de Emprendedora Independiente Hinode (déjalo vacío si no quieres mostrarlo). */
  idHinode: "",
  ciudad: "Bolivia",
  ciclo: "Ciclo 04 · Noviembre 2026",
  campana: "Campaña Navidad",
};

export const WHATSAPP_URL = `https://wa.me/${TIENDA.whatsapp}`;

/** Enlace de WhatsApp con un mensaje ya escrito. */
export function whatsappLink(message) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}
