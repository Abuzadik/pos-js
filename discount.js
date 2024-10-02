// saving dicount function
const saveDiscountBtn = document.getElementById('saveDiscountBtn')

//generate UUID 
function generateUUID() {
    return Math.floor(Math.random() * 1000000);
}

function saveDiscountFunc() {

    //select the element
    const code = document.getElementById('code').value
    const description = document.getElementById('description').value
    const percent = document.getElementById('percent').value

    // Validation: Check if any field is empty
    if (!code || !description || !percent) {
        alert('Please fill in all fields.');
        return;
    }

    // Validate percent is a number and within a valid range
    if (isNaN(percent) || percent <= 0 || percent > 100) {
        alert('Please enter a valid discount percentage between 1 and 100.');
        return;
    }

    //retrieve existing data 
    const getDiscountData = JSON.parse(localStorage.getItem('discounts')) || [];

    const newDiscount = {
        id: generateUUID(),
        code: code,
        description: description,
        percent: percent
    }

    //push new discount 
    getDiscountData.push(newDiscount);
    localStorage.setItem('discounts', JSON.stringify(getDiscountData))

    //clear the element
    document.getElementById('code').value = ''
    document.getElementById('description').value = ''
    document.getElementById('percent').value = ''

    //callback read func
    readDiscountFunc()

    //close modal
    $('#createDiscount').modal('hide')

}

saveDiscountBtn.addEventListener('click', saveDiscountFunc)

//rwad data from localstorage
function readDiscountFunc() {
    //delect the table body
    const tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ' ';

    //retrieve data from localstrogae
    const getDiscountData = JSON.parse(localStorage.getItem('discounts')) || [];
    getDiscountData.forEach(discount => {
        //create riws 
        const rows = document.createElement('tr');

        //create id cell
        const idCells = document.createElement('td');
        idCells.textContent = discount.id

        //create code cells
        const codeCell = document.createElement('td');
        codeCell.textContent = discount.code;

        //create description cell
        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = discount.description;

        //create percent cell 
        const percentCell = document.createElement('td')
        percentCell.textContent = discount.percent + '%';

        //action button rows 
        const actionCell = document.createElement('td');

        //cretae edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-warning'
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => editDiscountFunc(discount.id))

        //cretae delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger'
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteDiscountFunc(discount.id))

        //append 
        actionCell.appendChild(editBtn)
        actionCell.appendChild(deleteBtn)

        rows.appendChild(idCells)
        rows.appendChild(codeCell)
        rows.appendChild(descriptionCell)
        rows.appendChild(percentCell)
        rows.appendChild(actionCell)

        tableBody.appendChild(rows);


    });

}

//check onload
window.onload = readDiscountFunc;

//find id 
let selectDiscountID = null;

//delete discount record func
function deleteDiscountFunc(id) {
    selectDiscountID = id

    //retrieve data from localStorage
    const getDiscountData = JSON.parse(localStorage.getItem('discounts')) || [];

    //filter out 
    const deleteDiscountData = getDiscountData.filter(discount => discount.id !== id);
    localStorage.setItem('discounts', JSON.stringify(deleteDiscountData))

    //call back read func
    readDiscountFunc();

    //allert 
    alert('deleted successfully')
}

//update disc func 
function editDiscountFunc(id) {
    //retrieve data from l;ocalStorage
    const getDiscountData = JSON.parse(localStorage.getItem('discounts')) || [];

    //mapping the id 
    const editDiscount = getDiscountData.find(discount => discount.id === id);

    if (editDiscount) {
        selectDiscountID = id;

        document.getElementById('editCode').value = editDiscount.code
        document.getElementById('editDescription').value = editDiscount.description
        document.getElementById('editPercent').value = editDiscount.percent

        //show the modal
        $('#editDiscount').modal('show')
    }

}


//updaste discount func
const updateDiscountBtn = document.getElementById('updateDiscountBtn')

function updateDiscountFunc() {
    //select the element
    const updateCode = document.getElementById('editCode').value
    const updateDescription = document.getElementById('editDescription').value
    const updatePercent = document.getElementById('editPercent').value

    //retrieve data from l;ocalStorage
    const getDiscountData = JSON.parse(localStorage.getItem('discounts')) || [];

    const updateDiscount = getDiscountData.map(discount => {
        if (discount.id === selectDiscountID) {
            return { ...discount, code: updateCode, description: updateDescription, percent: updatePercent }
        }
        return discount;
    })

    //update localstorage
    localStorage.setItem('discounts', JSON.stringify(updateDiscount))

    //alert 
    alert('update successfully')

    //call back read func
    readDiscountFunc();

    //close ,odal
    $('#editDiscount').modal('hide')
}
updateDiscountBtn.addEventListener('click' , updateDiscountFunc) 