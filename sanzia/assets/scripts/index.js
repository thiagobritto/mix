import produtos from '/database/db_produtos.js';
import { str, dateFormat } from '/assets/scripts/utils.js';

window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

const cart = {
    data: {},
    open: false,
    payment: 0,
    setData(key, dataset) {
        this.data[key] = dataset;
    },
    getData(key) {
        return this.data[key];
    },
    getDataChekout() {
        let itens = [];
        for (let x in this.data)
            if (this.data[x]) itens.push(this.data[x]);
        return itens.length > 0 ? itens : null;
    },
    total() {
        let val = 0;
        for (let x in this.data)
            if (this.data[x]) val += (this.data[x].price * this.data[x].amount);
        return val;
    },
    size() {
        let cont = 0;
        for (let x in this.data)
            if (this.data[x]) cont++;
        return cont;
    }
};


(root => {

    let id = 0;
    for (let title in produtos) {
        const section = document.createElement("section");
        section.setAttribute("class", "card-container");

        const sectionTitle = document.createElement("h2");
        sectionTitle.setAttribute("class", "title-container title-font");
        sectionTitle.innerText = str.capitalize(title);
        section.append(sectionTitle);

        for (let dataCard of produtos[title]) {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.setAttribute('data-cart-id', id);
            card.addEventListener('click', event => {
                const idx = card.getAttribute('data-cart-id');
                if (!cart.getData(idx)) {
                    dataCard.amount = 1;
                    dataCard.cleanCard = () => {
                        card.classList.remove('card-selected');
                    };
                    cart.setData(idx, dataCard);
                    card.classList.add('card-selected');
                } else {
                    dataCard.amount = 0;
                    cart.setData(idx, undefined);
                    card.classList.remove('card-selected');
                }
                updateCartIndecator();
                updateCartCheckout();
            });

            const label = document.createElement('div');
            label.setAttribute('class', 'card-label');
            card.append(label);

            const header = document.createElement('div');
            header.setAttribute('class', 'card-header');
            label.append(header);

            const cardTitle = document.createElement('h3');
            cardTitle.setAttribute('class', 'card-title title-font');
            cardTitle.innerText = dataCard.title;
            header.append(cardTitle);

            const cardPrice = document.createElement('h3');
            cardPrice.setAttribute('class', 'card-title title-font');
            cardPrice.innerText = "R$ ";
            header.append(cardPrice);

            const price = document.createElement('span');
            price.setAttribute('class', 'title-font');
            price.setAttribute("data-price", dataCard.price);
            price.innerText = dataCard.price.replace(".", ",");
            cardPrice.append(price);


            const paragrafo = document.createElement('p');
            paragrafo.innerText = dataCard.desc;
            label.append(paragrafo);

            const img = document.createElement('div');
            img.setAttribute('class', 'card-image');
            card.append(img);

            const image = document.createElement('img');
            image.src = dataCard.img;
            img.append(image);

            section.append(card);
            id++;
        }

        root.append(section);
    }

    const btnCart = document.querySelector('.open-cart');
    const btnClosed = document.querySelector('.closed');
    const cartModal = document.querySelector('.cart-modal');
    const modalNome = document.querySelector(".modal-nome");

    btnCart.addEventListener('click', event => {
        if (cart.open)
            cartModal.classList.add('cart-modal-show');
    });

    btnClosed.addEventListener('click', closeCart);
    function closeCart() {
        cartModal.classList.remove('cart-modal-show');
        modalNome.classList.remove("modal-nome-show");
    }

    const interator = document.querySelector('.cart .interator');

    function updateCartIndecator() {
        interator.innerText = cart.size();
        if (cart.size() <= 0) {
            cart.open = false;
        } else {
            cart.open = true;
        }
    }

    function updateCartCheckout() {
        const products = cart.data;

        const table = document.querySelector('.tabble-cart');
        table.innerHTML = '';

        const tbody = document.createElement('tbody');
        cart.open = false;

        for (let key in products) {
            if (!products[key]) continue;

            cart.open = true;

            const price = products[key].amount *
                Number.parseFloat(products[key].price);

            const tr = document.createElement('tr');

            const tdTitle = document.createElement('td');
            tdTitle.innerText = products[key].title;
            tr.append(tdTitle);

            const tdBtnRemove = document.createElement('td');
            tdBtnRemove.innerText = " - ";
            tdBtnRemove.setAttribute("class", "cell-buttons right");
            tdBtnRemove.addEventListener('click', event => {
                cart.getData(key).amount--;
                if (cart.getData(key).amount <= 0) {
                    cart.getData(key).cleanCard();
                    cart.setData(key, undefined);
                }
                updateCartCheckout();
                updateCartIndecator();
            });
            tr.append(tdBtnRemove);

            const tdAmont = document.createElement('td');
            tdAmont.innerText = products[key].amount;
            tdAmont.setAttribute("class", "center");
            tr.append(tdAmont);

            const tdBtnAdd = document.createElement('td');
            tdBtnAdd.innerText = " + ";
            tdBtnAdd.setAttribute("class", "cell-buttons");
            tdBtnAdd.addEventListener('click', event => {
                cart.getData(key).amount++
                updateCartCheckout();
                updateCartIndecator()
            });
            tr.append(tdBtnAdd);

            const tdPrice = document.createElement('td');
            tdPrice.setAttribute("class", "cell-price right");
            tdPrice.innerText = "R$ " + price.toFixed(2).replace(".", ",");
            tr.append(tdPrice);

            tbody.append(tr);
        }

        table.append(tbody);

        const total = document.getElementById('total');
        total.innerText = "R$ " + cart.total().toFixed(2).replace(".", ",");

        if (!cart.open) closeCart();
    }

    const payment = document.getElementsByClassName("payment-method");

    for (let btnPay of payment) {
        btnPay.addEventListener('click', element => {
            cleanPayment(payment)
            btnPay.classList.add("payment-target");
            cart.payment = btnPay.getAttribute("data-method");
        });
    }

    function cleanPayment(payment) {
        for (let btnPay of payment)
            btnPay.classList.remove("payment-target");
    }

    function alertUser(msg) {
        const msgAlert = document.getElementsByClassName("msg-alert");
        for (let clsList of msgAlert)
            clsList.innerText = msg;
        setTimeout(() => {
            for (let clsList of msgAlert)
                clsList.innerText = '';
          }, "5000");
    }
    
    function getNome() {
        modalNome.classList.add("modal-nome-show");
        return new Promise((resove) => {

            const btnClose = document.getElementById("modal-nome-close");
            btnClose.addEventListener('click', event => {
                modalNome.classList.remove("modal-nome-show");
            });

            const inputName = document.getElementById("name");
            inputName.onkeydown = (e) => {
                if(e.key == "Enter") send();
            }
            const btnSend = document.getElementById("modal-nome-send");
            btnSend.addEventListener('click', send);
            function send(event) {
                if (inputName.value.length > 1) {
                    resove(inputName.value);
                } else {
                    alertUser("Informe um nome valido");
                }
            }
        });
    }

    const payments = ["Dinheiro", "Pix", "Cartão"];
    const btnCheckout = document.getElementById("btn-checkout");
    btnCheckout.addEventListener('click', checkout);
    async function checkout(event) {

        const nome = await getNome();
        if(!nome) return false;

        const end = document.getElementById("txt-endereco").value;
        const obs = document.getElementById("txt-observacoes").value;
        const pay = payments[cart.payment];
        const itens = cart.getDataChekout();

        let msg = `*PEDIDO* - ${str.capitalize(nome)}\n`;
        msg += `---------------------------------------------------------------\n\n`;

        itens.forEach((item) => {
            msg += `- ${item.amount} ${item.title}\n`;
        });

        msg += `\n---------------------------------------------------------------`;
        msg += `\nPAGAMENTO: *${pay}*\n`;
        msg += `---------------------------------------------------------------\n`;
        msg += `\n_OBSERVAÇÕES_\n${obs}\n`;
        msg += `\n_ENDEREÇO_\n${end}\n`;
        msg += `\n ${dateFormat.date()}`;

        const text = window.encodeURIComponent(msg);

        if (mobileCheck()) {
            window.open('https://api.whatsapp.com/send?phone=558499905176&text=' + text);
            closeCart();
        } else {
            window.open('https://web.whatsapp.com/send?phone=558499905176&text=' + text);
            closeCart()
        }
    }

})(document.getElementById('app'));