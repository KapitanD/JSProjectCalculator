const startButtonElem = document.querySelector('.start-button'),
        firstScreenElem = document.querySelector('.first-screen'),
        mainFormElem = document.querySelector('.main-form'),
        formCalculateElem = document.querySelector('.form-calculate'),
        endButtonElem = document.querySelector('.end-button'),
        totalElem = document.querySelector('.total'),
        fastRange = document.querySelector('.fast-range');

function showElem(elem) {
        "use strict"; //зачем это нужно?
        elem.style.display = 'block';
}

function hideElem(elem) {
        "use strict";
        elem.style.display = 'none';
}

function handlerCallbackForm(event){//как event передается?
        "use strict";
        const target = event.target;


        if(target.classList.contains('want-faster')){
               target.checked ? showElem(fastRange) : hideElem(fastRange); 
               //Expected an assignment or function call and instead saw an expression.
        }
}

startButtonElem.addEventListener('click', function(){
        "use strict";
        showElem(mainFormElem);
        hideElem(firstScreenElem);
});

endButtonElem.addEventListener('click', function(){
        "use strict";
        for (const elem of formCalculateElem.elements){
                if(elem.tagName === 'FIELDSET'){
                        hideElem(elem);
                }
        }

        showElem(totalElem);
});

formCalculateElem.addEventListener('change', handlerCallbackForm);
//тут типо закрепляется за событием вызов функции, но поч функция без параметров?