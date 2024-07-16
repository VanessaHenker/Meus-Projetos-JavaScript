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

  //Digita a opção desejada
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

//Button ver mais
document.addEventListener('DOMContentLoaded', function () {
  //Obtém os elementos
  const buttonVerMais = document.getElementById('button-ver-mais');
  const buttonInfo = document.getElementById('conteudo-button-info');
  const buttonFechar = document.getElementById('btn-fechar');
  const buttonIconFechar = document.getElementById('btn-icon');

  //Verifica se os elementos existem antes de adicionar os event listeners
  if (buttonVerMais && buttonInfo && buttonFechar && buttonIconFechar) {
    // Adiciona evento ao botão "Ver Mais"
    buttonVerMais.addEventListener('click', function () {
      buttonInfo.classList.add('slideUp');
    });

    //Fecha as informações clicando no botão "Fechar"
    buttonFechar.addEventListener('click', function () {
      ocultarConteudo();
    });

    //Fecha as informações clicando no ícone "X"
    buttonIconFechar.addEventListener('click', function () {
      ocultarConteudo();
    });

    //Manipulador de eventos para o clique no documento
    document.addEventListener('click', function (event) {
      const target = event.target;

      //Verifica se o clique foi fora do menu e dos botões
      if (!buttonInfo.contains(target) && !buttonVerMais.contains(target) && !buttonFechar.contains(target) && !buttonIconFechar.contains(target)) {
        ocultarConteudo();
      }
    });

    //Função para descer o conteúdo e esconder o conteudo-button-info
    function ocultarConteudo() {
      if (buttonInfo.classList.contains('slideUp')) {
        buttonInfo.classList.add('slideDown');
        const animationEndHandler = function () {
          buttonInfo.classList.remove('slideUp');
          buttonInfo.classList.remove('slideDown');
          buttonInfo.removeEventListener('animationend', animationEndHandler);
        };
        buttonInfo.addEventListener('animationend', animationEndHandler, { once: true });
      }
    }
  }
});

//Verifica condições de funcionamento de tal estabelimento 
document.addEventListener('DOMContentLoaded', () =>{
  carregarHorarios();
});

//Funçõa para obter horarios de funcionamento
function carregarHorarios(){
  fetch('Info/client001/horarios.txt')
  .then(response =>{
    if(!response.ok){
      throw new Error('Erro ao carregar o arquivo');
    }
    return response.text();
  })
  .then(data => {
    console.log('Arquivo de horários carregado:', data);//Adiciona log
    const horarios = parseHorarios(data);
    console.log('Horarios processados:', horarios);//Adiciona log

    //Obtém horários e dia semanal atual
    const now = new Date();
    const diaDaSemana = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
  
    //Obtém os elementos HTML
    const hora = document.getElementById('hora-funcionamento')
    const hora2 = document.getElementById('hora-funcionamento2')
    
    //Atualiza os elementos de hora com base nos horários carregados
    horaFuncionamento(hora, horarios, diaDaSemana, hours, minutes)
    horaFuncionamento(hora2, horarios, diaDaSemana, hours, minutes)
  })
  .catch(erro => {
    console.error('Erro ao carregar o arquivo de horarios:', erro)
  })
}

function parseHorarios(data){
  const lines = data.split('\n')//Divide a string de entrada em um array de linhas
  const horarios = {}; //Cria um objeto vazio para armazenar os horários

  lines.forEach(line => {
    if(line.startsWith('Horários de funcionamento')){
      return; //Ignora a linha de título
    }
    else if(line.trim() === ''){
      return //Ignora linhas em branco
    }
    else{
      const[dia, horario] = line.split(' - '); //Divide a linha em duas partes: 'dia' e 'horario', usando ' - ' como delimitador
      if(dia && horario){ // Verifica se ambas as partes existem (não são undefined ou null)
        horarios[dia.trim()] = horario.trim();//Remove espaços em branco nas extremidades e adiciona ao objeto 'horarios'
      }
    }
  })
  return horarios; // Retorna o objeto 'horarios' com os dias e horários de funcionamento
}

//Função para verificar e exibir o estado de funcionamento
function horaFuncionamento(elemento, horarios, diaDaSemana, hours, minutes){
  const diaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][diaDaSemana];
  const horario = horarios[diaSemana];

  console.log('Verificando funcionamento para:', diaSemana, horario)//Adicionando log
  if(!horario || horario.toLowerCase() === 'fechado'){
    horaEscrito(elemento, true);
  }
  else{
    const[abreStr, fechaStr] = horario.split(' / ');

    if(abreStr && fechaStr){
      const[abreHour, abreMin] = abreStr.split(':').map(Number)
      const[fechaHour, fechaMin] = fechaStr.split(':').map(Number);
    
      const abreTime = abreHour * 60 + abreMin;
      const fechaTime = fechaHour * 60 + fechaMin;
      const horaAtual = hours * 60 + minutes;

      if(horaAtual >= abreTime && horaAtual <= fechaTime){
        elemento.innerHTML = 'Aberto agora';
      }
      else{
        horaEscrito(elemento, false);
      }
    }
    else{
      console.error('Formato de horário inválido para o dia', diaSemana);
      horaEscrito(elemento, false);
    }
  }
}

//Mostrar se está fechado escrito
function horaEscrito(elemento, fechado){
  if(fechado){
    elemento.innerHTML = 'Fechado'
  }
  else{
    elemento.innerHTML = 'Fechado agora'
  }

  elemento.style.color = 'black';
  document.getElementById('mudar-cor').style.color = '#ffcb45';
}