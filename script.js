const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.buttonPad'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

// const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
// const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
// const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
// const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  n1 = Number(n1);
  n2 = Number(n2);
  if(operator === '+'){
    result = n1 + n2;
  }
  if(operator === '-'){
    result = n1 - n2;
  }
  if(operator === '*'){
    result = n1 * n2;
  }
  if(operator === '/'){
    result = n1 / n2;
  }

  return String(result);
}

// buttons.addEventListener('click', function (event) {
//   // 버튼을 눌렀을 때 작동하는 함수입니다.

//   const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
//   const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
//   const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
//   // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

//   if (target.matches('button')) {
//     // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
//     // 클릭된 HTML 엘리먼트가 button이면
//     if (action === 'number') {
//       // 그리고 버튼의 클레스가 number이면
//       // 아래 코드가 작동됩니다.
//       if(firstOperend.textContent === '0'){
//         firstOperend.textContent = buttonContent;
//         console.log('숫자 ' + buttonContent + ' 버튼');
//       }
//       else{
//         secondOperend.textContent = buttonContent;
//         console.log('숫자 ' + buttonContent + ' 버튼');
//       }
//     }

//     if (action === 'operator') {
//       operator.textContent = buttonContent;
//       console.log('연산자 ' + buttonContent + ' 버튼');
//     }

//     if (action === 'decimal') {
//       console.log('소수점 버튼');
//     }

//     if (action === 'ac') {
//       firstOperend.textContent = 0;
//       operator.textContent = '+';
//       secondOperend.textContent = 0;
//       calculatedResult.textContent = 0;
//       console.log('초기화 버튼');
//     }

//     if (action === 'enter') {
//       calculatedResult.textContent = calculate(firstOperend.textContent, operator.textContent, secondOperend.textContent);
//       console.log('계산 버튼');
//     }
//   }
// });


// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.

const display = document.querySelector('.calculator__display--for-advanced'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드는 수정하지 마세요.

  // ! 여기서부터 Advanced Challenge & Nightmare 과제룰 풀어주세요.
  if (target.matches('button')) {
    if (action === 'number') {
      if(display.textContent === '0' || previousKey === 'operator' || previousKey === 'calculate'){ //화면이 0이거나 직전에 연산자나 enter를 눌렀다면,
        display.textContent = buttonContent; //첫 숫자 입력 or 연산자 또는 calculate을 누른 다음이라면 그 다음 계산할 숫자나 pr
      }else{
        display.textContent = display.textContent + buttonContent; //숫자를 연달아 출력
      }
      previousKey = 'number';
    }
    if (action === 'operator') {
      if(firstNum && operatorForAdvanced && previousKey !== 'operator' && previousKey !== 'calculate'){ 
        //연산자를 누르기 전의 숫자면서, 연산자를 누르면서, 직전 값이 숫자이며 직전 값이 enter도 아니라면
        display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent); //연산자를 누르기 전의 숫자 <operator> 화면의 숫자
      }
      firstNum = display.textContent; //연산자를 누르기 전의 화면의 숫자
      console.log(`FirstNum : ${display.textContent}`);
      operatorForAdvanced = buttonContent;
      previousKey = 'operator';
    }
    if (action === 'decimal') {
      if(!display.textContent.includes('.') && previousKey !== 'operator'){ //Nightmare: 화면의 .를 포함하지 않으면서 이전 값이 연산자가 아니라면(.을 연속으로 눌러도 처음 단 한번만 출력)
        display.textContent = display.textContent + '.'; //화면의 숫자 뒤에 .을 출력한다.
      }else if(previousKey === 'operator'){ //이전값이 연산자라면(숫자가 아니라면)
        display.textContent = '0' + buttonContent; //Nightmare: 정수 부분 없이 . 버튼과 숫자를 눌러서 작동시키는 경우 소수로 나타냄(.5 -> 0.5)
      }
      previousKey = 'decimal';
    }
    if (action === 'ac') {
      firstNum = undefined;
      operatorForAdvanced = undefined;
      previousKey = undefined;
      previousNum = undefined;
      display.textContent = '0';
    }
    if (action === 'enter') {
      if(firstNum){ //firstNum이 있을 때,
        if(previousKey === 'calculate') { //Nightmare: 바로 직전에 enter를 눌렀을 때(연산자 버튼 누르기 전 실수로 enter 여러번 눌러도 정상 작동)
          display.textContent =  calculate(display.textContent, operatorForAdvanced, previousNum); //Nightmare: 화면의 숫자 <opator> 직전값(enter 버튼 여러번 눌렀을 때 직전의 oper랑 숫자 계속 수행)
        }else{ //일반적인 계산(Advanced Challenge test때 구현한 코드)
          previousNum = display.textContent; //enter 직전의 화면의 숫자
          display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent); //연산자를 누르기 전 숫자 <operator> 화면의 숫자
          //previousKey = 'calculate';
        }
      }
      previousKey = 'calculate';
    }
  }
});
