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

  //Digitar a opção desejada
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
/* 
  Dias e horários de funcionamento
  dom - fechado
  sag - 11h30 - 19h30
  ter - 11h30 - 19h30
  qua - 11h30 - 19h30
  qui - 11h30 - 19h30
  sex - 11h30 - 19h30
  sab - 11h30 - 19h30
*/

var mudarCor = document.getElementById('mudar-cor')

//Recebendo o dia atual
let now = new Date();
let diaDaSemana = now.getDay();

//Recebendo a hora atual e min
let hours = now.getHours();
let minutes = now.getMinutes();

var hora = document.getElementById('hora-atual')

//Verifica as condições do horário e dia de funcionamento
  if(diaDaSemana == 1){
    hora.innerHTML = 'Fechado'
    hora.style.color = 'black'
    mudarCor.style.color = '#ffcb45'
  }
  else if(hours <= 11 && minutes < 30){
    escrito()
  }
  else if(hours >= 11 && hours < 19 || hours == 19 && minutes <= 30){
    hora.innerHTML = 'Aberto agora'
  }
  else{
    escrito()
  }

function escrito(){
  hora.innerHTML = 'Fechado agora'
  hora.style.color = 'black'
  mudarCor.style.color = '#ffcb45'
}

//Button ver mais
  $(document).ready(function () {
    //Abre as informações
    $('#button-ver-mais').on('click', function () {
      $('#button-info').toggleClass('active');
    });
  }); 
  
  //Fecha as informações clicando no botão
  const buttonFechar = document.getElementById('btn-fechar')
  const info = document.getElementById('button-info')

  buttonFechar.addEventListener('click', () => {
    showAndHideContent()
  }); 
  
  //Fecha as informações clicando no X
  const buttonIconFechar = document.getElementById('btn-icon')
  const infoIcon  = document.getElementById('button-info')

  buttonIconFechar.addEventListener('click', () => {
      showAndHideContent()
   }); 

  //Manipulador de eventos para o clique no documento
  $(document).on('click', function (event) {
    var $target = $(event.target);
  
  //Verifica se o clique foi fora do menu e dos botões
    if (!$target.closest('#button-info').length && !$target.closest('#button-ver-mais').length){
      showAndHideContent()
    }
  });

function showAndHideContent() {
  const buttonInfo = document.getElementById('button-info');
  buttonInfo.classList.add('teste');
  buttonInfo.addEventListener('animationend', () => {
  //buttonInfo.style.display = 'none';
  buttonInfo.classList.remove('active');
  }, { once: true });
}
