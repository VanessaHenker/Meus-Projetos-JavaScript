// header
//buttom menu
$(document).ready(function () {
  $('#btn_mobile').on('click', function () {
    $('#mobile_menu').toggleClass('active');
    $('#btn_mobile').find('i').toggleClass('fa-x');
  });
});

  //button pesquisa
  let boxBuscar = document.querySelector('.conteudo-button-pesq');

  let lupa = document.querySelector('.btn_mobile_pesq');

  let btnFechar = document.querySelector('.button_fechar');

  lupa.addEventListener('click', () => {
    boxBuscar.classList.add('ativar');
  
  });

  btnFechar.addEventListener('click', () => {
    boxBuscar.classList.remove('ativar');
  })

   
  //button pesquisa opções
  const searchBar = document.getElementById('barra-pesquisa');
  const options = document.getElementById('opcoes');
  const button_close = document.getElementById('button_fechar');

  searchBar.addEventListener('click', () => {
    options.classList.remove('ativar-barra');
  });
  
  button_close.addEventListener('click', () => {
    options.classList.add('ativar-barra');
  });
  
  // Adiciona comportamento de clique nas opções
  const optionItems = document.querySelectorAll('.opcoes-barra');
  optionItems.forEach(option => {
    option.addEventListener('click', () => {
      searchBar.value = option.textContent;
      options.classList.add('ativar-barra');           
    })
  });
