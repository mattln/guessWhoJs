class Request {
    get(url, callback) {
      this.xmlhttp = new XMLHttpRequest();

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


//callback funzione da eseguiguire quando hai finito
