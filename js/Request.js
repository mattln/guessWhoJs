class Request {
    constructor() {
        this.xmlhttp = new XMLHttpRequest();
    }

    get(url, callback) {
      let xmlhttp = this.xmlhttp;

        xmlhttp.open('GET', url, true);
        xmlhttp.onload = function() {
            if (xmlhttp.status === 200) {
              callback(xmlhttp.responseText);
            }
        };
        xmlhttp.send(null);
    }
}
