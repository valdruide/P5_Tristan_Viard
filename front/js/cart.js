

let storageParsed = JSON.parse(localStorage.getItem("items"))

const reducer = (accumulator, currentValue) => accumulator + currentValue;
function totalPrice(){
    let priceArray = []
    const asyncForPrice = storageParsed.map(async(element) => {
        const productID = element.id
        const apiPrice = await fetch("http://localhost:3000/api/products/" + productID).then(res => res.json())
        const productPrice = apiPrice.price
        const pricePerKanap = productPrice * element.quantity
        priceArray.push(pricePerKanap)
        const totalPriceNumber = await priceArray.reduce(reducer, 0)
        const totalPriceTxt = document.getElementById("totalPrice")
        totalPriceTxt.innerText = totalPriceNumber
    })
}
function totalQtty(){
    let qttyArray = []
    const totalQttyInput = document.querySelectorAll('itemQuantity')
    for(element of storageParsed){
        const eachQttyOfStorage = parseInt(element.quantity)
        qttyArray.push(eachQttyOfStorage)
    }
    const totalQttyCalc = qttyArray.reduce(reducer, 0)
    const totalQttyTxt = document.getElementById("totalQuantity")
    totalQttyTxt.innerText = totalQttyCalc
}




console.log(storageParsed)

const cartPage = {
    init : function(){
        cartPage.showList()
        totalPrice()
        totalQtty()
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
            cartItemContentSettingsQuantity.setAttribute("productid", element.id)
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
            deleteButon.setAttribute("productid", element.id)
            deleteButon.innerText = "Supprimer"
            deleteButonContainer.appendChild(deleteButon)
        }
        const deleteButon = document.querySelectorAll('.deleteItem')
        for (i = 0; i < deleteButon.length; i++) {
            let getID = deleteButon[i].getAttribute("productid")
            deleteButon[i].addEventListener('click', function() {
                console.log("le bouton suppr marche")
                console.log(getID)
                let index = storageParsed.findIndex(x => x.id == getID);
                console.log(index)

                storageParsed.splice(index, 1);
                localStorage.setItem("items", JSON.stringify(storageParsed));
                location.reload(); //penser à rappeler le localstorage plutot que de recharger la page
                totalPrice()
                totalQtty()
            })
          }
          const qttyInput = document.querySelectorAll('.itemQuantity')
          for(let i = 0; i < qttyInput.length; i++){
              qttyInput[i].addEventListener('change', function() {
                let getInput = Number(qttyInput[i].value)
                const r1 = qttyInput[i].closest('.cart__item__content__settings__quantity')
                let getID = r1.getAttribute("productid")

                for(const element of storageParsed){
                    if(element.id == getID){
                        let numberQttyInput = getInput
                        element.quantity = numberQttyInput
                        localStorage.setItem("items", JSON.stringify(storageParsed));
                        totalPrice()
                        totalQtty()
                    }
                }
            })
          }
          

          }
          
    
}

document.addEventListener("DOMContentLoaded", cartPage.init);