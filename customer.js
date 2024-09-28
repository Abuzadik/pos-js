//select the element
const saveCusBtn = document.getElementById('saveCusBtn');

//generate UUID 
function uniqueid() {
    return Math.floor(Math.random() * 10000);
}

//saving customer function 
function savingCustomer() {

    const cusName = document.getElementById('cusName').value
    const cusPhone = document.getElementById('cusPhone').value
    const cusAddress = document.getElementById('cusAddress').value

    const newCustomer = {
        id: uniqueid(),
        name: cusName,
        phone: cusPhone,
        address: cusAddress
    };

    //retrieve existing localStrogare data 
    const getCustomerData = JSON.parse(localStorage.getItem('customers')) || [];
    //push new customer record
    getCustomerData.push(newCustomer);

    localStorage.setItem('customers', JSON.stringify(getCustomerData));

    //clear input fields
    document.getElementById('cusName').value = ''
    document.getElementById('cusPhone').value = ''
    document.getElementById('cusAddress').value = ''

    //close modal
    $('#createCustomer').modal('hide');

    readCustomerData();

}
//add event in saving button
saveCusBtn.addEventListener('click', savingCustomer);



//read data from locaStrogae 
function readCustomerData() {
    //select element 
    const tablebody = document.getElementById('tablebody');
    tablebody.innerHTML = '';

    //retrieve data from localstrogae
    const getCustomerData = JSON.parse(localStorage.getItem('customers')) || []
    getCustomerData.forEach(customer => {
        //create tbale row
        const rows = document.createElement('tr');

        // Create ID cell
        const idCells = document.createElement('td');
        idCells.textContent = customer.id;

        // Create name cell
        const nameCells = document.createElement('td');
        nameCells.textContent = customer.name;

        // Create phone cell
        const phoneCells = document.createElement('td');
        phoneCells.textContent = customer.phone;

        // Create address cell
        const addressCells = document.createElement('td');
        addressCells.textContent = customer.address;

        // Create action cell
        const actionCell = document.createElement('td');

        // Create edit button
        const editButton = document.createElement('button');
        editButton.className = 'btn btn-primary editBtn';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editCustomer(customer.id))



        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger deleteBtn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteCustomer(customer.id))

        // Append buttons to the action cell
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        rows.appendChild(idCells)
        rows.appendChild(nameCells)
        rows.appendChild(phoneCells)
        rows.appendChild(addressCells)
        rows.appendChild(actionCell)

        tablebody.appendChild(rows)

    })
}

window.onload = readCustomerData;


//DELETE CUSTOMER RECORD FUNC
function deleteCustomer(id) {
    //retrieve data from local
    const getCustomerData = JSON.parse(localStorage.getItem('customers')) || [];
    const deleteCustomer = getCustomerData.filter(customer => customer.id !== id);
    localStorage.setItem('customers', JSON.stringify(deleteCustomer));

    //allert
    alert('deleted successfully')

    //callback read func
    readCustomerData();

}

//edit customer 
let slecetCustomerID = null;

function editCustomer(id) {
    //retrieve data from local
    const getCustomerData = JSON.parse(localStorage.getItem('customers')) || [];
    //find id
    const findCustomer = getCustomerData.find(customer => customer.id === id)

    if (findCustomer) {
        selectCategoryID = id;
        document.getElementById('editCusName').value = findCustomer.name
        document.getElementById('editCusPhone').value = findCustomer.phone
        document.getElementById('editCusAddress').value = findCustomer.address
    }

    $('#editCustomer').modal('show')
}

//update customer
const updateCusBtn = document.getElementById('updateCusBtn')

function updateCustomer() {
    //select the element
    const updateCusName = document.getElementById('editCusName').value
    const updateCusPhone = document.getElementById('editCusPhone').value
    const updateCusAddress = document.getElementById('editCusAddress').value

    //retrieve existing data 
    const getCustomerData = JSON.parse(localStorage.getItem('customers')) || [];

    const updateCustomerData = getCustomerData.map(customer => {
        if (customer.id === selectCategoryID) {
            return { ...customer, name: updateCusName, phone: updateCusPhone, address: updateCusAddress }
        }
        return customer;
    })

    //update data 
    localStorage.setItem('customers', JSON.stringify(updateCustomerData))

    //callback read func
    readCustomerData();

    //hide modal
    $('#editCustomer').modal('hide');

    //allert 
    alert('update successfully')
}

updateCusBtn.addEventListener('click', updateCustomer)