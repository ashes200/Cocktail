class Vue {
  afficheMeteo(data) {
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, "text/xml");

      // cree les element html ou afficher la meteo
      let vueMeteo = document.getElementById("meteo");
      //tentetive
      let titre =document.createElement("h1");
      //let titre = document.createElement("p");              // affiche : meteo
      let villeDate = document.createElement("p");          // affiche : Montreal aaaa-mm-dd
      let temperature = document.createElement("p");        // affiche : temperature en degre celsuis
      let img = document.createElement("img");              // affiche l'image de l'icon representant la situation meteo
      img.style.width = "60%";
      
      // recupere le nom de la ville : montreal
      let city = xmlDoc.getElementsByTagName("city")[0].getAttribute("name");
      
      // recupere la date
      let lastupdate = xmlDoc.getElementsByTagName("lastupdate")[0].getAttribute("value");
      // enleve l'heure pour garder la date en format aaaa-mm-dd
      let date = lastupdate.slice(0, 10);
      
      // recupere la temperature
      let temp = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value");

      // recupere l'image
      let imageId = xmlDoc.getElementsByTagName("weather")[0].getAttribute("icon");
      let imageUrl = `https://openweathermap.org/img/w/${imageId}.png`;

      function fc(){
        // initie les different elements html
        titre.innerHTML = "meteo";                   // affiche : meteo
        //tentative
        titre.style.width="239%";
        titre.style.right="74%";
        titre.style.position="relative";
        titre.style.margin= "auto";
        titre.style.fontWeight="bolder";
        vueMeteo.appendChild(titre);       // ajoute l'element html a la page html
        villeDate.innerHTML = city + "    " + date;    // affiche la vile et la date : Montreal aaaa-mm-dd
        villeDate.style.width="100%";
        villeDate.style.margin= "auto";
        vueMeteo.appendChild(villeDate);   // ajoute l'element html a la page html
        temperature.innerHTML = Math.round(temp) + "°C";               // affiche la temperature en degrer celsuis
        temperature.style.width="40%";
        temperature.style.margin= "auto";
        vueMeteo.appendChild(temperature); // ajoute l'element html a la page html
        img.src = imageUrl;                          // affiche l'image de l'icon
        vueMeteo.appendChild(img);         // ajoute l'element html a la page html
      }
      fc();
      
    }
  afficheListeRecettes(data){
    const listeCocktail = data;

    let all = document.getElementsByTagName("BODY")[0];
    if(document.getElementById("footer") != null){
      let fuut = document.getElementById("footer");
      fuut.remove();
    }
    let foot = document.createElement("footer");

    foot.setAttribute("id", "footer");
    let texte = document.createElement("p");
    texte.innerHTML="Copyright nous - Tous droits reserve";
    foot.appendChild(texte);

    // affiche l'element html qui contiendra la liste de recette
    let vueArticleListe = document.getElementById("article_liste");
    vueArticleListe.style.display="block";

    // rend invisible l'element html qui contiendra la recette pour une boissons
    let vueArticleRecette = document.getElementById("article_recette");
    vueArticleRecette.style.display="none";


    // affiche la liste des differentes boissons
    for (let i = 0; i < 9; i++) {
      let div_01 = document.createElement("div");
      div_01.style.border="10px outset gray";
      

      div_01.style.display="inline-block";
      div_01.style.textAlign="center";
      div_01.style.width="24%";
      div_01.style.backgroundColor="rgba(180, 177, 177, 0.429)";
      div_01.style.margin="10px";
      
      
      
      vueArticleListe.appendChild(div_01);
      let img = document.createElement("img");
      img.style.width="80%";
      img.style.margin="25px 0 0 0"
      let imageUrl = listeCocktail.drinks[i].strDrinkThumb;
      img.src = imageUrl; 
      div_01.appendChild(img);
      let nom = document.createElement("p");
      nom.style.fontSize="20px";
      nom.style.fontFamily="cursive";
      nom.innerHTML= listeCocktail.drinks[i].strDrink;
      div_01.appendChild(nom);


      let id = listeCocktail.drinks[i].idDrink;
      let texteId = document.createElement("p");
      texteId.innerHTML= id;
      //div_01.appendChild(texteId);
      div_01.setAttribute("id", id);
    }
    all.appendChild(foot);
  }

  obtenirCategories(data){
    let lsCategories = document.getElementById("listeCategories");
    const listeCategories = data;

    for (let i = 0; i < listeCategories.drinks.length; i++) {
      let imageUrl = listeCategories.drinks[i].strCategory;

      let listeItem = document.createElement("li");
      listeItem.innerHTML=listeCategories.drinks[i].strCategory;
      listeItem.setAttribute("id", listeCategories.drinks[i].strCategory);
      lsCategories.appendChild(listeItem);
    }
  }
  afficheUneRecette(data){
    const recette = data;
    let all = document.getElementsByTagName("BODY")[0];
    if(document.getElementById("footer") != null){
      let fuut = document.getElementById("footer");
      fuut.remove();
    }
    let foot = document.createElement("footer");

    foot.setAttribute("id", "footer");
    let texte = document.createElement("p");
    texte.innerHTML="Copyright nous - Tous droits reserve";
    foot.appendChild(texte);
    all.appendChild(foot);
    
    // rend invisible l'element html qui contient la liste de recette
    let vueArticleListe = document.getElementById("article_liste");
    vueArticleListe.style.display="none";
    // affiche l'element html qui contiendra la de recette
    let vueArticleRecette = document.getElementById("article_recette");
    vueArticleRecette.style.display="block";

    // affiche la recette voulue
    for (let i = 0; i < recette.drinks.length; i++) {
      let div_01 = document.createElement("div");
      div_01.style.display="inline-block";
      div_01.style.textAlign="center";
      div_01.style.width="100%";
      vueArticleRecette.appendChild(div_01);
      let img = document.createElement("img");
      img.style.width="30%";
      img.style.marginRight="2%";
      let imageUrl = recette.drinks[i].strDrinkThumb;
      img.src = imageUrl; 
      div_01.appendChild(img);

      let contenantTitreEtAutres = document.createElement("div");
      contenantTitreEtAutres.style.width="100%";
      contenantTitreEtAutres.style.padding="0%";
      let nom = document.createElement("p");
      nom.innerHTML= recette.drinks[i].strDrink;
      nom.style.margin="1%";
      nom.style.fontSize= "4vh";
      contenantTitreEtAutres.appendChild(nom);
      let categorie = document.createElement("h4");
      categorie.innerHTML="Categorie : " + recette.drinks[i].strCategory;
      contenantTitreEtAutres.appendChild(categorie);
      div_01.appendChild(contenantTitreEtAutres);

      let div_02 = document.createElement("div");
      let ingredients = document.createElement("h2");
      ingredients.innerHTML="Ingredients :";
      div_02.appendChild(ingredients);
      div_02.style.padding="0% 8%";
      let liste = document.createElement("ul");
      for(let j = 1; j <= 15; j++) {
        let test = recette.drinks[i]["strIngredient" + j]
        if (test != null) {
          let listeItem = document.createElement("li");
          listeItem.innerHTML= test;
          liste.appendChild(listeItem); 
        }
      }
      div_02.appendChild(liste);
        
      vueArticleRecette.appendChild(div_02);


      let div_03 = document.createElement("div");
      let instructions = document.createElement("h2");
      instructions.innerHTML="Instructions :";
      div_03.appendChild(instructions);
      let texteInstruction = document.createElement("p");
      texteInstruction.innerHTML= recette.drinks[i].strInstructions;
      div_03.appendChild(texteInstruction);
      div_03.style.padding="0% 8%";
      vueArticleRecette.appendChild(div_03);
    }
  }
}


