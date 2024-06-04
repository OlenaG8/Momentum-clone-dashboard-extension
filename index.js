
try {
    const res = await fetch(`https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature`)
    const data = await res.json()
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("img-author").innerHTML = `<a href="${data.user.portfolio_url}">Photo by <u>${data.user.name}</u> on <u>Unsplash</u></a>`
} catch (err) {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
    document.getElementById("img-author").innerHTML = `<a href="https://unsplash.com/@dodiachmad">Photo by <u>Dodi Achmad</u> on <u>Unsplash</u></a>`
}

const url = 'https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote?token=ipworld.info';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'b170c8ab49msh969fb2179527b1bp114307jsne5054f81d909',
		'x-rapidapi-host': 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const data = await response.json();
    document.getElementById("quote").textContent = data.text
    document.getElementById("quote-author").textContent = data.author
} catch (error) {
	console.error(error);
    document.getElementById("quote").textContent = 'You can do hard things!'
    document.getElementById("quote-author").textContent = 'Glennon Doyle'
}

function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(async position => {
    try {
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        if (!res.ok) {
            throw Error("Weather data not available")
        }
        const data = await res.json()
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `
    } catch (err) {
        console.error(err)
    }
})

const AiNewsUrl = 'https://ai-news-api.p.rapidapi.com/news';
const AiNewsOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b170c8ab49msh969fb2179527b1bp114307jsne5054f81d909',
		'X-RapidAPI-Host': 'ai-news-api.p.rapidapi.com'
	}
}

try {
	const response = await fetch(AiNewsUrl, AiNewsOptions)
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

const todoToggle = document.getElementById("todo-toggle")

todoToggle.addEventListener("click", function() {
    const todoListCon = document.getElementById("todo-list")

    if (todoListCon.style.display === "none") {
        todoListCon.style.display = "flex";
    } else {
        todoListCon.style.display = "none";
    }
})

let todoList = []

const todoInput = document.getElementById('todo-input')
const todoText = todoInput.value.trim();

todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        renderTodoList()
    }
})

function getTodoListHtml(todoItem) {
    return `
    <li  class="checkbox-wrapper-13">
        <input type="checkbox">${todoItem}
    </li>
    `
}

function renderTodoList() {
    if (todoText !== '') {
        todoList.push(todoText)
        todoInput.value = '';
    }
}

function updateLocStorage() {
    localStorage.setItem("todolist", JSON.stringify(todoList))
}
