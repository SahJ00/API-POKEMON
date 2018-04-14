

//var evolution
//var pokemon;
$("#btn-search").click(function () {
  var pokemon = $("#pokemon-search-input").val();
  var url = "http://pokeapi.co/api/v2/pokemon/" + pokemon;
  request(url, "load_pokemon", " ");
})

function request(url, action) {
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'JSON',
    success: function (response) {
      if (action === "load_pokemon") {
        load_pokemon(response);
      } else if (action === "filter") {
        filterPokemon(response.pokemon);
      } else if (action === "evolution") {
        evolutionModal(response);
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("Error " + jqXHR + " " + textStatus + " " + errorThrown);
    }
  });
}

function load_pokemon(response) {
  var response = response;
  var html = "";
  html += '<div class="col-md-2 pokemons p-2 m-2">' +
    '<h2>' + response.name + '</h2>' +
    '<img src="' + response.sprites.front_default + '" alt="image">' +
    '<div class="description"><span>tipo: <span>';
  for (var i = 0, l = response.types; i < l.length; i++) {
    html += l[i].type.name + ' '
  }
  html += '<span></span>' +
    '<p><span>Peso: <span>' + response.weight + '</span></span></p>' + ' ' +
    '<p><span>Altura: <span>' + response.height + '</span></span></p>' +
    '<a id = "' + response.id + '" href="http://pokeapi.co/api/v2/evolution-chain/' + response.id + '">Evolución</a>' +
    '</div>' +
    '</div>';
  $('#infoPokemon').append(html);

  $(".description a").off("click").click(function (e) {
    e.preventDefault()
    var id = $(this).attr('id');
    console.log(id)
    var url = "http://pokeapi.co/api/v2/evolution-chain/" + id;
    request(url, "evolution");
  });
}

function evolutionModal(response) {
  $(".modal-body").empty();
  var evolution = response.chain;
/*
  if (evolution.evolves_to["0"].evolution_details["0"].min_level == 0) {
    evolution.evolves_to["0"].evolution_details["0"].min_level = 'no tiene';
  }
*/
  if (evolution.evolves_to["0"].evolution_details["0"].min_level > 0) {
    console.log(evolution);
    var html = '<table class = "table">' +
      '<thead>' +
      '<tr>' +
      '<th> Nombre </th> <th> Nivel </th> <th> Método </th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>' +
      '<tr>' +
      '<td>' + evolution.evolves_to["0"].species.name + '</td> <td>' + evolution.evolves_to["0"].evolution_details["0"].min_level + '</td> <td>' +
      evolution.evolves_to["0"].evolution_details["0"].trigger.name + '</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>';


  } else {
    var html = '<table class = "table">' +
      '<thead>' +
      '<tr>' +
      '<th> Nombre </th> <th> level </th> <th> Método </th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>' +
      '<tr class="text-center">' +
      '<td> No tiene evolución</td>' +
      '</tr>' +
      '</tbody>' +
      '</table>';
  }
  $(".modal-body").append(html)
  $("#modal").modal('show')
}

$(".dropdown-menu li").click(function () {
  var type = $(this).text();
  var url = "http://pokeapi.co/api/v2/type/" + type;
  request(url, "filter");
})
function filterPokemon(array) {
  $("#infoPokemon").empty();
  console.log(array)
  array.slice(0, 12).forEach(function (pokemon) {
    request(pokemon.pokemon.url, "load_pokemon");
  });
}