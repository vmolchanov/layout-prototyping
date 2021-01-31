(function() {
    const latinPharses = [
        'Consuetudo est altera natura',
        'Nota bene',
        'Nulla calamitas sola',
        'Per aspera ad astra'
    ];
    const russianPhrases = [
        'Привычка - вторая натура',
        'Заметьте хорошо!',
        'Беда не приходит одна',
        'Через тернии к звёздам'
    ];

    const getRandomNumber = (min, max) => {
        return Math.floor(min + Math.random() * (max - min));
    };

    const renderPhrase = (index, latin, russian) => {
        const phrase = document.createElement('p');
        const number = document.createElement('span');
        const latinPhrase = document.createElement('span');
        const russianPhrase = document.createElement('span');

        phrase.classList.add('phrase');
        phrase.classList.add(index % 2 === 0 ? 'purple-bg' : 'orange-bg');
        number.classList.add('phrase__number');
        latinPhrase.classList.add('phrase__latin');
        russianPhrase.classList.add('phrase__russian');

        number.textContent = `n=${index}`;
        latinPhrase.textContent = `"${latin}"`;
        russianPhrase.textContent = `"${russian}"`;

        phrase.appendChild(number);
        phrase.appendChild(latinPhrase);
        phrase.appendChild(russianPhrase);

        return phrase;
    };
    
    const container = document.querySelector('#rand');
    const createButton = document.querySelector('.create-button');
    const repaintButton = document.querySelector('.repaint-button');
    
    let currentIndex = 0;
    
    createButton.addEventListener('click', (e) => {
        e.preventDefault();

        let index = -1;

        if (latinPharses.length !== 0) {
            index = getRandomNumber(0, latinPharses.length);
        }

        if (index === -1) {
            alert('Фразы закончились');
            return;
        }

        const phrase = renderPhrase(currentIndex, latinPharses[index], russianPhrases[index]);

        latinPharses.splice(index, 1);
        russianPhrases.splice(index, 1);
        
        container.appendChild(phrase);
        currentIndex++;
    });

    repaintButton.addEventListener('click', (e) => {
        e.preventDefault();
        const phrases = container.querySelectorAll('.phrase');
        phrases.forEach((phrase, index) => {
            if (index % 2 === 0) {
                phrase.style.fontWeight = 'bold';
            }
        });
    });
})();
