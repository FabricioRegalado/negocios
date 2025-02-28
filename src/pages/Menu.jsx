import { useState, useEffect } from "react";

const Menu = () => {
  // Estados generales
  const [theme, setTheme] = useState("dark");
  const [activeCategory, setActiveCategory] = useState("Hamburguesas");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedModifications, setSelectedModifications] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Colores basados en tonos amarillos
  const yellowBase = "#F1C40F"; // Amarillo vibrante
  const accentColor = "#F39C12"; // Amarillo oscuro
  const white = "#FFFFFF";
  const darkText = "#2C3E50";

  // Definición de temas (oscuro y claro)
  const themes = {
    dark: {
      backgroundColor: "#1F1F1F",
      glassBg: "rgba(241,196,15,0.2)",
      borderColor: "rgba(241,196,15,0.3)",
      textColor: white,
      headerGradient: "bg-gradient-to-r from-[#F1C40F] to-[#F39C12]",
      footerGradient: "bg-gradient-to-r from-[#F39C12] to-[#F1C40F]",
    },
    light: {
      backgroundColor: "#FFF9E6",
      glassBg: "rgba(255,249,230,0.8)",
      borderColor: "rgba(241,196,15,0.5)",
      textColor: darkText,
      headerGradient: "bg-gradient-to-r from-[#F1C40F] to-[#F39C12]",
      footerGradient: "bg-gradient-to-r from-[#F39C12] to-[#F1C40F]",
    },
  };

  const themeStyles = themes[theme];

  // Opciones para personalización
  const modificationsOptions = [
    "Sin cebolla",
    "Sin queso",
    "Sin pepinillos",
    "Extra salsa",
    "Extra carne",
  ];

  const extrasOptions = [
    "Queso Amarillo",
    "Queso Manchego",
    "Queso Asadero",
    "Piña",
    "Panela",
    "Pepperoni",
    "Salchicha",
    "Rajas",
    "Carne de Res",
    "Champiñones",
    "Queso Fundido Normal",
    "Queso Fundido BBQ",
    "Queso Fundido Hongo y Tierra",
    "Queso Fundido Mango Habanero",
    "Queso Fundido Piña Habanero",
    "Queso Fundido Buffalo",
    "Queso Fundido Pizza",
  ];

  // Función para agregar el producto personalizado al carrito
  const addToCart = () => {
    if (selectedProduct) {
      const item = {
        product: selectedProduct,
        modifications: selectedModifications,
        extras: selectedExtras,
      };
      setCart([...cart, item]);
      setSelectedProduct(null);
      setSelectedModifications([]);
      setSelectedExtras([]);
    }
  };

  // Función para confirmar el pedido del carrito y redirigir a WhatsApp
  const confirmCartOrder = () => {
    if (cart.length === 0) return;
    let message = "Hola, quiero pedir:\n";
    cart.forEach((item) => {
      const mods = item.modifications.length > 0 ? " (" + item.modifications.join(", ") + ")" : "";
      const extras = item.extras.length > 0 ? " Extras: " + item.extras.join(", ") : "";
      message += `- ${item.product.name}${mods}${extras} - ${item.product.price}\n`;
    });
    message += "Cada platillo incluye papas.";
    window.open("https://wa.me/3411456773?text=" + encodeURIComponent(message), "_blank");
    setCart([]);
    setShowCart(false);
  };

  // Datos del menú divididos en categorías
  const menuData = {
    Hamburguesas: [
      { name: "Hamburguesa Res", price: "$65", image: "🍔", description: "Clásica con carne de res" },
      { name: "Hamburguesa Tropical", price: "$75", image: "🍔", description: "Carne con piña y aderezos" },
      { name: "Hamburguesa Sencilla", price: "$65", image: "🍔", description: "Opción básica con queso" },
      { name: "Hamburguesa Panela", price: "$70", image: "🍔", description: "Carne y queso panela a la plancha" },
      { name: "Hamburguesa Pollo", price: "$65", image: "🍔", description: "Pollo empanizado crujiente" },
      { name: "Hamburguesa Piña Habanero", price: "$80", image: "🍔", description: "Toque picante y dulce" },
      { name: "Hamburguesa Buffalo", price: "$75", image: "🍔", description: "Salsa buffalo intensa" },
      { name: "Hamburguesa BBQ", price: "$70", image: "🍔", description: "Carne bañada en salsa BBQ" },
      { name: "Hamburguesa Hawaiana", price: "$75", image: "🍔", description: "Jamón, piña y queso fundido" },
      { name: "Hamburguesa Mar y Tierra", price: "$85", image: "🍔", description: "Carne + camarón, perfecta combinación" },
      { name: "Hamburguesa Árabe", price: "$70", image: "🍔", description: "Con especias y salsas estilo árabe" },
      { name: "Hamburguesa Camarón", price: "$90", image: "🍔", description: "Camarones empanizados especiales" },
    ],
    Hotdogs: [
      { name: "HotDog Normal", price: "$30", image: "🌭", description: "Clásico con salchicha y aderezos" },
      { name: "HotDog Campesino", price: "$40", image: "🌭", description: "Con verduras y queso gratinado" },
      { name: "HotDog Gorrion", price: "$35", image: "🌭", description: "Con papas a la francesa" },
      { name: "HotDog Papas", price: "$40", image: "🌭", description: "Con papas fritas y salsa especial" },
      { name: "HotDog Sinaloa", price: "$55", image: "🌭", description: "Estilo Sinaloa con jalapeños" },
      { name: "HotDog Pizza", price: "$60", image: "🌭", description: "Salsa de tomate, pepperoni y queso" },
    ],
    Alitas: [
      { name: "Alitas (10 piezas)", price: "$80", image: "🍗", description: "10 piezas con salsa BBQ o Buffalo" },
    ],
    Extras: [
      { name: "Queso Amarillo", price: "$10", image: "🧀", description: "Porción adicional" },
      { name: "Queso Manchego", price: "$10", image: "🧀", description: "Porción de queso manchego" },
      { name: "Queso Asadero", price: "$10", image: "🧀", description: "Porción de queso asadero" },
      { name: "Piña", price: "$10", image: "🍍", description: "Extra de piña" },
      { name: "Panela", price: "$10", image: "🧀", description: "Queso panela asado" },
      { name: "Pepperoni", price: "$10", image: "🍕", description: "Rebanadas de pepperoni" },
      { name: "Salchicha", price: "$10", image: "🌭", description: "Extra de salchicha" },
      { name: "Rajas", price: "$10", image: "🌶", description: "Rajas de chile poblano" },
      { name: "Carne de Res", price: "$10", image: "🥩", description: "Extra de carne" },
      { name: "Champiñones", price: "$10", image: "🍄", description: "Porción de champiñones" },
      { name: "Queso Fundido Normal", price: "$60", image: "🧀", description: "Clásico queso fundido" },
      { name: "Queso Fundido BBQ", price: "$80", image: "🧀", description: "Con salsa BBQ" },
      { name: "Queso Fundido Hongo y Tierra", price: "$80", image: "🧀", description: "Champiñones y carne" },
      { name: "Queso Fundido Mango Habanero", price: "$80", image: "🧀", description: "Agridulce y picante" },
      { name: "Queso Fundido Piña Habanero", price: "$80", image: "🧀", description: "Fusión de piña y chile" },
      { name: "Queso Fundido Buffalo", price: "$80", image: "🧀", description: "Con salsa buffalo" },
      { name: "Queso Fundido Pizza", price: "$70", image: "🧀", description: "Con pepperoni y salsa de tomate" },
    ],
    Bebidas: [
      { name: "Aguas Frescas", price: "$20", image: "🥤", description: "Sabor del día" },
      { name: "Refrescos", price: "$20", image: "🥤", description: "Variedad de refrescos" },
    ],
  };

  const currentItems = menuData[activeCategory] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 ease-in-out" style={{ backgroundColor: themeStyles.backgroundColor }}>
      {/* Header */}
      <header className={`sticky top-0 z-50 m-4 p-6 rounded-xl shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out ${themeStyles.headerGradient}`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold transition-colors duration-500 ease-in-out" style={{ color: themeStyles.textColor }}>
              MONCHIES BURGERS
            </h1>
            <p className="text-sm font-medium" style={{ color: themeStyles.textColor, opacity: 0.8 }}>
              Del sabor a la perfección
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 rounded-full transition-transform hover:scale-110 shadow-lg"
              style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))", border: `1px solid ${themeStyles.borderColor}` }}
            >
              {theme === "dark" ? "☀" : "🌙"}
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="p-3 rounded-full transition-transform hover:scale-110 shadow-lg"
              style={{ background: "linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))", border: `1px solid ${themeStyles.borderColor}` }}
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>
        {/* Categorías */}
        <nav className="mt-4 flex gap-2 flex-wrap">
          {Object.keys(menuData).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`transition-transform hover:scale-105 px-4 py-2 rounded-full font-bold shadow-lg ${activeCategory === cat ? "scale-110" : ""}`}
              style={{
                background: activeCategory === cat ? `linear-gradient(45deg, ${yellowBase}, #D4AC0D)` : themeStyles.glassBg,
                color: activeCategory === cat ? white : themeStyles.textColor,
                border: `1px solid ${themeStyles.borderColor}`,
              }}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      {/* Main: Productos */}
      <main className="flex-1 px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentItems.map((item, index) => (
            <div
              key={index}
              className="transition-transform duration-300 hover:scale-110 relative p-6"
              style={{
                backgroundColor: themeStyles.glassBg,
                border: `1px solid ${themeStyles.borderColor}`,
                borderRadius: "1rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="text-center">
                <div className="mb-4 text-7xl">{item.image}</div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: themeStyles.textColor }}>{item.name}</h3>
                <p className="mb-2" style={{ color: themeStyles.textColor, opacity: 0.8 }}>{item.description}</p>
                <p className="text-xl font-bold mb-2" style={{ color: accentColor }}>{item.price}</p>
                <button
                  onClick={() => setSelectedProduct(item)}
                  className="transition-transform hover:scale-105 shadow-lg"
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
      </main>

      {/* Footer */}
      <footer className="mt-8 py-4 flex flex-col items-center justify-center gap-2 shadow-md transition-colors duration-500 ease-in-out"
        style={{
          background: themeStyles.footerGradient,
          borderTop: `1px solid ${themeStyles.borderColor}`,
          backdropFilter: "blur(10px)",
        }}>
        <p className="text-sm font-medium" style={{ color: themeStyles.textColor, opacity: 0.9 }}>
          by Ing Informatica Fabricio Regalado
        </p>
        <a href="https://wa.me/3411456773" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-bold transition-transform hover:scale-105"
          style={{ color: accentColor }}>
          <span style={{ fontSize: "1.2rem" }}>☏</span>
          Tel: 341 145 6773
        </a>
      </footer>

      {/* Modal para personalización */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Personaliza tu pedido</h2>
            <p className="mb-4">
              <strong>{selectedProduct.name}</strong> - {selectedProduct.price}
            </p>
            
            {/* Modificaciones */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Modificaciones</p>
              {modificationsOptions.map((option) => (
                <div key={option} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`mod-${option}`}
                    className="mr-2"
                    checked={selectedModifications.includes(option)}
                    onChange={() => {
                      if (selectedModifications.includes(option)) {
                        setSelectedModifications(selectedModifications.filter((mod) => mod !== option));
                      } else {
                        setSelectedModifications([...selectedModifications, option]);
                      }
                    }}
                  />
                  <label htmlFor={`mod-${option}`} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>

            {/* Extras */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Extras Adicionales</p>
              {extrasOptions.map((option) => (
                <div key={option} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`extra-${option}`}
                    className="mr-2"
                    checked={selectedExtras.includes(option)}
                    onChange={() => {
                      if (selectedExtras.includes(option)) {
                        setSelectedExtras(selectedExtras.filter((ex) => ex !== option));
                      } else {
                        setSelectedExtras([...selectedExtras, option]);
                      }
                    }}
                  />
                  <label htmlFor={`extra-${option}`} className="text-sm">
                    {option}
                  </label>
                </div>
              ))}
            </div>

            <p className="mb-4 text-sm italic">Cada platillo incluye papas.</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedModifications([]);
                  setSelectedExtras([]);
                }}
                className="px-4 py-2 rounded shadow hover:shadow-md transition"
              >
                Cancelar
              </button>
              <button
                onClick={addToCart}
                className="px-4 py-2 rounded bg-green-500 text-white shadow hover:bg-green-600 transition"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Carrito */}
      {showCart && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
            {cart.length === 0 ? (
              <p className="mb-4">Tu carrito está vacío.</p>
            ) : (
              <div className="mb-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="mb-2 border-b pb-2">
                    <p className="font-semibold">{item.product.name} - {item.product.price}</p>
                    {item.modifications.length > 0 && (
                      <p className="text-sm">Modificaciones: {item.modifications.join(", ")}</p>
                    )}
                    {item.extras.length > 0 && (
                      <p className="text-sm">Extras: {item.extras.join(", ")}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCart(false)} className="px-4 py-2 rounded shadow hover:shadow-md transition">
                Cerrar
              </button>
              {cart.length > 0 && (
                <button onClick={confirmCartOrder} className="px-4 py-2 rounded bg-green-500 text-white shadow hover:bg-green-600 transition">
                  Confirmar Pedido
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
