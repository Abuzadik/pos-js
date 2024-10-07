function populateItemsFunc() {
    // Select the elements
    const posItemsList = document.getElementById('posItems');
    posItemsList.innerHTML = ''; // Clear existing items

    // Retrieve items and categories
    const getItemsData = JSON.parse(localStorage.getItem('items')) || [];
    const getCategoriesData = JSON.parse(localStorage.getItem('categories')) || [];

    // Map categories for easy lookup
    const categoryMap = {};
    getCategoriesData.forEach(category => {
        categoryMap[category.id] = category.name;
    });

    // Check if there are items to display
    if (getItemsData.length === 0) {
        posItemsList.innerHTML = '<h3 class="d-flex justify-content-center">No items available right now.</h3>';
        return;
    }

    // Populate items
    getItemsData.forEach(item => {
        // Create a button element for each item
        const itemButton = document.createElement('button');
        itemButton.className = 'btn btn-outline-success m-1';
        itemButton.type = 'button';
        itemButton.addEventListener('click', () => itemDetailModalFunc(item.id));

        // Set the inner HTML of the item button
        itemButton.innerHTML = `
            <img src="${item.itemImage}" alt="${item.itemName}" style="width: 60px; height: 60px; item-align:center;"> 
            <h6>${item.itemName}</h6>
            <p>$${item.itemPrice}</p>
        `;

        // Append the item button to the posItemsList
        posItemsList.appendChild(itemButton);
    });
}

//call the populate fun
populateItemsFunc();

const addCartBtn = document.getElementById('addCartBtn');
let selectItemID = null;

// Function to show item detail modal
function itemDetailModalFunc(id) {
    // Get item data 
    const getItemsData = JSON.parse(localStorage.getItem('items')) || [];
    const selectedItem = getItemsData.find(item => item.id === id);

    if (selectedItem) {
        selectItemID = id;
        document.getElementById('item-detail').textContent = selectedItem.itemName;
        document.getElementById('qty').value = 1; // Reset to 1
    }

    $("#itemDetail").modal('show');

    addCartBtn.onclick = () => {
        const qtyInput = document.getElementById('qty'); // Get the quantity input
        const itemQty = parseInt(qtyInput.value) || 1; // Parse the quantity or default to 1
        cartFunc(selectedItem.itemName, itemQty, selectedItem.itemPrice); // Pass the correct quantity
    };
}

// Cart function 
function cartFunc(itemName, itemQty, itemPrice) {
    const cartField = document.getElementById('itemsInCart');
    const newCard = document.createElement('div');

    newCard.className = 'card shadow-lg p-1 mb-2 bg-white rounded'; 
    newCard.style.width = '100%'; 
    newCard.style.height = 'auto'; 
    newCard.innerHTML = `
        <div class="card-body ">
            <div class="d-flex justify-content-between align-items-center">
                <h6 class="mb-0">${itemName}</h6>
                <p class="mb-0">qty: ${itemQty}</p>
                <p class="mb-0">$${itemPrice}</p>
                <button type="button" class="btn btn-danger btn-sm"> <i class="fa fa-trash"> </i></button
            </div>
        </div>
    `;

    cartField.appendChild(newCard);
    $("#itemDetail").modal('hide');
}
