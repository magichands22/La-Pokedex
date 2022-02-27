window.onload = function () {
  const $loader = document.getElementById("loader");
  $loader.classList.add("disp-none");
};

const $main = document.getElementById("main");
const $tituloIndex = document.getElementById("titulo_Index");
const $imgIndex = document.getElementById("img_index");
const $template = document.getElementById("template").content;
const $fragment = document.createDocumentFragment();



const consultarPokemon = (id) => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(function (response) {
    response.json().then(function (pokemon) {
      mostrarPokemon(pokemon);
    });
  });
};

for (let index = 1; index <= 150; index++) {

  let idPokemon = index;
  consultarPokemon(idPokemon);
  function mostrarPokemon(pokemon) {
    let link = pokemon.species.url;

    fetch(link).then(function (response) {
      response.json().then(function (data) {
        let $clone = document.importNode($template, true);
        $fragment.appendChild($clone);

        //Seteo de id para el Section
        $fragment.children[0].setAttribute("id", data.id);

        //Seteo de id para A Href
        $fragment.children[0].children[0].setAttribute("id", data.id);

        //Seteo de estilo para Mouse Hover
        $fragment.children[0].children[0].children[0].classList.add(
          `hover_index`
        );

        //Seteo de color para fondo
        let color = data.color.name;
        $fragment.children[0].children[0].children[0].classList.add(
          `bgcolor-${color}`
        );

        // Deteccion y seteo de boton para agregado del DataId
        $fragment.children[0].children[0].children[0].children[0].children[1].setAttribute(
          "id",
          data.id
        );

        //Seteo de nombre para Nombre o titulo
        let h1Frag = $fragment.children[0].querySelector("h1");
        let nombre = pokemon.name.toUpperCase();
        h1Frag.innerHTML = nombre;

        //Seteo de imagen
        let imgFrag =
          $fragment.children[0].children[0].children[0].children[1].children[0];
        imgFrag.setAttribute(
          "src",
          pokemon.sprites.other.dream_world.front_default
        );

        //Seteo de descripcion para buscar la info en español
        let descripcion = $fragment.children[0].querySelector("p");

        for (let index = 0; index < 200; index++) {
          if (data.flavor_text_entries[index].language.name == "es") {
            descripcion.innerHTML = data.flavor_text_entries[index].flavor_text;
            index = 200;
          }
        }

        //**************Seteo de "0" para el ID a mostrar*********** */

        let stringDataId = String(data.id);

        if (stringDataId.length == 1) {
          stringDataId = `00${stringDataId}`;
        } else if (stringDataId.length == 2) {
          stringDataId = `0${stringDataId}`;
        }

        //*****************************ACA*************** */

        let card = $fragment.children[0]; // card
        let contenedor = card.children[0].children[0]; // Contenedor
        let contenedor_box = contenedor.children[1];
        let selector = $fragment.children[0].children[0];
        let descrpcion = contenedor.children[0].children[1];
        let numeropokemon = contenedor.children[1].children[1];
        let habilidades = contenedor.children[0].children[2];
        let descAtaque =
          contenedor.children[0].children[2].children[0].children[1];
        let descDefensa =
          contenedor.children[0].children[2].children[1].children[1];
        let descVelocidad =
          contenedor.children[0].children[2].children[2].children[1];

        let cont = 0;

        

        selector.addEventListener("click", (e) => {
          e.preventDefault();
        
          if (
            e.target.matches(".button_index") ||
            e.target.matches(".contenedor_index") ||
            e.target.matches(".img_index") ||
            e.target.matches(".titulo_index")
          ) {
            if (cont == 0) {
        
              contenedor.setAttribute("class", `modulo_on bgcolor-black alto`);

              descrpcion.setAttribute("class", "descripcion");

              contenedor_box.setAttribute("class", "box_on");

              numeropokemon.setAttribute("class", "idPokemonIndex");
              numeropokemon.innerHTML = "# " + stringDataId;

              habilidades.setAttribute("class", "habilidades");

              descAtaque.innerHTML = "Ataque " + pokemon.stats[1].base_stat;

              descDefensa.innerHTML = "Defensa " + pokemon.stats[2].base_stat;

              descVelocidad.innerHTML =
                "Velocidad " + pokemon.stats[3].base_stat;

              cont = 1;
            } else {
              contenedor.setAttribute(
                "class",
                `modulo_index hover_index bgcolor-${color}`
              );
              descrpcion.setAttribute("class", "disp-none");
              contenedor_box.setAttribute("class", "box");
              numeropokemon.setAttribute("class", "disp-none");
              habilidades.setAttribute("class", "habilidades disp-none");

              cont = 0;
            }
          } else {
            card.setAttribute("class", "card_index");
          }
        });

        //Agregado de $fragment al html
        $main.appendChild($fragment);

        let a = $main.querySelector("a");
      });
    });
    
  }
}

/**********BUSCADOR*************/

function serchFilters(input, cardindex) {
  document.addEventListener("keyup", (e) => {
    if (e.target.matches(input)) {
      document.querySelectorAll(cardindex).forEach((el) => {
        if (
          !el.children[0].children[0].children[0].children[0].textContent
            .toLowerCase()
            .includes(e.target.value)
        ) {
          el.classList.add("disp-none");
        } else {
          el.classList.remove("disp-none");
        }
      });

      if (e.key == "Escape") e.target.value = "";
    }
  });
}

serchFilters(".card-filter", ".card_index");



/*Made by Agus Córdoba*/