// создаю переменные и получаю их из DOM-дерева
let input = document.querySelector('.input');
let addButton = document.querySelector('.addButton');
let dictionaryContainer = document.querySelector('.dictionary');
let resetButton = document.querySelector('.resetButton');

// переменная считает новые элементы словаря
let newElementCount = 1;

// ТРАНСЛИТ !
function translit(str) {
    const ru = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "e",
        ж: "j",
        з: "z",
        и: "i",
        й: "i",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "ts",
        ч: "ch",
        ш: "sh",
        щ: "shch",
        ы: "y",
        э: "e",
        ю: "u",
        я: "ya",
        ь: "'",
        ъ: "'",
    };

    const newStr = [];

    for (let i = 0; i < str.length; i += 1) {
        newStr.push(
            ru[str[i]] ||
            (ru[str[i].toLowerCase()] === undefined && str[i]) ||
            ru[str[i].toLowerCase()].replace(/^(.)/, (match) => match.toUpperCase())
        );
    }
    return newStr.join("");
}

function addNewDictionaryItem() {
    let inputValue = input.value.trim();

    if (inputValue !== '') {
        let transliteratedValue = translit(inputValue);

        const maxTextLength = 7;
        const truncatedInputValue = inputValue.length > maxTextLength ? inputValue.substring(0, maxTextLength) + '...' : inputValue;
        const truncatedTransliteratedValue = transliteratedValue.length > maxTextLength ? transliteratedValue.substring(0, maxTextLength) + '...' : transliteratedValue;

        let newDictionaryItem = document.createElement('div');
        newDictionaryItem.className = 'newDictionaryStr';

        let currentItemCount = document.querySelectorAll('.dictionaryStr').length;
        let currentNumber = currentItemCount + 1;

        newDictionaryItem.innerHTML = `
      <div class="newBlockLeft">
          <div class="number">${currentNumber}</div>
          <div class="newRusWord" data-tooltip="${inputValue.length > 7 ? inputValue : ''}">${truncatedInputValue}</div>
      </div>
      <div class="newBlockRight">
          <div class="newEngWord" data-tooltip="${transliteratedValue.length > 7 ? transliteratedValue : ''}">${truncatedTransliteratedValue}</div>
          <button class="deleteContainerButton" type="button">
              <img class="deleteContainerIcon" src="./icons/deleteButton.svg" alt="closeButton" />
          </button>
      </div>
    `;

        dictionaryContainer.appendChild(newDictionaryItem);

        let deleteButton = newDictionaryItem.querySelector('.deleteContainerIcon');
        deleteButton.addEventListener('click', function () {
            newDictionaryItem.remove();
            updateNumbers();
        });
        newElementCount++;
        updateNumbers();

        if (inputValue.length > 7) {
            const newWordElements = newDictionaryItem.querySelectorAll('.newRusWord, .newEngWord');
            newWordElements.forEach((element) => {
                element.addEventListener('mouseover', showTooltip);
                element.addEventListener('mouseout', hideTooltip);
            });
        }

        // Очищаем поле ввода после добавления элемента
        input.value = '';
    }
}

addButton.addEventListener('click', addNewDictionaryItem);

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addNewDictionaryItem();
    }
});

function updateNumbers() {
    let dictionaryItems = document.querySelectorAll('.newDictionaryStr');
    dictionaryItems.forEach((item, index) => {
        item.querySelector('.number').textContent = index + 2;
    });
}

resetButton.addEventListener('click', function () {
    let addedElements = document.querySelectorAll('.newDictionaryStr');
    addedElements.forEach(function (element) {
        element.remove();
    });
    updateNumbers();
});

const wordElements = document.querySelectorAll('.newRusWord, .newEngWord');

wordElements.forEach((element) => {
    element.addEventListener('mouseover', showTooltip);
    element.addEventListener('mouseout', hideTooltip);
});

function showTooltip(event) {
    const targetElement = event.target;
    const tooltipText = targetElement.getAttribute('data-tooltip');

    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.textContent = tooltipText;

    document.body.appendChild(tooltipElement);

    const rect = targetElement.getBoundingClientRect();
    tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 5 + 'px';
    tooltipElement.style.left = rect.left + (rect.width - tooltipElement.offsetWidth) / 2 + 'px';
}

function hideTooltip() {
    const tooltipElement = document.querySelector('.tooltip');
    if (tooltipElement) {
        tooltipElement.remove();
    }
}
