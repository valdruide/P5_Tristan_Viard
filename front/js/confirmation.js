


let storageParsed = JSON.parse(localStorage.getItem("contact"))
let storageParsed2 = JSON.parse(localStorage.getItem("items"))
console.log(storageParsed);
document.addEventListener("DOMContentLoaded", orderID());



async function orderID(){
    const urlOrderId = new URL(window.location.href).searchParams.get("order") 
    const orderID = document.getElementById("orderId")
    const orderContainer = document.getElementById("limitedWidthBlock")

    orderID.innerText = urlOrderId;

    
    const titre = document.createElement("h2")
    titre.innerText = "Infos de livraison:"
    orderContainer.appendChild(titre)

    const div = document.createElement("div")
    const prenom = document.createElement("p")
    const nom = document.createElement("p")
    const adress = document.createElement("p")
    const city = document.createElement("p")
    const mail = document.createElement("p")

    
    div.appendChild(prenom)
    div.appendChild(nom)
    div.appendChild(adress)
    div.appendChild(city)
    div.appendChild(mail)
    orderContainer.appendChild(div)

    div.style.textAlign = 'center'
    div.style.backgroundColor = 'white'
    div.style.color = 'black'
    div.style.padding = '20px'
    div.style.borderRadius = '25px'
    div.style.marginBottom = '100px'
    div.style.maxWidth = "500px"
    div.style.margin = "0 auto 100px auto"

    for (let element of storageParsed){
        prenom.innerText = "Prénom: " + element.firstName
        nom.innerText = "Nom: " + element.lastName
        adress.innerText = "Adresse: " + element.address
        city.innerText = "Ville: " + element.city
        mail.innerText = "Email: " + element.email
    }

    const titre2 = document.createElement("h2")
    titre2.innerText = "Votre commande:"
    const div2 = document.createElement("div")
    div2.appendChild(titre2)
    div2.style.display = "flex"
    div2.style.justifyContent = "space-evenly"
    div2.style.marginBottom = "100px"
    
    orderContainer.appendChild(titre2)
    orderContainer.appendChild(div2)
    

    const res = await fetch("http://localhost:3000/api/products/")
    const products =  await res.json()

    for(let element of storageParsed2){
        const img = document.createElement("img")
        div2.appendChild(img)
        img.style.width = "30%"
        img.style.borderRadius = "25px"
        for (product of products){
            for (let i = 0; i < storageParsed2.length; i++){
                if(element.id == product._id){
                    img.setAttribute("src", product.imageUrl)
                }
            }
        }
    }

    


}