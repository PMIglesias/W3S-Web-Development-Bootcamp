let value = "";

function addValue(buttonValue) {
    value += buttonValue;
    document.getElementById("result").value = value;
}

function clear() {
    value = "";
    document.getElementById("result").value = value;
}

function calculate() {
    let result = eval(value);
    document.getElementById("result").value = result;
    value = "";
}
