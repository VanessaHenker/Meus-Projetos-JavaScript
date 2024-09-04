// Botão do menu mobile
document.addEventListener('DOMContentLoaded', function () {
  const btnMobile = document.getElementById('btn_mobile');
  const mobileMenu = document.getElementById('mobile_menu');

  btnMobile.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    btnMobile.querySelector('i').classList.toggle('fa-x');
  });

  // Manipulador de eventos para cliques fora do menu mobile
  document.addEventListener('click', function (event) {
    const target = event.target;

    if (!mobileMenu.contains(target) && !btnMobile.contains(target)) {
      mobileMenu.classList.remove('active');
      btnMobile.querySelector('i').classList.remove('fa-x');
    }
  });
});

// Botão de pesquisa
const boxBuscar = document.querySelector('.conteudo-button-pesq');
const lupa = document.querySelector('.btn_mobile_pesq');
const btnFechar = document.querySelector('.button_fechar');

lupa.addEventListener('click', () => {
  boxBuscar.classList.add('ativar');
});

btnFechar.addEventListener('click', () => {
  boxBuscar.classList.remove('ativar');
});

// Botão de pesquisa com opções
const searchBar = document.getElementById('barra-pesquisa');
const options = document.getElementById('opcoes');
const buttonClose = document.getElementById('button_fechar');

searchBar.addEventListener('click', () => {
  options.classList.remove('ativar-barra');
});

buttonClose.addEventListener('click', () => {
  options.classList.add('ativar-barra');
});

const optionItems = document.querySelectorAll('.opcoes-barra');
optionItems.forEach(option => {
  option.addEventListener('click', () => {
    searchBar.value = option.textContent;
    options.classList.add('ativar-barra');
  });
});

document.addEventListener('click', function (event) {
  const target = event.target;
  if (!searchBar.contains(target) && !options.contains(target)) {
    boxBuscar.classList.remove('ativar');
    options.classList.add('ativar-barra');
  }
});

// Função para filtrar opções ao digitar
function digitarOpcao() {
  const input = searchBar.value.toLowerCase();
  const opcao = document.getElementsByClassName('opcoes-barra');

  for (let i = 0; i < opcao.length; i++) {
    if (!opcao[i].innerHTML.toLowerCase().includes(input)) {
      opcao[i].style.display = "none";
    } else {
      opcao[i].style.display = "list-item";
    }
  }
}

// Botão "Ver Mais"
document.addEventListener('DOMContentLoaded', function () {
  const buttonVerMais = document.getElementById('button-ver-mais');
  const buttonInfo = document.getElementById('conteudo-button-info');
  const buttonFechar = document.getElementById('btn-fechar');
  const buttonIconFechar = document.getElementById('btn-icon');

  if (buttonVerMais && buttonInfo && buttonFechar && buttonIconFechar) {
    buttonVerMais.addEventListener('click', function () {
      buttonInfo.classList.add('slideUp');
    });

    buttonFechar.addEventListener('click', ocultarConteudo);
    buttonIconFechar.addEventListener('click', ocultarConteudo);

    document.addEventListener('click', function (event) {
      const target = event.target;
      if (!buttonInfo.contains(target) && !buttonVerMais.contains(target)) {
        ocultarConteudo();
      }
    });

    function ocultarConteudo() {
      if (buttonInfo.classList.contains('slideUp')) {
        buttonInfo.classList.add('slideDown');
        buttonInfo.addEventListener('animationend', function () {
          buttonInfo.classList.remove('slideUp', 'slideDown');
        }, { once: true });
      }
    }
  }
});

// Função assíncrona para carregar todos os dados necessários ao carregar a página
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

    await carregarInfo(arquivoInfo);
    await carregarHorarios(arquivoHorario);

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

// Adiciona um ouvinte de evento para carregar os dados quando o conteúdo da página estiver carregado
const subtituloElement = document.querySelector('.section-subtitulo');
// Define o subtítulo
subtituloElement.textContent = "Nossas pizzas salgadas";
document.addEventListener('DOMContentLoaded', carregarDados);

document.addEventListener("DOMContentLoaded", function() {
  fetch('cardapio.json')
  .then(response => response.json())
  .then(data => {
      const cardapio = document.getElementById('cardapio');
      
      data.pizzas.forEach(pizza => {
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
