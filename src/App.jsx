import React, { useState, useEffect } from 'react';
import FocusLock from 'react-focus-lock';
import { Instagram, MessageCircle, X, MapPin, Bike } from 'lucide-react';
import './App.css';

// IMPORTAÇÃO DO NOVO COMPONENTE DE MODAL
import ProductModal from './components/ProductModal'; // Certifique-se que o caminho está correto

// IMPORTAÇÃO DO COMPONENTE DE CARROSSEL
import StackedCarousel from './StackedCarousel';

// IMPORTAR SUAS IMAGENS
// Mantenha as imagens originais para o fallback
import logo from './assets/logo.png';
import logoWebp from './assets/logo.webp';
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
//import sobremesa1 from './assets/morango2.jpeg';
import sobremesa2 from './assets/morango3.jpeg';
import karenBandeira from './assets/Doceira.png';
import bolomoana from './assets/bolo_moana.jpeg';

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
//import sobremesa1Webp from './assets/morango2.webp';
import sobremesa2Webp from './assets/morango3.webp';
import karenBandeiraWebp from './assets/Doceira.webp';
import bolomoanaWebp from './assets/bolo_moana.webp';

// DADOS DO CARROSSEL
const carouselData = [
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
    name: "Cake Pote Tradicional",
    description: "Cake Pote coloridos e saborosos, perfeitos para festas e eventos. Diversos sabores e decorações criativas.",
    image: cupcake1,
    imageWebp: cupcake1Webp,
    price: "R$ 12,00 (unidade)"
  },
  {
    id: 3,
    name: "Cake Pote Gourmet",
    description: "Cake Porte gourmet com chocolate belga e coberturas especiais.",
    image: brigadeiro1,
    imageWebp: brigadeiro1Webp,
    price: "R$ 15,00 (unidade)"
  },
  {
    id: 4,
    name: "Morango Trufado",
    description: "Morangos selecionados coberto por chocolate belga. Sobremesa irresistível para qualquer momento.",
    image: torta1,
    imageWebp: torta1Webp,
    price: "R$ 12,00 (unidade)"
  },
  {
    id: 5,
    name: "Bolos Personalizados",
    description: "Seleção especial de bolos personalizados e modernos. Perfeitos para momentos inesquecivéis.",
    image: bolomoana,
    imageWebp: bolomoanaWebp,
    price: "Entre em contato para orçamento"
  },
  {
    id: 6,
    name: "Morango do Amor",
    description: "Sobremesas elaboradas com técnicas refinadas e ingredientes premium. Experiência gastronômica única.",
    image: sobremesa2,
    imageWebp: sobremesa2Webp,
    price: "R$ 15,00 (unidade)"
  }
  // Adicione mais produtos aqui se desejar. Eles aparecerão no modal.
];

// DADOS DOS DEPOIMENTOS
const testimonialsData = [
  { id: 1, name: "Ana Paula", text: "Os doces da Dodoce's são simplesmente maravilhosos! O bombom de morango é o meu favorito, sempre fresquinho e delicioso. Recomendo muito!", rating: 5 },
  { id: 2, name: "Carlos Eduardo", text: "Pedi uma torta para o aniversário da minha esposa e foi um sucesso! Além de linda, estava incrivelmente saborosa. O atendimento também é excelente.", rating: 5 },
  { id: 3, name: "Mariana Silva", text: "Sou cliente fiel dos cupcakes da Dodoce's. São super fofinhos e com recheios incríveis. Perfeitos para qualquer ocasião!", rating: 4 },
];

function App() {
  const [enlargedImage, setEnlargedImage] = useState(null);

  // === MODIFICAÇÃO 1: NOVO ESTADO PARA O MODAL DE PRODUTOS ===
  const [isProductModalOpen, setProductModalOpen] = useState(false);

  const handleImageClick = (image) => setEnlargedImage(image);
  const closeEnlargedImage = () => setEnlargedImage(null);

  const [orderForm, setOrderForm] = useState({ name: '', phone: '', products: {}, message: '' });

  // Função para lidar com a SELEÇÃO (clique no checkbox)
  const handleProductSelectionChange = (productName) => {
    setOrderForm((prev) => {
      const newProducts = { ...prev.products };

      // Se o produto já está na lista, removê-lo (desmarcar)
      if (newProducts[productName]) {
        delete newProducts[productName];
      } else {
        // Se não está, adicioná-lo com quantidade inicial 1
        newProducts[productName] = 1;
      }

      return { ...prev, products: newProducts };
    });
  };

  // Nova função para lidar com a MUDANÇA DE QUANTIDADE
  const handleQuantityChange = (productName, quantity) => {
    // A quantidade vem como string do <select>, então convertemos para número
    const numQuantity = parseInt(quantity, 10);

    setOrderForm((prev) => ({
      ...prev,
      products: {
        ...prev.products,
        [productName]: numQuantity,
      },
    }));
  };

  // App.js

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const selectedProducts = Object.entries(orderForm.products)
      .map(([productName, quantity]) => {
        const product = products.find((p) => p.name === productName);
        // Se for o bolo personalizado, não mostra a quantidade
        if (product.price === "Entre em contato para orçamento") {
          return `- ${productName}`;
        }
        // Para os outros, mostra a quantidade
        return `- ${productName} (Qtd: ${quantity})`;
      })
      .join('\n');

    // O resto da função continua igual
    let whatsappMessage = `Olá, meu nome é ${orderForm.name} e gostaria de fazer um pedido.\n\n`;
    if (selectedProducts) {
      whatsappMessage += `*Produtos selecionados:*\n${selectedProducts}\n\n`;
    }
    if (orderForm.message) {
      whatsappMessage += `*Observações:* ${orderForm.message}\n\n`;
    }
    whatsappMessage += `Meu WhatsApp para contato: ${orderForm.phone}\n\nAguardando seu retorno!`;
    const whatsappUrl = `https://wa.me/5591982875970?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    setOrderForm({ name: '', phone: '', products: {}, message: '' });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isProductModalOpen) {
          setProductModalOpen(false);
        } else if (enlargedImage) {
          setEnlargedImage(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProductModalOpen, enlargedImage]);

  return (
    <div className="min-h-screen">

      {/* CABEÇALHO */}
      <header className="bg-header-background relative shadow-lg">
        <div className="header-container">
          <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img src={logo} alt="Logo da Dodoce's" className="logo-header" />
          </picture>
          <div className="slogan-container">
            <span className="slogan-text">Doces artesanais feitos com amor.</span>
          </div>
        </div>
      </header>

      {/* CARROSSEL */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <StackedCarousel data={carouselData} />
        </div>
        <div className="greeting-container">
          <div className="greeting-text">
            <h2>Sobre à Dodoce's!</h2>
            <p>Sou uma empreendedora apaixonada por transformar ingredientes selecionados em doces que encantam e conquistam paladares.</p>
            <p>Na Dodoce's, cada produto é confeccionado de forma artesanal, com todo o carinho e dedicação, pensando em levar até você uma experiência única.</p>
            <p>Cada sabor é cuidadosamente escolhido para garantir a melhor qualidade e aquele gostinho de feito em casa.</p>
            <p>Se você busca doces que além de sabor trazem amor em cada pedaço, está no lugar certo.</p>
            <p>Seja um bombom, um bolo ou qualquer outra delícia, tudo é preparado como se fosse para alguém da família.</p>
            <p>Bem-vindos à Dodoce's, onde o doce é feito com o coração!</p>
            <p><strong>por Karen Bandeira</strong></p>
          </div>
          <div className="greeting-image-container">
            <picture>
              <source srcSet={karenBandeiraWebp} type="image/webp" />
              <img src={karenBandeira} alt="Karen Bandeira, a doceira" className="greeting-image" />
            </picture>
          </div>
        </div>
      </section>

      {/* MENU DE PRODUTOS */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Nossos produtos em destaque</h2>

          {/* === MODIFICAÇÃO 2: A LISTA AGORA MOSTRA APENAS 6 ITENS === */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.slice(0, 6).map((product) => (
              <div key={product.id} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex">
                  <div className="w-1/3">
                    <picture>
                      <source srcSet={product.imageWebp} type="image/webp" />
                      <img src={product.image} alt={product.name} loading="lazy" className="product-image cursor-pointer rounded-xl" onClick={() => handleImageClick(product.image)} />
                    </picture>
                  </div>
                  <div className="w-2/3 p-6">
                    <h3 className="product-card-title">{product.name}</h3>
                    <p className="product-card-description">{product.description}</p>
                    <p className="product-card-price">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* === MODIFICAÇÃO 3: O BOTÃO AGORA ABRE O MODAL === */}
          <div className="text-center mt-12">
            <button
              onClick={() => setProductModalOpen(true)}
              className="bg-[#72c5c4] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#5daea8] transition-colors duration-300"
            >
              Ver todos os produtos
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO ONDE NOS ENCONTRAR */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Onde nos Encontrar</h2>
          <p className="text-center text-lg text-gray-700 mb-12">Escolha a melhor forma de saborear nossos doces!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
              <MapPin size={48} className="text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Nosso Quiosque</h3>
              <p className="text-gray-600 mb-4">Rua São Diogo - Largo São João - Cidade Velha, Belém - PA, 66020-260</p>
              <p className="text-gray-600 mb-6"><strong>Horário:</strong> Segunda a Sexta: 8h às 15h</p>
              <a href="https://maps.google.com/?cid=11785926177748043221&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNl" target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors duration-300 flex items-center space-x-2">
                <MapPin size={20} /><span>Ver no Mapa</span>
              </a>
              <p className="text-sm text-gray-500 mt-4">Venha nos visitar e sinta o aroma dos nossos doces fresquinhos!</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105">
              <Bike size={48} className="text-purple-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Delivery e retirada</h3>
              <p className="text-gray-600 mb-4">Peça pelo WhatsApp e receba no conforto da sua casa!</p>
              <p className="text-gray-600 mb-6"><strong>Atendimento:</strong> Segunda a Sábado: 9h às 17h</p>
              <a href="https://wa.me/5591982875970" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2">
                <MessageCircle size={20} /><span>Pedir por WhatsApp</span>
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
                {/* A função handleOrderChange aqui está errada, deveria ser parte da lógica do App.js, não do JSX */}
                <input type="text" id="name" name="name" value={orderForm.name} onChange={(e) => setOrderForm((prev) => ({ ...prev, name: e.target.value }))} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Seu nome completo" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Seu WhatsApp:</label>
                <input type="tel" id="phone" name="phone" value={orderForm.phone} onChange={(e) => setOrderForm((prev) => ({ ...prev, phone: e.target.value }))} className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="(99) 99999-9999" required />
              </div>

              {/* ================================================================= */}
              {/* ▼▼▼ ESTE É O BLOCO DE CÓDIGO ATUALIZADO ▼▼▼ */}
              {/* ================================================================= */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Selecione os produtos:</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {products.map((product) => {
                    const isSelected = !!orderForm.products[product.name];
                    const showQuantitySelector = isSelected && product.price !== "Entre em contato para orçamento";

                    return (
                      <div key={product.id} className="flex items-center justify-between">
                        {/* Container para Checkbox e Label */}
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id={`product-${product.id}`}
                            name={product.name}
                            checked={isSelected}
                            onChange={() => handleProductSelectionChange(product.name)}
                            className="form-checkbox h-5 w-5 text-pink-500 rounded"
                          />
                          <label htmlFor={`product-${product.id}`} className="text-gray-700 ml-3">
                            {product.name} - {product.price}
                          </label>
                        </div>

                        {/* Seletor de Quantidade (aparece condicionalmente) */}
                        {showQuantitySelector && (
                          <div className="flex items-center">
                            <label htmlFor={`quantity-${product.id}`} className="text-sm mr-2">Qtd:</label>
                            <select
                              id={`quantity-${product.id}`}
                              value={orderForm.products[product.name]}
                              onChange={(e) => handleQuantityChange(product.name, e.target.value)}
                              className="border border-gray-300 rounded-md p-1 text-sm"
                            >
                              {/* Gera as opções de 1 a 10 */}
                              {[...Array(10).keys()].map(i => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Observações (opcional):</label>
                <textarea id="message" name="message" value={orderForm.message} onChange={(e) => setOrderForm((prev) => ({ ...prev, message: e.target.value }))} rows="4" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Ex: Sem lactose, para presente, etc."></textarea>
              </div>
              <div className="flex justify-center">
                <button type="submit" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-colors duration-300 flex items-center space-x-3">
                  <MessageCircle size={24} /><span>Enviar pedido via WhatsApp</span>
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
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.817 1.48-8.279L.001 9.306l8.332-1.151L12 .587z" /></svg>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="bg-[#72c5c4] text-white py-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Entre em contato</h3>
            <p className="text-lg mb-8">Siga-nos nas redes sociais e faça seu pedido!</p>
            <div className="flex justify-center space-x-8">
              <a href="https://instagram.com/dodoce.s" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-200 hover:scale-110">
                <Instagram size={24} /> <span className="font-semibold">@dodoce.s</span>
              </a>
              <a href="https://wa.me/5591982875970" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-all duration-200 hover:scale-110">
                <MessageCircle size={24} /> <span className="font-semibold">WhatsApp</span>
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm opacity-80">© 2025 Dodoce's - Doceria Artesanal. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL PARA IMAGEM AMPLIADA */}
      {enlargedImage && (
        <FocusLock>
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
                aria-label="Fechar imagem ampliada"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </FocusLock>
      )}

      {/* BOTÃO FLUTUANTE DO WHATSAPP */}
      <a href="https://wa.me/5591982875970" target="_blank" rel="noopener noreferrer" className="whatsapp-float-button" aria-label="Fale conosco pelo WhatsApp">
        <MessageCircle size={32} />
      </a>

      {/* === MODIFICAÇÃO 4: RENDERIZAÇÃO DO NOVO MODAL DE PRODUTOS === */}
      <ProductModal
        show={isProductModalOpen}
        onClose={() => setProductModalOpen(false)}
        products={products}
      />

    </div>
  );
}

export default App;
