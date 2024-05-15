/**
* Template Name: iPortfolio
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Função de seleção fácil
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function 
   * Função de ouvinte de eventos
   * Função espera que um evento ocorra e depois responde a ele
   * Função de ouvinte de eventos
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /*
Este trecho de código é uma função em JavaScript chamada on,
que é utilizada para adicionar um ouvinte de eventos a um elemento HTML
ou a vários elementos HTML, dependendo do parâmetro all.

Aqui está uma explicação do código linha por linha:

const on = (type, el, listener, all = false) => {: Esta linha define uma função chamada on que aceita quatro parâmetros: type (o tipo de evento a ser ouvido, como "click" ou "mouseover"), el (o elemento HTML ao qual queremos adicionar o ouvinte de eventos), listener (a função a ser executada quando o evento ocorrer) e all (um parâmetro opcional, que por padrão é falso).

let selectEl = select(el, all): Esta linha chama uma função select (que não está definida no trecho de código fornecido) e atribui o resultado a selectEl. Presumivelmente, select é uma função que retorna um elemento HTML ou uma lista de elementos HTML com base no seletor passado como argumento (el). O parâmetro all indica se todos os elementos correspondentes devem ser selecionados ou apenas o primeiro.

if (selectEl) {: Verifica se selectEl não é nulo ou indefinido.

if (all) {: Verifica se o parâmetro all é verdadeiro.

selectEl.forEach(e => e.addEventListener(type, listener)): Se all for verdadeiro, percorre cada elemento em selectEl (presumivelmente uma lista de elementos) e adiciona o ouvinte de eventos listener para o tipo de evento especificado (type).

selectEl.addEventListener(type, listener): Se all for falso, adiciona o ouvinte de eventos listener ao elemento selectEl para o tipo de evento especificado (type).

}: Fecha os blocos de código if e else internos.

}: Fecha o bloco de código da função on.
  
  */




  /**
   * evento para o (scroll) 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Botão voltar ao topo
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Alternar navegação móvel
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Rolar com deslocamento em links com nome de classe .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Rolar com deslocamento no carregamento da página com links hash no URL
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /* 
  * Hero Efeito digitar 
  */
  
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animação de habilidades
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Biblioteca Isotope: é uma biblioteca JavaScript para layouts dinâmicos 
   * e filtragem de elementos
   * Porfolio isotope e filtro
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Iniciar portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio
   * Controle deslizante de detalhes do portfólio
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Controle deslizante de depoimentos
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animação na rolagem
   *  on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Iniciar contador
   */
  new PureCounter();

})()