import { Lato, Playfair_Display } from "next/font/google";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/footer";
import Header from "./components/Header";
import { TIENDA } from "./config/tienda";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: {
    default: `${TIENDA.nombre} · Productos Hinode en ${TIENDA.ciudad}`,
    template: `%s | ${TIENDA.nombre}`,
  },
  description:
    "Fragancias, cuidado facial, cuerpo, cabello y bienestar del catálogo Hinode. Arma tu pedido y envíalo por WhatsApp.",
  keywords: [
    "Hinode",
    "Hinode Bolivia",
    "perfumes",
    "Empire",
    "Grace",
    "Routine Dermo",
    "catálogo",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${lato.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
