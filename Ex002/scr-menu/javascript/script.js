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
// Função assíncrona para carregar todos os dados necessários ao carregar a página
async function carregarDados() {
  try {
    // Realiza uma requisição para obter o arquivo JSON que contém os dados
    const response = await fetch('menu.json');
    const data = await response.json(); // Converte a resposta para JSON

    let menuItems, navIcons, arquivoInfo, arquivoHorario;

    // Verifica qual menu deve usar, com base na configuração do JSON
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

    // Carrega e exibe os itens do menu
    menuItems.forEach(item => {
      adicionarItemMenu(item.imagemSrc, item.titulo, item.localizacao);
    });

    // Carrega e exibe os ícones de navegação
    navIcons.forEach(icon => {
      adicionarIconeNavegacao(icon.iconeClass, icon.texto, icon.id);
    });

    // Carrega as informações do arquivo especificado
    carregarInfo(arquivoInfo);

    // Carrega os horários de funcionamento do arquivo especificado
    carregarHorarios(arquivoHorario);

  } catch (error) {
    console.error('Erro ao carregar dados:', error); // Exibe o erro no console, se ocorrer algum problema
  }
}

// Função para criar um item de menu com imagem, título e localização
function criarItemMenu(imagemSrc, titulo, localizacao) {
  const itemDiv = document.createElement('div'); // Cria um elemento div para o item de menu
  itemDiv.className = 'menu-item'; // Define a classe CSS do item de menu

  // Cria a imagem do item de menu
  const img = document.createElement('img');
  img.className = 'imagem-logo'; // Define a classe CSS da imagem
  img.src = imagemSrc; // Define a fonte da imagem com o URL fornecido
  img.alt = titulo; // Define o texto alternativo da imagem com o título fornecido
  itemDiv.appendChild(img); // Adiciona a imagem ao item de menu

  // Cria o título do item de menu (h2)
  const h2 = document.createElement('h2');
  h2.className = 'conteudo-escrito'; // Define a classe CSS do título
  h2.textContent = titulo; // Define o texto do título com o título fornecido
  itemDiv.appendChild(h2); // Adiciona o título ao item de menu

  // Cria o parágrafo para exibir a localização
  const p = document.createElement('p');
  p.className = 'localizacao'; // Define a classe CSS do parágrafo

  // Cria o ícone de localização (i)
  const i = document.createElement('i');
  i.className = 'fa-solid fa-location-dot'; // Define a classe CSS do ícone de localização
  p.appendChild(i); // Adiciona o ícone ao parágrafo

  // Cria o span para exibir o texto da localização
  const span = document.createElement('span');
  span.textContent = localizacao; // Define o texto do span com a localização fornecida
  p.appendChild(span); // Adiciona o span ao parágrafo

  itemDiv.appendChild(p); // Adiciona o parágrafo (com ícone e localização) ao item de menu

  return itemDiv; // Retorna o item de menu completo com todos os elementos internos
}

// Função para adicionar um item de menu ao contêiner do menu na página HTML
function adicionarItemMenu(imagemSrc, titulo, localizacao) {
  const menuContainer = document.getElementById('menu-container'); // Obtém o contêiner do menu pelo ID
  const itemMenu = criarItemMenu(imagemSrc, titulo, localizacao); // Cria o item de menu com os dados fornecidos
  menuContainer.appendChild(itemMenu); // Adiciona o item de menu ao contêiner do menu na página HTML
}

// Função para criar um ícone de navegação com classe, texto e ID
function criarIconeNavegacao(iconeClass, texto, id) {
  const navIcon = document.createElement('i'); // Cria um elemento <i> para o ícone de navegação
  navIcon.className = iconeClass; // Define a classe CSS do ícone com a classe fornecida
  navIcon.id = id; // Define o ID do ícone com o ID fornecido

  navIcon.appendChild(document.createTextNode(' ' + texto)); // Adiciona o texto do ícone após o ícone

  return navIcon; // Retorna o elemento <i> completo com o ícone e o texto
}

// Função para adicionar um ícone de navegação ao contêiner de navegação na página HTML
function adicionarIconeNavegacao(iconeClass, texto, id) {
  const menuContainer = document.getElementById('nav_logo'); // Obtém o contêiner de navegação pelo ID
  const navIcon = criarIconeNavegacao(iconeClass, texto, id); // Cria o ícone de navegação com os dados fornecidos
  menuContainer.appendChild(navIcon); // Adiciona o ícone de navegação ao contêiner de navegação na página HTML
}

// Função assíncrona para carregar informações de um arquivo e exibir no contêiner especificado
async function carregarInfo(arquivoInfo) {
  try {
    const response = await fetch(arquivoInfo); // Faz uma requisição para obter o conteúdo do arquivo
    const data = await response.text(); // Converte a resposta para texto
    const container = document.getElementById('conteudo-informacoes'); // Obtém o contêiner onde as informações serão exibidas
    const lines = data.split('\n'); // Divide o texto em linhas

    let currentSection = [];
    let currentTitle = '';

    // Itera sobre cada linha do texto
    lines.forEach(line => {
      if (line.trim() === '') {
        // Se a linha estiver vazia, adiciona a seção atual ao contêiner de informações
        if (currentTitle && currentSection.length > 0) {
          container.appendChild(createSection(currentTitle, currentSection));
        }
        currentSection = []; // Reinicia a seção atual
        currentTitle = ''; // Reinicia o título da seção
      } else if (currentTitle === '') {
        // Se o título da seção ainda não foi definido, define-o com a linha atual
        currentTitle = line;
      } else {
        // Caso contrário, adiciona a linha à seção atual
        currentSection.push(line);
      }
    });

    // Adiciona a última seção, se existir
    if (currentTitle && currentSection.length > 0) {
      container.appendChild(createSection(currentTitle, currentSection));
    }
  } catch (error) {
    console.error('Erro ao carregar o arquivo de informações:', error); // Exibe o erro no console, se houver algum problema
  }
}

// Função para criar uma seção com título e conteúdo
function createSection(title, contents) {
  const section = document.createElement('div'); // Cria um elemento div para a seção
  const h3 = document.createElement('h3'); // Cria um elemento h3 para o título da seção

  h3.textContent = title; // Define o texto do título com o título fornecido
  section.appendChild(h3); // Adiciona o título à seção

  // Itera sobre o conteúdo da seção e cria parágrafos para cada item
  contents.forEach(content => {
    const p = document.createElement('p');
    p.innerHTML = content; // Define o HTML do parágrafo com o conteúdo
    section.appendChild(p); // Adiciona o parágrafo à seção
  });

  section.style.marginTop = '20px'; // Define um espaçamento superior para a seção

  return section; // Retorna a seção completa com título e conteúdo
}

// Função assíncrona para carregar os horários de funcionamento a partir de um arquivo
async function carregarHorarios(arquivoHorario) {
  try {
    const response = await fetch(arquivoHorario); // Faz uma requisição para obter o conteúdo do arquivo
    const data = await response.text(); // Converte a resposta para texto
    console.log('Arquivo de horários carregado:', data); // Exibe o conteúdo do arquivo de horários no console

    const horarios = parseHorarios(data); // Processa os horários obtidos do arquivo
    console.log('Horarios processados:', horarios); // Exibe os horários processados no console

    const now = new Date(); // Obtém a data e hora atuais
    const diaDaSemana = now.getDay(); // Obtém o dia da semana (de 0 a 6, onde 0 é Domingo)
    const hours = now.getHours(); // Obtém a hora atual
    const minutes = now.getMinutes(); // Obtém os minutos atuais

    const hora = document.getElementById('hora-funcionamento'); // Obtém o elemento para exibir o horário de funcionamento
    const hora2 = document.getElementById('hora-funcionamento2'); // Obtém o segundo elemento para exibir o horário de funcionamento

    // Verifica o horário de funcionamento para o momento atual
    horaFuncionamento(hora, horarios, diaDaSemana, hours, minutes);
    horaFuncionamento(hora2, horarios, diaDaSemana, hours, minutes);

  } catch (error) {
    console.error('Erro ao carregar o arquivo de horarios:', error); // Exibe o erro no console, se houver algum problema
  }
}

// Função para analisar os horários de funcionamento a partir dos dados do arquivo
function parseHorarios(data) {
  const lines = data.split('\n'); // Divide o texto em linhas
  const horarios = {}; // Objeto para armazenar os horários processados

  // Itera sobre cada linha do texto
  lines.forEach(line => {
    if (line.startsWith('Horários de funcionamento')) {
      return; // Ignora a linha de cabeçalho "Horários de funcionamento"
    } else if (line.trim() === '') {
      return; // Ignora linhas em branco
    } else {
      const [dia, horario] = line.split(' - '); // Divide a linha em dia e horário
      if (dia && horario) {
        horarios[dia.trim()] = horario.trim(); // Armazena o horário associado ao dia da semana
      }
    }
  });

  return horarios; // Retorna o objeto com os horários de funcionamento
}

// Função para verificar se está aberto e exibir o status no elemento fornecido
function horaFuncionamento(elemento, horarios, diaDaSemana, hours, minutes) {
  const diaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][diaDaSemana]; // Obtém o dia da semana atual
  const horario = horarios[diaSemana]; // Obtém o horário de funcionamento para o dia da semana atual

  console.log('Verificando funcionamento para:', diaSemana, horario); // Exibe no console o dia da semana e o horário

  if (!horario || horario.toLowerCase() === 'fechado') {
    horaEscrito(elemento, true); // Se o horário não estiver definido ou estiver "fechado", exibe como fechado
  } else {
    const [abreStr, fechaStr] = horario.split(' / '); // Divide o horário em horário de abertura e fechamento

    if (abreStr && fechaStr) {
      const [abreHour, abreMin] = abreStr.split(':').map(Number); // Obtém as horas e minutos de abertura
      const [fechaHour, fechaMin] = fechaStr.split(':').map(Number); // Obtém as horas e minutos de fechamento

      const abreTime = abreHour * 60 + abreMin; // Converte o horário de abertura para minutos desde a meia-noite
      const fechaTime = fechaHour * 60 + fechaMin; // Converte o horário de fechamento para minutos desde a meia-noite
      const horaAtual = hours * 60 + minutes; // Converte o horário atual para minutos desde a meia-noite

      if (horaAtual >= abreTime && horaAtual <= fechaTime) {
        elemento.innerHTML = 'Aberto agora'; // Se estiver dentro do horário de funcionamento, exibe como aberto agora
      } else {
        horaEscrito(elemento, false); // Caso contrário, exibe como fechado agora
      }
    } else {
      console.error('Formato de horário inválido para o dia', diaSemana); // Exibe um erro no console se o formato do horário for inválido
      horaEscrito(elemento, false); // Exibe como fechado agora
    }
  }
}

// Função para exibir o status de horário de funcionamento no elemento fornecido
function horaEscrito(elemento, fechado) {
  if (fechado) {
    elemento.innerHTML = 'Fechado'; // Se estiver fechado, define o texto como "Fechado"
  } else {
    elemento.innerHTML = 'Fechado agora'; // Caso contrário, define o texto como "Fechado agora"
  }

  elemento.style.color = 'black'; // Define a cor do texto como preto
  document.getElementById('mudar-cor').style.color = '#ffcb45'; // Altera a cor de um elemento específico
}

// Adiciona um ouvinte de evento para carregar os dados quando o conteúdo da página estiver carregado
document.addEventListener('DOMContentLoaded', carregarDados);
