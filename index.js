let input = document.querySelector('.input');
let addButton = document.querySelector('.addButton');
let dictionaryContainer = document.querySelector('.dictionary');
let resetButton = document.querySelector('.resetButton');
let newElementCount = 1;

function addNewDictionaryItem() {
    let inputValue = input.value.trim();

    if (inputValue !== '') {
        let newDictionaryItem = document.createElement('div');
        newDictionaryItem.className = 'newDictionaryStr';

        newDictionaryItem.innerHTML = `
            <div class="newBlockLeft">
                <div class="number">${newElementCount + 1}</div>
                <div class="newRusWord">${inputValue}</div>
            </div>
            <div class="newBlockRight">
                <div class="newEngWord">${inputValue}</div>
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
    }
}

addButton.addEventListener('click', addNewDictionaryItem);

input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
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
