$(document).ready(function(){
    const modalSetup = (e) =>{
        document.getElementById('saveNote').setAttribute('data-id', e.target.dataset.id);
    }
//==============================================================================================================================
    const deleteArticle = (e) =>{
        $.ajax({
            method: "DELETE",
            url: "/api/delete-article/" + e.target.dataset.id
          }).then(function(response){
            window.location.href = "/savedArticles";
          });
    }
//==============================================================================================================================
    const makeCards = (data) =>{
        let divCol = document.createElement('div');
        let divCard = document.createElement('div');
        let divCont = document.createElement('div');
        let spanTitle = document.createElement('span');
        let pContent = document.createElement('p')
        let divAction = document.createElement('div');
        let aGo = document.createElement('a');
        let aNotes = document.createElement('a');
        let aDelete = document.createElement('a');

        divCol.classList.add('col', 's6', 'm12');
        divCard.classList.add('card', 'blue-grey');
        divCont.classList.add('card-content','white-text');
        spanTitle.classList.add('card-title');
        divAction.classList.add('card-action');
        aNotes.classList.add('right', 'btn', 'green', 'add-notes', 'modal-trigger');
        aDelete.classList.add('right', 'btn','orange', 'delete-article');
        
        aGo.setAttribute('href', data.link);
        aGo.setAttribute('target', '_blank');
        
        aNotes.setAttribute('data-target', 'notesmodal');
        aNotes.setAttribute('data-id', data._id);
        aNotes.addEventListener('click', modalSetup);

        aDelete.setAttribute('data-id', data._id);
        aDelete.addEventListener('click', deleteArticle);


        spanTitle.innerHTML = data.title;
        aGo.innerHTML = 'Go to article';
        aDelete.innerHTML = "Delete Article";
        aNotes.innerHTML = "Add Notes";

        let newsBucket = document.getElementById('saved-bucket');
        
        divAction.appendChild(aGo);
        divAction.appendChild(aDelete);
        divAction.appendChild(aNotes);
        divCont.appendChild(spanTitle);
        divCont.appendChild(pContent);
        divCard.appendChild(divCont);
        divCard.appendChild(divAction);
        divCol.appendChild(divCard);
        newsBucket.appendChild(divCol);

    }
    fetch('/api/savedArticles', {
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

});