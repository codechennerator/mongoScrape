$(document).ready(function(){
//==============================================================================================================================
    const saveArticle = (e) =>{
        console.log(e);
        // let thisId = e.target.dataset.id;
        let data = {
            title: e.target.dataset.title,
            link: e.target.dataset.link
        }
        $.ajax({
            method: "POST",
            url: "/saveArticle",
            data: data
          }).then(function(){
            window.location.href = "/savedArticles";
          });
        // fetch('/saveArticle', {
        //     method: 'POST', // or 'PUT'
        //     body: JSON.stringify(data), 
        //     headers: new Headers({
        //       'Content-Type': 'application/json'
        //     })
        //   }).then(res => res)
        //   .catch(error => console.error('Error:', error));
    }
//==============================================================================================================================
    const scrapeArticles = () =>{
        fetch('/scrapeArticles', {
            method: 'get'
        }).then((response) => {
            return response;
        }).then((data) =>{
            location.reload();
        }).catch((err) =>{
            if(err) throw err;
        });
    }

    document.getElementById('nav-scrape-button').addEventListener('click', scrapeArticles);
    document.getElementById('scrape-button').addEventListener('click', scrapeArticles);

//==============================================================================================================================
    const makeCards = (data) =>{
        let divCol = document.createElement('div');
        let divCard = document.createElement('div');
        let divCont = document.createElement('div');
        let spanTitle = document.createElement('span');
        let pContent = document.createElement('p')
        let divAction = document.createElement('div');
        let aGo = document.createElement('a');
        let aSave = document.createElement('a');

        divCol.classList.add('col', 's6', 'm12');
        divCard.classList.add('card', 'blue-grey');
        divCont.classList.add('card-content','white-text');
        spanTitle.classList.add('card-title');
        divAction.classList.add('card-action');
        aSave.classList.add('right', 'add-article');
        
        aGo.setAttribute('href', data.link);
        aGo.setAttribute('target', '_blank');
        
        aSave.addEventListener('click', saveArticle);
        aSave.setAttribute('data-id', data._id);
        aSave.setAttribute('data-title', data.title);
        aSave.setAttribute('data-link', data.link);

        spanTitle.innerHTML = data.title;
        aGo.innerHTML = 'Go to article';
        aSave.innerHTML = "Save Article";

        let newsBucket = document.getElementById('my_news_bucket');
        
        divAction.appendChild(aGo);
        divAction.appendChild(aSave);
        divCont.appendChild(spanTitle);
        divCont.appendChild(pContent);
        divCard.appendChild(divCont);
        divCard.appendChild(divAction);
        divCol.appendChild(divCard);
        newsBucket.appendChild(divCol);

    }

    fetch('/loadLastScraped', {
        method: 'get'
    }).then((response) => {
        return response.json();
    }).then((data) =>{
        for(let i = 0; i<data.length; i++){
            makeCards(data[i]);
        }
    }).catch((err) => {
        if(err) throw err;
    });
//==============================================================================================================================

});