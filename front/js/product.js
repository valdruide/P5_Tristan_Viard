


const productId = new URL(window.location.href).searchParams.get("id")

const productPage = {
    init : function(){
        productPage.getProducts()
    },
    getProducts : async function() {


        try {

            const productId = new URL(window.location.href).searchParams.get("id")
            console.log(productId);
            const res = await fetch("http://localhost:3000/api/products/" + productId)
            const products = await res.json()

            console.log(products);


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
    printColors : function(products){
        for (var i = 0; i < products.colors.length; i++) { 
            const coloContainer = document.getElementById("colors")
            const coloOption = document.createElement("option")
            coloOption.setAttribute("value", products.colors[i])
            coloOption.textContent = products.colors[i]
            coloContainer.appendChild(coloOption)

        }
    }
}


const cartButton = document.getElementById("addToCart")

cartButton.onclick = function() {


    
    const quantityInput = document.getElementById("quantity").value
    const coloSelector = document.getElementById("colors").value
    let cart = {
        id : productId,
        quantity : quantityInput,
        colors : coloSelector
    }
    var cartString = JSON.parse(localStorage.getItem("items")) || [];


    let itemFind = cartString.find(cart => cart.id === productId);

    if(coloSelector == 0){
        alert("veuillez sélectioner une couleur")
    }else if(quantityInput == 0){
        alert("veuillez sélectioner une quantité")
    }else if(!itemFind){
        cartString.push(cart);
    }else{
        itemFind.quantity += quantityInput
        cartString.splice(cartString.indexOf(itemFind), 1, itemFind); 
    }
    localStorage.setItem("items", JSON.stringify(cartString));
    
    console.log(cart)
}

document.addEventListener("DOMContentLoaded", productPage.init);