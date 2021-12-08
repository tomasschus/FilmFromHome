
function enterKey(e) {
    if (e.keyCode == 13) {
        send()
    }
}

if (flvjs.isSupported()) {
    var videoElement = document.getElementById('videoElement');
    var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'http://tomasschuster.servehttp.com:5501/live/STREAM_NAME.flv',
    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
} else {
    alert("Su navegador no soporta este tipo de contenido.")
}

var nombre;
function setNombre() {
    var nombreInput = document.getElementById("nombreInput");
    if (nombre != "") {
        nombre = nombreInput.value;
        nombreInput.disabled = true;
    }
}

var socket = io();

function send() {   // cuando aprieto ENVIAR
    var texto = document.getElementById("chatArea")
    if (nombre != "" && nombre != undefined && nombre != null) {
        if (texto.value != "" && texto.value != '\n') {
            socket.emit('chat-message', { "nombre": nombre, "mensaje": texto.value });
            texto.value = null;
        }
    } else { alert("Necesitas guardar tu nombre antes de enviar un mensaje al chat") }
}

socket.on('new-message', function (data) {
    var chatHistory = document.getElementById("chatHistory");
    chatHistory.innerHTML = `<p> ${data.msg.nombre}: ${data.msg.mensaje} </p>` + chatHistory.innerHTML;
})

socket.on('usersConnected', function (data) {
    var usersConnected = document.getElementById("usersConnected");
    usersConnected.innerText = `Hay ${data} personas viendo esta transmisión`;
    var usersConnected = document.getElementById("usersConnected2");
    usersConnected.innerText = `Hay ${data} personas viendo esta transmisión`;
})


let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;
console.log("getting weather")
lon = -58.448205
lat = -34.634739

// API ID
const api = "6d055e39ee237af35ca066f35474e9df";

// API URL
const base = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
    `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;

// Calling the API
fetch(base)
    .then((response) => { return response.json(); })
    .then((data) => {
        console.log(data);
        temperature.textContent =
            Math.floor(data.main.temp - kelvin) + "°C";
        summary.textContent = data.weather[0].description;
        loc.textContent = data.name + "," + data.sys.country;
        let icon1 = data.weather[0].icon;
        icon.innerHTML =
            `<img src="https://cdn-icons-png.flaticon.com/512/169/169367.png" style= 'height:30px;'/>`;
    });


var videoElement = document.getElementById('videoElement');
videoElement.play();

function mutear(){
    videoElement.muted = !videoElement.muted;
}

function fullscreen(){
    videoElement.requestFullscreen()
}

function PIP(){
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
    } else {
      if (document.pictureInPictureEnabled) {
        videoElement.requestPictureInPicture();
      }
    }
}

