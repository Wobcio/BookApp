{
  'use strict';

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

  class BooksList {
    constructor() {
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.render();
      thisBookList.getElements();
      thisBookList.initActions();
      
    }
  
    initData() {
      const thisBookList = this;
      thisBookList.data = dataSource.books;
      thisBookList.favorite = [];
      thisBookList.filters = [];
    }

    render(){
      const thisBookList = this;

      for (const book of thisBookList.data){
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = parseFloat(book.rating) * 10;

        const generatedHTML = templates.book(book);
      
        const element =  utils.createDOMFromHTML(generatedHTML);

        const bookContainer = document.querySelector(select.containerOf.books);

        bookContainer.appendChild(element);
      }
    }
  
    getElements() {
      const thisBookList = this;

      thisBookList.booksContainer = document.querySelector(select.containerOf.books);
      thisBookList.filterContainer = document.querySelector(select.containerOf.filter);
    }
  
    initActions() {
      const thisBookList = this;

      thisBookList.booksContainer.addEventListener('dblclick', function(event){
        event.preventDefault();
  
        if(event.target.offsetParent.classList.contains('book__image')){
  
          const thisBook = event.target.offsetParent;
          const bookId = thisBook.dataset.id;
  
          if (thisBookList.favorite.includes(bookId)){
            console.log('included');
            thisBook.classList.remove('favorite');
  
            for (var i = 0; i<thisBookList.favorite.length; i++){
              if (thisBookList.favorite[i] == bookId){
                thisBookList.favorite.splice(i, 1);
              }
            }
          }else{
  
            thisBook.classList.add('favorite');
            console.log('added');
  
            thisBookList.favorite.push(bookId);
          }
          console.log('favoriteBooks: ', thisBookList.favorite);
        }
      });

      thisBookList.filterContainer.addEventListener('click', function(event){

        const name = event.target.getAttribute('name');
        const type = event.target.getAttribute('type');
        const tagName = event.target.tagName;
        const value = event.target.getAttribute('value');
  
        if (name == 'filter' && type == 'checkbox' && tagName == 'INPUT'){
          //console.log(value);
  
          if (event.target.checked){
            //console.log('checked');
            thisBookList.filters.push(value);
          }else{
            //console.log('not checked');
            const index = thisBookList.filters.indexOf(value);
            thisBookList.filters.splice(index, 1);
          }
          //console.log('active filters: ', filters);
          thisBookList.filterBooks();
        }
      });
    }
  
    filterBooks() {
      const thisBookList = this;

      for (const book of thisBookList.data){
        const bookId = book.id;
        const bookImage = thisBookList.booksContainer.querySelector('.book__image[data-id="' + bookId + '"]');
        let shouldBeHidden = false;
  
        for (const filter of thisBookList.filters){
  
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
    }
  
    determineRatingBgc(rating) {
      //const thisBookList = this;

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
    }
  
  }
  
  const app = new BooksList();

  app;
}