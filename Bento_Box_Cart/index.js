document.addEventListener('DOMContentLoaded', () => {
  const products = [
    {id: 1, name: 'Nintendo Switch 2', price: 46999, image: '🎮'},
    {id: 2, name: 'Rayban Meta Glasses', price: 35999, image: '🕶️'},
    {id: 3, name: 'Samsung Galaxy Ring', price: 39999, image: '💍'},
    {id: 4, name: 'Apple Air Tag', price: 2899, image: '🏷️'}
  ]

  let cart = JSON.parse(localStorage.getItem('shoppingCart')) || []

  const productsContainer = document.getElementById('product-container')
  const cartItemsContainer = document.getElementById('cart-items')
  const cartTotalSpan = document.getElementById('cart-total')

  function saveCart(){
    localStorage.setItem('shoppingCart', JSON.stringify(cart))
  }

  function renderCart (){
    cartItemsContainer.innerHTML = ''

    if(cart.length===0){
      cartItemsContainer.innerHTML = '<p class="text-slate-400">Your cart is currently empty.</p>'
      cartTotalSpan.textContent = '₹0.00'
      return
    }
  let total = 0
  cart.forEach(item => {
    const cartItemHTML =  `
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold">${item.name}</p>
                        <p class="text-sm text-slate-400">$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <p class="font-semibold">₹${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `
    cartItemsContainer.innerHTML += cartItemHTML
    total+= item.price * item.quantity
  })
  cartTotalSpan.textContent = `${total.toFixed(2)}`
  }


  function renderProducts(){
    products.forEach(product => {
      const productCardHTML = `
        <div class="bg-slate-700 p-4 rounded-lg flex flex-col justify-between">
                    <div class="text-5xl mb-4">${product.image}</div>
                    <h3 class="text-xl font-bold">${product.name}</h3>
                    <p class="text-lg font-semibold my-2">₹${product.price.toFixed(2)}</p>
                    <button data-product-id="${product.id}" class="add-to-cart-btn bg-lime-500 text-slate-900 font-bold py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors w-full">
                        Add to Cart
                    </button>
                </div>
      `
      productsContainer.innerHTML += productCardHTML
    })
  }

  function addToCart(productId){
    const productToAdd = products.find(p=> p.id === productId)
    const existingCartItem = cart.find(item=>item.id===productId)

    if(existingCartItem){
      existingCartItem.quantity++;
    } else {
      cart.push({...productToAdd, quantity: 1})
    }

    saveCart()
    renderCart()
    
  }
  
  productsContainer.addEventListener('click', (event)=> {
    if(event.target.classList.contains('add-to-cart-btn')){
      const productId = parseInt (event.target.dataset.productId)
      addToCart(productId)
    }
  })

  renderProducts()
  renderCart()
})