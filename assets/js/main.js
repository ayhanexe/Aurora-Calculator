document.addEventListener('DOMContentLoaded', function() {
    
    console.log('%cCoded By 0x21106', 'background-color:black; padding:10px; font-family:Calibri; font-size:2.5em; font-weight:bold; color:#FF464C;')
    console.log('%cCalculator Version 1.0.0', 'background-color:black; padding:10px; font-family:Calibri; font-size:2em; font-weight:bold; color:greenyellow;')
    
    let buttons,
        screen,
        screenValue = "0";
        progressCount = 0;
        dotCount = 0;
    
    window.addEventListener('keyup', function(e) {
        keyboardEvents(e)
    })
    
    function init() {
        buttons = document.querySelectorAll('.calculator-button')
        screen = document.querySelector('#calculator-screen')
        buttons.forEach(function(button) {
            button.addEventListener('click', function() {
                calculatorBtnClicked(this.getAttribute('data-value'))
                renderCalculatorScreen(screenValue)
            })
        })
    }
    init()
    
    function calculatorBtnClicked(value) {
        if(!isNaN(value)) {
            if(screenValue == '0') {
                screenValue = Number(value)
            } else {
                screenValue = screenValue.toString() +  Number(value)
            }
        } else {
            let lastChar = screenValue.toString().substring(screenValue.toString().length - 1)
            if(value === 'del') {
                if(screenValue.toString().length > 1) {
                    screenValue = screenValue.toString().substring(0, screenValue.toString().length - 1)
                } else {
                    screenValue = '0'
                }
            }
            if(value === 'proc') {
                if(!isNaN(lastChar)) {
                    screenValue = eval(screenValue);
                }
            }
            else if(value === '+' || value === '-' || value === '*' || value === '/' || value === '%') {
                if(screenValue.toString().length >= 1) {
                    if(!isNaN(lastChar)) {
                        if(progressCount < 1) {
                            screenValue += value
                            progressCount++;
                        } else {
                            screenValue = eval(screenValue).toString() + value
                            progressCount = 1
                            dotCount = 0;
                        }
                    } else {
                        if(isNaN(lastChar)) {
                            screenValue = screenValue.substring(0, screenValue.toString().length - 1)
                            screenValue += value;
                        }
                        
                    }
                }
            }
            else if(value === '.') {
                if(screenValue.toString().length >= 1) {
                    if(!isNaN(lastChar)) {
                        if(dotCount < 1) {
                            screenValue += value
                            progressCount++;
                            dotCount++;
                        }
                    }
                }
            }
            else if(value === 'C') {
                screenValue = '0';
            } else {
                return false
            }
        }
        progress = screenValue
    }
    function renderCalculatorScreen(value) {
        screen.value = value
    }
    function keyboardEvents(e) {
        let key = e.key;
        switch(key) {
            case 'Insert':
                key = 0;
            break;
            case 'End':
                key = 1;
            break;
            case 'ArrowDown':
                key = 2;
            break;
            case 'PageDown':
                key = 3;
            break;
            case 'ArrowLeft':
                key = 4;
            break;
            case 'Clear':
                key = 5;
            break;
            case 'ArrowRight':
                key = 6;
            break;
            case 'Home':
                key = 7;
            break;
            case 'ArrowUp':
                key = 8;
            break;
            case 'PageUp':
                key = 9;
            break;
            case 'Delete':
                key = '.';
            break;
            case '/':
                key = '/';
            break;
            case '*':
                key = '/';
            break;
            case '-':
                key = '-';
            break;
            case 'Backspace':
                key = 'del';
            break;
            case 'Enter':
                key = 'proc';
            break;
        }
        calculatorBtnClicked(key)
        renderCalculatorScreen(screenValue);
    }
    
    
})