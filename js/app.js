var btn = $('#goToSearch');
btn.on('click', search);
var pokemonAll = {};
var pokemon;
var pokemonDescription;
var timeOutId = setTimeout(2000);
function search(e) {
  e.preventDefault();
  var pokemonName = $('#pokemonName').val();
  if (pokemonName.trim() != "") {
    var infoPokemon = $('#pokemon');
    $.ajax({
      url: 'https://pokeapi.co/api/v2/pokemon/' + pokemonName,
      type: "GET",
      dataType: "JSON",
      success: handleResponse,
      error: function (pokemon, responseText) {
        var infoPokemon = $("#infoPokemon");
        infoPokemon.html('<p>Ha ocurrido un error, compruebe si introduciste correctamente el nombre.</p>');
      }
    });
    $.ajax({
      url: 'https://pokeapi.co/api/v2/characteristic/' + pokemonName,
      type: "GET",
      dataType: "JSON",
      success: handleResponseDescription,
    });
  }
}

function handleResponse(response) {
  pokemon = response;
  showPokemon(pokemon);

}
function handleResponseDescription(response) {
  pokemonDescription = response;
  showPokemonDescription(pokemonDescription);
}

function showPokemon(pokemon) {

  //pokemonAll = { pokemon, pokemonDescription };
  console.log(pokemon.name);

  var infoPokemon = $("#infoPokemon");
  infoPokemon.html('<section class="row m-1">' +
    '<section class="col-md-3">' +
    '<img src="' + pokemon.sprites.front_default + '" alt="image pokemon">' +
    '</section>' +
    '<section class="col-md-5" ml-2>' +
    '<h2>' + pokemon.name + '</h2>' +
    '<p>Num. pokedex: ' + pokemon.id + '</p>' +
    '<div id="description"></div>' +
    '</section>' +
    '</section>' +
    '<section class="row m-1">' +
    '<section class="col-md-6 type">' +
    '<p>Peso: ' + pokemon.weight + '</p>' +
    '<p>Peso: ' + pokemon.height + '</p>' +
    '</section>' +
    '<section class="col-md-6 ability">' +
    '<p>Movimientos:</p>' +
    '<select class="form-control moves">' +
    '</select>' +
    '</section>' +
    '</section>').slideDown();
  for (var i = 0, l = pokemon.types; i < l.length; i++) {
    $('.type').append('<p>Tipo: ' + l[i].type.name + '</p>');
  }
  for (var i = 0, l = pokemon.abilities; i < l.length; i++) {
    $('.ability').append('<p></p>Habilidad Oculta: ' + l[i].ability.name + '</p>');
  }
  for (var i = 0, l = pokemon.moves; i < l.length; i++) {
    // $('.moves').append('<option>Movimiento : ' + l[i].move.name+'</option>' );

    if (l[i].version_group_details["0"].level_learned_at == 0) {

      $('.moves').append('<option>Movim.: ' + l[i].move.name + '     -lvl: MT</option>');
    } else if (l[i].version_group_details["0"].level_learned_at > 0) {
      $('.moves').append('<option>Movim.: ' + l[i].move.name + '     -lvl: ' + l[i].version_group_details["0"].level_learned_at + '</option>');
      
    }
  }
  $('#infoPokemon').addClass('active');

}

function showPokemonDescription(pokemonDescription) {
  console.log(pokemonDescription);
  var descriptionPokemon = $("#description");
  descriptionPokemon.html('<p class="descPokemon"></p>')
  $('.descPokemon').append('Descripción: ' + pokemonDescription.descriptions[1].description);
}



// LINEA EVOLUTIVA --> https://pokeapi.co/api/v2/evolution-chain