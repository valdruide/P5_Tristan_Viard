const indexPage = {
      init: function () {
            indexPage.getProducts(); //lance la fonction getProducts à l'initialisation de la page
      },
      getProducts: async function () {
            try {
                  const res = await fetch('http://localhost:3000/api/products/'); //récupère toutes les infos dans l'API (tous les canapés)
                  const products = await res.json();
                  indexPage.displayProducts(products); //Une fois le résultat obtenue, lance la fonction displayProducts
            } catch (error) {
                  console.error(error);
            }
      },
      displayProducts: function (products) {
            //Affiche sur la page d'accueil les produits dans le JSON de l'API
            const items = document.getElementById('items');

            for (product of products) {
                  const link = document.createElement('a');
                  link.setAttribute('href', `./product.html?id=${product._id}`); //Stoque l'ID du produit dans le href
                  items.append(link);
                  const productArticle = document.createElement('article');
                  link.append(productArticle);

                  const imgKanap = document.createElement('img');
                  productArticle.append(imgKanap);
                  imgKanap.setAttribute('src', product.imageUrl);
                  imgKanap.setAttribute('alt', product.altTxt);

                  const productName = document.createElement('h3');
                  productArticle.append(productName);
                  productName.setAttribute('id', product.name);
                  productName.classList.add('productName');
                  productName.textContent = product.name;

                  const description = document.createElement('p');
                  productArticle.append(description);
                  description.textContent = product.description;
                  description.classList.add('productDescription');
            }
      },
};

document.addEventListener('DOMContentLoaded', indexPage.init);
