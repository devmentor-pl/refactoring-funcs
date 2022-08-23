import list from './assets/list.js';

document.addEventListener('DOMContentLoaded', function () {
    // porządkuję dane (podział na rodziców i dzieci)
    const voivodeships = list.filter(function (element) {
        return element.parentId === null;
    });
    const cities = list.filter(function (element) {
        return element.parentId !== null;
    });

    // część 1 zadania

    //wyszukuję docelowy spis treści
    const contentsEl = document.querySelector('.contents');

    // wyszukuję miasta dla każdego województwa
    voivodeships.forEach(function (voivodeship) {
        const citiesOfVoivodeship = cities.filter(function (city) {
            return city.parentId === voivodeship.id;
        });

        // tworzę element <li> województwa oraz element <a> kierujący do sekcji
        const voivodeshipListItem = document.createElement('li');
        const voivodeshipLink = document.createElement('a');
        voivodeshipLink.innerText = voivodeship.text;
        voivodeshipLink.setAttribute('href', '#' + voivodeship.ref);

        voivodeshipListItem.appendChild(voivodeshipLink);
        contentsEl.appendChild(voivodeshipListItem);

        // jeśli województwo ma miasta, tworzę element <ul>
        if (citiesOfVoivodeship.length > 0) {
            const citiesList = document.createElement('ul');
            voivodeshipListItem.appendChild(citiesList);

            // tworzę elementy <li> oraz <a> dla miast (zwróć uwagę, że tworzymy podobny kod jak dla województwa)
            citiesOfVoivodeship.forEach(function (city) {
                const cityListItem = document.createElement('li');
                const cityLink = document.createElement('a');
                cityLink.innerText = city.text;
                cityLink.setAttribute('href', '#' + city.ref);

                cityListItem.appendChild(cityLink);
                citiesList.appendChild(cityListItem);
            });
        }
    });

    // część 2 zadania

    //wyszukuję docelowy element z opisami
    const descriptionsEl = document.querySelector('.descriptions');

    // dla każdego województwa dodaję tytuł i opis oraz szukam jego miast
    voivodeships.forEach(function (voivodeship) {
        const citiesOfVoivodeship = cities.filter(function (city) {
            return city.parentId === voivodeship.id;
        }); // (powtórzony kod!)

        // tworzę kontener dla województwa i jego miast
        const container = document.createElement('article');

        // tworzę element <h3> dla województwa
        const parentElTitle = document.createElement('h3');
        parentElTitle.innerText = voivodeship.text;

        // nadaję ID zgodne z linkiem, który do tego elementu kieruje
        parentElTitle.setAttribute('id', voivodeship.ref);

        //dodaję tytuł do kontenera
        container.appendChild(parentElTitle);

        // jeśli opis istnieje w bazie, dodaję go pod tytułem
        if (voivodeship.description) {
            const parentElDesc = document.createElement('p');
            parentElDesc.innerText = voivodeship.description;

            // umieszczam opis zaraz pod tytułem
            parentElTitle.insertAdjacentElement('afterend', parentElDesc);
        }

        // dodaję kontener do rodzica na stronie
        descriptionsEl.appendChild(container);

        if (citiesOfVoivodeship.length > 0) {
            // tworzę element <ul> dla miast z opisami
            const citiesList = document.createElement('ul');
            // dodaję tę listę do województwa - ustawi się jako ostatnie dziecko
            container.appendChild(citiesList);

            citiesOfVoivodeship.forEach(function (city) {
                // tworzę element <li> dla każdego miasta
                const cityLiEl = document.createElement('li');

                citiesList.appendChild(cityLiEl);

                // tworzę tytuł <h4> razem z ID (powtórzony kod!)
                const cityElTitle = document.createElement('h4');
                cityElTitle.innerText = city.text;

                cityElTitle.setAttribute('id', city.ref);

                // dodaję tytuł do <li>
                cityLiEl.appendChild(cityElTitle);

                // jeśli opis istnieje w bazie, to tworzę go na stronie (powtórzony kod!)
                if (city.description) {
                    const cityElDesc = document.createElement('p');
                    cityElDesc.innerText = city.description;

                    // umieszczam opis zaraz pod tytułem
                    cityElTitle.insertAdjacentElement('afterend', cityElDesc);
                }
            });
        }
    });
});

// Odrębne czynności, które możemy przenieść do osobnych funkcji
// - tworzenie spisu treści (część 1 zadania)
// - tworzenie informacji o województwach i miastach (część 2 zadania)
// - wyszukiwanie miast należących do danego województwa
// - działania dotyczące tylko miast danego województwa
// - tworzenie nowych elementów
// - dodawanie tych elementów do rodzica
// - tworzenie podlinkowanych elementów spistu treści
// - tworzenie zagnieżdżonych list spisu treści
// - tworzenie nagłówków, do których odnosi się spis treści
// - tworzenie opisów