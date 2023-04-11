//seleção dos elementos html que preciso capturar
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");
//class é a lógica da calculadora
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.atualOperation = ""; // pega a ação do digitando no momento/clicando nos botoes
  }

  // add digit mostra os digitos no visor da calc
  addDigit(digit) {
    //checando se já tem ponto para não ter varios
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.atualOperation = digit;
    this.updateScreen(); //update faz a atualiação da tela
  }
  //metodo de operações matematicas
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"];
    if (!mathOperations.includes(operation)) {
      return;
    }
    // slice faz a retirada do operador atual para adicionar o que voce quer mudar
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }
  // processando os calculos
  processOperation(operation) {
    //checar se o valor atual está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      //mudar operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // pegando os valores atuais e anteriores
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0]; // valor anterior
    const current = +this.currentOperationText.innerText; // valor atual

    // qual operação deseja
    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processCeOperator();
        break;
      case "C":
        this.processCOperator();
        break;
      case "=":
        this.processEqualsOperator();
        break;
      default:
        return;
    }
  }
  // manipulando a função ce, c e del para apagar ou alterar valores da calc
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }
  processCeOperator() {
    this.currentOperationText.innerText = "";
  }
  processCOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }
  // fazendo a manipulação do sinal de igual
  processEqualsOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }

  // alterar valores da tela da calculadora
  updateScreen(
    operationValue = null, // começa vazia até a chegada da operação do switch
    operation = null, // começa vazia até a chegada do valor vindo do metodo processOperation
    current = null, //valores da variavel q estão na processOperation
    previous = null //valores da variavel q estão na processOperation
  ) {
    console.log(operationValue, operation, current, previous);
    if (operationValue === null) {
      this.currentOperationText.innerText += this.atualOperation;
    } else {
      // checando se é zero ou se for apenas adicionar o valor atual
      if (previous === 0) {
        operationValue = current;
      }
      //adicionando valor atual e valor anterior mostrando na calculadora
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

//eventos para a calculadora funcionar
buttons.forEach((btn) => {
  //evento para capturar a função do clique nos botoes da aplicação
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;
    // separando numeros e operadores
    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
