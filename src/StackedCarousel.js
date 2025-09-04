import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


// 2. O CÓDIGO QUE VOCÊ RECORTOU DO APP.JS VEM AQUI
function StackedCarousel({ data }) { // agora data.length não vai dar erro
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying] = useState(true);
  
  useEffect(() => {
    if (!isAutoPlaying || isAnimating) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % data.length);
      setTimeout(() => setIsAnimating(false), 500);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isAnimating, data.length]); // Adicionei data.length às dependências
  
  const goNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % data.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const goPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const getSlideStyle = (index) => {
    let diff = index - currentIndex;
    const totalSlides = data.length;
    if (diff > totalSlides / 2) diff -= totalSlides;
    else if (diff < -totalSlides / 2) diff += totalSlides;
    
    const absIndex = Math.abs(diff);
    let translateX = diff * 120;
    let scale = Math.max(1 - absIndex * 0.15, 0.7);
    let zIndex = data.length - absIndex;
    let opacity = absIndex > 2 ? 0 : 1 - absIndex * 0.3;
    
    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity,
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };
  };
  
  return (
    <div className="stacked-carousel-container">
      <div className="stacked-carousel-track">
        {data.map((item, index) => (
          <div key={index} className={`stacked-slide ${index === currentIndex ? 'active' : ''}`} style={getSlideStyle(index)} onClick={() => goToSlide(index)}>
            <div className="slide-content">
              <picture>
                <source srcSet={item.coverWebp} type="image/webp" />
                <img src={item.cover} alt={item.title} loading="lazy" className="slide-image" draggable={false} />
              </picture>
              <div className="slide-overlay">
                <h3 className="slide-title">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-nav-button carousel-nav-left" onClick={goPrev} disabled={isAnimating} aria-label="Slide anterior"><ChevronLeft size={24} /></button>
      <button className="carousel-nav-button carousel-nav-right" onClick={goNext} disabled={isAnimating} aria-label="Próximo slide"><ChevronRight size={24} /></button>
      <div className="carousel-indicators">
        {data.map((_, index) => (
          <button key={index} className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`} onClick={() => goToSlide(index)} disabled={isAnimating} aria-label={`Ir para slide ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

// 3. ADICIONE ESTA LINHA NO FINAL PARA EXPORTAR O COMPONENTE
export default StackedCarousel;
