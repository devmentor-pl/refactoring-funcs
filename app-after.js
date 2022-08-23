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
    createTableOfContents(voivodeships, cities);

    // część 2 zadania
    createSections(voivodeships, cities);
});

// przenoszę część 1 zadania do osobnej funkcji
function createTableOfContents(voivodeships, cities) {
    //wyszukuję docelowy spis treści
    const contentsEl = document.querySelector('.contents');

    // wyszukuję miasta dla każdego województwa i tworzę z nich elemenety <li>
    voivodeships.forEach(function (voivodeship) {
        const citiesOfVoivodeship = getCitiesOfVoivodeship(cities, voivodeship);

        // tworzę element <li> województwa oraz element <a> i <ul> wewnątrz niego (jeśli ma miasta)
        const voivodeshipListItem = createLinkedNavItem(
            voivodeship.text,
            voivodeship.ref
        );
        contentsEl.appendChild(voivodeshipListItem);

        if (citiesOfVoivodeship.length > 0) {
            createNestedList(citiesOfVoivodeship, voivodeshipListItem);
        }
    });
}

// szukam miast danego województwa w tablicy
function getCitiesOfVoivodeship(cities, voivodeship) {
    const citiesOfVoivodeship = cities.filter(function (city) {
        return city.parentId === voivodeship.id;
    });

    return citiesOfVoivodeship;
}

// tworzę podlinkowane elementy <li>
function createLinkedNavItem(text, ref) {
    const liEl = document.createElement('li');
    const linkEl = createElementOfParent('a', liEl); // wykorzystanie kolejnej funkcji do refaktoru
    linkEl.innerText = text;
    linkEl.setAttribute('href', '#' + ref);

    return liEl;
}

// tworzę drugopoziomowe <ul>
function createNestedList(children, parentEl) {
    const ulEl = createElementOfParent('ul', parentEl);

    // tworzę elementy <li> dla dzieci
    children.forEach(function (child) {
        const childEl = createLinkedNavItem(child.text, child.ref);
        ulEl.appendChild(childEl);
    });

    return ulEl;
}

// tworzę element w rodzicu
function createElementOfParent(elementType, parent) {
    const element = document.createElement(elementType);
    parent.appendChild(element);

    return element;
}

//_________________________

// przenoszę część 2 zadania do osobnej funkcji
function createSections(voivodeships, cities) {
    //wyszukuję na stronie docelowy element z opisami
    const descriptionsEl = document.querySelector('.descriptions');

    // dla każdego województwa dodaję tytuł i opis oraz szukam jego miast
    voivodeships.forEach(function (voivodeship) {
        const citiesOfVoivodeship = getCitiesOfVoivodeship(cities, voivodeship); // mam już tę funkcję więc używam

        // tworzę kontener dla województwa i jego miast – od razu korzystam z funkcji dodającej do rodzica
        const container = createElementOfParent('article', descriptionsEl);

        // tworzenie nagłówków z ID przenoszę do funkcji
        const parentElTitle = createReferenceHeader(
            'h3',
            voivodeship,
            container
        );

        // dodaję opis pod tytułem województwa
        if (voivodeship.description) {
            addDescription(voivodeship.description, parentElTitle);
        }

        // tworzę elementy dla miast, jeśli województwo je posiada
        if (citiesOfVoivodeship.length > 0) {
            createCitiesInfo(citiesOfVoivodeship, container);
        }
    });
}

function createCitiesInfo(citiesOfVoivodeship, parentEl) {
    // tworzę kontener dla listy miast
    const citiesList = createElementOfParent('ul', parentEl);

    citiesOfVoivodeship.forEach(function (city) {
        // tworzę element <li> dla każdego miasta
        const cityLiEl = createElementOfParent('li', citiesList);

        // wykorzystuję stworzoną wcześniej funkcję dla nagłówków z ID
        const cityElTitle = createReferenceHeader('h4', city, cityLiEl);

        // tworzę opis i dodaję go zaraz pod tytułem – wykorzystuję stworzoną funkcję
        if (city.description) {
            addDescription(city.description, cityElTitle);
        }
    });
}

function createReferenceHeader(headerType, data, parent) {
    // tworzę nagłówek
    const titleEl = createElementOfParent(headerType, parent);
    titleEl.innerText = data.text;

    // dodaję ID
    titleEl.setAttribute('id', data.ref);

    // jeśli chcę dodać coś do wszystkich nagłówków, nie muszę wprowadzać zmian w dwóch miejscach
    titleEl.addEventListener('click', function (e) {
        e.target.style.textDecoration = 'line-through';
    });

    return titleEl;
}

function addDescription(descriptionText, prevSibling) {
    const parentElDesc = document.createElement('p');
    parentElDesc.innerText = descriptionText;

    // umieszczam opis zaraz pod wskazanym elementem
    prevSibling.insertAdjacentElement('afterend', parentElDesc);
}
