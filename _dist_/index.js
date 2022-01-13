/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = 'https://platzi-avo.vercel.app'

const appNode = document.querySelector('#app')

//Intl
// 1- Formato a fechas
// 2- Formato monedas

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN',{
        style: 'currency',
        currency: 'USD'
    }).format(price)

    return newPrice
}


// web api
//Conectarnos al servidor
window.fetch(`${baseUrl}/api/avo`)
    // procesar la respuesta, y convertirla en JSON
    .then(response => response.json())
// JSON -> Data -> Renderizar info browser
    .then(responseJSON => {
        const todosLosItems = []

        responseJSON.data.forEach(item => {
            //crear imagen
            const imagen = document.createElement('img')
            imagen.src = baseUrl + item.image
            imagen.className = 'h-16 2-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6'

            //crear titulo
            const title = document.createElement('h2')
            title.textContent = item.name
            //title.style.fontSize = '3rem'
            title.className = 'text-lg'
            
            //crear precio
            const price = document.createElement('div')
            price.textContent = formatPrice(item.price)
            price.className = 'text-gray-600'

            //Wrap price & title
            const priceAndTitle = document.createElement('div')
            priceAndTitle.className = 'text-center md:text-left'
            priceAndTitle.append(title, price)

            const card = document.createElement('div')
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300"
            card.append(imagen, priceAndTitle)

            todosLosItems.push(card)
        });

        appNode.append(...todosLosItems)
    })
