const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, errorMsg) {
	const formControl = input.parentElement;
	formControl.className = "form-control error";
	const small = formControl.querySelector("small");
	small.textContent = errorMsg;
}

// Show Success message
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

// Check Email
function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, "Email does't valid");
	}
}

//Check Required
function checkRequired(input) {
	input.forEach(function(input) {
		if (input.value.trim() === "") {
			showError(input, `${getFieldName(input)} is Requried`);
		} else {
			showSuccess(input);
		}
	});
}

//Check input length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must be at least ${min} characters`
		);
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
		);
	} else {
		showSuccess(input);
	}
}

function checkPasswordMatch(pass1, pass2) {
	if (pass1.value !== pass2.value) {
		showError(pass1, "Passwords do not match");
		showError(pass2, "Passwords do not match");
	}
}

// Get Fieldname
function getFieldName(input) {
	const getName = input.id.charAt(0).toUpperCase() + input.id.slice(1);
	return getName;
}

// Event Listener
// const submitBtn = document.getElementById("submitBtn");
form.addEventListener("submit", function(e) {
	e.preventDefault();
	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 6);
	checkEmail(email);
	checkPasswordMatch(password, password2);
});
