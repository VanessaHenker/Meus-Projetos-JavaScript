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

//conteudo suguestão button pesquisa
const searchInput = document.getElementById('serach')
const suggestionsBox = document.getElementById('suggestions');

const suggestions = [
  "Batata",
  "Bola",
  "Pizza"
];

searchInput.addEventListener('input',() =>{
  const input = searchInput.value.toLowerCase();
  suggestionsBox.innerHTML = '';

  if(input){
    const filteredSuggestions = suggestions.filler(item => item.toLowerCase().includes(input));
    filteredSuggestions.forEach(suggestions => {
      const suggestionDiv = document.createElement('div');
      suggestionDiv = document.createElement('div');
      suggestionDiv.addEventListener('click', () =>{
        searchInput.value = suggestion;
        suggestionsBox.innerHTML = '';
      });
    });
  }

});