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
  //Adiciona evento ao botão "Ver Mais"
  const buttonVerMais = document.getElementById('button-ver-mais');
  const buttonInfo = document.getElementById('button-info');

  buttonVerMais.addEventListener('click', function () {
    buttonInfo.classList.add('active');
  });

  //Fecha as informações clicando no botão "Fechar"
  const buttonFechar = document.getElementById('btn-fechar');
  buttonFechar.addEventListener('click', function () {
    ocultarConteudo();
  });

  //Fecha as informações clicando no ícone "X"
  const buttonIconFechar = document.getElementById('btn-icon');
  buttonIconFechar.addEventListener('click', function () {
    ocultarConteudo();
  });

  //Manipulador de eventos para o clique no documento
  document.addEventListener('click', function (event) {
    const target = event.target;

    // Verifica se o clique foi fora do menu e dos botões
    if (!buttonInfo.contains(target) && !buttonVerMais.contains(target)) {
      ocultarConteudo();
    }
  });

  //Função para descer o conteúdo e esconder o button-info
  function ocultarConteudo() {
    if (buttonInfo.classList.contains('active')) {
      buttonInfo.classList.add('slideDown');
      buttonInfo.addEventListener('animationend', function () {
        buttonInfo.classList.remove('active');
        buttonInfo.classList.remove('slideDown');
      }, { once: true });
    }
  }
});

