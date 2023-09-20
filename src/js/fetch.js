const api_url = 'https://api.disneyapi.dev/character?pageSize=100';
// const cors = require('cors')
// app.use(cors())

const favoritesMap = new Map();

async function getCharacters() {
  try {
    const response = await fetch(api_url);
    const data = await response.json();

    if (data.hasOwnProperty('data') && Array.isArray(data.data)) {
      const charactersList = document.getElementById('charactersList');
      const favListElement = document.getElementById('favCharacters'); 

      const charactersWithFilms = data.data.filter(character => character.films.length > 0);

      const listElement = document.createElement('ul');

      charactersWithFilms.forEach(character => {
        const listItem = createCharacterListItem(character, favListElement); 
        listElement.appendChild(listItem);
      });

      charactersList.appendChild(listElement);
    } else {
      console.error('error');
    }
  } catch (error) {
    console.error('error', error);
  }
}

function createCharacterListItem(character, listElement) {
  const listItem = document.createElement('li');
  
  const starIcon = createStarIcon(character, listElement);
  const characterImage = document.createElement('img');
  characterImage.src = character.imageUrl;
  characterImage.alt = character.name;
  
  listItem.appendChild(starIcon);
  listItem.appendChild(characterImage.cloneNode(true));
  listItem.appendChild(document.createTextNode(`${character.name} - ${character.films.length} films`));

  if (character.tvShows.length > 0) {
    const tvIcon = createTvIcon(character);
    listItem.appendChild(tvIcon); 
    const tvShowsTooltip = createTvShowsTooltip(character.tvShows);
    listItem.appendChild(tvShowsTooltip); 
    tvIcon.addEventListener('mouseover', () => {
      tvShowsTooltip.style.display = 'block';
    });
    tvIcon.addEventListener('mouseout', () => {
      tvShowsTooltip.style.display = 'none';
    });
  }

  return listItem;
}

function createTvIcon(character) {
  const tvIcon = document.createElement('i');
  tvIcon.classList.add('fas', 'fa-tv', 'tv-shows-icon');
  return tvIcon;
}

function createTvShowsTooltip(tvShows) {
  const tooltip = document.createElement('div');
  tooltip.classList.add('tv-shows-tooltip');
  tooltip.textContent = tvShows.join(', ');
  tooltip.style.display = 'none'; 
  return tooltip;
}

function createStarIcon(character, listElement) {
  const starIcon = document.createElement('i');
  starIcon.classList.add('far', 'fa-star');
  starIcon.addEventListener('click', () => {
    toggleFavorite(character, starIcon, listElement);
  });
  
  
  if (favoritesMap.has(character.id)) {
    starIcon.classList.remove('far', 'fa-star');
    starIcon.classList.add('fas', 'fa-star', 'favorite');
  }
  
  return starIcon;
}

function toggleFavorite(character, starIcon, listElement) {
  if (!favoritesMap.has(character.id)) {
    favoritesMap.set(character.id, character);
    starIcon.classList.remove('far', 'fa-star');
    starIcon.classList.add('fas', 'fa-star', 'favorite');
    const listItem = createCharacterListItem(character, listElement);
    listElement.appendChild(listItem);
  } else {
    favoritesMap.delete(character.id);
    starIcon.classList.remove('fas', 'fa-star', 'favorite');
    starIcon.classList.add('far', 'fa-star'); 
    removeFavorite(character, listElement);
  }
}

function removeFavorite(character, listElement) {
  const favorites = listElement.children;
  for (let i = 0; i < favorites.length; i++) {
    const favoriteListItem = favorites[i];
    if (favoriteListItem.textContent.includes(character.name)) {
      listElement.removeChild(favoriteListItem);
      break;
    }
  }
}

async function displayPopularCharacters() {
  try {
    const response = await fetch(api_url);
    const data = await response.json();

    if (data.hasOwnProperty('data') && Array.isArray(data.data)) {
      const charactersWithFilms = data.data.filter(character => character.films.length > 0);

      charactersWithFilms.sort((a, b) => b.films.length - a.films.length);

      const popularListElement = document.getElementById('popularList');
      const popularList = document.createElement('div');

      popularListElement.appendChild(popularList);

      for (let i = 0; i < 3; i++) {
        const character = charactersWithFilms[i];
        const characterTile = createCharacterTile(character);

        popularList.appendChild(characterTile);
      }
    } else {
      console.error('error');
    }
  } catch (error) {
    console.error('error', error);
  }
}

function createCharacterTile(character) {
  const tile = document.createElement('div');
  tile.classList.add('character-tile');

  const characterImage = document.createElement('img');
  characterImage.src = character.imageUrl || 'default-image-url.jpg'; 
  characterImage.alt = character.name;
  characterImage.classList.add('character-image');

  const characterName = document.createElement('div');
  characterName.classList.add('character-name');
  characterName.textContent = character.name;

  const characterFilms = document.createElement('div');
  characterFilms.classList.add('character-films');
  characterFilms.textContent = `${character.films.length} films`;

  tile.appendChild(characterImage);
  tile.appendChild(characterName);
  tile.appendChild(characterFilms);

  return tile;
}

    document.getElementById('characterFilter').addEventListener('input', () => {
      const filterValue = document.getElementById('characterFilter').value.toLowerCase();
      const characters = document.querySelectorAll('#charactersList li');

      characters.forEach(character => {
        const name = character.textContent.toLowerCase();
        if (name.includes(filterValue)) {
          character.style.display = 'block';
        } else {
          character.style.display = 'none';
        }
      });
    });
getCharacters();
displayPopularCharacters();