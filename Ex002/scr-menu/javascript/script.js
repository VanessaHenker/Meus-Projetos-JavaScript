// header
//buttom menu
$(document).ready(function () {
  $('#btn_mobile').on('click', function () {
    $('#mobile_menu').toggleClass('active');
    $('#btn_mobile').find('i').toggleClass('fa-x');
  });

  //button pesquisa
  let boxBuscar = document.querySelector('.conteudo-button-pesq');

  let lupa = document.querySelector('.btn_mobile_pesq');

  let btnFechar = document.querySelector('.button_fechar');
  
  const teste = document.getElementById('opcoes');
  
  lupa.addEventListener('click', () => {
    boxBuscar.classList.add('ativar');
  });

    teste.style.display = 'flex'

    btnFechar.addEventListener('click', () => {
    boxBuscar.classList.remove('ativar');
    teste.style.display = 'none'
  });

  //button pesquisa opções
  const searchBar = document.getElementById('barra-pesquisa');
  const options = document.getElementById('opcoes');


  searchBar.addEventListener('click', () => {
    options.classList.remove('ativar-barra');
  });
  

  // Adiciona comportamento de clique nas opções
  const optionItems = document.querySelectorAll('.opcoes-barra');
  optionItems.forEach(option => {
    option.addEventListener('click', () => {
      searchBar.value = option.textContent;
      options.classList.add('ativar-barra');
    })
  });

  //verificar se opção de busca está aberta
    document.addEventListener('click', function(event) {

      var content = document.getElementById('content');
      var isClickInside = content.contains(event.target);
      
      var input = document.getElementById('opcoes');
      input.style.display = 'block';
      
      if (!isClickInside) {
        boxBuscar.classList.remove('ativar');
        input.style.display = 'none';
      } 
      
      //button menu
      var menu = document.getElementById('#mobile_menu');
      var menuClick = menu.contains(event.target);

      if (!menuClick) {
          menu.style.display = 'none';
        //input.style.display = 'none';
        //$('#mobile_menu').toggleClass('active');
      } 
      
    });
  });



 



