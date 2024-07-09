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

  //Verificar se opção de busca está aberta
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

//Conteudo informação

/* 
  dom - fechado
  sag   11:30 - 19h
  ter   11:30 - 19h
  qua   11:30 - 19h
  qui   11:30 - 19h
  sex   11:30 - 19h
  sab   11:30 - 19h
*/

var mudarCor = document.getElementById('mudar-cor')

let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

hours = hours < 10 ? '0' + hours : hours;
minutes = minutes < 10 ? '0' + minutes : minutes;
seconds = seconds < 10 ? '0' + seconds : seconds;

// Exibe o horário atual no formato HH:MM:SS
let currentTime = hours + ':' + minutes + ':' + seconds;
console.log('Horário atual: ' + currentTime);

var hora = document.getElementById('hora-atual')

  if(hours >= 11 && hours <= 19){
    hora.innerHTML = 'Aberto agora'
  }
  else{
    hora.innerHTML = 'Fechado agora'
    hora.style.color = 'black'
    mudarCor.style.color = '#ffcb45'
  }