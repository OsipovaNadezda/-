// select header
const selectHeader = document.querySelector('.select__header');
const selectBody = document.querySelector('.select__body');
const selectItem = document.querySelectorAll('.select__item');
const selectSpan = document.querySelector('.select__title');
const selectImg = document.querySelector('.select__header img');

selectHeader.addEventListener('click', () => {
    if (selectBody.classList.contains('select__body--activ')) {
        selectBody.classList.remove('select__body--activ');
        selectImg.style.transform = 'rotate(0deg)';
        selectBody.style.maxHeight = null;
    } else {
        selectBody.classList.add('select__body--activ');
        selectImg.style.transform = 'rotate(180deg)';
        selectBody.style.maxHeight = selectBody.scrollHeight + 'px';
    }

    selectItem.forEach((item, i) => {
        item.addEventListener('click', () => {
            selectSpan.textContent = item.textContent;
            selectBody.classList.remove('select__body--activ');
            selectImg.style.transform = 'rotate(0deg)';
            selectBody.style.maxHeight = null;
        })
    });
});

// maps
let center = [55.60537763942397, 37.50789281661301];
let playsmarks = [{
        latitude: 55.60537763942397,
        longitude: 37.50789281661301,
        hintContent: "ОфисДирект",
        balloonContentHeader: "ОфисДирект",
        balloonContentBody: "Адрес:г.Москва, ул.Набережная, д.48",
        balloonContentFooter: "Время работы:пн-пт: 8.00-17.00",
    },
    {
        latitude: 55.60739499520887,
        longitude: 37.26118364902983,
        hintContent: "Аэропорт 'Внуково'",
        balloonContentHeader: "Аэропорт 'Внуково'",
        balloonContentBody: "Киевское шоссе",
        balloonContentFooter: "Время работы:ежедневно",
    },
    {
        latitude: 55.52217842734124,
        longitude: 37.49876299473298,
        hintContent: "Аэропорт 'Остафьево'",
        balloonContentHeader: "Аэропорт 'Остафьево'",
        balloonContentBody: "Варшавское шоссе",
        balloonContentFooter: "Время работы:ежедневно",
    }

];

function init() {
    let map = new ymaps.Map('map-element', {
        center: center,
        zoom: 11
    });

    playsmarks.forEach(function (obj) {
        let playsmark1 = new ymaps.Placemark([obj.latitude, obj.longitude], {
            hintContent: obj.hintContent,
            balloonContentHeader: obj.balloonContentHeader,
            balloonContentBody: obj.balloonContentBody,
            balloonContentFooter: obj.balloonContentFooter,
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/maps/marker.svg',
            iconImageSize: [49, 69],
            iconImageOffset: [-20, -60]
        });
        map.geoObjects.add(playsmark1);
    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты  

}
ymaps.ready(init);

//mobile menu
const headerMobile = document.querySelector('.header__mobile'),
    burger = document.querySelector('.header__burger'),
    cross = document.querySelector('.header__cross'),
    body = document.querySelector('body');

burger.addEventListener('click', (e) => {
    headerMobile.classList.toggle('active');
    burger.style.display = 'none';
    cross.style.display = 'block';
});
cross.addEventListener('click', (e) => {
    headerMobile.classList.toggle('active');
    burger.style.display = 'block';
    cross.style.display = 'none';
    body.classList.remove('noscroll')
});

//modal
const modal = document.querySelector('.modal'),
    modalButtons = document.querySelectorAll('.button__modal');

modalButtons.forEach((item) => {
    item.addEventListener('click', () => {
        modal.classList.add('active');
        body.classList.add('noscroll');
    });
});

modal.addEventListener('click', (e) => {
    const isModal = e.target.closest('.modal__inner');

    if (!isModal) {
        modal.classList.remove('active');
        body.classList.add('noscroll');
    }
});

// //modal-form
// const modalForm = document.querySelector('.modal-form');
// const modalFormButton = document.querySelector('.button__modal-form');

// modalFormButton.addEventListener('click', () =>{
//     modalForm.classList.add('active');
//     body.classList.add('noscroll');
// })

//slider
const swiper = new Swiper('.slider', {
    loop: true,
    pagination: {
        el: '.slider__pagination',
    },
    navigation: {
        nextEl: '.slider__arrow-left',
        prevEl: '.slider__arrow-right',
    }
});

// //iform send
// const form = document.querySelector('.form__elements');

// const sendForm = (data) => {
//     return fetch('mail.php', {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8'
//         }
//     }).then(res => res.json());
// };

// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const dataForm = new FormData(form);
//     const user = {};

//     dataForm.forEach((val, key) => {
//         user[key] = val;
//     });

//     sendForm(user).then(data => {
//         console.log("Письмо успешно ушло!");
//     });

//     form.reset();
// });



  //form send + validation
const form = document.querySelector('.form__elements');

const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');
inputMask.mask(telSelector);

const validation = new JustValidate('.form__elements');

validation
    .addField('#name', [{
        rule: 'minLenght',
        value: 2,
        errorMessage: 'Количество символов меньше 2!'
    },
    {
        rule: 'maxLenght',
        value: 30,
        errorMessage: 'Количество символов больше 30!'
    },
    {
        rule: 'required',
        value: true,
        errorMessage: 'Введите имя!'
    }
])
.addField('#phone', [{
            rule: 'required',
            value: true,
            errorMessage: 'Введите номер телефона!'
        }, 
        {
            rule: 'function',
            validator: function () {
                const telephone = telSelector.inputMask.unmaskedvalue();
                return telephone.lenght === 10;
            },
            errorMessage: 'Введите корректный номер телефона!'
        }
    ]).onSuccess((e) => { 
        const sendForm = (data) => {
            return fetch('mail.php', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(res => res.json());
        };

        // form.addEventListener('submit', (e) => {
        //     e.preventDefault();

        const dataForm = new FormData(e.target);
        const user = {};

        dataForm.forEach((val, key) => {
            user[key] = val;
        });

        sendForm(user).then(data => {
            console.log("Письмо успешно ушло!");
        });

        e.target.reset();
        // });
    });

//accardion
let accardion = document.querySelector('.facts__items'),
    tab = document.querySelectorAll('.facts__item'),
    answer = document.querySelectorAll('.facts__answer'),
    plus = document.querySelectorAll('.facts__plus'),
    minus = document.querySelectorAll('.facts__minus');

accardion.addEventListener('click', (e) => {
    const target = e.target.closest('.facts__item');
    if (target) {
        tab.forEach((item, i) => {
            if (item === target) {
                answer[i].classList.add('active');
                tab[i].classList.add('facts__item--active');
                plus[i].style.display = 'none';
                minus[i].style.display = 'flex';
            } else {
                answer[i].classList.remove('active');
                tab[i].classList.remove('facts__item--active');
                plus[i].style.display = 'flex';
                minus[i].style.display = 'none';
            }
        });      
    }
});

// //accardion jquery
// $('.facts__item').click(function (e) {
//     $('.facts__answer').removeClass('active');
//     $('.facts__item').removeClass('.facts__item--active');
//     $('.facts__plus').css('display', 'flex');
//     $('.facts__minus').css('display', 'none');

//     let target = $(e.target.closest('.facts__item'));
//     if (target) {
//         $(this).find('.facts__answer').addClass('active');
//         $(this).addClass('.facts__item--active');
//         $(this).find('.fact__plus').css('display', 'none');
//         $(this).find('.fact__minus').css('display', 'flex');
//     }
// });