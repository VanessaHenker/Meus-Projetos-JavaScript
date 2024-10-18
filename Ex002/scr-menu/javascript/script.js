// Conteudo header 
//Buttom menu
$(document).ready(function () {
  $('#btn_mobile').on('click', function () {
    $('#mobile_menu').toggleClass('active');
    $('#btn_mobile').find('i').toggleClass('fa-x');
  });

  //Manipulador de eventos para o clique no documento
  $(document).on('click', function (event) {
    var $target = $(event.target);

    //Verifica se o clique foi fora do menu e do botão
    if (!$target.closest('#mobile_menu').length && !$target.closest('#btn_mobile').length) {
      $('#mobile_menu').removeClass('active');
      $('#btn_mobile').find('i').removeClass('fa-x');
    }
  });
});

// Barra de pesquisa
let boxBuscar = document.querySelector('.conteudo-button-pesq');
let lupa = document.querySelector('.btn_mobile_pesq');
let btnFechar = document.querySelector('.button_fechar');
let options = document.getElementById('opcoes');
let searchBar = document.getElementById('barra-pesquisa');

// Inicializa a barra de pesquisa e as opções fechadas
boxBuscar.classList.remove('ativar'); // Garante que a barra de pesquisa esteja fechada
options.classList.add('ativar-barra'); // Garante que as opções estejam fechadas

// Abre a barra de pesquisa
lupa.addEventListener('click', () => {
  boxBuscar.classList.add('ativar'); // Mostra a barra de busca
  options.classList.remove('ativar-barra'); // Mostra as opções quando a barra de busca é aberta
});

// Remove a barra de pesquisa
btnFechar.addEventListener('click', () => {
  boxBuscar.classList.remove('ativar'); // Fecha a barra de busca
  options.classList.add('ativar-barra'); // Fecha as opções
});

// Função para carregar o arquivo JSON dinamicamente
function carregarCategorias() {
  fetch('menu.json') // Atualize com o caminho correto
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados carregados do JSON:', data);
      const scrollPesquisa = document.querySelector('.scroll-pesquisa');
      scrollPesquisa.innerHTML = ''; // Limpa qualquer conteúdo anterior

      // Carregar categorias dependendo do tipo de menu
      const menuItems = data.usarMenuPizza ? data.menuItemsPizza : data.menuItemsCake;
      menuItems.forEach(item => {
        fetch(item.menu) // Carregar o menu correspondente
          .then(response => response.json())
          .then(menuData => {
            menuData.categorias.forEach(categoria => {
              const categoriaElemento = document.createElement('p');
              categoriaElemento.className = 'opcoes-barra';
              categoriaElemento.textContent = categoria.nome;
              scrollPesquisa.appendChild(categoriaElemento);

              // Comportamento de clique para cada categoria
              categoriaElemento.addEventListener('click', () => {
                searchBar.value = categoria.nome; // Define o valor do input como o nome da categoria
                options.classList.add('ativar-barra'); // Fecha as opções após a seleção
              });
            });
          })
          .catch(error => console.error('Erro ao carregar o menu:', error));
      });

      // As opções de pesquisa permanecem fechadas ao carregar
      options.classList.add('ativar-barra');
    })
    .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
}

// Chama a função para carregar as categorias
carregarCategorias();

// Abre as opções de pesquisa ao clicar no campo de pesquisa
searchBar.addEventListener('click', () => {
  options.classList.remove('ativar-barra'); // Mostra as opções
});

// Verifica se o clique foi fora das opções ou da barra de pesquisa
document.addEventListener('click', function (event) {
  const isClickInsideOptions = options.contains(event.target);
  const isClickInsideSearchBar = searchBar.contains(event.target);
  const isClickInsideBoxBuscar = boxBuscar.contains(event.target);

  // Se o clique for fora das opções e do campo de pesquisa
  if (!isClickInsideOptions && !isClickInsideSearchBar && !isClickInsideBoxBuscar) {
    options.classList.add('ativar-barra'); // Fecha as opções se clicar fora
    boxBuscar.classList.remove('ativar'); // Também fecha a barra de busca
  }
});

//Digita a opção desejada
function digitar_opcao() {
  let input = document.getElementById('barra-pesquisa').value
  input = input.toLowerCase();

  let opcao = document.getElementsByClassName('opcoes-barra');

  for (i = 0; i < opcao.length; i++) {
    if (!opcao[i].innerHTML.toLowerCase().includes(input)) {
      opcao[i].style.display = "none";
    }
    else {
      opcao[i].style.display = "list-item";
    }
  }
}

//Button ver mais
document.addEventListener('DOMContentLoaded', function () {
  //Obtém os elementos
  const buttonVerMais = document.getElementById('button-ver-mais');
  const buttonInfo = document.getElementById('conteudo-button-info');
  const buttonFechar = document.getElementById('btn-fechar');
  const buttonIconFechar = document.getElementById('btn-icon');

  //Verifica se os elementos existem antes de adicionar os event listeners
  if (buttonVerMais && buttonInfo && buttonFechar && buttonIconFechar) {
    // Adiciona evento ao botão "Ver Mais"
    buttonVerMais.addEventListener('click', function () {
      buttonInfo.classList.add('slideUp');
    });

    //Fecha as informações clicando no botão "Fechar"
    buttonFechar.addEventListener('click', function () {
      ocultarConteudo();
    });

    //Fecha as informações clicando no ícone "X"
    buttonIconFechar.addEventListener('click', function () {
      ocultarConteudo();
    });

    //Manipulador de eventos para o clique no documento
    document.addEventListener('click', function (event) {
      const target = event.target;

      //Verifica se o clique foi fora do menu e dos botões
      if (!buttonInfo.contains(target) && !buttonVerMais.contains(target) && !buttonFechar.contains(target) && !buttonIconFechar.contains(target)) {
        ocultarConteudo();
      }
    });

    //Função para descer o conteúdo e esconder o conteudo-button-info
    function ocultarConteudo() {
      if (buttonInfo.classList.contains('slideUp')) {
        buttonInfo.classList.add('slideDown');
        const animationEndHandler = function () {
          buttonInfo.classList.remove('slideUp');
          buttonInfo.classList.remove('slideDown');
          buttonInfo.removeEventListener('animationend', animationEndHandler);
        };
        buttonInfo.addEventListener('animationend', animationEndHandler, { once: true });
      }
    }
  }
});

//Função assíncrona para carregar todos os dados necessários ao carregar a página
async function carregarDados() {
  try {
    const response = await fetch('menu.json');
    const data = await response.json();

    let menuItems, navIcons, arquivoInfo, arquivoHorario, cardapioFile;

    if (data.usarMenuPizza) {
      menuItems = data.menuItemsPizza;
      navIcons = data.navIconsPizza;
      arquivoInfo = data.arquivoPizza[0].arquivoInfo;
      arquivoHorario = data.arquivoPizza[0].arquivoHorario;
      cardapioFile = data.menuItemsPizza[0].menu;
    } else {
      menuItems = data.menuItemsCake;
      navIcons = data.navIconsCake;
      arquivoInfo = data.arquivoCake[0].arquivoInfo;
      arquivoHorario = data.arquivoCake[0].arquivoHorario;
      cardapioFile = data.menuItemsCake[0].menu;
    }

    menuItems.forEach(item => {
      adicionarItemMenu(item.imagemSrc, item.titulo, item.localizacao);
    });

    navIcons.forEach(icon => {
      adicionarIconeNavegacao(icon.iconeClass, icon.texto, icon.id);
    });

    await carregarInfo(arquivoInfo);
    await carregarHorarios(arquivoHorario);
    await carregarCardapio(cardapioFile);

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}

function criarItemMenu(imagemSrc, titulo, localizacao) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'menu-item';

  const img = document.createElement('img');
  img.className = 'imagem-logo';
  img.src = imagemSrc;
  img.alt = titulo;
  itemDiv.appendChild(img);

  const h2 = document.createElement('h2');
  h2.className = 'conteudo-escrito';
  h2.textContent = titulo;
  itemDiv.appendChild(h2);

  const p = document.createElement('p');
  p.className = 'localizacao';

  const i = document.createElement('i');
  i.className = 'fa-solid fa-location-dot';
  p.appendChild(i);

  const span = document.createElement('span');
  span.textContent = localizacao;
  p.appendChild(span);

  itemDiv.appendChild(p);
  return itemDiv;
}

function adicionarItemMenu(imagemSrc, titulo, localizacao) {
  const menuContainer = document.getElementById('menu-container');
  const itemMenu = criarItemMenu(imagemSrc, titulo, localizacao);
  menuContainer.appendChild(itemMenu);
}

function criarIconeNavegacao(iconeClass, texto, id) {
  const navIcon = document.createElement('i');
  navIcon.className = iconeClass;
  navIcon.id = id;
  navIcon.appendChild(document.createTextNode(' ' + texto));
  return navIcon;
}

function adicionarIconeNavegacao(iconeClass, texto, id) {
  const menuContainer = document.getElementById('nav_logo');
  const navIcon = criarIconeNavegacao(iconeClass, texto, id);
  menuContainer.appendChild(navIcon);
}

async function carregarInfo(arquivoInfo) {
  try {
    const response = await fetch(arquivoInfo);
    const data = await response.text();
    const container = document.getElementById('conteudo-informacoes');
    const lines = data.split('\n');

    let currentSection = [];
    let currentTitle = '';

    lines.forEach(line => {
      if (line.trim() === '') {
        if (currentTitle && currentSection.length > 0) {
          container.appendChild(createSection(currentTitle, currentSection));
        }
        currentSection = [];
        currentTitle = '';
      } else if (currentTitle === '') {
        currentTitle = line;
      } else {
        currentSection.push(line);
      }
    });

    if (currentTitle && currentSection.length > 0) {
      container.appendChild(createSection(currentTitle, currentSection));
    }
  } catch (error) {
    console.error('Erro ao carregar o arquivo de informações:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await carregarDados();
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

function createSection(title, contents) {
  const section = document.createElement('div');
  const h3 = document.createElement('h3');
  h3.textContent = title;
  section.appendChild(h3);

  contents.forEach(content => {
    const p = document.createElement('p');
    p.innerHTML = content;
    section.appendChild(p);
  });

  section.style.marginTop = '20px';
  return section;
}

async function carregarHorarios(arquivoHorario) {
  try {
    const response = await fetch(arquivoHorario);
    const data = await response.text();
    const horarios = parseHorarios(data);

    const now = new Date();
    const diaDaSemana = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const hora = document.getElementById('hora-funcionamento');
    const hora2 = document.getElementById('hora-funcionamento2');

    horaFuncionamento(hora, horarios, diaDaSemana, hours, minutes);
    horaFuncionamento(hora2, horarios, diaDaSemana, hours, minutes);

  } catch (error) {
    console.error('Erro ao carregar o arquivo de horarios:', error);
  }
}

function parseHorarios(data) {
  const lines = data.split('\n');
  const horarios = {};

  lines.forEach(line => {
    if (line.startsWith('Horários de funcionamento') || line.trim() === '') {
      return;
    }
    const [dia, horario] = line.split(' - ');
    if (dia && horario) {
      horarios[dia.trim()] = horario.trim();
    }
  });

  return horarios;
}

function horaFuncionamento(elemento, horarios, diaDaSemana, hours, minutes) {
  const diaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][diaDaSemana];
  const horario = horarios[diaSemana];

  if (!horario || horario.toLowerCase() === 'fechado') {
    horaEscrito(elemento, true);
  } else {
    const [abreStr, fechaStr] = horario.split(' / ');
    if (abreStr && fechaStr) {
      const [abreHour, abreMin] = abreStr.split(':').map(Number);
      const [fechaHour, fechaMin] = fechaStr.split(':').map(Number);

      const abreTime = abreHour * 60 + abreMin;
      const fechaTime = fechaHour * 60 + fechaMin;
      const horaAtual = hours * 60 + minutes;

      if (horaAtual >= abreTime && horaAtual <= fechaTime) {
        elemento.innerHTML = 'Aberto agora';
      } else {
        horaEscrito(elemento, false);
      }
    } else {
      horaEscrito(elemento, false);
    }
  }
}

function horaEscrito(elemento, fechado) {
  elemento.innerHTML = fechado ? 'Fechado' : 'Fechado agora';
  elemento.style.color = 'black';
  document.getElementById('mudar-cor').style.color = '#ffcb45';
}

async function carregarCardapio(cardapioFile) {
  try {
    const response = await fetch(cardapioFile);
    const data = await response.json();
    const cardapio = document.getElementById('cardapio');
    cardapio.innerHTML = '';

    if (!data.categorias || data.categorias.length === 0) {
      console.error('Nenhuma categoria encontrada no cardápio.');
      return;
    }

    data.categorias.forEach((categoria, categoriaIndex) => {
      const categoriaContainer = document.createElement('div');
      categoriaContainer.classList.add('categoria-container');
      categoriaContainer.id = `categoria-${categoriaIndex}`;

      const subtitulo = document.createElement('h3');
      subtitulo.classList.add('section-subtitulo');
      subtitulo.textContent = categoria.nome;
      categoriaContainer.appendChild(subtitulo);

      const carouselWrapper = document.createElement('div');
      carouselWrapper.classList.add('carousel-wrapper');

      const prevButton = document.createElement('button');
      prevButton.classList.add('carousel-nav', 'carousel-prev');
      prevButton.textContent = '<';
      prevButton.addEventListener('click', () => slideCarousel(categoriaIndex, -1));

      const carousel = document.createElement('div');
      carousel.id = `carousel-${categoriaIndex}`;
      carousel.classList.add('carousel');
      carousel.setAttribute('data-offset', '0');

      categoria.itens.forEach(item => {
        const prato = document.createElement('div');
        prato.classList.add('pratos');
        prato.innerHTML = `
          <div class="prato-coracao"><i class="fa-solid fa-heart"></i></div>
          <img class="tamanho-imagem" src="${item.imagem}" alt="imagem-${item.nome}">
          <h3 class="color-padrao">${item.nome}</h3>
          <span class="prato-descricao color-padrao">${item.descricao}</span>
          <div class="prato-star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <span class="color-padrao">${item.avaliacoes}</span>
          </div>
          <div class="prato-preco">
            <h4 class="color-padrao">${item.preco}</h4>
            <button class="btn-default">
              <i class="fa-solid fa-basket-shopping"></i>
            </button>
          </div>
        `;
        carousel.appendChild(prato);
      });

      const nextButton = document.createElement('button');
      nextButton.classList.add('carousel-nav', 'carousel-next');
      nextButton.textContent = '>';
      nextButton.addEventListener('click', () => slideCarousel(categoriaIndex, 1));

      carouselWrapper.appendChild(prevButton);
      carouselWrapper.appendChild(carousel);
      carouselWrapper.appendChild(nextButton);
      categoriaContainer.appendChild(carouselWrapper);
      cardapio.appendChild(categoriaContainer);
    });
  } catch (error) {
    console.error('Erro ao carregar o cardápio:', error);
  }
}

function slideCarousel(categoriaIndex, direction) {
  const carousel = document.getElementById(`carousel-${categoriaIndex}`);
  const items = carousel.querySelectorAll('.pratos');

  if (items.length === 0) return; // Verifica se há itens no carrossel

  const itemWidth = items[0].offsetWidth + 20; // Margem de 10px de cada lado
  const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
  let currentOffset = parseInt(carousel.getAttribute('data-offset') || 0);

  // Atualiza o offset com base na direção
  currentOffset -= direction * itemWidth;

  // Limita o deslocamento
  const maxOffset = -(items.length - visibleItems) * itemWidth;
  currentOffset = Math.max(currentOffset, maxOffset);
  currentOffset = Math.min(currentOffset, 0); 

  // Aplica o novo deslocamento
  carousel.style.transform = `translateX(${currentOffset}px)`;
  carousel.setAttribute('data-offset', currentOffset.toString());
}

function carregarCategorias() {
  fetch('menu.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      return response.json();
    })
    .then(data => {
      const scrollPesquisa = document.querySelector('.scroll-pesquisa');
      scrollPesquisa.innerHTML = '';

      const menuItems = data.usarMenuPizza ? data.menuItemsPizza : data.menuItemsCake;

      menuItems.forEach((item, itemIndex) => {
        fetch(item.menu)
          .then(response => response.json())
          .then(menuData => {
            menuData.categorias.forEach((categoria, categoriaIndex) => {
              const categoriaElemento = document.createElement('p');
              categoriaElemento.className = 'opcoes-barra';
              categoriaElemento.textContent = categoria.nome;
              scrollPesquisa.appendChild(categoriaElemento);

              categoriaElemento.addEventListener('click', () => {
                searchBar.value = categoria.nome; 
                options.classList.add('ativar-barra'); 

                const categoriaContainer = document.getElementById(`categoria-${categoriaIndex}`);
                if (categoriaContainer) {
                  const offset = 100; // Ajuste de deslocamento, se necessário
                  const topPos = categoriaContainer.getBoundingClientRect().top + window.scrollY - offset;

                  window.scrollTo({
                    top: topPos,
                    behavior: 'smooth'
                  });
                }
              });
            });
          })
          .catch(error => console.error('Erro ao carregar o menu:', error));
      });

      options.classList.add('ativar-barra');
    })
    .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
}

// Chama a função para carregar as categorias
carregarCategorias();
