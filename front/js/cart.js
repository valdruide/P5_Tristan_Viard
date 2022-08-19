

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


const inputName = document.getElementById("firstName")
const inputLastName = document.getElementById("lastName")
const inputAdress = document.getElementById("address")
const inputCity = document.getElementById("city")
const inputMail = document.getElementById("email")
const ButtonSubmit = document.getElementById("order")

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
const addressErrorMsg = document.getElementById("addressErrorMsg")
const cityErrorMsg = document.getElementById("cityErrorMsg")
const emailErrorMsg = document.getElementById("emailErrorMsg")

inputName.setAttribute("pattern", "[A-Za-z]{1,32}")
inputLastName.setAttribute("pattern", "[A-Za-z]{1,32}")
inputAdress.setAttribute("pattern", '[A-Za-z0-9\\s]{1,50}')
inputCity.setAttribute("pattern", '[A-Za-z]{1,32}')
inputMail.setAttribute("pattern", '^\\w.+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')

inputName.addEventListener("input", function() {
    if(inputName.validity.valid){
        firstNameErrorMsg.innerText = ""
    } else {
        firstNameErrorMsg.innerText = "Vous avez entré des caractères invalides. Veuillez n'entrer que des lettres"
    }
})

inputLastName.addEventListener("input", function() {
    if(inputLastName.validity.valid){
        lastNameErrorMsg.innerText = ""
    } else {
        lastNameErrorMsg.innerText = "Vous avez entré des caractères invalides. Veuillez n'entrer que des lettres"
    }
})

inputAdress.addEventListener("input", function() {
    if(inputAdress.validity.valid){
        addressErrorMsg.innerText = ""
    } else {
        addressErrorMsg.innerText = "Vous avez entré des caractères invalides. Veuillez n'entrer que des lettres et des chiffres"
    }
})

inputCity.addEventListener("input", function() {
    if(inputCity.validity.valid){
        cityErrorMsg.innerText = ""
    } else {
        cityErrorMsg.innerText = "Vous avez entré des caractères invalides. Veuillez n'entrer que des lettres"
    }
})

inputMail.addEventListener("change", function() {
    if(inputMail.validity.valid){
        emailErrorMsg.innerText = ""
        console.log('valid');
    } else {
        emailErrorMsg.innerText = "Adresse email invalide. Veuillez vérifier votre email"
        console.log('error');
    }
})


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
                location.reload();
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