//buttons header
$(document).ready(function() {
  $('#btn_mobile')('#btn_mobile_pesq').on('click', function() {
    $('#mobile_menu').toggleClass('active');
    $('#btn_mobile').find('i').toggleClass('fa-x');

    $('#mobile_menu').toggleClass('active');
    $('#btn_mobile').find('i').toggleClass('fa-x');
  });
});

const searchIcon = document.querySelector('.search-icon');
const searchBar = document.getElementById('search-bar');

searchIcon.addEventListener('click', function() {
  if (searchBar.style.display === 'none' || searchBar.style.display === '') {
    searchBar.style.display = 'block'; // Mostrar a barra de pesquisa
    searchBar.focus(); // Colocar o foco na barra de pesquisa
  } else {
    searchBar.style.display = 'none'; // Ocultar a barra de pesquisa
  }
});