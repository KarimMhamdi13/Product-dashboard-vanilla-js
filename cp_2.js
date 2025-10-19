// Coding Project 02

const apiURL = "https://www.course-api.com/javascript-store-products";

// Fetch using .then()
function fetchProductsThen() {
  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then(products => {
      console.log("Products fetched using .then():");
      products.forEach(product => {
        console.log(product.fields.name);
      });
    })
    .catch(error => {
      console.error("An error occurred in fetchProductsThen():", error.message);
    });
}

// Fetch using async/await
async function fetchProductsAsync() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

function displayProducts(products) {
  const container = document.getElementById("product-container");
  container.innerHTML = "";

  const topFive = products.slice(0, 5);
  topFive.forEach(product => {
    const { name, price, image } = product.fields;

    const card = document.createElement("div");
    card.classList.add("product-card");

    const img = document.createElement("img");
    img.src = image[0].url;
    img.alt = name;

    const title = document.createElement("h3");
    title.textContent = name;

    const cost = document.createElement("p");
    cost.textContent = `$${(price / 100).toFixed(2)}`;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(cost);
    container.appendChild(card);
  });
}

// Reusable Error Handler
function handleError(error) {
  console.error("An error has occurred:", error.message);
}

fetchProductsThen();
fetchProductsAsync();
