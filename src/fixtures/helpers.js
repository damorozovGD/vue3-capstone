export const updateLocalStorage = (action, character) => {
  let data = JSON.parse(localStorage.getItem('favourites')) || [];

  if (action === 'add') {
    data.push(character);
    localStorage.setItem('favourites', JSON.stringify(data));
  }

  if (action === 'remove') {
    data = data.filter((x) => x.id !== character.id);
  }

  localStorage.setItem('favourites', JSON.stringify(data));

  return { favouritesList: data };
};
