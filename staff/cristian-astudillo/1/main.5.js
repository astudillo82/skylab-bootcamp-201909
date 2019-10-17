if (typeof Array.prototype.shuffle === 'undefined')
    Array.prototype.shuffle = function () {debugger
        var result = [];

        for (var i = 0; i < this.length; i++) result[i] = this[i];

        for (var i = 0; i < result.length; i++) {
            var random = Math.floor(Math.random() * result.length);

            var value = result[i];

            result[i] = result[random];

            result[random] = value;
        }

        return result;
    };

listInitialRandomDucks();

var search = document.getElementsByClassName('search')[0];

search.addEventListener('submit', function (event) {
    event.preventDefault();

    var query = this.query.value;

    listSearchResults(query);
});


function listInitialRandomDucks() {
    searchDucks('', function (ducks) {
        ducks = ducks.shuffle().splice(0, 3);

        paintResults(ducks);
    });
}

function listSearchResults(query) {
    searchDucks(query, paintResults);
}

function searchDucks(query, callback) {
    call('GET', query ? 'https://duckling-api.herokuapp.com/api/search?q=' + query : 'https://duckling-api.herokuapp.com/api/search', callback);
}

function paintResults(ducks) {
    var results = document.getElementsByClassName('results')[0];
    results.innerHTML = '';

    ducks.forEach(function (duck) {
        var result = document.createElement('li');
        result.classList.add('results__item');

        var item = document.createElement('a');
        item.classList.add('item');
        item.addEventListener('click', function (event) {
            var id = duck.id;

            retrieveDuck(id, paintDetail);
        });
        result.append(item);

        var title = document.createElement('h2');
        title.classList.add('item__title');
        title.innerText = duck.title;

        var image = document.createElement('img');
        image.classList.add('item__image');
        image.src = duck.imageUrl;

        var price = document.createElement('span');
        price.classList.add('item__price');
        price.innerText = duck.price;

        item.append(title, image, price);

        results.append(result);
    });
}

function retrieveDuck(id, callback) {
    call('GET', 'https://duckling-api.herokuapp.com/api/ducks/' + id, callback);
}

function paintDetail(duck) {
    var detail = document.getElementsByClassName('detail')[0];

    var title = detail.getElementsByClassName('detail__title')[0];
    title.innerText = duck.title;

    var image = detail.getElementsByClassName('detail__image')[0];
    image.src = duck.imageUrl;

    var description = detail.getElementsByClassName('detail__description')[0];
    description.innerText = duck.description;

    var store = detail.getElementsByClassName('detail__store')[0];
    store.href = duck.link;

    var price = detail.getElementsByClassName('detail__price')[0];
    price.innerText = duck.price;

    var back = detail.getElementsByClassName('detail__back')[0];
    back.addEventListener('click', function (event) {
        var views = document.getElementsByClassName('view');

        views[0].classList.remove('hide');
        views[1].classList.add('hide');
    });

    var views = document.getElementsByClassName('view');

    views[0].classList.add('hide');
    views[1].classList.remove('hide');
}

function call(method, url, callback) {
    var xhr = new XMLHttpRequest;

    xhr.open(method, url);

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var results = JSON.parse(xhr.responseText);

            callback(results);
        }
    };

    xhr.send();
}