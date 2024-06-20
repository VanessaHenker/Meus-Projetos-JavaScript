//button header
$(document).ready(function () {
  $('#btn_mobile').on('click', function () {
    $('#mobile_menu').toggleClass('active');
    $('#btn_mobile').find('i').toggleClass('fa-x');
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
  });

  //button pesquisa opções
  const searchBar = document.getElementById('barra-pesquisa');
  const options = document.getElementById('opcoes');

  searchBar.addEventListener('click', () => {
    options.classList.remove('ativar-barra');
  });


  document.addEventListener('click', (event) => {
    if (!event.target.closest('.conteudo-pesquisa')){
      options.classList.add('ativar-barra');
    }
  });

  // Adiciona comportamento de clique nas opções (opcional)
  const optionItems = document.querySelectorAll('.opcoes-barra');
  optionItems.forEach(option => {
    option.addEventListener('click', () => {
      searchBar.value = option.textContent;
      options.classList.add('ativar-barra');
    });
  });

});

document.addEventListener('click', function(event) {

  let boxBuscar = document.querySelector('.conteudo-button-pesq');

  let lupa = document.querySelector('.btn_mobile_pesq');

  let btnFechar = document.querySelector('.button_fechar');

  lupa.addEventListener('click', () => {
    boxBuscar.classList.add('ativar');
  });

  btnFechar.addEventListener('click', () => {
    boxBuscar.classList.remove('ativar');
  });


  var content = document.getElementById('content');
  var contenteste = document.getElementById('#btn_mobile');
  var isClickInside = content.contains(event.target);

  if (!isClickInside) {
    boxBuscar.classList.remove('ativar');
  }

  if (!contenteste) {
    $('#mobile_menu').toggleClass();
    $('#btn_mobile').find('i').toggleClass('fa-x');
  }
});


 



