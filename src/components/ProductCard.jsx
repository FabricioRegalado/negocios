import React from "react";

const ProductCard = ({ product, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onSelect(product)}
    >
      <div className="flex items-center justify-between">
        <span className="text-4xl">{product.image}</span>
        <div className="text-right">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-gray-600">{product.price}</p>
        </div>
      </div>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={(e) => {
          e.stopPropagation(); // Evita que el evento se propague al contenedor
          onSelect(product);
        }}
      >
        Ver Detalles
      </button>
    </div>
  );
};

export default ProductCard;