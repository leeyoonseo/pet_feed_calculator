(function(){
    
    let input = document.querySelectorAll('input');
    let submitBtn = document.querySelector('#submitBtn');
    let selectAge = document.querySelector('#selectAge');
    let selectWeight = document.querySelector('#selectWeight');
    let inputAge = document.querySelector('#inputAge');
    let inputWeight = document.querySelector('#inputWeight');
    let viewer = document.querySelector('#viewer');
  
    let drawResult = ({ lowest, highest, frequency }) => {
        // 한달 이하
        viewer.innerHTML = '';

        if(!lowest || !highest || !frequency){
            viewer.append('모유기')
            console.log(lowest, highest, frequency)

        }else{
            console.log(lowest, highest, frequency)
            // 한달 이상
        }
    };

    /*
        강아지
        새끼강아지 2시간에 한번 총 12번 105ml의 끓인물에 30g 파우더 스스로 그만먹을때까지
        생후 ~2주(14일)= 모유, 상황이 여의치 않는다면 새끼강아지용 우유 급여 6~8회에 걸쳐 

        2~3개월 이하 6~7% 3회 나누어 급여
        3~6개월 몸무게의 5~6% 가량을 하루에 2~3회 나누어 급여
        6~12 개월 4~5% 가량을 하루에 2회 나누어 급여
        12개월~5살 2~3% 하루에 2회 나누어 급여
    */

    let calculator = () => {
        let age = Number(inputAge.value);
        let weight = Number(inputWeight.value);
        let result = {};

        if(selectWeight.value === 'kg'){
            weight = weight * 1000;
        }

        if(selectAge.value === 'year'){
            // 1살 === 12개월
            age = 12 / age;

            drawResult({ 
                lowest : weight * 0.2, 
                highest : weight * 0.3,
                frequency : 2
            });


        }else if(selectAge.value === 'day'){
            // 23일 === 23일
            if(age < 29){
                drawResult();

            // 31일 === 1.
            }else{
                age = age / 30;
            }
        }

        console.log(age)
    };

    let error = {
        show : (target) => {
            target.style.border = '1px solid red';
            
            let err = target.parentNode.querySelector('.err') || document.createElement('span');

            if(err.classList.contains('err')){
                err.style.display = 'block';

            }else{
                err.classList.add('err');
                err.innerText = 'a';
                target.parentNode.appendChild(err);
            }
        },

        hide : ({ target }) => {
            target.style.border = '1px solid #333';
            
            let err = target.parentNode.querySelector('.err');
            
            if(err){
                err.style.display = 'none';
            }
        }
    };

    inputAge.addEventListener('focus', error.hide);
    inputWeight.addEventListener('focus', error.hide);

    submitBtn.addEventListener('click' , () => {
        let flag = true;

        for(let i = 0; i < input.length; i++){
            if(!input[i].value){
                error.show(input[i]);

                flag = false;
            }
        }

        if(flag){
            calculator();
        }
    });
})();