const nextConfig = {
  // Genera la página como archivos estáticos (carpeta "out") para publicarla en Cloudflare Pages.
  output: "export",
  images: {
    // Cloudflare Pages no ejecuta el optimizador de imágenes de Next.js.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
