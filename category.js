// Select the save button element
const saveBtn = document.getElementById('saveBtn');
let selectCategoryID = null;

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

    // hide the edit modal
    $('#createCategory').modal('hide');

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

    // Update localStorge with the new array
    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    // Refresh the table
    readCategory();
}

// Edit button functionality
function editCategory(id) {
    // Retrieve categories from localStrage
    const getCategory = JSON.parse(localStorage.getItem('categories')) || [];
    // Find the category with the matching id
    const categoryToEdit = getCategory.find(category => category.id === id);

    if (categoryToEdit) {
        // Set the selectedCategoryId to the current categor id
        selectedCategoryId = id;

        // Populate the input field with the current categor
        document.getElementById('updateCategoryName').value = categoryToEdit.name;

        // Show the edit modal
        $('#editCategory').modal('show');
    }
}

// Save the edited category
function updateCategory() {
    const updatedCategoryName = document.getElementById('updateCategoryName').value;

    // Retrieve categories from localStorage
    const getCategory = JSON.parse(localStorage.getItem('categories')) || [];

    // Find the category with the matching id and update its name
    const updatedCategories = getCategory.map(category => {
        if (category.id === selectedCategoryId) {
            return { ...category, name: updatedCategoryName };
        }
        return category;
    });

    // Update localStorage with the new array
    localStorage.setItem('categories', JSON.stringify(updatedCategories));

    // Refresh the table
    readCategory();

    // Hide the edit modal
    $('#editCategory').modal('hide');
}

// Attach the update function to the update button
updateBtn.addEventListener('click', updateCategory);

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
        editButton.addEventListener('click', () => editCategory(cats.id))

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
