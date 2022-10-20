// funcao para utilizar o querySelector sem precisar declarar toda sintaxe
const c = el => document.querySelector(el); //retorna um único item
// funcao para utilizar o selectorAll sem declarar toda sintaxe 
const cs = el => document.querySelectorAll(el); // retorna um array 

// armazena a quantidade de pizza
let modalQt = 1;
//Carrinho
let cart = [];
//Guarda a key da pizza
let modalKey = 0;


// listando as pizzas
pizzaJson.map((item, index)=>{
    // capturando o pizza-item e renderizando várias vezes 
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    
    // preenchendo as informações em pizzaitem
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    // evento de click para abrir o modal 
    pizzaItem.querySelector('a').addEventListener('click', (el)=> {
        // Remove a ação default(atualizar a tela no click) da tag a
        el.preventDefault();

        // capturando o atributo data-key que foi setado no pizza-item atráves do index
        let key = el.target.closest('.pizza-item').getAttribute('data-key');
        // sempre ao abrir o modal a quantidade estará em 1
        modalQt = 1;
        modalKey = key;

        // preenchendo as informações da pizza selecionada no modal aberto
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
       
        //Removendo seleção de qualquer item
        c('.pizzaInfo--size.selected').classList.remove('selected');

        //Capturando o tamanho das pizza e atribuindo o valor de cada um
        cs('.pizzaInfo--size').forEach( (size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        c('.pizzaInfo--qt').innerHTML = modalQt;

        // animacao ao abrir o modal
        c('.pizzaWindowArea').style.opacity = 0;
        // abre o modal ao receber o click
        c('.pizzaWindowArea').style.display = 'flex';

        // animacao ao abrir o modal
        setTimeout(()=> {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 150);
    });

    // inserindo pizza item como ultimo filho na div pizza area
    c('.pizza-area').append( pizzaItem );
});

// Eventos do modal 
function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=> {
        c('.pizzaWindowArea').style.display = 'none';
    }, 600);
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach(item =>{
    item.addEventListener('click', closeModal);
});

// Diminui a quantidade
c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
    
});

// aumenta a quantidade
c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

cs('.pizzaInfo--size').forEach((size, sizeIndex)=> {
    size.addEventListener('click', (el)=> {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

c('.pizzaInfo--addButton').addEventListener('click', ()=> {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id+'@'+size;

    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1){
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size: size,
            qt: modalQt
        });
    }


    

    closeModal();
});