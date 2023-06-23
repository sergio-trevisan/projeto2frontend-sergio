
var tipsList = [];
var count = 1;

function addTips(materiais, dicas) {
  var newtips = { id: count++, materiais: materiais, dicas: dicas };
  tipsList.push(newtips);
  localStorage.setItem('tipsList', JSON.stringify(tipsList));
  rendertipsList();
}

function deleteTips(tipsId) {
  var updatedtipsList = tipsList.filter(function (tips) {
    return tips.id !== tipsId;
  });

  if (updatedtipsList.length < tipsList.length) {
    tipsList = updatedtipsList;
    localStorage.setItem('tipsList', JSON.stringify(tipsList));
    rendertipsList();
  } else {
    alert('Dica nao encontrada.');
  }
}

function gettipsList() {
  var storedList = JSON.parse(localStorage.getItem('tipsList'));
  tipsList = storedList || [];
}

function rendertipsList() {
  var tipsListElement = document.getElementById('tipsList');
  tipsListElement.innerHTML = '';

  tipsList.forEach(function (tips) {
    var listItem = document.createElement('li');
    listItem.innerHTML = '<span class="dicas-form">' + tips.materiais + '</span> <p>Dica: ' + tips.dicas + '</p> <button class="delete-button" onclick="deleteTips(' + tips.id + ')">Excluir</button>';
    tipsListElement.appendChild(listItem);
  });
}

gettipsList();

rendertipsList();

document.getElementById('dicaForm').addEventListener('submit', function (event) {
  event.preventDefault();  
  var matselect = document.getElementById('materiais');
  var dicaInput = document.getElementById('dicas');

    if (matselect.value === ""){
      alert("Favor selecionar o material.");
      return;
    }
       
    if (dicaInput.value === ""){
      alert("Favor escrever a dica.");
      return;
    }
  
  addTips(matselect.value, dicaInput.value);
  matselect.value = '';
  dicaInput.value = '';
});

  const horariosBairros = [
    { bairro: "Ayrton Sena", horarios: ["Segunda, Quarta e Sexta a partir das 7h"] },
    { bairro: "Alvorada", horarios: ["Terca, Quinta e Sabado a partir das 7h"] },
    { bairro: "Congonha", horarios: ["Terca e Sexta a partir das 7h"] },
    { bairro: "Novo Bandeirantes", horarios: ["Segunda, Quarta e Sexta a partir das 16h"] },
    { bairro: "Centro", horarios: ["Segunda a Sabado a partir das 18h"] }
  ];
  
  function obterHorariosPorBairro(bairro) {
    for (let i = 0; i < horariosBairros.length; i++) {
      const item = horariosBairros[i];
      if (item.bairro.toLowerCase() === bairro.toLowerCase()) {
        return item.horarios;
      }
    }
  
    return null;
  }
    
  function exibirHorarios(event) {
    event.preventDefault(); 
    const bairroInput = document.getElementById("bairro");
    const bairroSelecionado = bairroInput.value;
    
    const horarios = obterHorariosPorBairro(bairroSelecionado);
    
    const resultadoDiv = document.getElementById("resultado");
    
    resultadoDiv.innerHTML = "";
  
    if (bairroSelecionado.trim() === "") {
      return; 
    }
    
    if (horarios !== null) {
      const h3Element = document.createElement("h3");
      h3Element.textContent = bairroSelecionado;
      resultadoDiv.appendChild(h3Element);
      
      const pElement = document.createElement("p");
      pElement.textContent = "Horários: " + horarios.join(", ");
      resultadoDiv.appendChild(pElement);
    } else {
       alert("Bairro não encontrado. Por enquanto as opçoes sao: Ayrton Sena, Alvorada, Congonha, Novo Bandeirante e Centro. Aguarde atualizaçãoes.");
      
    }
    
    bairroInput.value = "";
  }
