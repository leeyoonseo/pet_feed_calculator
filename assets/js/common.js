(function(){
    
/**
 * [TODO] 
 * 1. 월을 기준으로 계산하자
 * 2. 숫자만 입력받기
 *   
 */

    let input = document.querySelectorAll('input');
    let submitBtn = document.querySelector('#submitBtn');
    let selectAge = document.querySelector('#selectAge');
    let selectWeight = document.querySelector('#selectWeight');
    let inputAge = document.querySelector('#inputAge');
    let inputWeight = document.querySelector('#inputWeight');
    let viewer = document.querySelector('#viewer');

 

   // 일수 구하기
   // [TODO] 일수말고, 월수를 기준으로 잡자!
   let getMonthData = (age) => {

        // 1일 들어옴
        let idx = 0;
        let month = getMonthNum(age);

        return month;

        function getMonthNum(age, i = 0){
            let date = new Date();
            let yy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let day = new Date(yy, mm - [i], 0).getDate();
            let diffVal = day - age;
            
            // 한달
            if(diffVal === 0){
                idx++;

            // 한달 이상
            }else if(Math.sign(diffVal) === -1){
                i++
                idx++;
                getMonthNum(Math.abs(diffVal), i);
            }

            return idx;
        }       
   }

    let weightConverter = (weight) => {
        if(selectWeight.value === 'kg'){
            return weight = weight * 1000;
        }

        return weight;
    };

    let ageConverter = (age) => {
        if(selectAge.value === 'year'){
            age = age * 12;
        }else if(selectAge.value === 'day'){
            age = getMonthData(age);
        }

        return age;
    };

    let draw = (num) => {
        console.log(num)
    }

     /*
        info
        강아지
        새끼강아지 2시간에 한번 총 12번 105ml의 끓인물에 30g 파우더 스스로 그만먹을때까지
        생후 ~2주(14일)= 모유, 상황이 여의치 않는다면 새끼강아지용 우유 급여 6~8회에 걸쳐 

        2~3개월 이하 6~7% 3,4회 나누어 급여
        3~6개월 몸무게의 4~5% 가량을 하루에 2~3회 나누어 급여
        6~12 개월 2~3% 가량을 하루에 2회 나누어 급여
        12개월~5살 2% 하루에 2회 나누어 급여
    */

    let feedCalculator = (weight, age) =>{
        console.log(weight, age);
        let result = {};
        
        // 한달 미만
        if(age <= 1){
            console.log('모유기이네요')

        }else if(age >= 2 && age <= 3){
            console.log('2~3개월')
            result.lowest = weight * 0.06;
            result.highest = weight * 0.07;
            result.num = '3, 4';

        }else if(age >= 4 && age <= 6){
            result.lowest = weight * 0.04;
            result.highest = weight * 0.05;
            result.num = '2, 3';

        }else if(age >= 7 && age <= 11){
            console.log('6~11개월')
            result.lowest = weight * 0.02;
            result.highest = weight * 0.03;
            result.num = '2';

        }else{
            console.log('1살보다많아요')
            result.lowest = weight * 0.02;
            result.num = '2';
        }

        return result;
    };

    let drawViewer = (info) => {
        if(!info){
            console.log('모유기?')

        }else{
            console.log(info)


        }
    };

    let controller = () => {
        let age = Number(inputAge.value);
        let weight = Number(inputWeight.value);
        let result;

        // TODO 객체로 인자 넘기는 방법
        weight = weightConverter(weight);     
        age = ageConverter(age);

        drawViewer(feedCalculator(weight, age));
    };


    // [TODO] validation과 err에 대해 생각해보기
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

    // [TODO] 처음에 포커싱 시키고 그 다음엔 확인 클릭마다 포커싱
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
            controller();
        }
    });
})();