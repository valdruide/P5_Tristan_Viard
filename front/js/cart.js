

let storageParsed = JSON.parse(localStorage.getItem("items"))



console.log(storageParsed)

const cartPage = {
    init : function(){
        cartPage.showList()
    },
    showList : async function() {

        const res = await fetch("http://localhost:3000/api/products/")
        const products =  await res.json()
        const cartSection = document.getElementById("cart__items")

        for(let element of storageParsed){

            const article = document.createElement("article")
            article.classList.add("cart__item")
            article.setAttribute("data-id", element.id)
            article.setAttribute("data-color", element.colors)
            cartSection.appendChild(article)

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
            const coloTxt = document.createElement("p")
            coloTxt.innerText = "Couleur: "+ element.colors
            const priceTxt = document.createElement("p")
            cartItemContentDesc.appendChild(title)
            cartItemContentDesc.appendChild(coloTxt)
            cartItemContentDesc.appendChild(priceTxt)
            for (product of products){
                for (let i = 0; i < storageParsed.length; i++){
                    if(element.id == product._id){
                        imgItem.setAttribute("src", product.imageUrl)
                        title.innerText = product.name
                        priceTxt.innerText = Number(product.price) + "€"
                    }
                }
            }
            
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
            inputQtty.value = element.quantity
            inputQtty.classList.add("itemQuantity")
            inputQtty.setAttribute("type", "number")
            inputQtty.setAttribute("min", "1")
            inputQtty.setAttribute("max", "100")
            inputQtty.setAttribute("value", element.quantity)
            cartItemContentSettingsQuantity.appendChild(inputQtty)

            const deleteButonContainer = document.createElement("div")
            deleteButonContainer.classList.add("cart__item__content__settings__delete")
            cartItemContentSettings.appendChild(deleteButonContainer)

            const deleteButon = document.createElement("p")
            deleteButon.classList.add("deleteItem")
            deleteButon.setAttribute("id", "deleteButon")
            deleteButon.innerText = "Supprimer"
            deleteButonContainer.appendChild(deleteButon)
        }
        const deleteButon = document.querySelectorAll('.deleteItem')
        for (i = 0; i < deleteButon.length; i++) {
            deleteButon[i].addEventListener('click', function() {
                console.log("le bouton suppr marche")
                
                let index = storageParsed.findIndex(id => storageParsed.id == id);
                
                storageParsed.splice(index, 1);
                localStorage.setItem("items", JSON.stringify(storageParsed));
                location.reload();
            })
          }
    
    }
}

document.addEventListener("DOMContentLoaded", cartPage.init);