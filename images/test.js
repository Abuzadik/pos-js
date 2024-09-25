// Function to populate categories from localStorage
function populateCategories() {
    const categorySelect = document.getElementById('itemCategory');
    categorySelect.innerHTML = ''; // Clear existing options

    // Retrieve categories from localStorage
    const categories = JSON.parse(localStorage.getItem('categories')) || [];

    // Check if categories exist
    if (categories.length === 0) {
        categorySelect.innerHTML = '<option>No categories available</option>';
        return;
    }

    // Create options for each category
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category; // or whatever value you want to set
        option.textContent = category; // Displayed text
        categorySelect.appendChild(option);
    });
}

// Event listener for when the modal is shown
$('#createItem').on('show.bs.modal', function () {
    populateCategories();
});
