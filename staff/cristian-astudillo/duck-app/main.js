var search = document.getElementsByClassName("search")[0];
var duckList = document.getElementsByClassName("list")[0];
var duckProduct = document.getElementsByClassName("duck__product")[0];


search.addEventListener("submit", function (e){ 
    e.preventDefault();    
    duckList.innerText = "";
    var query = e.target.search.value;
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query);

    xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 201) {
       var ducks = JSON.parse(xhr.responseText);

        var ul = document.createElement('ul');
        
        duckList.append(ul);        
        ducks.forEach(function(duck) {
            var li = document.createElement('li');
            var image = document.createElement('img');
            var title = document.createElement('h3');
            var price = document.createElement('p');
            
            image.src = duck.imageUrl;
            price = duck.price;
            title = duck.title;
            
            ul.append(li);
            li.append(title,image,price);          
            li.addEventListener('click', function () {
                searchDuck(duck.id); 
                
            })
        });
    }
};
xhr.send();

});


function searchDuck(duckId) {
    var duckRequest = new XMLHttpRequest;
    duckRequest.open('GET', 'http://duckling-api.herokuapp.com/api/ducks/' + duckId)
    duckRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
        var duck = JSON.parse(duckRequest.responseText);
        printDuck(duck);    
        }
    };
    duckRequest.send();    
}


function printDuck(duck) {
    var title = document.createElement('h3');
    var image = document.createElement('img');
    var description = document.createElement('p');
    var price = document.createElement('p');

    title = duck.title;
    image.src = duck.imageUrl;
    description = duck.description;
    price = duck.price;

    duckProduct.append(title, image, description, price);

    duckProduct.addEventListener('click', function () {
        searchDuck(duck); 
        
    })
}

//http://duckling-api.herokuapp.com/api/ducks/5c3853aebd1bde8520e66ee8

// function lookForDuck(duckId) {
//     console.log(duckId);   
   
// }


////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var searchButton = document.getElementsByClassName('duck-header__form')[0];
// var duckMainSection = document.getElementsByClassName('duck-main__section')[0];
// var duckMainArticle = document.getElementsByClassName('duck-main__article')[0];

// var ul = document.createElement('ul');
// searchButton.addEventListener('submit', searchButtonPush)
// function searchButtonPush(e) {
//     e.preventDefault()
//     ul.innerText = " ";
//     var query = e.target.inputname.value;
//     var xhr = new XMLHttpRequest; //objecto que generamos para llamar al ajax
//     xhr.open('GET', 'https://duckling-api.herokuapp.com/api/search?q=' + query); //hacemos una llamada (con un query= green)
//     xhr.onreadystatechange = function () { //lo que llegue, la respuesta, le passamos una funcion que trabaja esa respuesta
//         if (this.readyState == 4 && this.status == 201) {
//             var ducks = JSON.parse(xhr.responseText); //parse nos pasa a array de objetos la respuesta, para poder tratarla con js
//             printDucks(ducks)
//         }
//     };
//     xhr.send(); //envia todo lo generado por xhr, y luego sigue con el codigo  (es asincrono)
// }

// function printDucks(ducks) {
//     duckMainSection.append(ul);
//     ducks.forEach(function (duck) {
//         var li = document.createElement('li');
//         var image = document.createElement('img');
//         var title = document.createElement('h2');
//         var price = document.createElement('h4');
        
//         image.src = duck.imageUrl;
//         title = duck.title;
//         price = duck.price;
//         ul.append(li);
//         li.append(title, image, price);
//         li.addEventListener('click', function () {
//             searchDuck(duck.id)
//         });
//     });
// }

// function searchDuck(duckId) {
//     var xhr = new XMLHttpRequest; //objecto que generamos para llamar al ajax
//     xhr.open('GET', 'http://duckling-api.herokuapp.com/api/ducks/' + duckId); //hacemos una llamada (con un query= green) endpont: url donde podemos solicitar 
//     xhr.onreadystatechange = function () { //lo que llegue, la respuesta, le passamos una funcion que trabaja esa respuesta
//         if (this.readyState == 4 && this.status == 201) {
//             var duck = JSON.parse(xhr.responseText); //parse nos pasa a array de objetos la respuesta, para poder tratarla con js
//             printDuck(duck);
//         }
//     };
//     xhr.send();
// }

// function printDuck(duck) {
//     duckMainArticle.innerText = " ";
//     var image = document.createElement('img');
//     var title = document.createElement('h2');
//     var price = document.createElement('h4');
//     var description = document.createElement('h4');
//     image.src = duck.imageUrl;
//     title = duck.title;
//     price = duck.price;
//     description = duck.description;
    
//     duckMainArticle.append(title, image, price, description)
// }
