const UNSPLASH_URL = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
const QUOTES_URL = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info'
const WEATHER_URL = 'https://apis.scrimba.com/openweathermap/data/2.5/weather'
const AI_NEWS_URL = 'https://ai-news-api.p.rapidapi.com/news'

const  QUOTES_OPTIONS = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'b170c8ab49msh969fb2179527b1bp114307jsne5054f81d909',
        'x-rapidapi-host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
    }
}

const AI_NEWS_OPTIONS = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b170c8ab49msh969fb2179527b1bp114307jsne5054f81d909',
        'X-RapidAPI-Host': 'ai-news-api.p.rapidapi.com'
    }
}

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

setInterval(getCurrentTime, 1000)

async function setBackgroundImage() {
    try {
        const res = await fetch(UNSPLASH_URL)
        const data = await res.json()
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById("img-author").innerHTML = `<a href="${data.user.portfolio_url}">Photo by <u>${data.user.name}</u> on <u>Unsplash</u></a>`
    } catch (error) {
        console.log(error)
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
    )`
        document.getElementById("img-author").innerHTML = `<a href="https://unsplash.com/@dodiachmad">Photo by <u>Dodi Achmad</u> on <u>Unsplash</u></a>`
    }
}

await setBackgroundImage()

async function getQuote() {
    try {
        const response = await fetch(QUOTES_URL, QUOTES_OPTIONS)
        const data = await response.json()
        console.log(data)
        document.getElementById("quote").textContent = data.text
        document.getElementById("quote-author").textContent = data.author
    } catch (error) {
        console.error(error)
        document.getElementById("quote").textContent = 'You can do hard things!'
        document.getElementById("quote-author").textContent = 'Glennon Doyle'
    }
}

await getQuote()

navigator.geolocation.getCurrentPosition(async position => {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        if (!res.ok) {
            throw error("Weather data not available")
        }
        const data = await res.json()
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `
    } catch (error) {
        console.log(error)
        document.getElementById("weather").textContent = 'Weather data not available'
    }
})

async function getAiNews() {
    try {
        const response = await fetch(AI_NEWS_URL, AI_NEWS_OPTIONS)
        const data = await response.json()
    
        let currentIndex = 0
    
        function getLatestAiNews() {
            const newsItem = data[currentIndex]
            document.getElementById("ai-news").innerHTML = `
                <a href="${newsItem.url}">${newsItem.title}</a>
                <p>Source: ${newsItem.source}</p>
            `
            currentIndex = (currentIndex + 1) % data.length
        }
    
        getLatestAiNews()
        setInterval(getLatestAiNews, 10000)
    
    } catch (error) {
        console.error(error)
    }
}

await getAiNews()

function toggleTodoList() {
    const todoListCon = document.getElementById("todo-list-con");
    todoListCon.style.display = todoListCon.style.display === "none" ? "flex" : "none";
}

document.getElementById("todo-toggle").addEventListener("click", toggleTodoList)

let todoList = []

const todoInput = document.getElementById('todo-input')
const todoListCon = document.getElementById('todo-list')
const clearTodoList = document.getElementById('clear-todo-list')

todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        addToTodoList()
    }
})

clearTodoList.addEventListener("click", () => {
    todoList = []
    updateLocStorage()
    todoListCon.textContent = ''
})

function getTodoListHtml(todoItem) {
    return `
    <li  class="checkbox-wrapper-13">
        <input type="checkbox">${todoItem}
    </li>
    `
}
function renderTodoList() {
    let html = todoList.map(getTodoListHtml).join('')
    todoListCon.innerHTML = html
}

function addToTodoList() {
    if (todoInput.value.length != 0) {
        todoList.push(todoInput.value)
        todoInput.value = ''
        renderTodoList()
        updateLocStorage()
    }
}

function updateLocStorage() {
    localStorage.setItem("todolist", JSON.stringify(todoList))
}

function checkForStoredTodoList() {
    const storedTodoList = localStorage.getItem("todolist")
    if (storedTodoList) {
        todoList = JSON.parse(storedTodoList) || []
    }
    renderTodoList()
}
checkForStoredTodoList()