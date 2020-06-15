(function(){
    
/**
 * [TODO] 
 * 2. 숫자만 입력받기 (validation처리, error 처리 생각)
 * 3. 네이밍 정리
 * 4. 리팩터링
 * 5. 강아지 고양이 나눠서 js, 같이 쓸 수 있는 모듈은 common으로 빼기
 * 6. 애니메이션 처리
 * 7. 포커싱
 * 8. 객체로 인자 넘기는 방법
 * 9. 타입스크립트 - 리액트
 * 10. 배포, 자동빌드
 * 11. 이미지 따로 관리? 이건고민
 */

 // [TODO] 네이밍에 Node 붙이기
    let input = document.querySelectorAll('input');
    let submitBtn = document.querySelector('#submitBtn');
    let selectAge = document.querySelector('#selectAge');
    let selectWeight = document.querySelector('#selectWeight');
    let inputAge = document.querySelector('#inputAge');
    let inputWeight = document.querySelector('#inputWeight');
    let foodBasket = document.querySelector('#foodBasket');
    let copyrightYearNode = document.querySelector('#year');

    const viewer = document.querySelector('.viewer');
    const viewerClose = document.getElementById('viewerClose');
    let viewerInfoNode = document.querySelector('#viewerInfo');

    let date = new Date();
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;

    // [TODO] 확인해보기
    copyrightYearNode.innerText = `${yy}.${mm}`;
    
   let getMonthData = (age) => {
        let idx = 0;
        let month = getMonthNum(age);

        return month;

        function getMonthNum(age, i = 0){
            
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
        let result = {
            age,
            weight
        };
        
        // 한달 미만
        if(age <= 1){
            return false;

        }else if(age >= 2 && age <= 3){
            result.lowest = Math.floor(weight * 0.06);
            result.highest = Math.floor(weight * 0.07);
            result.frequency = '3,4';

        }else if(age >= 4 && age <= 6){
            result.lowest = Math.floor(weight * 0.04);
            result.highest = Math.floor(weight * 0.05);
            result.frequency = '2,3';

        }else if(age >= 7 && age <= 11){
            result.lowest = Math.floor(weight * 0.02);
            result.highest = Math.floor(weight * 0.03);
            result.frequency = '2';

        }else{
            result.lowest = Math.floor(weight * 0.02);
            result.frequency = '2';
        }

        return result;
    };

    let drawFood = () => {
        let span = document.createElement('span');
        span.classList.add('food');

        return span;
    }

    let drawViewer = (info) => {
        if(!info){
            foodBasket.classList.add('baby');
            
            for(let i = 0; i < 3; i++){
                foodBasket.appendChild(drawFood());
            }

            viewerInfoNode.innerText = '모유기때는 아가가 배고플때마다 줘야해요.';

        }else{
            foodBasket.classList.remove('baby');

            let frequencySplit = info.frequency.split(',');
            let frequencyText = frequencySplit.join('~');
            let foodText = `${info.lowest}g`;
            let weightText = `${info.weight}g`;

            if(frequencyText.length > 1){
                console.log(info.highest)
                foodText = `${info.lowest}~${info.highest}g`;
            }

            if(selectWeight.value === 'kg'){
                weightText = `${info.weight/1000}kg`;
            }

            // [TODO] 이거 나타날때 애니메이션 할 수 있게 setTimeout 시간을 조절하자.
            for(let i = 0; i < frequencySplit[1]; i++){
                foodBasket.appendChild(drawFood());
            }

            let result = `<span class="viewer__title">${info.age}개월, ${weightText}</span>`;
            result += `<span class="viewer__text">하루에 <span class="highlight">${foodText}</span>을`;
            result += `<span class="highlight">${frequencyText}회</span>에 나눠 급여</span>`;

            viewerInfoNode.innerHTML = result;
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
            target.classList.add('error');
            
            let err = target.parentNode.querySelector('.err') || document.createElement('span');

            err.classList.add('err');
            err.innerText = '입력해주세요.';
            target.parentNode.appendChild(err);

            setTimeout(() => {
                err.remove();
            }, 1000);
        },

        hide : ({ target }) => {
            target.classList.remove('error');
            
            let err = target.parentNode.querySelector('.err');
            err && err.remove();    
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
            if(foodBasket.getElementsByClassName('food')){
                foodBasket.innerHTML = '';
                viewerInfoNode.innerText = '';
            } 

            controller();

            viewer.classList.add('on');
        }
    });

    viewerClose.addEventListener('click', () => {
        viewer.classList.remove('on');
    });
})();