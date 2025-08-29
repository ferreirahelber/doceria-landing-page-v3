import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Instagram, MessageCircle, X, MapPin, Bike } from 'lucide-react';
import './App.css';

// IMPORTAR SUAS IMAGENS 
// Mantenha as imagens originais para o fallback
import logo from './assets/logo.png';
import logoWebp from './assets/logo.webp'; // IMPORTAÇÃO DA LOGO EM WEBP
import doce1 from './assets/morangotrufado.jpeg';
import doce2 from './assets/bolo_stitch2.jpeg';
import doce3 from './assets/tacarecheada2.jpeg';
import doce4 from './assets/fatiabolo.png';
import doce5 from './assets/conetrufado.jpg';
import doce6 from './assets/brownie.jpeg';
import bolo1 from './assets/bombonsregionais.jpeg';
import cupcake1 from './assets/bolopote01.jpg';
import brigadeiro1 from './assets/bolopote2.jpeg';
import torta1 from './assets/morango1.jpeg';
import sobremesa1 from './assets/morango2.jpeg';
import sobremesa2 from './assets/morango3.jpeg';
import karenBandeira from './assets/Doceira.png';

// Importe as novas imagens .webp
import doce1Webp from './assets/morangotrufado.webp';
import doce2Webp from './assets/bolo_stitch2.webp';
import doce3Webp from './assets/tacarecheada2.webp';
import doce4Webp from './assets/fatiabolo.webp';
import doce5Webp from './assets/conetrufado.webp';
import doce6Webp from './assets/brownie.webp';
import bolo1Webp from './assets/bombonsregionais.webp';
import cupcake1Webp from './assets/bolopote01.webp';
import brigadeiro1Webp from './assets/bolopote2.webp';
import torta1Webp from './assets/morango1.webp';
import sobremesa1Webp from './assets/morango2.webp';
import sobremesa2Webp from './assets/morango3.webp';
import karenBandeiraWebp from './assets/Doceira.webp';


// DADOS DO CARROSSEL - Estrutura de dados para o novo carrossel
const carouselData = [
  // Adicione a nova propriedade 'coverWebp' para o formato WebP
  { cover: doce1, coverWebp: doce1Webp, title: "Morango Trufado" },
  { cover: doce2, coverWebp: doce2Webp, title: "Bolo Personalizado" },
  { cover: doce3, coverWebp: doce3Webp, title: "Taça Especial" },
  { cover: doce4, coverWebp: doce4Webp, title: "Fatia de Bolo" },
  { cover: doce5, coverWebp: doce5Webp, title: "Cone Trufado" },
  { cover: doce6, coverWebp: doce6Webp, title: "Brownie Gourmet" }
];

// PRODUTOS DO MENU
const products = [
  {
    id: 1,
    name: "Bombons Variados",
    description: "Nossos bombons regionais são feitos com a polpa dos nossos frutos, temos: Bacuri, Cupuaçu. Temos támbem de Queijo Cuia, Brigadeiro Belga e o carro chefe Bombom de Morango.",
    image: bolo1,
    imageWebp: bolo1Webp,
    price: "R$ 5,00 (unidade)"
  },
  {
    id: 2,
    name: "Cupcakes Gourmet",
    description: "Cupcakes coloridos e saborosos, perfeitos para festas e eventos. Diversos sabores e decorações criativas.",
    image: cupcake1,
    imageWebp: cupcake1Webp,
    price: "R$ 12,00 (unidade)"
  },
  {
    id: 3,
    name: "Brigadeiros Artesanais",
    description: "Brigadeiros gourmet com chocolate belga e coberturas especiais. Tradição brasileira com toque sofisticado.",
    image: brigadeiro1,
    imageWebp: brigadeiro1Webp,
    price: "R$ 4,50 (unidade)"
  },
  {
    id: 4,
    name: "Tortas Especiais",
    description: "Tortas doces com recheios cremosos e frutas frescas. Sobremesas irresistíveis para qualquer momento.",
    image: torta1,
    imageWebp: torta1Webp,
    price: "R$ 80,00 (kg)"
  },
  {
    id: 5,
    name: "Doces Variados",
    description: "Seleção especial de doces tradicionais e modernos. Perfeitos para presentear ou saborear em família.",
    image: sobremesa1,
    imageWebp: sobremesa1Webp,
    price: "R$ 15,00 (unidade)"
  },
  {
    id: 6,
    name: "Sobremesas Premium",
    description: "Sobremesas elaboradas com técnicas refinadas e ingredientes premium. Experiência gastronômica única.",
    image: sobremesa2,
    imageWebp: sobremesa2Webp,
    price: "R$ 25,00 (unidade)"
  }
];

// DADOS DOS DEPOIMENTOS
const testimonialsData = [
  {
    id: 1,
    name: "Ana Paula",
    text: "Os doces da Dodoce's são simplesmente maravilhosos! O bombom de morango é o meu favorito, sempre fresquinho e delicioso. Recomendo muito!",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Eduardo",
    text: "Pedi uma torta para o aniversário da minha esposa e foi um sucesso! Além de linda, estava incrivelmente saborosa. O atendimento também é excelente.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mariana Silva",
    text: "Sou cliente fiel dos cupcakes da Dodoce's. São super fofinhos e com recheios incríveis. Perfeitos para qualquer ocasião!",
    rating: 4,
  },
];

// COMPONENTE DO CARROSSEL CUSTOMIZADO COM EFEITO DE PILHA
function StackedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0); // Índice do slide atual
  const [isAnimating, setIsAnimating] = useState(false); // Controla se está animando
  const [isAutoPlaying] = useState(true); // Controla se o auto-play está ativo
  
  // Auto-play: avança automaticamente a cada 4 segundos
  useEffect(() => {
    if (!isAutoPlaying || isAnimating) return; // Não executa se auto-play desabilitado ou animando
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % carouselData.length);
      setTimeout(() => setIsAnimating(false), 500);
    }, 4000); // Muda slide a cada 4 segundos
    
    return () => clearInterval(interval); // Limpa o interval quando componente desmonta
  }, [isAutoPlaying, isAnimating]); // Reexecuta quando auto-play ou animação muda
  
  // Função para ir para o próximo slide
  const goNext = () => {
    if (isAnimating) return; // Previne múltiplos cliques durante animação
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % carouselData.length);
    setTimeout(() => setIsAnimating(false), 500); // Duração da animação
  };
  
  // Função para ir para o slide anterior
  const goPrev = () => {
    if (isAnimating) return; // Previne múltiplos cliques durante animação
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
    setTimeout(() => setIsAnimating(false), 500); // Duração da animação
  };
  
  // Função para ir para um slide específico
  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  // Função para calcular a posição e escala de cada slide
  const getSlideStyle = (index) => {
    let diff = index - currentIndex; // Diferença do slide atual
    
    // Lógica para loop infinito contínuo
    const totalSlides = carouselData.length;
    
    // Se a diferença for maior que metade dos slides, ajusta para o caminho mais curto
    if (diff > totalSlides / 2) {
      diff = diff - totalSlides; // Vai pela esquerda
    } else if (diff < -totalSlides / 2) {
      diff = diff + totalSlides; // Vai pela direita
    }
    
    const absIndex = Math.abs(diff); // Valor absoluto da diferença
    
    // Configurações de posicionamento e escala
    let translateX = diff * 120; // Deslocamento horizontal
    let scale = 1 - absIndex * 0.15; // Escala diminui conforme se afasta do centro
    let zIndex = carouselData.length - absIndex; // Z-index para empilhamento
    let opacity = absIndex > 2 ? 0 : 1 - absIndex * 0.3; // Opacidade
    
    // Limita a escala mínima
    scale = Math.max(scale, 0.7);
    
    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity,
      transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    };
  };
  
  return (
    <div className="stacked-carousel-container">
      {/* Container dos slides */}
      <div className="stacked-carousel-track">
        {carouselData.map((item, index) => (
          <div
            key={index}
            className={`stacked-slide ${index === currentIndex ? 'active' : ''}`}
            style={getSlideStyle(index)}
            onClick={() => goToSlide(index)}
          >
            <div className="slide-content">
              {/* === MODIFICAÇÃO PARA USAR <picture> e <source> === */}
              <picture>
                {/* Fonte WebP com o novo caminho de arquivo */}
                <source srcSet={item.coverWebp} type="image/webp" />
                {/* Imagem original como fallback para navegadores não compatíveis */}
                <img
                  src={item.cover}
                  alt={item.title}
                  loading="lazy"
                  className="slide-image"
                  draggable={false}
                />
              </picture>
              {/* ================================================= */}
              <div className="slide-overlay">
                <h3 className="slide-title">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Botões de navegação */}
      <button
        className="carousel-nav-button carousel-nav-left"
        onClick={goPrev}
        disabled={isAnimating}
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        className="carousel-nav-button carousel-nav-right"
        onClick={goNext}
        disabled={isAnimating}
        aria-label="Próximo slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Indicadores de posição */}
      <div className="carousel-indicators">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleImageClick = (image) => {
    setEnlargedImage(image);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    products: {},
    message: '',
  });

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleProductChange = (e) => {
    const { name, checked } = e.target;
    setOrderForm((prevForm) => ({
      ...prevForm,
      products: {
        ...prevForm.products,
        [name]: checked,
      },
    }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const selectedProducts = Object.keys(orderForm.products)
      .filter((productName) => orderForm.products[productName])
      .map((productName) => {
        const product = products.find((p) => p.name === productName);
        return `- ${productName} (${product ? product.price : 'Preço não disponível'})`;
      })
      .join('\n');

    let whatsappMessage = `Olá, meu nome é ${orderForm.name} e gostaria de fazer um pedido.\n\n`;
    if (selectedProducts) {
      whatsappMessage += `*Produtos selecionados:*\n${selectedProducts}\n\n`;
    }
    if (orderForm.message) {
      whatsappMessage += `*Observações:* ${orderForm.message}\n\n`;
    }
    whatsappMessage += `Meu WhatsApp para contato: ${orderForm.phone}\n\n`;
    whatsappMessage += `Aguardando seu retorno!`;

    const whatsappUrl = `https://wa.me/5591982875970?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Limpar o formulário após o envio
    setOrderForm({
      name: '',
      phone: '',
      products: {},
      message: '',
    });
  };

  return (
    <div className="min-h-screen">
      
      {/* CABEÇALHO */}
      <header className="bg-header-background relative shadow-lg">
        {/* container para alinhar o conteúdo */}
          <div className="header-container">
            {/* Logo — fica meio dentro e meio fora do fundo */}
            {/* === MODIFICAÇÃO PARA USAR <picture> e <source> === */}
            <picture>
              <source srcSet={logoWebp} type="image/webp" />
              <img 
                src={logo} 
                alt="Logo da Dodoce's" 
                className="logo-header"
              />
            </picture>
            {/* ================================================= */}
            {/* Slogan — aparece ao lado da logo em telas grandes */}
            <div className="slogan-container">
              <span className="slogan-text">
                Doces artesanais feitos com amor.
              </span>
            </div>
          </div>
      </header>

      {/* NOVO CARROSSEL COM EFEITO DE PILHA */}
      <section className="py-12">
        <div className="container mx-auto px-4">

          {/* Carrossel customizado */}
          <StackedCarousel />
        </div>
          {/* Mensagem de saudação */}
          <div className="greeting-container">
            {/* Bloco de Texto */}
            <div className="greeting-text">
              <h2>Sobre à Dodoce's!</h2>
              <p>
                Sou uma empreendedora apaixonada por transformar ingredientes selecionados
                em doces que encantam e conquistam paladares. 
              </p>
              <p>
                Na Dodoce's, cada produto é confeccionado de forma artesanal, com todo o carinho e dedicação, pensando
                em levar até você uma experiência única.
              </p>
              <p>
                Cada sabor é cuidadosamente escolhido para garantir a melhor 
                qualidade e aquele gostinho de feito em casa.
              </p>
              <p>
                Se você busca doces que além de sabor trazem amor em cada pedaço, está no
                lugar certo. 
              </p>
              <p>  
                Seja um bombom, um bolo ou qualquer outra delícia, tudo é
                preparado como se fosse para alguém da família.
              </p>
              <p>
                Bem-vindos à Dodoce's, onde o doce é feito com o coração!
              </p>
              <p><strong>por Karen Bandeira</strong></p>
            </div>
            
            {/* Bloco da Imagem */}
            <div className="greeting-image-container">
              {/* === MODIFICAÇÃO PARA USAR <picture> e <source> === */}
              <picture>
                <source srcSet={karenBandeiraWebp} type="image/webp" />
                <img 
                  src={karenBandeira} 
                  alt="Karen Bandeira, a doceira" 
                  className="greeting-image"
                />
              </picture>
              {/* ================================================= */}
            </div>
          </div>
          {/* ================================================================== */}
        
      </section>

      {/* MENU DE PRODUTOS */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title"> {/* Adicionada a classe 'section-title' para aplicar os estilos no App.css */}
            Nossos Produtos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex">
                  <div className="w-1/3">
                    {/* === MODIFICAÇÃO PARA USAR <picture> e <source> === */}
                    <picture>
                      <source srcSet={product.imageWebp} type="image/webp" />
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="product-image cursor-pointer"
                        onClick={() => handleImageClick(product.image)}
                      />
                    </picture>
                    {/* ================================================= */}
                  </div>
                  <div className="w-2/3 p-6">
                    <h3 className="product-card-title"> {/* Adicionada a classe 'product-card-title' para aplicar os estilos no App.css */}
                      {product.name}
                    </h3>
                    <p className="product-card-description"> {/* Adicionada a classe 'product-card-description' para aplicar os estilos no App.css */}
                      {product.description}
                    </p>
                    <p className="product-card-price">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* SEÇÃO ONDE NOS ENCONTRAR */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Onde nos Encontrar</h2>
          <p className="text-center text-lg text-gray-700 mb-12">Escolha a melhor forma de saborear nossos doces!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Card do Quiosque Físico */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
              <MapPin size={48} className="text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Nosso Quiosque</h3>
              <p className="text-gray-600 mb-4">Rua São Diogo - Largo São João - Cidade Velha, Belém - PA, 66020-260</p>
              <p className="text-gray-600 mb-6"><strong>Horário:</strong> Segunda a Sexta: 8h às 15h</p>
              <a
                href="https://maps.google.com/?cid=11785926177748043221&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <MapPin size={20} />
                <span>Ver no Mapa</span>
              </a>
              <p className="text-sm text-gray-500 mt-4">Venha nos visitar e sinta o aroma dos nossos doces fresquinhos!</p>
            </div>

            {/* Card de Delivery e Retirada */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
              <Bike size={48} className="text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Delivery e retirada</h3>
              <p className="text-gray-600 mb-4">Peça pelo WhatsApp e receba no conforto da sua casa!</p>
              <p className="text-gray-600 mb-6"><strong>Atendimento:</strong> Segunda a Sábado: 9h às 17h</p>
              <a
                href="https://wa.me/5591982875970"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>Pedir por WhatsApp</span>
              </a>
              <p className="text-sm text-gray-500 mt-4">Conveniência e sabor na sua porta ou para levar!</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE FORMULÁRIO DE PEDIDO */}
      <section className="py-12 bg-pink-100">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Faça seu pedido!</h2>
          <p className="text-center text-lg text-gray-700 mb-12">Preencha o formulário abaixo e envie seu pedido diretamente para nosso WhatsApp!</p>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Seu nome:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={orderForm.name}
                  onChange={handleOrderChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Seu WhatsApp:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={orderForm.phone}
                  onChange={handleOrderChange}
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="(99) 99999-9999"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Selecione os produtos:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id={`product-${product.id}`}
                        name={product.name}
                        checked={orderForm.products[product.name] || false}
                        onChange={handleProductChange}
                        className="form-checkbox h-5 w-5 text-pink-500 rounded"
                      />
                      <label htmlFor={`product-${product.id}`} className="text-gray-700">{product.name} - {product.price}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Observações (opcional):</label>
                <textarea
                  id="message"
                  name="message"
                  value={orderForm.message}
                  onChange={handleOrderChange}
                  rows="4"
                  className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ex: Sem lactose, para presente, etc."
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors duration-300 flex items-center space-x-3"
                >
                  <MessageCircle size={24} />
                  <span>Enviar pedido via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DEPOIMENTOS */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">O que nossos clientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
                <p className="text-gray-700 text-lg mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-pink-600">- {testimonial.name}</p>
                {testimonial.rating && (
                  <div className="flex mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.817 1.48-8.279L.001 9.306l8.332-1.151L12 .587z"/>
                      </svg>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RODAPÉ com Redes Sociais */}
      <footer className="bg-[#72c5c4] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Entre em contato</h3>
            <p className="text-lg mb-8">Siga-nos nas redes sociais e faça seu pedido!</p>
            
            <div className="flex justify-center space-x-8">
              <a
                href="https://instagram.com/dodoce.s"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-200 hover:scale-110"
              >
                <Instagram size={24} />
                <span className="font-semibold">@dodoce.s</span>
              </a>
              
              <a
                href="https://wa.me/5591982875970"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-200 hover:scale-110"
              >
                <MessageCircle size={24} />
                <span className="font-semibold">WhatsApp</span>
              </a>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm opacity-80">
                © 2025 Dodoce's - Doceria Artesanal. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL PARA IMAGEM AMPLIADA */}
      {enlargedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <img
              src={enlargedImage}
              alt="Imagem ampliada"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button
              onClick={closeEnlargedImage}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* BOTÃO FLUTUANTE DO WHATSAPP */}
      <a
        href="https://wa.me/5591982875970"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-button"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}

export default App;
