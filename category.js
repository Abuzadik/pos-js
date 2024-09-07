// Select the save button element
const saveBtn = document.getElementById('saveBtn');

// Generate unique ID
function uniqueid() {
    return Math.floor(Math.random() * 10000);
}

// Save function
function saveCategories() {
    const categoryName = document.getElementById('categoryName').value;

    const category = {
        id: uniqueid(),
        name: categoryName,
    };

    // Retrieve existing categories from localStorage
    const categoryData = JSON.parse(localStorage.getItem('categories')) || [];

    // Save new category to localStorage
    categoryData.push(category);
    localStorage.setItem('categories', JSON.stringify(categoryData));

    // Clear the input field
    document.getElementById('categoryName').value = '';

    // Refresh the table
    readCategory();
}

// Saving button action
saveBtn.addEventListener('click', saveCategories);

// Delete button functionality
function deleteCategory(id) {
    // Retrieve categories from localStorage
    const getCategory = JSON.parse(localStorage.getItem('categories')) || [];

    // Filter out the category with the matching id
    const updatedCategories = getCategory.filter(category => category.id !== id);

    // Update localStorage with the new array
    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    // Refresh the table
    readCategory();
}

// Fetch the table and display categories
function readCategory() {
    // Select the table body element
    const tableBody = document.getElementById('tableBody');
    // Clear the current table content
    tableBody.innerHTML = '';
    // Retrieve categories from localStorage
    const getCatgeoryData = JSON.parse(localStorage.getItem('categories')) || [];

    getCatgeoryData.forEach(cats => {
        // Create a new row
        const rows = document.createElement('tr');

        // Create ID cell
        const idCells = document.createElement('td');
        idCells.textContent = cats.id;

        // Create name cell
        const nameCells = document.createElement('td');
        nameCells.textContent = cats.name;

        // Create action cell
        const actionCell = document.createElement('td');

        // Create edit button
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary editBtn';
        editButton.textContent = 'Edit';

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger deleteBtn';
        deleteButton.textContent = 'Delete';
        // Pass the correct id to the delete function
        deleteButton.addEventListener('click', () => deleteCategory(cats.id));

        // Append buttons to the action cell
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        // Append cells to the row
        rows.appendChild(idCells);
        rows.appendChild(nameCells);
        rows.appendChild(actionCell);

        // Append the row to the table body
        tableBody.appendChild(rows);
    });
}

// Load categories when the window loads
window.onload = readCategory;
