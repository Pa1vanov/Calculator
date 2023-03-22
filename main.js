class Calculator {
    constructor(previousOper, currentOper){
        this.previousOper = previousOper;
        this.currentOper = currentOper
        this.clear();
    }
    clear () {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNum (number) {
        if(number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOper (operation) { 
        if(this.currentOperand === "") return
        if(this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute () {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "*":
                computation = prev * current;
                break;
            case "/":
                computation = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNum (number) {
        const floatNumber = parseFloat(number)
        if (isNaN(floatNumber)) return ''
        return floatNumber.toLocaleString('en')
    }

    updateDisplay () {
        this.currentOper.innerText = this.getDisplayNum(this.currentOperand);
        if(this.operation != null) {
            this.previousOper.innerText = 
            `${this.previousOperand} ${this.operation}`
        }
    }
}


const numsBtns = document.querySelectorAll('[data-number]');
const operBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOper = document.querySelector('[data-previous-operand]');
const currentOper = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOper, currentOper);

numsBtns.forEach(btn =>{
    btn.addEventListener('click', () =>{
        calculator.appendNum(btn.innerText);
        calculator.updateDisplay()
    });
});

operBtns.forEach(btn =>{
    btn.addEventListener('click', () =>{
        calculator.chooseOper(btn.innerText);
        calculator.updateDisplay()
    });
});

equalsBtn.addEventListener('click', (btn) =>{
    calculator.compute()
    calculator.updateDisplay()
});

allClearBtn.addEventListener('click', (btn) =>{
    calculator.clear()
    calculator.updateDisplay()
});

deleteBtn.addEventListener('click', (btn) =>{
    calculator.delete()
    calculator.updateDisplay()
});






