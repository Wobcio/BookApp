{
  'use strict';

  const data = dataSource;

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      bookImage: '.book__image',
      filter: '.filters',
    }
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const favoriteBooks = [];
  const filters = [];

  const renderInMenu = function(){

    console.log('renderInMenu starts');

    for (const book of data.books){
      //console.log('book: ', book);
      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = parseFloat(book.rating) * 10;

      const generatedHTML = templates.book(book);
     
      const element =  utils.createDOMFromHTML(generatedHTML);

      const bookContainer = document.querySelector(select.containerOf.books);

      bookContainer.appendChild(element);
    }

  };

  const initActions = function(){

    const booksContainer = document.querySelector(select.containerOf.books);
    const filterContainer = document.querySelector(select.containerOf.filter);

    //console.log(filterContainer);

    filterContainer.addEventListener('click', function(event){

      const name = event.target.getAttribute('name');
      const type = event.target.getAttribute('type');
      const tagName = event.target.tagName;
      const value = event.target.getAttribute('value');

      if (name == 'filter' && type == 'checkbox' && tagName == 'INPUT'){
        //console.log(value);

        if (event.target.checked){
          //console.log('checked');
          filters.push(value);
        }else{
          //console.log('not checked');
          const index = filters.indexOf(value);
          filters.splice(index, 1);
        }
        //console.log('active filters: ', filters);
        filter();
      }
    });

    booksContainer.addEventListener('dblclick', function(event){
      event.preventDefault();

      if(event.target.offsetParent.classList.contains('book__image')){

        const thisBook = event.target.offsetParent;
        const bookId = thisBook.dataset.id;

        if (favoriteBooks.includes(bookId)){
          console.log('included');
          thisBook.classList.remove('favorite');

          for (var i = 0; i<favoriteBooks.length; i++){
            if (favoriteBooks[i] == bookId){
              favoriteBooks.splice(i, 1);
            }
          }
        }else{

          thisBook.classList.add('favorite');
          console.log('added');

          favoriteBooks.push(bookId);
        }
        console.log('favoriteBooks: ', favoriteBooks);
      }
    });
    
  };

  const filter = function(){
    for (const book of data.books){
      const bookId = book.id;
      const bookImage = document.querySelector('.book__image[data-id="' + bookId + '"]');
      let shouldBeHidden = false;

      for (const filter of filters){

        if (!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden){
        bookImage.classList.add('hidden');
      }else{
        bookImage.classList.remove('hidden');
      }
    }
  };

  const determineRatingBgc = function(rating){
    let background;
    if (rating < 6){
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }else if (rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }else if (rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }else if (rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  };

  renderInMenu();
  initActions();







}