
let cartString = localStorage.getItem("items");
let cartItems = JSON.parse(cartString);

console.log(cartItems)

const cartPage = {
    init : function(){
        cartPage.showList()
    },
    showList : async function() {

        let id = (new URL(window.location).searchParams.get("id"));
        const cartSection = document.getElementById("cart__items")

        for(let i in cartItems){

            
            const article = document.createElement("article")
            article.classList.add("cart__item")
            article.setAttribute("data-id", cartItems.id)
            article.setAttribute("data-color", cartItems.colors)
            cartSection.appendChild(article)

            console.log(article)

            const imgContainer = document.createElement("div")
            imgContainer.classList.add("cart__item__img")
            const imgItem = document.createElement("img")
            imgContainer.appendChild(imgItem)
            article.appendChild(imgContainer)

            const cartItemContent = document.createElement("div")
            cartItemContent.classList.add("cart__item__content")
            article.appendChild(cartItemContent)

            const cartItemContentDesc = document.createElement("div")
            cartItemContentDesc.classList.add("cart__item__content__description")
            cartItemContent.appendChild(cartItemContentDesc)

            const title = document.createElement("h2")
            title.innerText = "testTitle"
            const coloTxt = document.createElement("p")
            coloTxt.innerText = cartItems.colors
            const priceTxt = document.createElement("p")
            priceTxt.innerText = "testPrice"
            cartItemContentDesc.appendChild(title)
            cartItemContentDesc.appendChild(coloTxt)
            cartItemContentDesc.appendChild(priceTxt)

            const cartItemContentSettings = document.createElement("div")
            cartItemContentSettings.classList.add("cart__item__content__settings")
            cartItemContent.appendChild(cartItemContentSettings)

            const cartItemContentSettingsQuantity = document.createElement("div")
            cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity)

            const qttyTxt = document.createElement("p")
            qttyTxt.innerText = "Qté: "
            cartItemContentSettingsQuantity.appendChild(qttyTxt)

            const inputQtty = document.createElement("input")
            inputQtty.value = cartItems.quantity
            inputQtty.classList.add("itemQuantity")
            inputQtty.setAttribute("type", "number")
            inputQtty.setAttribute("min", "1")
            inputQtty.setAttribute("max", "100")
            inputQtty.setAttribute("value", cartItems.quantity)
            cartItemContentSettingsQuantity.appendChild(inputQtty)

            const deleteButonContainer = document.createElement("div")
            deleteButonContainer.classList.add("cart__item__content__settings__delete")
            cartItemContentSettings.appendChild(deleteButonContainer)

            const deleteButon = document.createElement("p")
            deleteButon.classList.add("deleteItem")
            deleteButon.innerText = "Supprimer"
            deleteButonContainer.appendChild(deleteButon)
        }
    
    }
}

document.addEventListener("DOMContentLoaded", cartPage.init);