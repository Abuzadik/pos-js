//populate categories 
function populateCategories() {
    const categorySelect = document.getElementById('itemCategory')
    categorySelect.innerHTML = ''

    // Retriev categories from localStorage
    const categories = JSON.parse(localStorage.getItem('categories')) || []

    // Create options 
    categories.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category.id;
        optionElement.textContent = category.name
        categorySelect.appendChild(optionElement)
    })

}

//show model with localStorage data
$('#createItem').on('show.bs.modal', function () {
    populateCategories();
});

//SAVING ITEM DATA 

function saveItems() {
    // Select the elements
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const itemImage = document.getElementById('itemImage')

    // Generate ID
    const generateItemId = Math.trunc(Math.random() * 1000000);

    const items = {
        id: generateItemId,
        itemName: itemName,
        itemCategory: itemCategory,
        itemPrice: itemPrice
    };

    // Retrieve existing data
    const itemsData = JSON.parse(localStorage.getItem('items')) || [];

    // Push new data to localStorage
    itemsData.push(items);
    localStorage.setItem('items', JSON.stringify(itemsData));

    // Clear form data
    document.getElementById('itemName').value = '';
    document.getElementById('itemCategory').value = '';
    document.getElementById('itemPrice').value = '';

    // Hide modal
    $('#createItem').modal('hide');

    ReadItems()
}

saveItemBtn.addEventListener('click', saveItems);


function ReadItems() {
    // select table body element
    const tableBodyEl = document.getElementById('table-body')
    //clear body
    tableBodyEl.innerHTML = '';

    //retrieve data from locallStorgae 
    // Retrieve data from localStorage
    const getItemsData = JSON.parse(localStorage.getItem('items')) || [];
    const categories = JSON.parse(localStorage.getItem('categories')) || [];

      // mapping  category 
      const categoryMap = {};
      categories.forEach(category => {
          categoryMap[category.id] = category.name;
      })

    getItemsData.forEach(item => {
        // Create a new row
        const rows = document.createElement('tr');

        //create id cells 
        const idCell = document.createElement('td');
        idCell.textContent = item.id;

        //name cells 
        const itemNameCell = document.createElement('td');
        itemNameCell.textContent = item.itemName;

        //Ctageory cells 
        const itemCatCell = document.createElement('td');
        itemCatCell.textContent = categoryMap[item.itemCategory] || 'no category'

        //Price cells 
        const itemPriceCell = document.createElement('td');
        itemPriceCell.textContent = item.itemPrice;

        //action cell
        const actionCell = document.createElement('td')

        //edit button 
        const editBtn = document.createElement('button')
        editBtn.className = 'btn btn-warning'
        editBtn.textContent = 'edit'

        //del button 
        const delBtn = document.createElement('button')
        delBtn.className = 'btn btn-danger'
        delBtn.textContent = 'Delete'
        delBtn.addEventListener('click', () => deleteItem(item.id))

       // Append buttons
       actionCell.appendChild(editBtn);
       actionCell.appendChild(delBtn);

       // Append cells to row
       rows.appendChild(idCell);
       rows.appendChild(itemNameCell);
       rows.appendChild(itemCatCell);
       rows.appendChild(itemPriceCell);
       rows.appendChild(actionCell); 

       // Append row to tableBodyEl
       tableBodyEl.appendChild(rows);


    })
}

// Load categories when the window loads
window.onload = ReadItems;


//delete item function
function deleteItem(id) {
    //retrieve items data 
    const getItems = JSON.parse(localStorage.getItem('items'))
    const updateItemsData = getItems.filter(item => item.id !== id)
    alert('Deleted successfully')
    localStorage.setItem('items', JSON.stringify(updateItemsData))
    ReadItems()
}


//update item function