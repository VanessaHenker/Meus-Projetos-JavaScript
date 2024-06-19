$(document).ready(function() {
  $('#btn_mobile').on('click', function() {
    $('#mobile_menu').toggleClass('active');
    $('#btn_mobile').find('i').toggleClass('fa-x');
  });


  let boxBuscar = document.querySelector('.conteudo-button-pesq');

  let lupa = document.querySelector('.btn_mobile_pesq');

  let btnFechar = document.querySelector('.button_fechar');

  lupa.addEventListener('click', ()=> {
    boxBuscar.classList.add('ativar');
  });

  btnFechar.addEventListener('click', ()=> {
    boxBuscar.classList.remove('ativar');
  });
});