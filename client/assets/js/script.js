let chat_container = document.querySelector("#chat_container")
let form = document.querySelector("form")

// to generate a rondom id for ai message
let generateId = () => {
    return Date.now()
}

// to display a user or ai message
let displayMessage = (fromAI , value  , id) =>{
    return `
    <div class="wrapper ${fromAI && 'ai'}">
        <div class="chat">
            <div class="profile">
                <img 
                src=${fromAI ? './assets/img/robot.svg' : './assets/img/user.png'}
                alt="${fromAI ? 'bot' : 'user'}" 
                />
            </div>
            <div class="message" id=${id}>${value}</div>
        </div>
    </div>
    
    `
}

// to show that a response is loading 
let messageLoaging = (element) => {
    element.textContent = ''
    loadInterval = setInterval(()=> {
        if(element.textContent.length == 4) element.textContent = ''
        element.textContent += '.'
    } , 300)
}


// write the result 
let writeResult = (value , element) => {
    let index = 0 
    element.innerHTML = ""
    writeInteral = setInterval(() => {
        if(value.length >= index){
            element.textContent += value.charAt(index)
            index+= 1
        }
    } , 20)
}


// handle submit event to desplay messages 
form.onsubmit = async (e) => {
    e.preventDefault()
    let data = new FormData(form)
    chat_container.innerHTML += displayMessage(false , data.get('prompt'))
    chat_container.scrollTop = chat_container.scrollHeight;
    id = generateId()
    chat_container.innerHTML += displayMessage(true , '' , id)
    chat_container.scrollTop = chat_container.scrollHeight;
    elt = document.getElementById(id)
    messageLoaging(elt)
   
    axios.post('http://localhost:5000' , {prompt : data.get('prompt')})
    .then(res => {
        clearInterval(loadInterval)
        writeResult(res.data.slice(2) , elt)
        chat_container.scrollTop = chat_container.scrollHeight;
    })
    .catch(err => {
        clearInterval(loadInterval)
        elt.textContent = `Somthing wrong \n ${err.message}`
        console.log(err)
    })
    
    form.reset()


}