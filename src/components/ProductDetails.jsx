import React from "react";
import { ChevronLeft } from "lucide-react";

const ProductDetails = ({ product, onBack }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ChevronLeft size={24} />
        <span className="ml-2">Volver</span>
      </button>
      <div className="mt-4 text-center">
        <span className="text-6xl">{product.image}</span>
        <h2 className="text-2xl font-bold mt-3">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-green-600 font-semibold text-xl mt-3">{product.price}</p>
      </div>
      <a
        href={`https://wa.me/?text=Quiero%20pedir%20una%20${product.name}`}
        className="block w-full bg-green-500 text-white text-center px-4 py-2 mt-6 rounded-lg hover:bg-green-600 transition-colors"
      >
        Pedir por WhatsApp
      </a>
    </div>
  );
};

export default ProductDetails;