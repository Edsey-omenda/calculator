// *** Write your code here***
document.addEventListener("DOMContentLoaded", () => {
 
  });

let operators = ["+", "-", "/", "*", ".", "="];
let box = null;
let last_operation_history = null;
let operator = null;
let equal = null;
let dot = null;

let num1 = true;

let numbers = [];
let operatorValue;
let lastButton;
let calcOperator;

let total;


function showSelectedOperator(button) {

    operator = document.getElementById("operator");
    box = document.getElementById("result");
    last_operation_history = document.getElementById("last_operation_history");
    equal = document.getElementById("equal_sign").value;
    dot = document.getElementById("dot").value;
    
    lastButton = button;

    // if button clicked is not an operator, consider this
    if (!operators.includes(button) && button!=equal){
        // if  the first button is clicked
        if (firstNum){
            // if  it's a dot show 0.
            if (button == dot){
                box.innerText = "0"+dot;
            }
            // otherwise clear box then show the number
            else {
                box.innerText = button;
            }
            num1 = false;
        }
        else {

            // return when box value is 0
            if (box.innerText.length == 1 && box.innerText == 0){

                if (button == dot){
                    box.innerText += button;
                }
                return;
            }
            // return if the box already has a dot 
            if (box.innerText.includes(dot) && button == dot){
                return;
            }
            // maximum input equals 10
            if (box.innerText.length == 10){
                return;
            }

            // manipulate value to equate -value entered
            if (button == dot && box.innerText == "-"){
                box.innerText = "-0"+dot;
            }
            // return value entered
            else {
                box.innerText += button;
            }  
        }
    }
    // value is an operator or equal
    else {

        // return if operator is tapped
        if (operatorValue != null && button == operatorValue){
            return
        }

        // print the operator value tapped
        if (button == "-" && box.innerText == 0){
            box.innerText = button;
            num1 = false;
            operatorValue = button
            showSelectedOperator()
            return;
        }
        // overide history and return the value operator tapped
        else if (operators.includes(button) && box.innerText == "-"){
            return
        }
    
        else if (button == "-" && operatorValue == "-" && last_operation_history.innerText.includes("=")){
            return
        }

        if (operators.includes(button)){
            if (typeof last_operator != "undefined" && last_operator != null){
                calcOperator = lastOperator
            }
            else {
                calcOperator = button
            }
            if (button == "*"){
                lastOperator = "×"
            }
            else if (button == "/"){
                lastOperator = "÷"
            }
            else {
                lastOperator = button
            }
            operatorValue = button
            num1 = true
         calcNumbers()
        }

        
        if (numbers.length == 0){
            numbers.push(box.innerText)
            if (typeof lastOperator != "undefined" && lastOperator != null){
                last_operation_history.innerText = box.innerText + " " + lastOperator
            }
        }
       
        else {   
            if (numbers.length == 1){
                numbers[1] = box.innerText
            }
            let newNum = box.innerText

           
            if (button==equal && calcOperator != null){
                var total = calculate(numbers[0], numbers[1], calcOperator)
                box.innerText = total;

              
                if (!last_operation_history.innerText.includes("=")){
                    last_operation_history.innerText += " " + numbers[1] + " ="
                }

                newNum = numbers[0]

                numbers[0] = total
                operatorValue = null
                showSelectedOperator()

                
                let lastArray = last_operation_history.innerText.split(" ")
                lastArray[0] = newNum
                last_operation_history.innerText = lastArray.join(" ")
            }
            
            else if (calcOperator != null) {
                 last_operation_history.innerText = newNum + " " + lastOperator
                 calc_operator = button
                 numbers = []
                 numbers.push(box.innerText)
            }
        }
    }

}

function calcNumbers(numA, numB, operator){

    if (operator === "+"){
        total = (parseFloat)(numA)+(parseFloat)(numB)
    }
    else if (operator === "-"){
        total = (parseFloat)(numA)-(parseFloat)(numB)
    }
    else if (operator === "*"){
        total = (parseFloat)(numA)*(parseFloat)(numB)
    }
    else if (operator === "/"){
        total = (parseFloat)(numA)/(parseFloat)(numB)
    }
    else {
        if (total == box.innerText){
            return total
        }
        else {
            return box.innerText
        }
    }
 
    if (!Number.isInteger(total)){
        total = total.toPrecision(12);
    }
    return parseFloat(total);
}

function buttonClear(){
    window.location.reload()
}