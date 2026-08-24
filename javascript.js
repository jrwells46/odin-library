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
  this.isRead = false;
}

Book.prototype.toggleReadStatus = function() {
  this.isRead = !this.isRead;
};

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
  const readStatusWrapper = document.createElement('div');

  appendNewElementWithText(readStatusWrapper, 'button', book.isRead ? 'read' : 'unread', book.id);
  cardUpperContent.appendChild(readStatusWrapper);

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

const addBookButton = document.querySelector('.header button');
addBookButton.addEventListener('click', (e) => {
  document.querySelector('dialog').showModal();
});

const dialogCancelButton = document.querySelector('#dialog_cancel');
dialogCancelButton.addEventListener('click', closeModal);

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  addBookToLibrary(getValueById('title'), getValueById('author'), getValueById('page_count'), getValueById('summary'));
  closeModal(e);
  refreshLibrary();
});

cardContainer.addEventListener('click', (e) => {
  if (e.target.matches('.card > div:nth-child(2) > button')) {
    removeBookFromLibrary(e.target.dataset.id);
    refreshLibrary();
  }

  if (e.target.matches('.card > div:first-child > div > button')) {
    myLibrary.find(book => book.id === e.target.dataset.id).toggleReadStatus();
    refreshLibrary();
  }
});