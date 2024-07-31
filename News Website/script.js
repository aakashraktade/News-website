const api_key = "3c41e2daddc44d309e624b1b5f9f6175";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchnews("India"));

function relode() {
    window.location.reload();
}

async function fetchnews(query) {
    const res = await fetch(`${url}${query}&apikey=${api_key}`);
    const data = await res.json();
    bindData(data.articles);
}
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplet = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplet.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZome: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
let curSelectednav = null;
function onNavItemClick(id) {
    fetchnews(id);
    const navItem = document.getElementById(id);
    curSelectednav?.classList.remove('active');
    curSelectednav = navItem;

    curSelectednav.classList.add('active');
}

const searchButton=document.getElementById("search-button");
const searchText= document.getElementById("search-text");

searchButton.addEventListener('click',() =>{
    const query=searchText.value;
    if(!query) return;
    fetchnews(query);
    curSelectednav?.classList.remove("active");
    curSelectednav=null;

});