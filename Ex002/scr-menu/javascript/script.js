// Conteúdo header 
//Botão menu
$(document).ready(function () {
  $('#btn_mobile').on('click', function () {
      $('#mobile_menu').toggleClass('active');
      $('#btn_mobile').find('i').toggleClass('fa-x');
  });

  // Manipulador de eventos para o clique no documento
  $(document).on('click', function (event) {
      var $target = $(event.target);

      // Verifica se o clique foi fora do menu e do botão
      if (!$target.closest('#mobile_menu').length && !$target.closest('#btn_mobile').length) {
          $('#mobile_menu').removeClass('active');
          $('#btn_mobile').find('i').removeClass('fa-x');
      }
  });
});

// Botão pesquisa
const boxBuscar = document.querySelector('.conteudo-button-pesq');
const lupa = document.querySelector('.btn_mobile_pesq');
const btnFechar = document.querySelector('.button_fechar');

// Abre a barra de pesquisa
lupa.addEventListener('click', () => {
  boxBuscar.classList.add('ativar');
});

// Remove a barra de pesquisa
btnFechar.addEventListener('click', () => {
  boxBuscar.classList.remove('ativar');
});

// Botão pesquisa opções
const searchBar = document.getElementById('barra-pesquisa');
const options = document.getElementById('opcoes');

// Abre as opções
searchBar.addEventListener('click', () => {
  options.classList.remove('ativar-barra');
});

// Remove as opções clicando no X
btnFechar.addEventListener('click', () => {
  options.classList.add('ativar-barra');
});

// Adiciona comportamento de clique nas opções
const optionItems = document.querySelectorAll('.opcoes-barra');
optionItems.forEach(option => {
  option.addEventListener('click', () => {
      searchBar.value = option.textContent;
      options.classList.add('ativar-barra');
  });
});

// Verifica se a opção de busca está aberta
document.addEventListener('click', function (event) {
  const isClickInside = options.contains(event.target);

  if (!isClickInside) {
      boxBuscar.classList.remove('ativar');
      options.classList.add('ativar-barra');
  }
});

// Digita a opção desejada
function digitar_opcao() {
  let input = document.getElementById('barra-pesquisa').value.toLowerCase();
  let opcao = document.getElementsByClassName('opcoes-barra');

  for (let i = 0; i < opcao.length; i++) {
      opcao[i].style.display = opcao[i].innerHTML.toLowerCase().includes(input) ? "list-item" : "none";
  }
}

// Botão ver mais
document.addEventListener('DOMContentLoaded', function () {
  const buttonVerMais = document.getElementById('button-ver-mais');
  const buttonInfo = document.getElementById('conteudo-button-info');
  const buttonFechar = document.getElementById('btn-fechar');
  const buttonIconFechar = document.getElementById('btn-icon');

  if (buttonVerMais && buttonInfo && buttonFechar && buttonIconFechar) {
      buttonVerMais.addEventListener('click', function () {
          buttonInfo.classList.add('slideUp');
      });

      buttonFechar.addEventListener('click', function () {
          ocultarConteudo();
      });

      buttonIconFechar.addEventListener('click', function () {
          ocultarConteudo();
      });

      document.addEventListener('click', function (event) {
          const target = event.target;

          if (!buttonInfo.contains(target) && !buttonVerMais.contains(target) && !buttonFechar.contains(target) && !buttonIconFechar.contains(target)) {
              ocultarConteudo();
          }
      });

      function ocultarConteudo() {
          if (buttonInfo.classList.contains('slideUp')) {
              buttonInfo.classList.add('slideDown');
              const animationEndHandler = function () {
                  buttonInfo.classList.remove('slideUp', 'slideDown');
                  buttonInfo.removeEventListener('animationend', animationEndHandler);
              };
              buttonInfo.addEventListener('animationend', animationEndHandler, { once: true });
          }
      }
  }
});

// Carrega os dados necessários ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
  carregarDados();
});

async function carregarDados() {
  try {
      const response = await fetch('menu.json');
      const data = await response.json();

      let menuItems, navIcons, arquivoInfo, arquivoHorario;

      if (data.usarMenuPizza) {
          menuItems = data.menuItemsPizza;
          navIcons = data.navIconsPizza;
          arquivoInfo = data.arquivoPizza[0].arquivoInfo;
          arquivoHorario = data.arquivoPizza[0].arquivoHorario;
      } else {
          menuItems = data.menuItemsCake;
          navIcons = data.navIconsCake;
          arquivoInfo = data.arquivoCake[0].arquivoInfo;
          arquivoHorario = data.arquivoCake[0].arquivoHorario;
      }

      menuItems.forEach(item => {
          adicionarItemMenu(item.imagemSrc, item.titulo, item.localizacao);
      });

      navIcons.forEach(icon => {
          adicionarIconeNavegacao(icon.iconeClass, icon.texto, icon.id);
      });

      carregarInfo(arquivoInfo);
      carregarHorarios(arquivoHorario);

  } catch (error) {
      console.error('Erro ao carregar dados:', error);
  }
}

// Funções de criação de elementos dinâmicos
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

// Carregar informações e horários
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

      const estadoAtual = verificarStatus(diaDaSemana, hours, minutes, horarios);

      const statusContainer = document.getElementById('conteudo-status');
      statusContainer.innerHTML = estadoAtual;

  } catch (error) {
      console.error('Erro ao carregar o arquivo de horários:', error);
  }
}

function parseHorarios(data) {
  const horarios = [];

  const lines = data.split('\n');
  lines.forEach(line => {
      const parts = line.split(':');
      const day = parseInt(parts[0]);
      const openHour = parseInt(parts[1]);
      const openMinute = parseInt(parts[2]);
      const closeHour = parseInt(parts[3]);
      const closeMinute = parseInt(parts[4]);

      horarios.push({
          day,
          open: { hour: openHour, minute: openMinute },
          close: { hour: closeHour, minute: closeMinute }
      });
  });

  return horarios;
}

function verificarStatus(diaDaSemana, hours, minutes, horarios) {
  const hojeHorario = horarios.find(horario => horario.day === diaDaSemana);

  if (hojeHorario) {
      const nowInMinutes = hours * 60 + minutes;
      const openInMinutes = hojeHorario.open.hour * 60 + hojeHorario.open.minute;
      const closeInMinutes = hojeHorario.close.hour * 60 + hojeHorario.close.minute;

      if (nowInMinutes >= openInMinutes && nowInMinutes <= closeInMinutes) {
          return "<span class='status-aberto'>Aberto</span>";
      } else {
          return "<span class='status-fechado'>Fechado</span>";
      }
  } else {
      return "<span class='status-fechado'>Fechado</span>";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  fetch('cardapio.json')
  .then(response => response.json())
  .then(data => {
      const cardapio = document.getElementById('cardapio');
      
      // Supondo que você queira carregar a primeira categoria
      const primeiraCategoria = data.categorias[0];
      
      // Criar o subtítulo dinamicamente
      const subtituloElement = document.createElement('h3');
      subtituloElement.classList.add('section-subtitulo');
      subtituloElement.textContent = primeiraCategoria.titulo;
      
      // Inserir o subtítulo antes do conteúdo do cardápio
      cardapio.parentNode.insertBefore(subtituloElement, cardapio);
      
      // Iterar sobre os itens da primeira categoria
      primeiraCategoria.itens.forEach(pizza => {
          const prato = document.createElement('a');
          prato.classList.add('pratos');
          prato.href = '#';
          
          prato.innerHTML = `
              <div class="prato-coracao">
                  <i class="fa-solid fa-heart"></i>
              </div>
              <img class="tamanho-imagem" src="${pizza.imagem}" alt="imagem-pizza">
              <h3 class="color-padrao">${pizza.nome}</h3>
              <span class="prato-descricao color-padrao">${pizza.descricao}</span>
              <div class="prato-star">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <span class="color-padrao">${pizza.avaliacoes}</span>
              </div>
              <div class="prato-preco">
                  <h4 class="color-padrao">${pizza.preco}</h4>
                  <button class="btn-default">
                      <i class="fa-solid fa-basket-shopping"></i>
                  </button>
              </div>
          `;
          
          cardapio.appendChild(prato);
      });
  });
});
