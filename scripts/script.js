const numberDisplay = document.querySelector('#numberDisplay');
const expressionDisplay = document.querySelector('#expressionDisplay');
const deleteButton = document.querySelector('#deleteButton');
const clearButton = document.querySelector('#clearButton');
const numberButton = document.querySelectorAll('#number');
const operatorButton = document.querySelectorAll('#operator');
const equal = document.querySelector('#equal');
const floatingPointButton = document.querySelector('#floatingPoint');
let operator,currentNumber='';
numberDisplay.textContent='0';
expressionDisplay.textContent='';
numberButton.forEach((number)=>number.addEventListener('click',function()
    {
        currentNumber+=number.textContent;
        if (numberDisplay.textContent=='0')
        {
            numberDisplay.textContent=number.textContent;
        }
        else
        {
            numberDisplay.textContent+=number.textContent;
        }
    }
));

floatingPointButton.addEventListener('click',()=>
{
    if(currentNumber.indexOf('.')==-1)
    {
        numberDisplay.textContent+=floatingPointButton.textContent;
        currentNumber+=floatingPointButton.textContent;
    }
});
operatorButton.forEach((op)=>op.addEventListener('click',function()
{
    expressionDisplay.textContent+=currentNumber;
    currentNumber='';
    operator=op.textContent;
    let equalSignTest=expressionDisplay.textContent.indexOf('=')!=-1;
    let twoOperatorTest=expressionDisplay.textContent.split(/[+*/-]/).length==2;
    if(equalSignTest)
    {
        expressionDisplay.textContent=numberDisplay.textContent;
    }
    else if(twoOperatorTest && !equalSignTest)
    {
        evaluate();
        expressionDisplay.textContent=numberDisplay.textContent;
        numberDisplay.textContent='0';
    }
    
    expressionDisplay.textContent+=operator;
    numberDisplay.textContent='0';
}));

equal.addEventListener('click',evaluate)
clearButton.addEventListener('click',()=>
{
    expressionDisplay.textContent='';
    numberDisplay.textContent='0';
})
deleteButton.addEventListener('click',()=>
{
    numberDisplay.textContent=numberDisplay.textContent.substring(0,numberDisplay.textContent.length-1);
})


function add(x,y)
{
    return x+y;
}

function substract(x,y)
{
    return x-y;
}

function multiply(x,y)
{
    return x*y;
}

function divide(x,y)
{
    return x/y;
}

function evaluate()
{
    let res;
    expressionDisplay.textContent+=currentNumber;
    let expression=expressionDisplay.textContent;
    let numbers=expression.split(/[+*/-]/);
    let x=Number(numbers[0]),y=Number(numbers[1]);
    if(expression.includes('+'))
    {
        res=add(x,y);
    }
    else if(expression.includes('-'))
    {
        res=substract(x,y);
    }
    else if(expression.includes('*'))
    {
        res=multiply(x,y);
    }
    else if(expression.includes('/'))
    {
        res=divide(x,y);
    }
    numberDisplay.textContent=String(res);
    expressionDisplay.textContent+='=';
}