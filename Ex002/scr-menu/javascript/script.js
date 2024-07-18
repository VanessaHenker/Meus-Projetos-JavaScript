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
async function carregarDados(){
  try{
    //Realiza uma requisição para obter o arquivo JSON que contém os dados
    const response = await fetch('menu.json');
    const data = await response.json();//Converte a resposta para Json


    let menuItems, navIcons, arquivoInfo, arquivoHorario;

    //Verifica qual menu deve usar, com base na configuração do Json
    if(data.usarMenuPizza){
      menuItems = data.menuItemsPizza;
      navIcons = data.navIconsPizza;
      arquivoInfo = data.arquivoPizza[0].arquivoInfo;
      arquivoHorario = data.arquivoPizza[0].arquivoHorario;
    }
    else{
      menuItems.Items = data.menuItemsCake;
      navIcons = data.navIconsCake;
      arquivoInfo = data.arquivoCake[0].arquivoInfo;
      arquivoHorario = data.arquivoCake[0].arquivoHorario;
    }

    //Carrega e exibe os itens do menu
    menuItems.forEach(item => {
      adicionarItemMenu(item.imagemSrc, item.titulo, item.localizacao);
    });

    //Carrega e exibe os ícones de navegação
    navIcons.forEach(icon => {
      adicionarIconeNavegacao(icon.iconeClass, icon.texto, icon.id)
    });

    //Carrega as informações do arquivo especificado
    carregarInfo(arquivoHorario)

    //Carrega os horários de funcionamento do arquivo especificado
    carregarHorarios(arquivoHorario);
  }
  catch(erro){
    console.erro('Erro ao carregar dados:', erro); // Exibe o erro no console, se ocorrer algum problema
  }
}

//Função para criar um item de menu com imagem, título e localização 
function criarItemMenu(imagemSrc, titulo, localizacao){
  const itemDiv = document.createElement('div');
  itemDiv.className = 'menu-item';

  //Cria a imagem do item menu
  const img = document.createElement('img')
  img.className = 'imagem-logo';
  img.src = imagemSrc;
  img.alt = titulo;
  itemDiv.appendChild(img);//Adiciona a imagem ao item de menu

  //Cria o título do item de menu(h2)
  const h2 = document.createElement('h2');
  h2.textContent = titulo;
  itemDiv.appendChild(h2); //Adiciona o título ao item de menu

  //Cria parágrafo para exibir a localização
  const p = document.createElement('p');
  p.className = 'localizacao';

  //Cria o ícone de localização(i)
  const i = document.createElement('i');
  i.className = 'fa-solid fa-location-dot';
  p.appendChild(i);

  // Cria o span para exibir o texto da localização
  const span = document.createElement('span');
  span.textContent = localizacao;
  p.appendChild(span);

  // Adiciona o parágrafo (com ícone e localização) ao item de menu
  itemDiv.appendChild('p');

  return itemDiv;
}

//Função para adicionar um ícone de navegação ao contêiner de navegação na página HTML
function adicionarIconeNavegacao(iconeClass, texto, id){
  const menuContainer = document.getElementById('nav_logo');
  const navIcon = criarIconeNavegacao(iconeClass, texto, id);

  menuContainer.appendChild(navIcon);
}

// Função assíncrona para carregar informações de um arquivo e exibir no conteiner especificado
async function carregarInfo(arquivoInfo){
  try{
    const response = await fetch(arquivoInfo);
    const data = await response.text();

    const container= document.getElementById('conteudo-informacoes');
    const lines = data.split('\n');

    let currentSection = []; //Inicializa a variável vazia
    let currentTitle = '';  //Inicializa a variável vazia
    
    //Itera sobre cada linha do texto
    lines.forEach( line => {
      if(line.trim() === ''){
        // Se a linha estiver vazia, adiciona a seção atual ao contêiner de informações
        if(currentTitle && currentSection.length > 0){
          container.appendChild(createSection(currentTitle, currentSection));

          currentSection = []; //Reinicia a seção atual
          currentTitle = ''; //Reinicia o título da seção
        }
      }
      else if(currentSection === ''){
        // Se o título da seção ainda não foi definido, define-o com a linha atual
        currentTitle = line;
      }
      else{
        //Caso contrário, adiciona a linha à seção atual
        currentSection.push(line);
      }
    });

    //Adiciona a última seção, se existir
    if(currentTitle && currentSection.length > 0){
      container.appendChild(createSection(currentTitle, currentTitle));
    }
  }
  catch(erro){
    console.error('Erro ao carregar o arquivo e informações:', erro);// Exibe o erro no console, se houver algum problema
  }
}

//Função para criar uma seção com título e conteúdo
function createSection(title, content){
  const section = document.createElement('div');//Cria um elemento div para seção 
  const h3 = document.createElement('h3');//Cria um elemento h3 para título da seção

  h3.textContent = title; //Define o texto do título com o título fornecido
  section.appendChild(h3);//Adiciona o título à seção

  //Itera sobre o conteúdo da seção e cria parágrafos para cada item
  contents.forEach(content => {
    const p = document.createElement('p');
    p.innerHTML = content;
    section.appendChild(p);
  });

  section.style.marginTop = '20px'; 

  return section;
}


//Função assícrona para carregar os horários de funcionamento a partir de um arquivo
async function carregarHorarios(arquivoHorario){
  try{
    const response = await fetch(arquivoHorario);//Faz uma requisição para obter o conteúdo do arquivo
    const data = await response.txt();
    console.log('Arquivo de horários carregados:', data);

    const horarios = parseHorarios(data);
    console.log('Horarios processados:',horarios);

    //Obtém dia e hora atual
    const now = new Date();
    const diaDaSemana = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    const hora = document.getElementById('hora-funcionamento');
    const hora2 = document.getElementById('hora-funcionamento2');

    //Verifica o horário de funcionamento para o momento atual

    horaFuncionamento(hora, horarios, diaDaSemana, hours, minutes);
    horaFuncionamento(hora2, horarios, diaDaSemana, hours, minutes);
  }
  catch(error){
    console.error('Erro ao carregar o arquivo horarios:',error)
  }
}

//Função para analisar os horários de funcionamento a partir dos dados do arquivo
function parseHorarios(data){
  const lines = data.split('\n')//Divide o texto em linhas
  const horarios = {}; //Objeto para armazenar os horários processados

  //Itera sobre cada linha do texto
  lines.forEach(line => {
    if(line.startsWith('Horários de funcionamento')){
      return; //Ignora a linha de cabeçalho "Horários de funcionamento"
    }
    else if(line.trim() === ''){
      return //Ignora linhas em branco
    }
    else{
      const [dia, horario] = line.split(' - ');
      if(dia && horario){
        horarios[dia.trim()] = horario.trim(); //Armazena o horário associado ao dia da semana
      }
    }
  });

  return horarios;
} 