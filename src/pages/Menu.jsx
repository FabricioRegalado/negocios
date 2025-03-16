import { useState, useEffect } from "react";
import {
  FaPlusCircle,
  FaShoppingCart,
  FaTrashAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaSpinner,
  FaInstagram, 
  FaLinkedin
} from "react-icons/fa";
import { MdWbSunny, MdNightsStay } from "react-icons/md";

const Menu = () => {
  // Inyectamos estilos para la animación del overlay (entrada y salida)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes iosOverlayCycle {
        0% { opacity: 0; transform: scale(0.5); }
        30% { opacity: 1; transform: scale(1.1); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5); }
      }
      .animate-iosOverlayCycle {
        animation: iosOverlayCycle 1.5s ease-in-out forwards;
      }
      @keyframes gradientBG {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-gradientBG {
        background: linear-gradient(-45deg, #F59E0B, #FBBF24, #F97316, #EF4444);
        background-size: 400% 400%;
        animation: gradientBG 8s ease infinite;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 1s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Estado para pantalla de carga
  const [loading, setLoading] = useState(true);
  // Estado para overlay de producto agregado (estilo iOS)
  const [justAdded, setJustAdded] = useState({});

  // Estados generales
  const [theme, setTheme] = useState("dark");
  const [activeCategory, setActiveCategory] = useState("Hamburguesas");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedModifications, setSelectedModifications] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Colores y estilos
  const yellowBase = "#F1C40F";
  const accentColor = "#F39C12";
  const white = "#FFFFFF";
  const darkText = "#2C3E50";

  const themesConfig = {
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

  const themeStyles = themesConfig[theme];

  // Función para abrir WhatsApp
  const orderWhatsApp = (message) =>
    window.open("https://wa.me/3411558024?text=" + encodeURIComponent(message), "_blank");

  // Opciones de personalización
  const modificationsOptions = [
    "Sin cebolla",
    "Sin queso",
    "Sin pepinillos",
    "Extra salsa",
    "Extra carne",
  ];

  const modificationsOptionsHamburguesas = [
    "Sin queso",
    "Sin cebolla",
    "Sin pepinillos",
    "Sin jitomate",
    "Sin catsup",
    "Sin mostaza",
    "Sin mayonesa",
  ];

  const modificationsOptionsHotdogs = [
    "Sin cebolla",
    "Sin catsup",
    "Sin mostaza",
    "Sin mayonesa",
  ];

  const extrasOptions = [
    { name: "Queso Amarillo", price: "$10", image: "🧀" },
    { name: "Queso Manchego", price: "$10", image: "🧀" },
    { name: "Queso Asadero", price: "$10", image: "🧀" },
    { name: "Piña", price: "$10", image: "🍍" },
    { name: "Panela", price: "$10", image: "🧀" },
    { name: "Pepperoni", price: "$10", image: "🍕" },
    { name: "Salchicha", price: "$10", image: "🌭" },
    { name: "Rajas", price: "$10", image: "🌶" },
    { name: "Carne de Res", price: "$10", image: "🥩" },
    { name: "Champiñones", price: "$10", image: "🍄" },
    { name: "Papa a la francesa", price: "$50", image: "🍟" },
    { name: "Salchipapas", price: "$55", image: "🍟" },
    { name: "Aderezo", price: "$10", image: "🥫" },
    { name: "Jamón", price: "$5", image: "🥓" },
    { name: "Longaniza", price: "$10", image: "🌭" },
  ];

  const extrasOptionsHotdogs = [
    { name: "Queso", price: "$10", image: "🧀" },
    { name: "Bacon", price: "$10", image: "🥓" },
    { name: "Chiles", price: "$10", image: "🌶" },
    { name: "Extra salchicha", price: "$10", image: "🌭" },
  ];

  const quesosFundidos = [
    { name: "Queso Fundido Normal", price: "$60", image: "🧀", type: "direct" },
    { name: "Queso Fundido Mar y Tierra", price: "$80", image: "🧀", type: "direct" },
    { name: "Queso Fundido Hawaiano", price: "$80", image: "🧀", type: "direct" },
    { name: "Queso Fundido Buffalo", price: "$80", image: "🧀", type: "direct" },
    { name: "Queso Fundido BBQ", price: "$80", image: "🧀", type: "direct" },
    { name: "Queso Fundido Mango Habanero", price: "$80", image: "🧀", type: "direct" },
    { name: "Queso Fundido Piña Habanero", price: "$80", image: "🧀", type: "direct" },
    { name: "Queso Fundido Pizza", price: "$70", image: "🧀", type: "direct" },
  ];

  // Función para agregar productos directos (Bebidas, Quesos Fundidos)
  const addDirectToCart = (item) => {
    setCart([...cart, { product: item, modifications: [], extras: [], selectedDrink: "" }]);
    setJustAdded((prev) => ({ ...prev, [item.name]: true }));
    setTimeout(() => {
      setJustAdded((prev) => {
        const copy = { ...prev };
        delete copy[item.name];
        return copy;
      });
    }, 1500);
  };

  // Función para agregar producto con personalización
  const addToCartHandler = (customization) => {
    if (selectedProduct) {
      const item = {
        product: selectedProduct,
        modifications: customization.modifications || [],
        extras: customization.extras || [],
        selectedDrink: customization.selectedDrink || "",
      };
      setCart([...cart, item]);
      setJustAdded((prev) => ({ ...prev, [selectedProduct.name]: true }));
      setTimeout(() => {
        setJustAdded((prev) => {
          const copy = { ...prev };
          delete copy[selectedProduct.name];
          return copy;
        });
      }, 1500);
      setSelectedProduct(null);
      setSelectedModifications([]);
      setSelectedExtras([]);
      setSelectedDrink("");
    }
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const calculateItemTotal = (item) => {
    const base = parseFloat(item.product.price.replace("$", ""));
    const extrasCost = item.extras.length * 10;
    return base + extrasCost;
  };

  const calculateCartTotal = () =>
    cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);

  const confirmCartOrder = () => {
    if (cart.length === 0) return;
    let message = "Hola, quiero pedir:\n";
    cart.forEach((item) => {
      const mods = item.modifications.length > 0 ? " (" + item.modifications.join(", ") + ")" : "";
      const extras = item.extras.length > 0 ? " Extras: " + item.extras.join(", ") : "";
      const drink = item.selectedDrink ? " Refresco: " + item.selectedDrink : "";
      const itemTotal = calculateItemTotal(item);
      message += `- ${item.product.name}${mods}${extras}${drink} - ${item.product.price} + Extras: $${item.extras.length * 10} = $${itemTotal}\n`;
    });
    const total = calculateCartTotal();
    message += `\nTotal: $${total}\n\nPor favor, indique su dirección.`;
    orderWhatsApp(message);
    setCart([]);
    setShowCart(false);
  };

  // Datos del menú
  const menuData = {
    Hamburguesas: [
      {
        name: "Hamburguesa 3 Carnes",
        price: "$100",
        image: "🍔",
        description: "Tres jugosas carnes de res con una mezcla de quesos blanco, amarillo y asadero, acompañadas de cebolla guisada."
      },
      {
        name: "Hamburguesa de Res",
        price: "$65",
        image: "🍔",
        description: "Clásica hamburguesa de res con queso amarillo."
      },
      {
        name: "Hamburguesa Tropical",
        price: "$75",
        image: "🍔",
        description: "Carne de res con queso amarillo, cebolla guisada, piña, verdura fresca y queso manchego."
      },
      {
        name: "Hamburguesa de Pepperoni",
        price: "$80",
        image: "🍔",
        description: "Carne de res con queso amarillo, cebolla guisada, salsa de pizza, queso de pizza y pepperoni."
      },
      {
        name: "Hamburguesa de Res Doble",
        price: "$85",
        image: "🍔",
        description: "Doble carne de res con queso amarillo, queso blanco, cebolla guisada, verdura y queso blanco derretido."
      },
      {
        name: "Hamburguesa Porquin",
        price: "$90",
        image: "🍔",
        description: "Carne de res con queso amarillo, salchicha de asar, tocino, cebolla guisada, frijoles, chorizo, pepperoni y queso derretido."
      },
      {
        name: "Hamburguesa Buffalo",
        price: "$75",
        image: "🍔",
        description: "Carne de res con verdura y queso derretido con salsa buffalo."
      },
      {
        name: "Hamburguesa BBQ",
        price: "$70",
        image: "🍔",
        description: "Carne de res con verdura y queso derretido con salsa BBQ."
      },
      {
        name: "Hamburguesa Mar y Tierra",
        price: "$90",
        image: "🍔",
        description: "Carne de res con queso amarillo, camarón y queso asadero."
      },
      {
        name: "Hamburguesa Hawaiana",
        price: "$75",
        image: "🍔",
        description: "Carne de res con queso amarillo, jamón, piña y queso asadero."
      },
      {
        name: "Hamburguesa Piña Habanero",
        price: "$80",
        image: "🍔",
        description: "Carne de res con queso amarillo, piña y salsa de piña habanero."
      },
      {
        name: "Hamburguesa Mango Habanero",
        price: "$80",
        image: "🍔",
        description: "Carne de res con queso amarillo, queso asadero y salsa mango habanero."
      },
      {
        name: "Hamburguesa Champiñones",
        price: "$70",
        image: "🍔",
        description: "Carne de res con queso amarillo, champiñones y queso asadero."
      },
    ],
    Hotdogs: [
      {
        name: "Hotdog Normal",
        price: "$40",
        image: "🌭",
        description: "Salchicha con verdura y cebolla guisada."
      },
      {
        name: "Hotdog Camarón",
        price: "$60",
        image: "🌭",
        description: "Salchicha con camarón, verdura y cebolla guisada."
      },
      {
        name: "Hotdog Porquin",
        price: "$60",
        image: "🌭",
        description: "Salchicha para asar con queso asadero, tocino, jamón, chorizo, pepperoni, frijol, cebolla guisada y verdura."
      },
      {
        name: "Hotdog Jumbo",
        price: "$50",
        image: "🌭",
        description: "Salchicha de asar con cebolla guisada y verdura."
      },
      {
        name: "Chile Dogo",
        price: "$50",
        image: "🌭",
        description: "Chile relleno con salchicha, cebolla guisada y verdura."
      },
      {
        name: "QuesiDogo",
        price: "$50",
        image: "🌭",
        description: "Salchicha con queso asadero, cebolla guisada y verdura."
      },
      {
        name: "PizzaDogo",
        price: "$55",
        image: "🌭",
        description: "Salchicha con queso asadero, pepperoni, cebolla guisada y verdura."
      },
      {
        name: "TostiDogo",
        price: "$55",
        image: "🌭",
        description: "Salchicha con cebolla guisada y verdura, servida con tostitos."
      },
      {
        name: "Dogo Embarazado",
        price: "$60",
        image: "🌭",
        description: "Salchicha para asar con otra salchicha en medio, cebolla guisada y verdura."
      },
      {
        name: "Res Dogo",
        price: "$60",
        image: "🌭",
        description: "Salchicha con queso asadero, carne de res, cebolla guisada y verdura."
      },
      {
        name: "Mango Dogo",
        price: "$65",
        image: "🌭",
        description: "Salchicha con cebolla guisada y salsa de mango habanero."
      },
      {
        name: "Dogo BBQ",
        price: "$60",
        image: "🌭",
        description: "Salchicha con cebolla guisada y salsa BBQ."
      },
      {
        name: "Dogo Buffalo",
        price: "$60",
        image: "🌭",
        description: "Salchicha con cebolla guisada y salsa buffalo."
      },
    ],
    Alitas: [
      {
        name: "Alitas (10 piezas)",
        price: "$80",
        image: "🍗",
        description: "¡Próximamente disponibles!"
      },
    ],
    Extras: [
      { name: "Queso Amarillo", price: "$10", image: "🧀" },
      { name: "Queso Manchego", price: "$10", image: "🧀" },
      { name: "Queso Asadero", price: "$10", image: "🧀" },
      { name: "Piña", price: "$10", image: "🍍" },
      { name: "Panela", price: "$10", image: "🧀" },
      { name: "Pepperoni", price: "$10", image: "🍕" },
      { name: "Salchicha", price: "$10", image: "🌭" },
      { name: "Rajas", price: "$10", image: "🌶" },
      { name: "Carne de Res", price: "$10", image: "🥩" },
      { name: "Champiñones", price: "$10", image: "🍄" },
      { name: "Papa a la francesa", price: "$50", image: "🍟" },
      { name: "Salchipapas", price: "$55", image: "🍟" },
      { name: "Aderezo", price: "$10", image: "🥫" },
      { name: "Jamón", price: "$5", image: "🥓" },
      { name: "Longaniza", price: "$10", image: "🌭" },
    ],
    Bebidas: [
      { name: "Aguas Frescas", price: "$20", image: "🥤", type: "direct" },
      { name: "Coca", price: "$20", image: "🥤", type: "direct" },
      { name: "Sprite", price: "$20", image: "🥤", type: "direct" },
      { name: "Fanta", price: "$20", image: "🥤", type: "direct" },
      { name: "Fresca", price: "$20", image: "🥤", type: "direct" },
    ],
    "Quesos Fundidos": [
      { name: "Queso Fundido Normal", price: "$60", image: "🧀", type: "direct" },
      { name: "Queso Fundido Mar y Tierra", price: "$80", image: "🧀", type: "direct" },
      { name: "Queso Fundido Hawaiano", price: "$80", image: "🧀", type: "direct" },
      { name: "Queso Fundido Buffalo", price: "$80", image: "🧀", type: "direct" },
      { name: "Queso Fundido BBQ", price: "$80", image: "🧀", type: "direct" },
      { name: "Queso Fundido Mango Habanero", price: "$80", image: "🧀", type: "direct" },
      { name: "Queso Fundido Piña Habanero", price: "$80", image: "🧀", type: "direct" },
      { name: "Queso Fundido Pizza", price: "$70", image: "🧀", type: "direct" },
    ],
  };

  const currentItems = menuData[activeCategory] || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCategory]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <div className="absolute inset-0 animate-gradientBG"></div>
        <div className="relative z-10 flex flex-col items-center justify-center">
          <FaSpinner className="text-white text-9xl animate-spin" />
          <h2 className="mt-6 text-4xl text-white font-extrabold animate-fadeIn">¡Preparando el Sabor!</h2>
        </div>
      </div>
    );
  }

  const renderProductCard = (item, index) => {
    const count = cart.filter((cartItem) => cartItem.product.name === item.name).length;
    return (
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
        {justAdded[item.name] && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-80 flex items-center justify-center z-10 animate-iosOverlayCycle">
            <FaCheckCircle size={40} className="text-white" />
          </div>
        )}
        {count > 0 && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center justify-center">
            <FaCheckCircle className="mr-1" /> {count}
          </span>
        )}
        <div className="text-center">
          <div className="mb-4 text-7xl">{item.image}</div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: themeStyles.textColor }}>{item.name}</h3>
          <p className="mb-2" style={{ color: themeStyles.textColor, opacity: 0.8 }}>{item.description}</p>
          <p className="text-xl font-bold mb-2" style={{ color: accentColor }}>{item.price}</p>
          {activeCategory === "Extras" ? null : (
            <button
              onClick={() => {
                if ((activeCategory === "Bebidas" || activeCategory === "Quesos Fundidos") && item.type === "direct") {
                  addDirectToCart(item);
                } else {
                  setSelectedProduct(item);
                }
              }}
              className="transition-transform hover:scale-105 shadow-lg"
              style={{
                background: "linear-gradient(45deg, #E74C3C, #C0392B)",
                color: white,
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
              }}
            >
              {(activeCategory === "Hamburguesas" || activeCategory === "Hotdogs")
                ? <>
                  <FaPlusCircle className="inline mr-2" /> Agregar al Carrito
                </>
                : "Pedir"}
            </button>
          )}
        </div>
      </div>
    );
  };

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
              style={{
                background: "linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
                border: `1px solid ${themeStyles.borderColor}`,
              }}
            >
              {theme === "dark" ? <MdNightsStay size={24} /> : <MdWbSunny size={24} />}
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="p-3 rounded-full transition-transform hover:scale-110 shadow-lg relative"
              style={{
                background: "linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
                border: `1px solid ${themeStyles.borderColor}`,
              }}
            >
              <FaShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
        {/* Barra de Categorías */}
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

      {/* Main */}
      <main className="flex-1 px-4 py-8">
        {activeCategory === "Alitas" ? (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-4xl font-bold animate-pulse" style={{ color: accentColor }}>
              PROXIMAMENTE
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentItems.map((item, index) => renderProductCard(item, index))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative pt-16 pb-8 bg-gradient-to-r from-[#F39C12] to-[#F1C40F] text-white overflow-hidden shadow-lg">
      {/* Onda decorativa en la parte superior */}
      <div className="absolute top-0 left-0 w-full -translate-y-1">
        <svg className="w-full h-16" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,0 L0,0 Z"
            fill="white"
            opacity="0.2"
          />
        </svg>
      </div>
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-xl font-bold">Ing. Informático Fabricio Regalado</p>
            <p className="text-sm">
              © {new Date().getFullYear()} Todos los derechos reservados
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/3411456773"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-110 transition-transform"
            >
              <FaWhatsapp size={28} />
              <span className="text-xl font-bold">341 145 6773</span>
            </a>
            <a
              href="https://www.instagram.com/fabricio_ouo/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaInstagram size={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/oscar-fabricio-regalado-p%C3%A9rez-90181b225/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaLinkedin size={28} />
            </a>
          </div>
        </div>
      </div>
    </footer>


      {/* Popup de Personalización */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-xl transform transition-transform duration-500 scale-100">
            <h2 className="text-2xl font-bold mb-4">Personaliza tu pedido</h2>
            <p className="mb-4"><strong>{selectedProduct.name}</strong> - {selectedProduct.price}</p>
            {selectedProduct.drinkOptions ? (
              <div className="mb-4">
                <p className="font-semibold mb-2">Selecciona tu refresco:</p>
                {selectedProduct.drinkOptions.map((option) => (
                  <div key={option} className="flex items-center mb-2">
                    <input type="radio" id={`drink-${option}`} name="drinkOption" className="mr-2"
                      checked={selectedDrink === option} onChange={() => setSelectedDrink(option)} />
                    <label htmlFor={`drink-${option}`} className="text-sm">{option}</label>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="font-semibold mb-2">
                    {activeCategory === "Hamburguesas" ? "Modificaciones" : activeCategory === "Hotdogs" ? "Modificaciones" : "Modificaciones"}
                  </p>
                  {(activeCategory === "Hamburguesas"
                    ? modificationsOptionsHamburguesas
                    : activeCategory === "Hotdogs"
                      ? modificationsOptionsHotdogs
                      : modificationsOptions
                  ).map((option) => (
                    <div key={option} className="flex items-center mb-2">
                      <input type="checkbox" id={`mod-${option}`} className="mr-2"
                        checked={selectedModifications.includes(option)}
                        onChange={() => {
                          if (selectedModifications.includes(option)) {
                            setSelectedModifications(selectedModifications.filter((mod) => mod !== option));
                          } else {
                            setSelectedModifications([...selectedModifications, option]);
                          }
                        }} />
                      <label htmlFor={`mod-${option}`} className="text-sm">{option}</label>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <p className="font-semibold mb-2">Extras Adicionales</p>
                  {(activeCategory === "Hotdogs" ? extrasOptionsHotdogs : extrasOptions).map((option) => (
                    <div key={option.name || option} className="flex items-center mb-2">
                      <input type="checkbox" id={`extra-${option.name || option}`} className="mr-2"
                        checked={selectedExtras.includes(option.name || option)}
                        onChange={() => {
                          if (selectedExtras.includes(option.name || option)) {
                            setSelectedExtras(selectedExtras.filter((ex) => ex !== (option.name || option)));
                          } else {
                            setSelectedExtras([...selectedExtras, option.name || option]);
                          }
                        }} />
                      <label htmlFor={`extra-${option.name || option}`} className="text-sm">
                        {option.name || option} {option.price ? `- ${option.price}` : ""}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="flex justify-end gap-2">
              <button onClick={() => {
                setSelectedProduct(null);
                setSelectedModifications([]);
                setSelectedExtras([]);
                setSelectedDrink("");
              }} className="px-4 py-2 rounded shadow hover:shadow-md transition">
                Cancelar
              </button>
              <button onClick={() => {
                if (selectedProduct.drinkOptions && !selectedDrink) return;
                addToCartHandler({
                  modifications: selectedModifications,
                  extras: selectedExtras,
                  selectedDrink: selectedDrink,
                });
              }} className="px-4 py-2 rounded bg-green-500 text-white shadow hover:bg-green-600 transition">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup del Carrito */}
      {showCart && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-lg shadow-xl transform transition-transform duration-500 scale-100">
            <h2 className="text-2xl font-bold mb-4">¡Envía tu Pedido!</h2>
            {cart.length === 0 ? (
              <p className="mb-4">Tu carrito está vacío.</p>
            ) : (
              <div className="mb-4">
                {cart.map((item, idx) => {
                  const basePrice = parseFloat(item.product.price.replace("$", ""));
                  const extrasCost = item.extras.length * 10;
                  const itemTotal = basePrice + extrasCost;
                  return (
                    <div key={idx} className="mb-2 border-b pb-2 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">
                          {item.product.name} - {item.product.price}
                        </p>
                        {item.modifications.length > 0 && (
                          <p className="text-sm">Modificaciones: {item.modifications.join(", ")}</p>
                        )}
                        {item.extras.length > 0 && (
                          <>
                            <p className="text-sm">Extras: {item.extras.join(", ")}</p>
                            <p className="text-sm">Costo Extras: ${extrasCost}</p>
                          </>
                        )}
                        {item.selectedDrink && (
                          <p className="text-sm">Refresco: {item.selectedDrink}</p>
                        )}
                        <p className="text-sm font-bold">Total: ${itemTotal}</p>
                      </div>
                      <button onClick={() => removeFromCart(idx)} className="text-red-500 hover:text-red-700 transition-colors">
                        <FaTrashAlt />
                      </button>
                    </div>
                  );
                })}
                <div className="mt-4 font-bold">
                  Total Orden: ${cart.reduce((acc, item) => acc + calculateItemTotal(item), 0)}
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCart(false)} className="px-4 py-2 rounded shadow hover:shadow-md transition">
                Cerrar
              </button>
              {cart.length > 0 && (
                <button onClick={confirmCartOrder} className="px-4 py-2 rounded bg-green-500 text-white shadow hover:bg-green-600 transition flex items-center gap-2">
                  <FaWhatsapp size={20} /> Enviar Pedido
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
