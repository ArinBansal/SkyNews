const API_KEY = "35f8130be4a94bebba9929cbfb16116d";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => { fetchNew("India")});

async function fetchNew (query){
 const res = await fetch(`${url}${query}&apiKey=${API_KEY}`); // data is in string
 const data = await res.json(); // data converted to javascript objects
 bindData(data.articles);
}
function bindData(articles){
    const cardContainer = document.getElementById("cards-container");
    const newscardtemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = '';
    // humne khali isliye kiya taki hamara data upr se aaye 

    articles.forEach(element => {
        
        if(!element.urlToImage) return;

        const cardClone = newscardtemplate.content.cloneNode(true);
        
        fileData(cardClone, element);
        
        cardContainer.appendChild(cardClone);
    });

}

function fileData(cardClone, element)
{
    // debugger
    // console.log(element.urlToImage);
    const newImg = cardClone.querySelector('#news-Img');
    const newTitle = cardClone.querySelector('#news-title');
    const newSource = cardClone.querySelector('#news-source');
    const newDesc = cardClone.querySelector('#news-desc');


    newImg.src = element.urlToImage;
    newTitle.innerHTML = element.title;
    newDesc.innerHTML = element.description;

    const date = new Date(element.publishedAt).toLocaleString("eg-US",{ timeZone: "Asia/Jakarta"});

    newSource.innerHTML = `${element.source.name} * ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
            window.open(element.url, "_blank");
    });
}

function onNavclick(id)
{
    fetchNew(id);
    // const item = document.getElementById(id);
    // item.classList.toggle('active');
    // HUM TOGGLE IS LIYE NHI  KR RHE HAI KYOKI AGR TOGGLE KRENGE TOH ACTIVE CLASS USME HI REHGI

}

const searchbtn = document.getElementById('search-btn');
searchbtn.addEventListener('click', () => {
          
    const input = document.getElementById("inputId").value;
   if(!input) return;
   fetchNew(input);
});