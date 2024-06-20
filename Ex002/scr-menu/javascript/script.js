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
    boxBuscar.classList.remove('ativar'); //fim do header
  });

});


document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const options = document.getElementById('options');

  searchBar.addEventListener('click', () => {
    options.classList.remove('hidden');
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-container')) {
      options.classList.add('hidden');
    }
  });

  // Adiciona comportamento de clique nas opções (opcional)
  const optionItems = document.querySelectorAll('.option');
  optionItems.forEach(option => {
    option.addEventListener('click', () => {
      searchBar.value = option.textContent;
      options.classList.add('hidden');
    });
  });
});


