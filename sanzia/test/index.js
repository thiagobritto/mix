function getMessageEncoding() {
    const messageBox = document.getElementById("entrada");
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
}

function getQueryRequest() {
    let query = location.search.slice(1);
    if (!query) return null;

    let partes = query.split('&');
    let params = {};

    partes.forEach(param => {
        let [key, value] = param.split('=');
        params[key] = value;
    })

    return params;
}

let pedido = "2,Basico,8#3,duplos,8.2";

//console.log(atob(getQueryRequest().pedido));

const btnSend = document.getElementById("enviar");
btnSend.addEventListener('click', send);

function send(event) {
    //window.open(`http://127.0.0.1:5500/test/index.html?pedido=${btoa(pedido)}`); 
}

function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function bytesToBase64(bytes) {
    const binString = Array.from(bytes, (byte) =>
        String.fromCodePoint(byte),
    ).join("");
    return btoa(binString);
}

function parseBase64(strUnicode){
    return bytesToBase64(new TextEncoder().encode(strUnicode));    
}

function parseString64(base){
    return new TextDecoder().decode(base64ToBytes(base));
}

// Usage
bytesToBase64(new TextEncoder().encode("a Ā 𐀀 文 🦄")); // "YSDEgCDwkICAIOaWhyDwn6aE"
new TextDecoder().decode(base64ToBytes("YSDEgCDwkICAIOaWhyDwn6aE")); // "a Ā 𐀀 文 🦄"

//  console.log(new TextEncoder().encode("a Ā 𐀀 文 🦄"));






var typedArray = JSON.stringify({
    nome: "bufalo"
});

var blob = new Blob([typedArray], { type: "application/json" }); // passe um MIME-type útil aqui
var url = URL.createObjectURL(blob);

// url será algo do tipo: blob:d3958f5c-0777-0845-9dcf-2cb28783acaf
// agora você pode usar a URL em qualquer contexto em que URLs regulares podem ser usadas, por exemplo: img.src, etc.


console.log(url);

