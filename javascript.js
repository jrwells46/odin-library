const myLibrary = [];

function Book(title, author, pageCount, summary) {
  if (!new.target) {
    throw Error('Book constructor must be used with new keyword.');
  }
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.summary = summary;
}

function addBookToLibrary(title, author, pageCount, summary) {
  myLibrary.push(new Book(title, author, pageCount, summary));
}

function refreshLibrary() {
  const cardContainer = document.querySelector('.card-container');
  cardContainer.replaceChildren();
  myLibrary.forEach(book => addCardToContainer(book));
}

function addCardToContainer(book) {
  const card = document.createElement('div');
  card.className = 'card';

  const cardUpperContent = document.createElement('div');
  appendNewElementWithText(cardUpperContent, 'div', 'unread');
  appendNewElementWithText(cardUpperContent, 'h2', book.title);
  appendNewElementWithText(cardUpperContent, 'h3', `by ${book.author}`);
  appendNewElementWithText(cardUpperContent, 'p', book.summary);
  card.appendChild(cardUpperContent);

  appendNewElementWithText(card, 'div', `${book.pageCount} pages`);

  cardContainer.appendChild(card);
}

function appendNewElementWithText(parent, newElementType, text) {
  const newElement = document.createElement(newElementType);
  newElement.textContent = text;
  parent.append(newElement);
}