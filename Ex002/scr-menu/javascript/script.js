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
   document.addEventListener('click', function(event) {
    var isClickInside = content.contains(event.target);

    if (!isClickInside) {
      boxBuscar.classList.remove('ativar');
      options.classList.add('ativar-barra');
    }
  });

  //Digita a opção desejada
  function digitar_opcao() {
    let input = document.getElementById('barra-pesquisa').value
    input=input.toLowerCase();
    
    let opcao = document.getElementsByClassName('opcoes-barra');
      
    for (i = 0; i < opcao.length; i++) { 
      if (!opcao[i].innerHTML.toLowerCase().includes(input)) {
          opcao[i].style.display="none";
      }
      else {
        opcao[i].style.display= "list-item";   
      }
    }
  }

//Conteudo informação menu 
//Dias e horários de funcionamento
/* 
  dom - 11h30 - 19h30
  sag - fechado
  ter - 11h30 - 19h30
  qua - 11h30 - 19h30
  qui - 11h30 - 19h30
  sex - 11h30 - 19h30
  sab - 11h30 - 19h30
*/

//Recebe o dia atual
let now = new Date();
let diaDaSemana = now.getDay();

//Recebe a hora atual e min
let hours = now.getHours();
let minutes = now.getMinutes();

//Obtém os elementos de hora
var hora = document.getElementById('hora-funcionamento');
var hora2 = document.getElementById('hora-funcionamento2');
var mudarCor = document.getElementById('mudar-cor'); 

//Atualiza ambos os elementos de hora
horaFuncionamento(hora);
horaFuncionamento(hora2);

//Função para verificar se está fechado
function horaFuncionamento(elemento) {
  if (diaDaSemana == 1 || (hours <= 11 && minutes < 30)){
    horaEscrito(elemento)
  } else if (hours >= 11 && hours < 19 || (hours == 19 && minutes <= 30)) {
    elemento.innerHTML = 'Aberto agora';
  } else {
    horaEscrito(elemento)
  }
}
//Função para atualizar a hora e a cor
function horaEscrito(elemento) {
  if(diaDaSemana == 1){
    elemento.innerHTML = 'Fechado';
  }else{
    elemento.innerHTML = 'Fechado agora';
  }
  elemento.style.color = 'black';
  mudarCor.style.color = '#ffcb45';
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

    //Função para descer o conteúdo e esconder o button-info
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

 // Função para criar elementos HTML de forma modular
 function createSection(title, contents) {
  const section = document.createElement('div');
  const h3 = document.createElement('h3');
  h3.textContent = title;
  section.appendChild(h3);
  
  contents.forEach(content => {
      const p = document.createElement('p');
      p.innerHTML = content; // innerHTML para permitir ícones
      section.appendChild(p);
  });
  
  return section;
}

// Função para inicializar o conteúdo
function init(data) {
  const container = document.getElementById('container');
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
}

// Fetch the content of the .txt file
fetch('data.txt')
  .then(response => response.text())
  .then(data => {
      init(data);
  })
  .catch(error => {
      console.error('Error loading the text file:', error);
  });