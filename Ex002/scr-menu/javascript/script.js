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

//Button pesquisa
let boxBuscar = document.querySelector('.conteudo-button-pesq');

let lupa = document.querySelector('.btn_mobile_pesq');

let btnFechar = document.querySelector('.button_fechar');

//Abre a barra de pesquisa
lupa.addEventListener('click', () => {
  boxBuscar.classList.add('ativar');
});

//Remove a barra de pesquisa
btnFechar.addEventListener('click', () => {
  boxBuscar.classList.remove('ativar');
})

//Button pesquisa opções
const searchBar = document.getElementById('barra-pesquisa');
const options = document.getElementById('opcoes');
const button_close = document.getElementById('button_fechar');

//Abre as opções
searchBar.addEventListener('click', () => {
  options.classList.remove('ativar-barra');
});

//Remove as opções clicando no X
button_close.addEventListener('click', () => {
  options.classList.add('ativar-barra');
});

//Adiciona comportamento de clique nas opções
const optionItems = document.querySelectorAll('.opcoes-barra');
optionItems.forEach(option => {
  option.addEventListener('click', () => {
    searchBar.value = option.textContent;
    options.classList.add('ativar-barra');
  })
});

//Verifica se opção de busca está aberta
document.addEventListener('click', function (event) {
  var isClickInside = content.contains(event.target);

  if (!isClickInside) {
    boxBuscar.classList.remove('ativar');
    options.classList.add('ativar-barra');
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
    //Realiza uma requisição para obter o arquivo JSON que contém os dados gerais
    const response = await fetch('menu.json');
    const data = await response.json();

    let menuItems, navIcons, arquivoInfo, arquivoHorario, cardapioFile;

    //Verifica qual menu deve usar, com base na configuração do JSON
    if (data.usarMenuPizza) {
      menuItems = data.menuItemsPizza;
      navIcons = data.navIconsPizza;
      arquivoInfo = data.arquivoPizza[0].arquivoInfo;
      arquivoHorario = data.arquivoPizza[0].arquivoHorario;
      cardapioFile = data.menuItemsPizza[0].menu; // Arquivo de cardápio para Pizza Bliss
    } else {
      menuItems = data.menuItemsCake;
      navIcons = data.navIconsCake;
      arquivoInfo = data.arquivoCake[0].arquivoInfo;
      arquivoHorario = data.arquivoCake[0].arquivoHorario;
      cardapioFile = data.menuItemsCake[0].menu; // Arquivo de cardápio para Cake Bliss
    }

    //Carrega e exibe os itens do menu
    menuItems.forEach(item => {
      adicionarItemMenu(item.imagemSrc, item.titulo, item.localizacao);
    });

    //Carrega e exibe os ícones de navegação
    navIcons.forEach(icon => {
      adicionarIconeNavegacao(icon.iconeClass, icon.texto, icon.id);
    });

    //Carrega as informações do arquivo especificado
    carregarInfo(arquivoInfo);

    //Carrega os horários de funcionamento do arquivo especificado
    carregarHorarios(arquivoHorario);

    //Carrega o cardápio a partir do arquivo correto
    carregarCardapio(cardapioFile);

  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
}


//Função para criar um item de menu com imagem, título e localização
function criarItemMenu(imagemSrc, titulo, localizacao) {
  const itemDiv = document.createElement('div');
  itemDiv.className = 'menu-item';

  //Cria a imagem do item de menu
  const img = document.createElement('img');
  img.className = 'imagem-logo';
  img.src = imagemSrc;
  img.alt = titulo;
  itemDiv.appendChild(img);

  //Cria o título do item de menu (h2)
  const h2 = document.createElement('h2');
  h2.className = 'conteudo-escrito';
  h2.textContent = titulo;
  itemDiv.appendChild(h2);

  //Cria o parágrafo para exibir a localização
  const p = document.createElement('p');
  p.className = 'localizacao';

  //Cria o ícone de localização (i)
  const i = document.createElement('i');
  i.className = 'fa-solid fa-location-dot';
  p.appendChild(i);

  //Cria o span para exibir o texto da localização
  const span = document.createElement('span');
  span.textContent = localizacao;
  p.appendChild(span);

  itemDiv.appendChild(p);

  return itemDiv;
}

//Função para adicionar um item de menu ao contêiner do menu na página HTML
function adicionarItemMenu(imagemSrc, titulo, localizacao) {
  const menuContainer = document.getElementById('menu-container');
  const itemMenu = criarItemMenu(imagemSrc, titulo, localizacao);
  menuContainer.appendChild(itemMenu);
}

//Função para criar um ícone de navegação com classe, texto e ID
function criarIconeNavegacao(iconeClass, texto, id) {
  const navIcon = document.createElement('i');
  navIcon.className = iconeClass;
  navIcon.id = id;

  navIcon.appendChild(document.createTextNode(' ' + texto));

  return navIcon;
}

//Função para adicionar um ícone de navegação ao contêiner de navegação na página HTML
function adicionarIconeNavegacao(iconeClass, texto, id) {
  const menuContainer = document.getElementById('nav_logo');
  const navIcon = criarIconeNavegacao(iconeClass, texto, id);
  menuContainer.appendChild(navIcon);
}

//Função assíncrona para carregar informações de um arquivo e exibir no contêiner especificado
async function carregarInfo(arquivoInfo) {
  try {
    const response = await fetch(arquivoInfo);
    const data = await response.text();
    const container = document.getElementById('conteudo-informacoes');
    const lines = data.split('\n');

    let currentSection = [];
    let currentTitle = '';

    //Itera sobre cada linha do texto
    lines.forEach(line => {
      if (line.trim() === '') {
        //Se a linha estiver vazia, adiciona a seção atual ao contêiner de informações
        if (currentTitle && currentSection.length > 0) {
          container.appendChild(createSection(currentTitle, currentSection));
        }
        currentSection = []; // Reinicia a seção atual
        currentTitle = ''; // Reinicia o título da seção
      }
      else if (currentTitle === '') {
        //Se o título da seção ainda não foi definido, define-o com a linha atual
        currentTitle = line;
      }
      else {
        //Caso contrário, adiciona a linha à seção atual
        currentSection.push(line);
      }
    });

    //diciona a última seção, se existir
    if (currentTitle && currentSection.length > 0) {
      container.appendChild(createSection(currentTitle, currentSection));
    }
  }
  catch (error) {
    console.error('Erro ao carregar o arquivo de informações:', error); //Exibe o erro no console, se houver algum problema
  }
}

//Conteudo cardápio info
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Carregar os dados do menu
    await carregarDados();
  }
  catch (error) {
    console.error('Erro ao carregar os dados:', error);
  }
});

//Função para criar uma seção com título e conteúdo
function createSection(title, contents) {
  const section = document.createElement('div');
  const h3 = document.createElement('h3');

  h3.textContent = title;
  section.appendChild(h3);

  //Itera sobre o conteúdo da seção e cria parágrafos para cada item
  contents.forEach(content => {
    const p = document.createElement('p');
    p.innerHTML = content;
    section.appendChild(p);
  });

  section.style.marginTop = '20px';

  return section;
}

//Função assíncrona para carregar os horários de funcionamento a partir de um arquivo
async function carregarHorarios(arquivoHorario) {
  try {
    const response = await fetch(arquivoHorario);
    const data = await response.text();
    console.log('Arquivo de horários carregado:', data);

    const horarios = parseHorarios(data);
    console.log('Horarios processados:', horarios);

    //Obtém dia e horario atual
    const now = new Date();
    const diaDaSemana = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const hora = document.getElementById('hora-funcionamento');
    const hora2 = document.getElementById('hora-funcionamento2');

    //Verifica o horário de funcionamento para o momento atual
    horaFuncionamento(hora, horarios, diaDaSemana, hours, minutes);
    horaFuncionamento(hora2, horarios, diaDaSemana, hours, minutes);

  } catch (error) {
    console.error('Erro ao carregar o arquivo de horarios:', error);
  }
}

// Função para analisar os horários de funcionamento a partir dos dados do arquivo
function parseHorarios(data) {
  const lines = data.split('\n');
  const horarios = {};

  // Itera sobre cada linha do texto
  lines.forEach(line => {
    if (line.startsWith('Horários de funcionamento')) {
      return; //Ignora a linha de cabeçalho "Horários de funcionamento"
    }
    else if (line.trim() === '') {
      return; //Ignora linhas em branco
    }
    else {
      const [dia, horario] = line.split(' - '); //Divide a linha em dia e horário
      if (dia && horario) {
        horarios[dia.trim()] = horario.trim(); //Armazena o horário associado ao dia da semana
      }
    }
  });

  return horarios;
}

//Função para verificar se está aberto e exibir o status no elemento fornecido
function horaFuncionamento(elemento, horarios, diaDaSemana, hours, minutes) {
  const diaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][diaDaSemana];
  const horario = horarios[diaSemana];

  console.log('Verificando funcionamento para:', diaSemana, horario);

  if (!horario || horario.toLowerCase() === 'fechado') {
    horaEscrito(elemento, true);
  }
  else {
    const [abreStr, fechaStr] = horario.split(' / ');

    if (abreStr && fechaStr) {
      const [abreHour, abreMin] = abreStr.split(':').map(Number);
      const [fechaHour, fechaMin] = fechaStr.split(':').map(Number);

      const abreTime = abreHour * 60 + abreMin;
      const fechaTime = fechaHour * 60 + fechaMin;
      const horaAtual = hours * 60 + minutes;

      if (horaAtual >= abreTime && horaAtual <= fechaTime) {
        elemento.innerHTML = 'Aberto agora';
      }
      else {
        horaEscrito(elemento, false);
      }
    }
    else {
      console.error('Formato de horário inválido para o dia', diaSemana); // Exibe um erro no console se o formato do horário for inválido
      horaEscrito(elemento, false);
    }
  }
}

// Função para exibir o status de horário de funcionamento no elemento fornecido
function horaEscrito(elemento, fechado) {
  if (fechado) {
    elemento.innerHTML = 'Fechado';
  }
  else {
    elemento.innerHTML = 'Fechado agora';
  }

  elemento.style.color = 'black';
  document.getElementById('mudar-cor').style.color = '#ffcb45';
}

//Função assíncrona para carregar o cardápio de um arquivo especificado
async function carregarCardapio(cardapioFile) {
  try {
    const response = await fetch(cardapioFile);
    const data = await response.json();
    const cardapio = document.getElementById('cardapio');

    // Limpar o cardápio existente
    cardapio.innerHTML = '';

    // Iterar sobre as categorias
    data.categorias.forEach((categoria, categoriaIndex) => {
      // Criar um contêiner para cada categoria
      const categoriaContainer = document.createElement('div');
      categoriaContainer.classList.add('categoria-container');

      // Adicionar o subtítulo da categoria
      const subtitulo = document.createElement('h3');
      subtitulo.classList.add('section-subtitulo');
      subtitulo.textContent = categoria.nome; // Título da categoria
      categoriaContainer.appendChild(subtitulo);

      // Criar o contêiner de itens da categoria
      const itensContainer = document.createElement('div');
      itensContainer.classList.add('itens-container');
      itensContainer.id = `carousel-${categoriaIndex}`;

      // Adicionar os itens da categoria
      categoria.itens.forEach(item => {
        const prato = document.createElement('a');
        prato.classList.add('pratos');
        prato.href = '#';

        prato.innerHTML = `
          <div class="prato-coracao">
            <i class="fa-solid fa-heart"></i>
          </div>
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
        itensContainer.appendChild(prato);
      });

      // Adicionar o contêiner de itens ao contêiner da categoria
      categoriaContainer.appendChild(itensContainer);

      // Criar botões de navegação para o carrossel
      const prevButton = document.createElement('button');
      prevButton.classList.add('carousel-nav', 'carousel-prev');
      prevButton.textContent = '<';
      prevButton.addEventListener('click', () => slideCarousel(categoriaIndex, -1));

      const nextButton = document.createElement('button');
      nextButton.classList.add('carousel-nav', 'carousel-next');
      nextButton.textContent = '>';
      nextButton.addEventListener('click', () => slideCarousel(categoriaIndex, 1));

      // Adicionar botões de navegação ao contêiner da categoria
      categoriaContainer.appendChild(prevButton);
      categoriaContainer.appendChild(nextButton);

      // Adicionar o contêiner da categoria ao cardápio
      cardapio.appendChild(categoriaContainer);
    });
  } catch (error) {
    console.error('Erro ao carregar o cardápio:', error);
  }
}

function slideCarousel(categoriaIndex, direction) {
  const carousel = document.getElementById(`carousel-${categoriaIndex}`);
  const items = carousel.querySelectorAll('.pratos');
  const itemWidth = items[0].offsetWidth;
  let currentOffset = parseInt(carousel.getAttribute('data-offset') || 0);

  // Calcular o novo deslocamento
  currentOffset += direction * itemWidth;

  // Limitar o deslocamento para evitar transbordo
  const maxOffset = -(items.length - 3) * itemWidth; // Assumindo que você quer mostrar 3 itens por vez
  if (currentOffset > 0) {
    currentOffset = 0; // Limite para o início
  } else if (currentOffset < maxOffset) {
    currentOffset = maxOffset; // Limite para o fim
  }

  // Aplicar o novo deslocamento
  carousel.style.transform = `translateX(${currentOffset}px)`;
  carousel.setAttribute('data-offset', currentOffset); // Armazenar o deslocamento atual
}
