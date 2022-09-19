

const productId = new URL(window.location.href).searchParams.get("id") //récpère l'ID du produit dans l'URL


const productPage = {
    init : function(){
        productPage.getProducts() //lance la fonction getProducts à l'initialisation de la page
    },
    getProducts : async function() { //Affiche le produit en fonction de son ID (productId)
        try {

            console.log(productId);
            const res = await fetch("http://localhost:3000/api/products/" + productId)
            const products = await res.json()


            const productImgContainer = document.getElementsByClassName('item__img')[0]
            const productImg = document.createElement("img")
            productImg.setAttribute("src", products.imageUrl)
            productImg.setAttribute("alt", products.altTxt)
            productImgContainer.appendChild(productImg)

            const title = document.getElementById("title")
            title.textContent = products.name

            const price = document.getElementById("price")
            price.textContent = products.price

            const desc = document.getElementById("description")
            desc.textContent = products.description
            
            productPage.printColors(products)

        } 

        catch (error) {
            console.error(error)
        }
    },
    printColors : function(products){ //Créé une nouvelle option de couleur dans l'HTML pour chaque couleurs disponibles de l'article
        for (let i = 0; i < products.colors.length; i++) { 
            const coloContainer = document.getElementById("colors")
            const coloOption = document.createElement("option")
            coloOption.setAttribute("value", products.colors[i])
            coloOption.textContent = products.colors[i]
            coloContainer.appendChild(coloOption)

        }
    }
}



    const cartButton = document.getElementById("addToCart") //Btn ajouter au panier
    cartButton.onclick = function() { //Stoque dans le localStorage la quantité, la couleur, et l'ID du produit 
        
        const quantityInput = Number(document.getElementById("quantity").value)
        const coloSelector = document.getElementById("colors").value

        if(coloSelector == 0 || quantityInput ==0){
                 return alert("veuillez sélectionner une couleur et/ou une quantité")
        }
        const cart = { //Tableau du localStorage
                 id : productId,
                 quantity : quantityInput,
                 colors : coloSelector
        }
        if(localStorage.length < 1){ 
            let l = []
            l.push(cart)
            return localStorage.setItem("items", JSON.stringify(l)); //Push le tableau dans le localStorage
        }
        if(localStorage.length >= 1){
            let storageParsed = JSON.parse(localStorage.getItem("items"));

            let findItem = false

            for(const element of storageParsed){
                if(element.colors == coloSelector && element.id == productId){ 

                    findItem = true
                    let numberQttyInput = quantityInput
                    
                    element.quantity = element.quantity+numberQttyInput //Augmente la quantité si le produit ajouté au panier existe déjà dans celui-ci et de la même couleur
                    
                }
            }
            if(findItem == false){ 
                storageParsed.push(cart) //Ajoute le produit au panier si il n'a pas la même couleur et pas le même ID
            }
            localStorage.setItem("items", JSON.stringify(storageParsed)); 
        }
    }




document.addEventListener("DOMContentLoaded", productPage.init);