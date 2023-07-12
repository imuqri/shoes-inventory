const deleteBtn = document.querySelectorAll('.del')
const invItem = document.querySelectorAll('.invItem')
const changeQuantity = document.querySelectorAll('.changeQuantity')

Array.from(deleteBtn).forEach((el) =>{
    el.addEventListener('click', deleteItem)
})

Array.from(changeQuantity).forEach((el) => {
    el.addEventListener("click", setQuantity)
})

async function deleteItem(){
    const invItem = this.parentNode.dataset.id
    try{
        const response = await fetch('invItems/deleteInvItem', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'itemIdFromJSFile': invItem
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function setQuantity(){
    const invItem = this.parentNode.parentNode.dataset.id
    console.log(invItem);
    const quantity = parseInt(this.previousElementSibling.value)
    console.log(`quantity: ${quantity} typeof: ${typeof(quantity)}`)
    try{
        if(quantity >= 0){
        console.log(`quantity is ${quantity}`)
        const response = await fetch('invItems/setQuantity', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'itemIdFromJSFile': invItem,
                'quantity': quantity
            })
        })
        const data = await response.json()
        console.log(data)
    }
        console.log("this is what's logging to console")
        location.reload()
    }catch(err){
        console.log(err)
    }
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//------ search

// Get the search input field
var searchInput = document.getElementById('searchInput');

// Add an event listener to the search input field
searchInput.addEventListener('input', function() {
  var searchTerm = searchInput.value.toLowerCase(); // Convert the search term to lowercase for case-insensitive matching

  // Get all inventory items
  var inventoryItems = document.getElementsByClassName('invItem');

  // Loop through each inventory item and check if it matches the search term
  for (var i = 0; i < inventoryItems.length; i++) {
    var item = inventoryItems[i];
    var itemName = item.getAttribute('data-itemname').toLowerCase(); // Get the item name for comparison
    
    // Show or hide the item based on the search term match
    if (itemName.includes(searchTerm)) {
        item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  }
});