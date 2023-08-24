
 const api_url = 'https://api.disneyapi.dev/character?pageSize=100';

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
        const listItem = document.createElement('li');
        
        const starIcon = createStarIcon(character, favListElement);
        const characterImage = document.createElement('img');
        characterImage.src = character.imageUrl;
        characterImage.alt = character.name;
        
        listItem.appendChild(starIcon);
        listItem.appendChild(characterImage.cloneNode(true));
        listItem.appendChild(document.createTextNode(`${character.name} - ${character.films.length} films`));
        
        listElement.appendChild(listItem);
      });

      charactersList.appendChild(listElement);
    } else {
      console.error('Niepoprawny format danych z API.');
    }
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
}

function createStarIcon(character, favListElement) {
  const starIcon = document.createElement('i');
  starIcon.classList.add('far', 'fa-star');
  starIcon.addEventListener('click', () => {
    toggleFavorite(character, starIcon, favListElement);
  });
  return starIcon;
}

function toggleFavorite(character, starIcon, favListElement) {
  if (starIcon.classList.contains('far')) {
    starIcon.classList.remove('far');
    starIcon.classList.add('fas', 'fa-star', 'favorite');
    const listItem = document.createElement('li');
    
    const characterImage = document.createElement('img');
    characterImage.src = character.imageUrl;
    characterImage.alt = character.name;
    
    listItem.appendChild(characterImage);
    listItem.appendChild(document.createTextNode(`${character.name} - ${character.films.length} films`));
    favListElement.appendChild(listItem);
  } else {
    starIcon.classList.remove('fas', 'fa-star', 'favorite');
    starIcon.classList.add('far', 'fa-star'); 
    removeFavorite(character, favListElement);
  }
}

function removeFavorite(character, favListElement) {
  const favorites = favListElement.children;
  for (let i = 0; i < favorites.length; i++) {
    const favoriteListItem = favorites[i];
    if (favoriteListItem.textContent.includes(character.name)) {
      favListElement.removeChild(favoriteListItem);
      break;
    }
  }
}

getCharacters();