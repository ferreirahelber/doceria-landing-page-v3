// src/components/ProductModal.js

import React, { useState } from 'react';
import { X, Info } from 'lucide-react'; 
import './ProductModal.css';

const ProductCard = ({ product }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleTouch = () => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTooltipVisible(!isTooltipVisible);
    }
  };

  const handleMouseLeave = () => {
    if (isTooltipVisible) {
      setIsTooltipVisible(false);
    }
  };

  return (
    <div 
      className="product-card-modal" 
      onMouseLeave={handleMouseLeave}
    >
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
      
      <div 
        className="product-description-container"
        onClick={handleTouch}
      >
        {/* === MUDANÇA CRÍTICA AQUI === */}
        <p className="product-description-truncated">
          {/* 1. O texto agora está dentro de um <span> para ser truncado corretamente */}
          <span className="description-text">{product.description}</span>
          
          {/* 2. O ícone continua ao lado */}
          <Info size={14} className="info-icon" />
        </p>
        {/* ============================ */}
        
        <span className={`product-description-tooltip ${isTooltipVisible ? 'active' : ''}`}>
          <span className="tooltip-help-text">(Toque para fechar)</span>
          {product.description}
        </span>
      </div>

      <p className="product-price-modal">{product.price}</p>
    </div>
  );
};

const ProductModal = ({ products, show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-portal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-button">
          <X size={30} />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Todos os Produtos</h2>
        </div>

        <div className="modal-body">
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
