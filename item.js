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
const saveItemBtn = document.getElementById('saveItemBtn')
let selectItemID = null
function saveItems() {
    // Select the elements
    const itemName = document.getElementById('itemName').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemCategory = document.getElementById('itemCategory').value;
    const itemImage = document.getElementById('itemImage').files[0]; // Get the image file

    // Generate ID
    const generateItemId = Math.trunc(Math.random() * 1000000);

    const items = {
        id: generateItemId,
        itemName: itemName,
        itemCategory: itemCategory,
        itemPrice: itemPrice,
        itemImage: 'images/default-product.png'
    };

    // Check if an image was selected
    if (itemImage) {
        const reader = new FileReader();

        reader.onloadend = function () {
            // If an image is provided, use it instead of the default
            items.itemImage = reader.result; // Use the Base64 string here

            // Retrieve existing data
            const itemsData = JSON.parse(localStorage.getItem('items')) || [];

            // Push new data to localStorage
            itemsData.push(items);
            localStorage.setItem('items', JSON.stringify(itemsData));

            // Clear form data
            document.getElementById('itemName').value = '';
            document.getElementById('itemCategory').value = '';
            document.getElementById('itemPrice').value = '';
            document.getElementById('itemImage').value = '';

            // Hide modal
            $('#createItem').modal('hide');

            ReadItems();
        };

        // Read the image file as a Data URL (Base64)
        reader.readAsDataURL(itemImage);
    } else {
        // If no image is selected, save the item with the default image
        const itemsData = JSON.parse(localStorage.getItem('items')) || [];

        // Push new data to localStorage
        itemsData.push(items);
        localStorage.setItem('items', JSON.stringify(itemsData));

        // Clear form data
        document.getElementById('itemName').value = '';
        document.getElementById('itemCategory').value = '';
        document.getElementById('itemPrice').value = '';
        document.getElementById('itemImage').value = '';

        // Hide modal
        $('#createItem').modal('hide');

        ReadItems();
    }
}
saveItemBtn.addEventListener('click', saveItems);

document.getElementById('createItemForm').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        event.preventDefault;
        saveItems()
    }
})

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

        // Create image cell
        const itemImageCell = document.createElement('td');
        const itemImage = document.createElement('img');
        itemImage.src = item.itemImage || 'images/default-product.png';
        itemImage.alt = item.itemName;
        itemImage.style.width = '60px';
        itemImage.style.height = 'auto';
        itemImageCell.appendChild(itemImage);


        //Price cells 
        const itemPriceCell = document.createElement('td');
        itemPriceCell.textContent = item.itemPrice;

        //action cell
        const actionCell = document.createElement('td')

        //edit button 
        const editBtn = document.createElement('button')
        editBtn.className = 'btn btn-warning'
        editBtn.textContent = 'edit'
        editBtn.addEventListener('click', () => editItemFunc(item.id))

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
        rows.appendChild(itemImageCell)
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
    const getItems = JSON.parse(localStorage.getItem('items')) || []
    const updateItemsData = getItems.filter(item => item.id !== id)
    alert('Deleted successfully')
    localStorage.setItem('items', JSON.stringify(updateItemsData))
    ReadItems()
}


//edit item function
function editItemFunc(id) {
    // Retrieve data 
    const getItemsData = JSON.parse(localStorage.getItem('items')) || [];
    const categories = JSON.parse(localStorage.getItem('categories')) || [];

    // Mapping category 
    const categoryMap = {};
    categories.forEach(category => {
        categoryMap[category.id] = category.name;
    });

    // Find item by id
    const findItem = getItemsData.find(item => item.id === id);

    if (findItem) {
        selectItemID = id;
        document.getElementById('updateItemName').value = findItem.itemName;
        document.getElementById('updateItemPrice').value = findItem.itemPrice;

        // Populate the category select input
        const categorySelect = document.getElementById('updateItemCategory');
        categorySelect.innerHTML = '';

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });

        // Set the selected category
        categorySelect.value = findItem.itemCategory;

        // Set the current image to an img element
        const currentImageElement = document.getElementById('currentImage');
        currentImageElement.src = findItem.itemImage;
        currentImageElement.alt = findItem.itemName;

        $('#updateItemModal').modal('show');
    }
}


//update item 
const updateItemBtn = document.getElementById('updateItemBtn')

function updateItemFunc() {
    // Get elements 
    const updateItemName = document.getElementById('updateItemName').value;
    const updateItemCat = document.getElementById('updateItemCategory').value;
    const updateItemPrice = document.getElementById('updateItemPrice').value;
    const updateItemImage = document.getElementById('updateItemImage').files[0]; 

    // Retrieve data 
    const getItemsData = JSON.parse(localStorage.getItem('items')) || [];

    // Create a new item object to be updated
    const updatedItem = {
        itemName: updateItemName,
        itemCategory: updateItemCat,
        itemPrice: updateItemPrice,
        itemImage: null 
    };

    // If a new image is selected, read it
    if (updateItemImage) {
        const reader = new FileReader();

        reader.onloadend = function () {
            updatedItem.itemImage = reader.result; 
            saveUpdatedItem(updatedItem, getItemsData);
        };

        // Read the image file as a Data URL (Base64)
        reader.readAsDataURL(updateItemImage);
    } else {
        // If no new image is selected, keep the existing image
        const existingItem = getItemsData.find(item => item.id === selectItemID);
        updatedItem.itemImage = existingItem.itemImage;
        saveUpdatedItem(updatedItem, getItemsData);
    }
}

function saveUpdatedItem(updatedItem, getItemsData) {
    // Map and update the item
    const updatedItems = getItemsData.map(item => {
        if (item.id === selectItemID) {
            return { ...item, ...updatedItem };
        }
        return item;
    });

    localStorage.setItem('items', JSON.stringify(updatedItems));
    ReadItems();
    $('#updateItemModal').modal('hide');
}

updateItemBtn.addEventListener('click', updateItemFunc);
