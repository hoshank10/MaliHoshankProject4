function enable() {
    var inputGroup = document.querySelectorAll('input[name="products"]');
    var letsCookButton = document.querySelector('#tradeitBtn');
    for (const radioButton of inputGroup) {
        if (radioButton.checked) {
            letsCookButton.removeAttribute('disabled')
            break;
        }
    }
}

function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}