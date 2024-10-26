document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('productForm');
  const productList = document.getElementById('products');
  let productCount = 0;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (validateForm()) {
      await addProduct();
      form.reset();
    }
  });

  function validateForm() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const imageUrl = document.getElementById('productImage').value;
    
    if (!name) {
      alert('Por favor, ingrese el nombre del producto');
      return false;
    }
    
    if (!price) {
      alert('Por favor, ingrese el precio del producto');
      return false;
    }
    
    if (!imageUrl) {
      alert('Por favor, ingrese la URL de la imagen del producto');
      return false;
    }
    
    return true;
  }

  async function addProduct() {
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const imageUrl = document.getElementById('productImage').value;

    try {
      // Simulando una solicitud HTTP POST para guardar el producto
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, imageUrl })
      });

      if (!response.ok) {
        throw new Error('Error al guardar el producto');
      }

      const product = await response.json();

      const productCard = document.createElement('div');
      productCard.classList.add('product-card', 'col-md-4');
      productCard.innerHTML = `
        <div class="card h-100">
          <img src="${product.imageUrl}" class="card-img-top img-fluid" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Precio: $${product.price}</p>
            <button class="btn btn-danger delete-btn">Eliminar</button>
          </div>
        </div>
      `;

      productCard.querySelector('.delete-btn').addEventListener('click', () => {
        productCard.remove();
        productCount--;
      });

      productList.appendChild(productCard);
      productCount++;

    } catch (error) {
      alert(error.message);
    }
  }
});
