

    
    
    const indexPage = {
        init : function(){
            indexPage.getProducts()
        },
        getProducts : async function() {
            try {
                const res = await fetch("http://localhost:3000/api/products/")
                const products = await res.json()
                indexPage.displayProducts(products);
            } 
            catch (error) {
                console.error(error)
            }
        },
        displayProducts: function(products) {
            const items = document.getElementById("items");

            for(product of products){

                const link = document.createElement("a")
                link.setAttribute("href", `./product.html?id=${product._id}`)
                items.append(link)

                console.log(items)
                const productArticle = document.createElement("article")
                link.append(productArticle)

                const imgKanap = document.createElement("img")
                productArticle.append(imgKanap)
                imgKanap.setAttribute("src", product.imageUrl)
                imgKanap.setAttribute("alt", product.altTxt)


                const productName = document.createElement("h3")
                productArticle.append(productName)
                productName.setAttribute("id", product.name)
                productName.classList.add("productName")
                productName.textContent = product.name

                const description = document.createElement("p")
                productArticle.append(description)
                description.textContent = product.description
                description.classList.add("productDescription")

            }
        }
    }

    document.addEventListener("DOMContentLoaded", indexPage.init);