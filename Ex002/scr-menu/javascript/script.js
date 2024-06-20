  //button header
$(document).ready(function() {
  $('#btn_mobile').on('click', function() {
    $('#mobile_menu').toggleClass('active');
    $('#btn_mobile').find('i').toggleClass('fa-x');
  });


  //button pesquisa
  let boxBuscar = document.querySelector('.conteudo-button-pesq');

  let lupa = document.querySelector('.btn_mobile_pesq');

  let btnFechar = document.querySelector('.button_fechar');

  lupa.addEventListener('click', ()=> {
    boxBuscar.classList.add('ativar');
  });

  btnFechar.addEventListener('click', ()=> {
    boxBuscar.classList.remove('ativar'); //fim do header
  });
   
});

function search_animal() {
  
  let boxBuscar = document.querySelector('.conteudo-button-pesq');

  let clicarInput = document.querySelector('.button_fechar');

  input.addEventListener('click', ()=> {
    boxBuscar.classList.add('ativar');
  });

  let input = document.getElementById('search').value
    input=input.toLowerCase();

  let x = document.getElementsByClassName('animals');
  for (i = 0; i < x.length; i++) { 
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display="none";
    }
    else {
      x[i].style.display="list-item";                 
    }
  } 
}