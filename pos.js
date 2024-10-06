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
        itemButton.type = 'button'
       

        // Set the inner HTML of the item button
        itemButton.innerHTML = `
            <img src="${item.itemImage}" alt="${item.itemName}" style="width: 60px; height: 60px; item-align:center; "> 
            <h6>${item.itemName}</h6>
            <p>$${item.itemPrice}</p>
        `;

        // Append the item button to the posItemsList
        posItemsList.appendChild(itemButton);
    });
}

populateItemsFunc();
