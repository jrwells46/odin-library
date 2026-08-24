const myLibrary = [];

function Book(title, author, pageCount, summary) {
  if (!new.target) {
    throw Error('Book constructor must be used with new keyword.');
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.summary = summary;
}

function addBookToLibrary(title, author, pageCount, summary) {
  myLibrary.push(new Book(title, author, pageCount, summary));
}

function removeBookFromLibrary(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  myLibrary.splice(index, 1); 
}

const cardContainer = document.querySelector('.card-container');

function refreshLibrary() {
  cardContainer.replaceChildren();
  myLibrary.forEach(book => addCardToContainer(cardContainer, book));
}

function addCardToContainer(cardContainer, book) {
  const card = document.createElement('div');
  card.className = 'card';

  const cardUpperContent = document.createElement('div');
  appendNewElementWithText(cardUpperContent, 'div', 'unread');
  appendNewElementWithText(cardUpperContent, 'h2', book.title);
  appendNewElementWithText(cardUpperContent, 'h3', `by ${book.author}`);
  appendNewElementWithText(cardUpperContent, 'p', book.summary);
  card.appendChild(cardUpperContent);

  const cardLowerContent = document.createElement('div');
  appendNewElementWithText(cardLowerContent, 'div', `${book.pageCount} pages`);
  appendNewElementWithText(cardLowerContent, 'button', 'Remove', book.id);
  card.appendChild(cardLowerContent);

  const cardWrap = document.createElement('div');
  cardWrap.className = 'card-wrap';
  cardWrap.appendChild(card);
  cardContainer.appendChild(cardWrap);
}

function appendNewElementWithText(parent, newElementType, text, id) {
  const newElement = document.createElement(newElementType);
  newElement.textContent = text;
  if (id) newElement.setAttribute('data-id', id);
  parent.append(newElement);
}

function getValueById(id) {
  const formField = document.querySelector(`#${id}`);
  return formField.value.trim();
}

function closeModal(e) {
  e.preventDefault();
  document.querySelector('dialog').close();
  document.querySelector('form').reset();
}

const dialogSubmitButton = document.querySelector('#dialog_confirm');
const dialogCancelButton = document.querySelector('#dialog_cancel');

dialogSubmitButton.addEventListener('click', (e) => {
  addBookToLibrary(getValueById('title'), getValueById('author'), getValueById('page_count'), getValueById('summary'));
  closeModal(e);
  refreshLibrary();
});

dialogCancelButton.addEventListener('click', closeModal);

cardContainer.addEventListener('click', (e) => {
  if (e.target.matches('.card button')) {
    removeBookFromLibrary(e.target.dataset.id);
    refreshLibrary();
  }
});