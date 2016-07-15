class Messages {
    constructor() {
        document.getElementsByTagName("body")[0].innerHTML += "<div id=\"messages\"></div>";
    }

    set(message) {
        document.getElementById("messages").innerHTML = message;
    }
}
