'use strict';
// запрос на получение списка героев
const getInfoHeroes = () => {
  return fetch('./dbHeroes/dbHeroes.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

//получение списка героев
getInfoHeroes()
  .then((response) =>{
    if (response.status !== 200) {
      throw new new Error('status network not 200');
    }
    return response.json();
  })
  .then((data) =>{
    showCardHeroes(data);
    moviesList(data);
    shooseMovie(data);
  })
  .catch((error) => {
    console.error(error);
  });

  //вывод карточек
  const showCardHeroes = (data) => {
    const heroesList = document.querySelector('.heroes-list');
    data.forEach((item) => {
      let itemHeroesList = document.createElement('li');
      itemHeroesList.classList.add('heroes-item');
      let {photo, name = '', realName = '', status, movies = ''} = item;
      status = (status === 'alive') ? 'жив' : 'покойный';
      movies = (movies) ? movies.join(', ') : [];
      
      itemHeroesList.insertAdjacentHTML('afterbegin', `
        <div class="img-wrap">
          <img src="/dbHeroes/${photo}" alt="">
        </div>
        <div class="desc-wrap">
        <span><b>Имя</b>: ${name}</span>
        <span><b>Настоящее имя</b>: ${realName}</span>
        <span><b>Список фильмов</b>: 
          ${movies}
        </span>
        <span><b>Статус</b>: ${status}</span>
        </div
      `);
      heroesList.append(itemHeroesList);
    })
  };

//список фильмов
  const moviesList = (data) => {
    let allMovies = data.reduce(function(prev='', curr=''){
      if(curr.movies){
        return [...prev, ...curr.movies];
      }   
    }, []);
    let unicMovies = Array.from(new Set(allMovies));
    const selectMovie = document.querySelector('#select-movie');
    unicMovies.forEach((item) => {
      let option = document.createElement('option');
      option.value = item;
      option.textContent = item;
      selectMovie.append(option);
    });
  };

  //выбор фильма
  const shooseMovie = (data) => {
    const selectMovie = document.querySelector('#select-movie');
    const heroesList = document.querySelector('.heroes-list');

    selectMovie.addEventListener('change', ()=>{
      let selectedOptions = selectMovie.options[selectMovie.selectedIndex].text;
      let newArr = [];
      data.forEach((item)=>{
        if (item.movies && item.movies.includes(selectedOptions)){
          newArr.push(item);
        }
      });
      heroesList.textContent = '';
      showCardHeroes(newArr);
    });
  };



