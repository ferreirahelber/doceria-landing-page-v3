// src/components/ProductModal.js

import React from 'react';
import { X } from 'lucide-react';
import './ProductModal.css'; // Criaremos este arquivo de CSS a seguir

// Recebemos a lista completa de produtos, o estado de visibilidade (show) e a função para fechar (onClose)
const ProductModal = ({ products, show, onClose }) => {
  // Se o modal não deve ser mostrado, simplesmente não renderiza nada.
  if (!show) {
    return null;
  }

  return (
    // O 'portal' é o container que cobre a tela inteira com um fundo escurecido.
    <div className="modal-portal" onClick={onClose}>
      {/* 
        O container do conteúdo. Usamos e.stopPropagation() para que um clique
        dentro do modal não feche o próprio modal (o que aconteceria por causa do onClick no portal).
      */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botão para fechar o modal */}
        <button onClick={onClose} className="modal-close-button">
          <X size={30} />
        </button>

        {/* Conteúdo do Modal */}
        <div className="modal-header">
          <h2 className="modal-title">Todos os Produtos</h2>
        </div>

        <div className="modal-body">
          {/* A grade de produtos, exatamente como na sua referência */}
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card-modal">
                <picture>
                  <source srcSet={product.imageWebp} type="image/webp" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image-modal"
                    loading="lazy"
                  />
                </picture>
                <h3 className="product-name-modal">{product.name}</h3>
                <p className="product-description-modal">{product.description.substring(0, 40)}...</p>
                <p className="product-price-modal">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
