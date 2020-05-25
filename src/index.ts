const container: HTMLElement | any = document.getElementById("app");
const pokemons: number = 200;

// describes the shape of the data for each pokemon:
interface PokemonInterface {
  id: number;
  name: string;
  image: string;
  type: string;
}

const showPokemon = (pokemon: PokemonInterface): void => {
  const output: string = `
    <div class="card">
      <span class="card--id">#${pokemon.id}</span>
      <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
      <h1 class="card--name">${pokemon.name}</h1>
      <span class="card--details">${pokemon.type}</span>
    </div>
    `;

  // Add to the container (the "app" div)
  container.innerHTML += output;
};

const getPokemon = async (id: number): Promise<void> => {
  const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon: any = await data.json();
  const pokemonType: string = pokemon.types
    .map((poke: any) => poke.type.name)
    .join(", ");

  const transformedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    image: `${pokemon.sprites.front_default}`,
    type: pokemonType
  };

  showPokemon(transformedPokemon);
};

const fetchData = (): void => {
  for (let i = 1; i <= pokemons; i++) {
    getPokemon(i);
  }
};

fetchData();

/*
References:
Ndaw, I. (2020). A Practical Guide to TypeScript - How to Build a Pokedex app using HTML, CSS, and TypeScript.
Retrieved from https://www.ibrahima-ndaw.com/blog/a-practical-guide-to-typescript
*/
