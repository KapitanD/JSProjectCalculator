"use strict";
const DATA = {
        whichSite: ['landing', 'multiPage', 'onlineStore'],
        price: [4000, 8000, 26000],
        desktopTemplates: [50, 40, 30],
        adapt: 20,
        mobileTemplates: 15,
        editable: 10,
        metrikaYandex: [500, 1000, 2000],
        analyticsGoogle: [850, 1350, 3000],
        sendOrder: 500,
        deadlineDay: [
                [2, 7],
                [3, 10],
                [7, 14]
        ],
        deadlinePercent: [20, 17, 15]
};

const startButtonElem = document.querySelector('.start-button'),
        firstScreenElem = document.querySelector('.first-screen'),
        mainFormElem = document.querySelector('.main-form'),
        formCalculateElem = document.querySelector('.form-calculate'),
        endButtonElem = document.querySelector('.end-button'),
        totalElem = document.querySelector('.total'),
        fastRangeElem = document.querySelector('.fast-range'),
        totalPriceSumElem = document.querySelector('.total_price__sum'),
        mobileTemplatesElem = document.querySelector('#mobileTemplates'),
        adaptElem = document.querySelector('#adapt');


function showElem(elem) {
        elem.style.display = 'block';
}

function hideElem(elem) {
        elem.style.display = 'none';
}

function priceCalculation(elem) {
        let result = 0,
                index = 0,
                options = [];
        
        if (elem.name === 'whichSite') {
                for (const item of formCalculateElem.elements) {
                        if (item.type === 'checkbox') {
                                item.checked = false;
                                if(item.value === 'mobileTemplates'){
                                        item.disabled = true;
                                }
                        }
                        hideElem(fastRangeElem);
                }
        }

        for (const item of formCalculateElem.elements) {
                if(item.name === 'whichSite' && item.checked){
                        index = DATA.whichSite.indexOf(item.value);
                }else if(item.classList.contains('calc-handler') && item.checked){
                        options.push(item.value);
                }
        }

        options.forEach(function(key){
                if(typeof(DATA[key]) === 'number'){
                        if(key === 'sendOrder'){
                                result += DATA[key];
                        } else{
                                result += DATA.price[index] * DATA[key] / 100;
                        }
                } else {
                        if(key === 'desktopTemplates'){
                                result += DATA.price[index] * DATA[key][index] / 100;
                        } else{
                                result += DATA[key][index];
                        }
                }
        });

        result += DATA.price[index];
        
        totalPriceSumElem.textContent = result;
}

function handlerCallbackForm(event) { //как event передается?
        const target = event.target;


        if (target.classList.contains('want-faster')) {
                target.checked ? showElem(fastRangeElem) : hideElem(fastRangeElem);
        }

        if (target.classList.contains('calc-handler')) {
                priceCalculation(target);
        }
}

startButtonElem.addEventListener('click', function () {
        showElem(mainFormElem);
        hideElem(firstScreenElem);
});

endButtonElem.addEventListener('click', function () {
        for (const elem of formCalculateElem.elements) {
                if (elem.tagName === 'FIELDSET') {
                        hideElem(elem);
                }
        }

        showElem(totalElem);
});

formCalculateElem.addEventListener('change', handlerCallbackForm);

adaptElem.addEventListener('change', function(event){
        const target = event.target;
        mobileTemplatesElem.checked = false;
        if (target.checked){
                mobileTemplatesElem.disabled = false;  
        }else{
                mobileTemplatesElem.disabled = true;
        }
});