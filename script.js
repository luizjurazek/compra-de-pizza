// funcao para utilizar o querySelector sem precisar declarar toda sintaxe
const c = el => document.querySelector(el); //retorna um único item
// funcao para utilizar o selectorAll sem declarar toda sintaxe 
const cs = el => document.querySelectorAll(el); // retorna um array 



pizzaJson.map((item, index)=>{
    // capturando o pizza-item e renderizando várias vezes 
    let pizzaItem = c('.models .pizza-item').cloneNode(true);
    
    // preenchendo as informações em pizzaitem
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    // Capturando a tag a 
    pizzaItem.querySelector('a').addEventListener('click', (el)=> {
        // Remove a ação default(atualizar a tela no click) da tag a
        el.preventDefault();

        // capturando o atributo data-key que foi setado no pizza-item atráves do index
        let key = el.target.closest('.pizza-item').getAttribute('data-key');
        console.log(pizzaJson[key]);

        // preenchendo as informações da pizza selecionada no modal aberto
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

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