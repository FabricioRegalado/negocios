import { useState } from "react";

const Menu = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [theme, setTheme] = useState("dark");

  // Colores base
  const primaryColor = "#2C3E50"; // Azul grisáceo oscuro
  const accentColor = "#E74C3C";  // Rojo de acento
  const white = "#FFFFFF";

  // Definición de temas
  const themes = {
    dark: {
      backgroundColor: "#1A1A1A",
      glassBg: "rgba(255,255,255,0.15)",
      borderColor: "rgba(255,255,255,0.25)",
      textColor: white,
      headerGradient: "bg-gradient-to-r from-[#2C3E50] to-[#34495E]",
      footerGradient: "bg-gradient-to-r from-[#34495E] to-[#2C3E50]",
    },
    light: {
      backgroundColor: "#ECF0F1",
      glassBg: "rgba(255,255,255,0.9)",
      borderColor: "rgba(0,0,0,0.1)",
      textColor: primaryColor,
      headerGradient: "bg-gradient-to-r from-[#ECF0F1] to-[#BDC3C7]",
      footerGradient: "bg-gradient-to-r from-[#BDC3C7] to-[#ECF0F1]",
    },
  };

  const themeStyles = themes[theme];

  // Ejemplos de productos (6 platillos)
  const products = [
    { id: 1, name: "Mega Deluxe", price: "$12.99", image: "🍔", description: "Triple carne angus, queso azul y bacon ahumado", rating: 4.9, tags: ["TOP", "NUEVO"], details: "Incluye papas gourmet y salsa especial", variants: ["+Doble Queso $2", "+Guacamole $3"] },
    { id: 2, name: "Hot Dog Clásico", price: "$8.99", image: "🌭", description: "Salchicha artesanal con aderezos especiales", rating: 4.5, tags: ["POPULAR"], details: "Acompañado de papas fritas", variants: ["+Queso $1.5", "+Tocino $2"] },
    { id: 3, name: "Boneless Crispy", price: "$10.99", image: "🍗", description: "Boneless empanizados con salsa especial", rating: 4.7, tags: ["CRUJIENTE"], details: "Incluye papas y bebida", variants: ["+Salsa BBQ $1", "+Extra crujiente $2"] },
    { id: 4, name: "Combo Fiesta", price: "$15.99", image: "🥤🍟", description: "Hamburguesa, papas y bebida", rating: 4.8, tags: ["OFERTA"], details: "Combo completo para compartir", variants: ["+Refresco extra $1", "+Papas extra $1.5"] },
    { id: 5, name: "Wrap Vegetariano", price: "$9.99", image: "🌯", description: "Wrap lleno de vegetales frescos y hummus", rating: 4.6, tags: ["SALUDABLE"], details: "Ideal para una comida ligera", variants: ["+Queso vegano $1"] },
    { id: 6, name: "Ensalada César", price: "$7.99", image: "🥗", description: "Ensalada clásica con pollo a la parrilla", rating: 4.4, tags: ["FRESCA"], details: "Con crutones y aderezo César", variants: ["+Pollo extra $2"] },
  ];

  const totalProducts = products.length;
  const currentProduct = products[currentIndex];

  const nextProduct = () => setCurrentIndex((prev) => (prev + 1) % totalProducts);
  const prevProduct = () => setCurrentIndex((prev) => (prev - 1 + totalProducts) % totalProducts);
  const orderWhatsApp = () => window.open("https://wa.me/3411456773", "_blank");

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 ease-in-out" style={{ backgroundColor: themeStyles.backgroundColor }}>
      {/* Header refinado con transición */}
      <header className={`sticky top-0 z-50 m-4 p-4 rounded-xl shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out ${themeStyles.headerGradient}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold transition-colors duration-500 ease-in-out" style={{ color: themeStyles.textColor }}>
            BURGER MASTERS
          </h1>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 rounded-full transition-transform hover:scale-110 shadow-lg"
            style={{
              background: "linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
              border: `1px solid ${themeStyles.borderColor}`,
            }}
          >
            {theme === "dark" ? "☀" : "🌙"}
          </button>
        </div>
      </header>

      {/* Contenido principal: Carrusel o Grid */}
      {!showAll ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="relative w-full max-w-lg">
            <button
              onClick={prevProduct}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 rounded-full transition-transform hover:scale-110 shadow-lg"
              style={{ backgroundColor: themeStyles.glassBg, border: `1px solid ${themeStyles.borderColor}` }}
            >
              {"<"}
            </button>
            <div
              className="card mx-auto transition-transform duration-500 hover:scale-105"
              style={{
                backgroundColor: themeStyles.glassBg,
                border: `2px solid transparent`,
                borderRadius: "1rem",
                backgroundImage: `linear-gradient(${themeStyles.glassBg}, ${themeStyles.glassBg}), linear-gradient(45deg, ${accentColor}, ${primaryColor})`,
                backgroundOrigin: "border-box",
                backgroundClip: "content-box, border-box",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="p-8 text-center">
                <div className="mb-6">
                  <span className="text-9xl animate-bounce">{currentProduct.image}</span>
                </div>
                <h2 className="text-4xl font-bold mb-2" style={{ color: themeStyles.textColor }}>
                  {currentProduct.name}
                </h2>
                <p className="text-lg mb-4" style={{ color: themeStyles.textColor, opacity: 0.8 }}>
                  {currentProduct.description}
                </p>
                <div className="flex items-center justify-center gap-2 mb-4" style={{ color: accentColor }}>
                  <span className="font-bold">{currentProduct.rating}</span>
                </div>
                <p className="text-3xl font-bold mb-4" style={{ color: accentColor }}>
                  {currentProduct.price}
                </p>
                <div className="flex gap-2 justify-center mb-4">
                  {currentProduct.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: primaryColor, color: white }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mb-6" style={{ color: themeStyles.textColor, opacity: 0.8 }}>
                  {currentProduct.details}
                </p>
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {currentProduct.variants.map((variant, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: "rgba(44, 62, 80, 0.5)", color: white }}>
                      {variant}
                    </span>
                  ))}
                </div>
                <button
                  onClick={orderWhatsApp}
                  className="transition-transform hover:scale-110 shadow-lg"
                  style={{
                    background: "linear-gradient(45deg, #E74C3C, #C0392B)",
                    color: white,
                    padding: "0.75rem 1.5rem",
                    borderRadius: "9999px",
                  }}
                >
                  Pedir por WhatsApp
                </button>
              </div>
            </div>
            <button
              onClick={nextProduct}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 rounded-full transition-transform hover:scale-110 shadow-lg"
              style={{ backgroundColor: themeStyles.glassBg, border: `1px solid ${themeStyles.borderColor}` }}
            >
              {">"}
            </button>
          </div>
          <button
            onClick={() => setShowAll(true)}
            className="mt-6 transition-transform hover:scale-110 shadow-lg"
            style={{
              background: `linear-gradient(45deg, ${primaryColor}, #34495E)`,
              color: white,
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
            }}
          >
            Ver todos los platillos
          </button>
        </div>
      ) : (
        <div className="flex-1 px-4 py-8">
          <div className="mb-6 text-center">
            <button
              onClick={() => setShowAll(false)}
              className="transition-transform hover:scale-110 shadow-lg"
              style={{
                background: `linear-gradient(45deg, ${primaryColor}, #34495E)`,
                color: white,
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
              }}
            >
              Volver al carrusel
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="card transition-transform duration-300 hover:scale-110"
                style={{
                  backgroundColor: themeStyles.glassBg,
                  border: `1px solid ${themeStyles.borderColor}`,
                  borderRadius: "1rem",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="p-6 text-center">
                  <div className="mb-4">
                    <span className="text-7xl">{product.image}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: themeStyles.textColor }}>
                    {product.name}
                  </h3>
                  <p className="mb-2" style={{ color: themeStyles.textColor, opacity: 0.8 }}>
                    {product.description}
                  </p>
                  <p className="text-xl font-bold mb-2" style={{ color: accentColor }}>
                    {product.price}
                  </p>
                  <button
                    onClick={orderWhatsApp}
                    className="transition-transform hover:scale-110 shadow-lg"
                    style={{
                      background: "linear-gradient(45deg, #E74C3C, #C0392B)",
                      color: white,
                      padding: "0.75rem 1.5rem",
                      borderRadius: "9999px",
                    }}
                  >
                    Pedir por WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Indicador de carrusel */}
      {!showAll && (
        <div className="flex flex-col items-center mt-6">
          <div className="flex gap-2">
            {products.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex ? "scale-125 border-2" : ""}`}
                style={{ backgroundColor: idx === currentIndex ? white : "#95A5A6", borderColor: accentColor }}
              ></div>
            ))}
          </div>
          <p className="text-sm mt-2 transition-colors duration-500 ease-in-out" style={{ color: themeStyles.textColor, opacity: 0.8 }}>
            Desliza para ver más productos
          </p>
        </div>
      )}

      {/* Footer definitivo y atractivo */}
      <footer
        className="mt-8 py-4 flex flex-col items-center justify-center gap-2 shadow-md transition-colors duration-500 ease-in-out"
        style={{
          background: themeStyles.footerGradient,
          borderTop: `1px solid ${themeStyles.borderColor}`,
          backdropFilter: "blur(10px)",
        }}
      >
        <p className="text-sm font-medium" style={{ color: themeStyles.textColor, opacity: 0.9 }}>
          by Ing Informatica Fabricio Regalado
        </p>
        <a
          href="https://wa.me/3411456773"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-bold transition-transform hover:scale-105"
          style={{ color: accentColor }}
        >
          <span style={{ fontSize: "1.2rem" }}>☏</span>
          Tel: 341 145 6773
        </a>
      </footer>
    </div>
  );
};

export default Menu;
