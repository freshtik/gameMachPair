(function () {

    // ------- НАЧАЛО ИГРЫ ---------------------------------------
    // создаем поле информации
    function createPreGameField() {
        let field = document.createElement('div');
        field.classList.add('pre-game-field');

        return field;
    }

    // создаем заголовок для игры
    function createTitleStart() {
        let header = document.createElement('div');
        let titleTop = document.createElement('h2');
        let titleBottom = document.createElement('h2');

        header.classList.add('header-container-start');
        titleTop.classList.add('title');
        titleBottom.classList.add('title');

        titleTop.innerText = 'Игра';
        titleBottom.innerText = 'найди пару';

        header.append(titleTop);
        header.append(titleBottom);
        return header;
    }

    // создаем описание
    function createDescStart() {
        let desc = document.createElement('div');
        let textTop = document.createElement('p');
        let textBottom = document.createElement('p');
        let textPS = document.createElement('p');

        textTop.classList.add('text-start');
        textBottom.classList.add('text-start');
        textPS.classList.add('text-start');
        textPS.classList.add('text-ps');
        desc.classList.add('header-container-start');

        textTop.innerText = 'Приветики! Это чрезвычайно классная игра, в которой ПРОСТО необходимо найти все пары! Вас ждет необычайное приключение по парному миру...';
        textBottom.innerText = 'Но, чтобы окунуться в этот несомненно заразительный мир, необходимо ввести некоторые данные! Удачи ХОХОХО'
        textPS.innerText = 'P.S. Тут придется поработать сереньким клеточкам $$) Нужно умножить столбцы на строки и получить четное число, иначе неbpdtcnyj, что может произойти'

        desc.append(textTop);
        desc.append(textBottom);
        desc.append(textPS);

        return desc;
    }

    // ввод количества строк, столбцов, минут
    function createInputData() {
        let inputField = document.createElement('div');
        let inputLabelCol = document.createElement('label');
        let inputLabelRow = document.createElement('label');
        let inputLabelTime = document.createElement('label');
        let inputCol = document.createElement('input');
        let inputRow = document.createElement('input');
        let inputTime = document.createElement('input');

        inputCol.type = 'number';
        inputCol.min = '1';
        inputCol.max = '10';
        inputCol.step = '1';
        inputCol.value = '4';

        inputRow.type = 'number';
        inputRow.min = '1';
        inputRow.max = '10';
        inputRow.step = '1';
        inputRow.value = '4';

        inputTime.type = 'number';
        inputTime.min = '0.5';
        inputTime.max = '5';
        inputTime.step = '0.5';
        inputTime.value = '1';

        inputLabelCol.innerText = 'Количество колонок: '
        inputLabelRow.innerText = 'Количество строк: '
        inputLabelTime.innerText = 'Таймер, мин: '

        inputLabelCol.classList.add('input-label');
        inputLabelRow.classList.add('input-label');
        inputLabelTime.classList.add('input-label');
        inputRow.classList.add('input');
        inputCol.classList.add('input');
        inputTime.classList.add('input');

        inputField.classList.add('header-container-start');


        inputLabelCol.append(inputCol);
        inputLabelRow.append(inputRow);
        inputLabelTime.append(inputTime);
        inputField.append(inputLabelCol);
        inputField.append(inputLabelRow);
        inputField.append(inputLabelTime);

        return {
            inputField,
            inputCol,
            inputRow,
            inputTime
        }
    }

    // создаем кнопку начала игры
    function createBtnStart() {
        let btn = document.createElement('button');
        btn.classList.add('btn-start');
        btn.classList.add('btn');

        btn.innerText = 'СТАРТ';

        return btn;
    }


    // -------- САМА ИГРА ----------------------------------------
    // создаем массив из объектов div
    let createArray = (col, row) => {

        let array = [];
        const amount = col * row;

        for (let i = 0; i < amount; i++) {
            array[i] = {
                id: i,
                name: Math.ceil((i + 1) / 2),
                success: false
            }
        }
        return array;
    }

    // Перемешиваем массив объектов и добавляем правильные id
    let shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let tmp = arr[i];
            let rnd = Math.floor(Math.random() * (i + 1));
            arr[i] = arr[rnd];
            arr[rnd] = tmp;
        }
        for (let i = 0; i < arr.length; i++) arr[i].id = i;
        return arr;
    }

    // Функция открытия карты 
    function openCard(cardFront, cardBack) {
        cardFront.style.transform = 'rotateY(180deg)';
        cardBack.style.transform = 'rotateY(360deg)';
    }
    // Функция закрытия карты
    function closeCard(cardFront, cardBack) {
        cardFront.style.transform = 'rotateY(0)';
        cardBack.style.transform = 'rotateY(180deg)';
    }

    // Тень карты
    function shadowTwoCards(card1, card2, color, exist = true) {
        if (exist) {
            const shadow = `0 0 40px 40px ${color}`;
            card1.cardBack.style.boxShadow = shadow;
            card2.cardBack.style.boxShadow = shadow;
        } else {
            card1.cardBack.style.boxShadow = '';
            card2.cardBack.style.boxShadow = '';
        }
    };

    // создаем карточку
    function createcard(el, size) {
        // добавляем оболочку карточки и ее переднюю и заднюю сторону
        let card = document.createElement('div');
        let cardFront = document.createElement('div')
        let cardBack = document.createElement('div');
        let text = document.createElement('p');
        const frontText = document.createElement('p');
        const name = el.name;

        cardBack.append(text);
        cardFront.append(frontText);
        card.append(cardFront);
        card.append(cardBack);

        // Стили
        card.style.display = 'flex'
        card.style.maxWidth = size;
        card.style.height = size;
        card.style.position = 'relative';
        card.style.perspective = '1000px';
        card.style.justifyContent = 'center';
        card.style.alignItems = 'center';

        // Добавляем стили карточкам с помощью css
        cardFront.classList.add('front');
        cardBack.classList.add('back');
        text.innerText = name;
        frontText.innerHTML = '&#8251;';

        openCard(cardFront, cardBack);
        setTimeout(function () {
            closeCard(cardFront, cardBack);
        }, 2000);
        return {
            card, cardFront, cardBack, text, name
        }
    }

    // создаем поле карточек
    const createArrayItems = (col, row, size, win, timer) => {
        let arrayItems = createArray(col, row);
        arrayItems = shuffleArray(arrayItems);

        let selectedCards = [];
        let count = 0;
        let winCheck = 0;

        const newArrayItems = arrayItems.map(el => {

            const id = el.id;
            let success = el.success;

            let elementCard = createcard(el, size);
            let card = elementCard.card;
            let cardFront = elementCard.cardFront;
            let cardBack = elementCard.cardBack;
            let text = elementCard.text;
            let name = elementCard.name;

            card.addEventListener('click', function () {
                if (!newArrayItems[id].success && count < 2) {
                    count += 1;

                    selectedCards[count - 1] = {
                        id: id,
                        name: name,
                        success: success
                    }

                    // Переворачиваем карту
                    openCard(cardFront, cardBack);

                    // Логика
                    if (count === 2) {
                        let card1 = newArrayItems[selectedCards[0].id];
                        let card2 = newArrayItems[selectedCards[1].id];

                        if (selectedCards[0].name != selectedCards[1].name) {
                            // Обратно переворачиваем карту рубашкой вверх через 1с.
                            setTimeout(function () {
                                closeCard(card1.cardFront, card1.cardBack);
                                closeCard(card2.cardFront, card2.cardBack);
                                count = 0;
                            }, 1000);

                        } else if (selectedCards[0].id === selectedCards[1].id) {
                            closeCard(newArrayItems[id].cardFront, newArrayItems[id].cardBack);
                            count = 0;
                        } else {
                            card1.success = true;
                            card2.success = true;
                            card1.cardBack.style.cursor = 'auto';
                            card2.cardBack.style.cursor = 'auto';

                            shadowTwoCards(card1, card2, '#ecffde');
                            setTimeout(function () {
                                shadowTwoCards(card1, card2, '', false);
                            }, 500);

                            count = 0;
                            winCheck += 1;

                            if (winCheck === (newArrayItems.length / 2)) {
                                setTimeout(function () {
                                    win.style.display = 'flex';
                                    clearInterval(timer);
                                }, 1000);
                                return 0;
                            }
                        }
                    }
                }
            })

            return {
                card,
                cardFront,
                cardBack,
                text,
                id,
                name,
                success
            };
        });
        return newArrayItems;
    }

    // создаем и возвращаем заголовок
    function createAppTitle(title) {
        let appTitle = document.createElement('h1');
        appTitle.innerHTML = title;
        return appTitle;
    }

    // создаем и возвращаем контейнер карт
    function createCardField() {
        let list = document.createElement('div');

        return list;
    }

    // создаем кнопку перезагрузки страницы
    function createReloadBtn() {
        let reloadBtn = document.createElement('button');
        reloadBtn.textContent = "cыграем еще?"
        reloadBtn.classList.add('btn');

        reloadBtn.addEventListener('click', function () {
            location.reload();
        })

        return reloadBtn;
    }

    // создаем таймер
    function createTimer(time1, field) {

        let time = time1;
        let timerCont = document.createElement('div');
        let text = document.createElement('h2');

        timerCont.classList.add('timer');
        text.classList.add('timer-text');


        let intervalFunc = (setInterval(() => {
            time -= 1;
            text.innerText = time;
            if (time <= 0) {
                clearInterval(intervalFunc);
                field.style.display = 'flex';
            }}, 1000));
        timerCont.append(text);

        return {timerCont, intervalFunc};
    }

    // -------- GAME OVER ------------------
    function createGameOverField(text) {
        let field = document.createElement('div');
        let messageField = document.createElement('div');
        let header = document.createElement('h2');
        let btn = createReloadBtn();

        field.classList.add('game-over-field');
        messageField.classList.add('game-over-message-field');
        header.classList.add('title');
        header.classList.add('game-over-header');

        header.innerHTML = text;

        messageField.append(header);
        messageField.append(btn);
        
        field.append(messageField);
        return field;
    }

    // находится сама игра 
    function createMatchPairGame(container) {
        // сделать несколько состояний игры: начальное, сама игра, конечное

        // Первая страница
        let gameTitle = createAppTitle('&middot найди пару &middot');
        const cardField = createCardField();
        let inputFieldObj = createInputData();
        let inputField = inputFieldObj.inputField;
        let inputCol = inputFieldObj.inputCol;
        let inputRow = inputFieldObj.inputRow;
        let inputTime = inputFieldObj.inputTime;

        // Страница игры
        let preGameField = createPreGameField();
        let headerStart = createTitleStart();
        let descStart = createDescStart();
        let btnStart = createBtnStart()

        // Страница окончания игры
        let fieldLostGame = createGameOverField("Эх, не успел..");
        let fieldWinGame = createGameOverField("Ура, <br> ПОБЕДА");

        fieldWinGame.classList.add('win-style');

        gameTitle.classList.add('title');

        // Стили
        cardField.style.display = 'grid';
        cardField.style.justifyContent = 'center';
        cardField.style.alignItems = 'center';
        cardField.style.gridGap = '30px';
        cardField.style.margin = '40px';

        preGameField.append(headerStart);
        preGameField.append(descStart);
        preGameField.append(inputField);
        preGameField.append(btnStart);
        container.append(preGameField);

        btnStart.addEventListener('click', function () {
            preGameField.classList.add('pre-game-field-none');

            let column = inputCol.value;
            let row = inputRow.value;
            let time = inputTime.value * 60;

            let size = '80px';
            let timerObj = createTimer(time, fieldLostGame);
            let timer = timerObj.timerCont;

            if (row > 4) {
                size = '90px';
                cardField.style.gridGap = '10px';
                gameTitle.style.fontSize = '1.7em';
                timer.classList.add('timer-mini')

                if (row < 9 && row > 6) size = '70px';
                else if (row >= 9) size = '50px'
            }

            if ((column * row) % 2 != 0) {
                column = 4;
                row = 4;
            }

            cardField.style.gridTemplateColumns = `repeat(${column}, 100px)`;
            const array = createArrayItems(column, row, size, fieldWinGame, timerObj.intervalFunc);
            array.forEach(el => cardField.append(el.card));

            container.append(gameTitle);
            container.append(cardField);
            container.append(fieldLostGame);
            container.append(fieldWinGame);
            container.append(timer);
        });
    }

    window.createMatchPairGame = createMatchPairGame;
})();