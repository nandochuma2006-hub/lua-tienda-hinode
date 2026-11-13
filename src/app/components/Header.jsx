"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TIENDA } from "../config/tienda";
import { NAV_ITEMS } from "../data/products";
import { cart, useCart } from "../lib/cart";

export default function Header() {
  const pathname = usePathname();
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const count = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <div className="announce">
        <span>🎄 {TIENDA.campana}</span>
        <span className="announce__sep">·</span>
        <span>Catálogo Hinode {TIENDA.ciclo}</span>
        <span className="announce__sep hide-sm">·</span>
        <span className="hide-sm">Pedidos por WhatsApp</span>
      </div>

      <header className="header">
        <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo__name">{TIENDA.nombre}</span>
          <span className="logo__tag">{TIENDA.lema}</span>
        </Link>

        <nav className="nav" aria-label="Principal">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "is-current" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="cart-btn"
            onClick={() => cart.open()}
            aria-label={`Abrir mi pedido (${count} productos)`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M6 7h12l-1 13H7L6 7Zm3 0a3 3 0 0 1 6 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hide-sm">Mi pedido</span>
            {count > 0 && <span className="cart-btn__count">{count}</span>}
          </button>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
          >
            {menuOpen ? "Cerrar" : "Menú"}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav id="menu-movil" className="mobile-nav" aria-label="Menú móvil">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
