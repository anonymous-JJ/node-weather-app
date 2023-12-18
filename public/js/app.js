console.log("Clientside js is loaded.")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Fetching forecast...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log('unable to find the location! Try with another name.')
            messageTwo.textContent = ''
            messageOne.textContent= data.error
            messageThree.textContent = ''
        }
        else{
            messageOne.textContent = ''
            messageTwo.textContent = 'Location: '+data.address
            messageThree.textContent = 'Forecast: '+data.forecast
        }
    })
})
})