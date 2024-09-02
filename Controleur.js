// charge la page avec la liste de recette et le menu
let control;
let compteur;
let vueArticleListe;
let vueFooter;
let vueMeteo;
let listeCategorie;
window.onload = (event) => {
  vueFooter = document.getElementById("footer");
  compteur = 0;
  begin();
  compteur = 1;
  
//afficher la recette en cliquant sur un cocktail
  if (vueArticleListe != null) {
    vueArticleListe.addEventListener('click', function(event) {
      let cible = event.target.closest("DIV");
      if (cible.tagName === 'DIV') {
        removeAllChildNodes(vueArticleListe);
        control.obtenirRecetteId(cible.id)
      }
      else if (cible.tagName === 'BUTTON') {
        console.log("test");
      }
    }); 
    }
  

  //barres recherches
  document.getElementById("submit").addEventListener("click", (e) => {
    rechercherNom();
  });
  document.getElementById("search").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      console.log("test");
      rechercherNom();
    }
  });
  document.getElementById("submit2").addEventListener("click", (e) => {
    rechercherIngrediant();
  });
  document.getElementById("search2").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      console.log("test");
      rechercherIngrediant();
    }
  });

  
  //boutons alphabet
  let mybuttons = document.getElementsByClassName("Lettremenu");
  for (var i = 0; i < mybuttons.length; i++) {
    
    mybuttons[i].addEventListener("click", (e) => {
      if (e.target.id == "U" || e.target.id == "X") {
        removeAllChildNodes(vueArticleListe);
        let message = document.createElement("h3");
        message.innerHTML("test");
        message.appendChild("test");
      }
      else {
        removeAllChildNodes(vueArticleListe);
        control.obtenirParLettre(e.target.id);
      }
    });
  }
      

}

// cree le menu ainsi que la liste de recette
function begin(){
  vueArticleListe = document.getElementById("article_liste");
  listeCategorie = document.getElementById("listeCategories");
  vueMeteo = document.getElementById("meteo");
  if(compteur != 0) {    
    removeAllChildNodes(vueArticleListe);
    removeAllChildNodes(vueMeteo);
    removeAllChildNodes(listeCategorie);
  }
  //dansLoublie();
  $("#footer").load(location.href + " #footer")

  control = new Controleur();
  control.obtenirMeteo();
  control.obtenirRecetteAleatoire()
  control.obtenirCategories();
}

$(document).ready(function() {
  let listeCategorie = $("#listeCategories");
  if (listeCategorie.length > 0) {
    listeCategorie.on('click', 'li', function(event) {
      let cible = $(event.target).closest("li");
      if (cible.length > 0) {
        dansLoublie();
        cible.addClass("enSurbrillance");
        control.obtenirRecetteCategorie(cible.attr("id"));
      }
    });
  }
});

function dansLoublie(){
  let table = document.getElementById("listeCategories");
  for (let i = 0; i < 11; i++) {
    if(table.childNodes[i].classList.contains("enSurbrillance")){
      table.childNodes[i].classList.remove("enSurbrillance");
    }
  }
}



// efface le contenue d'un element html
function removeAllChildNodes(parent) {
  
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

class Controleur{
    constructor(){
        this.Vue = new Vue();
    }

    obtenirMeteo() {
      let url = "https://api.openweathermap.org/data/2.5/weather?lat=45.508888&lon=-73.561668&appid=b47bb63f1eeae00f939d01ecc8cbadbf&units=metric&mode=xml";
      fetch(url)
        .then((reponse) => reponse.text())
        .then((data) => {
          this.Vue.afficheMeteo(data)
        })
        .catch((error) => {
          //alert("Error : " + error);
        });
    }     

    obtenirCategories(){
      let url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
          this.Vue.obtenirCategories(data)
        })
        .catch((error) => {
          //alert("Error : " + error);
      });
    }

    obtenirRecetteId(id){
      let vueArticleRecette = document.getElementById("article_recette");
      removeAllChildNodes(vueArticleRecette);
      let url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;
      fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
          //console.log(data);

          this.Vue.afficheUneRecette(data)
        })
        .catch((error) => {
          //alert("Error : " + error);
      });
    }

    obtenirRecetteCategorie(id){
      let vueArticleListe = document.getElementById("article_liste");
      removeAllChildNodes(vueArticleListe);
      let url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + id;
      fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
          this.Vue.afficheListeRecettes(data);
        })
        .catch((error) => {
          alert("Error : " + error);
        });
    }

    obtenirRecetteAleatoire(){
      let vueArticleRecette = document.getElementById("article_recette");
      removeAllChildNodes(vueArticleRecette);
      let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
      fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
          this.Vue.afficheUneRecette(data)
        })
        .catch((error) => {
          //alert("Error : " + error);
      });
    }

    obtenirRecetteNom(nom){
      let vueArticleRecette = document.getElementById("article_recette");
      removeAllChildNodes(vueArticleRecette);
      let url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + nom;
      fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
          //console.log(data);
          if(data.drinks.length == 1){
            this.Vue.afficheUneRecette(data)
          }
          else{
            this.Vue.afficheListeRecettes(data)
          }

        })
        .catch((error) => {
          //alert("Error : " + error);
      });
    }

    obtenirParLettre(lettre){
      let url;
        
        url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + lettre;
      
        fetch(url)
          .then((reponse) => reponse.json())
          .then((data) => {
            this.Vue.afficheListeRecettes(data)
          })
          .catch((error) => {
            //alert("Error : " + error);
        });
    }

    obtenirRecetteIngrediant(ingrediant){
      let vueArticleRecette = document.getElementById("article_recette");
      removeAllChildNodes(vueArticleRecette);
      let url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingrediant;
      fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
          //console.log(data);
          if(data.drinks.length == 1){
            this.Vue.afficheUneRecette(data)
          }
          else{
            this.Vue.afficheListeRecettes(data)
          }

        })
        .catch((error) => {
          //alert("Error : " + error);
      });
    }

}

function rechercherNom() {
  removeAllChildNodes(vueArticleListe);
  control.obtenirRecetteNom(document.getElementById("search").value)
}

function rechercherIngrediant() {
  removeAllChildNodes(vueArticleListe);
  control.obtenirRecetteIngrediant(document.getElementById("search2").value)
}
//function alphabet(){
//  var alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","p","q","r","s","t","v","w","y","z"];
//  alpha.forEach(element=>document.getElementById(element).innerHTML="<li><button id='"+element+"' class='Lettremenu'>"+ element +"</button></li>");
//}