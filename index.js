const newItemInput = document.getElementById('new-item');
const shoppingList = document.getElementById('shopping-list');
const addButton = document.getElementById('add-btn');
const markPurchasedButton = documentgetElementById('mark-purchased-btn');
const clearListButton = document.getElementById('clear-list-btn');


const savedList = localStorage.getItem('shoppingList');
if (savedList) {
  shoppingList.innerHTML = savedList; 
}

function updateList() {
  localStorage.setItem('shoppingList', shoppingList.innerHTML); 
}

addButton.addEventListener('click', function() {
  const newItem = newItemInput.value.trim();
  if (newItem) {
    const listItem = document.createElement('li');
    listItem.textContent = newItem;
    listItem.addEventListener('click', function() {
      this.classList.toggle('purchased');
      updateList();
    });
    shoppingList.appendChild(listItem);
    newItemInput.value = ''; 
    updateList();
  }
});

markPurchasedButton.addEventListener('click', function() {
  const listItems = shoppingList.querySelectorAll('li');
  for (const item of listItems) {
    item.classList.toggle('purchased');
  }
  updateList();
});

clearListButton.addEventListener('click', function() {
  shoppingList.innerHTML = '';
  localStorage.removeItem('shoppingList');
});


shoppingList.addEventListener('dblclick', function(event) {
  if (event.target.tagName === 'LI') {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = event.target.textContent;
    event.target.textContent = '';
    event.target.appendChild(editInput);
    editInput.focus(); 
    editInput.addEventListener('blur', function() {
      event.target.textContent = this.value;
      updateList();
    });
  }
});
