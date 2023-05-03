/* Variables */
const form = document.querySelector("form");
const inputRows = document.querySelectorAll(".form-row");
const setup = document.querySelector(".setup");
const ERROR_TYPES = {
    VALUE_MISSING: 0,
    TYPE_MISMATCH: 1,
    TOO_SHORT: 2,
    PATTERN_MISMATCH: 3,
    PASSWORD_MISMATCH: 4
}

/* Setup Event Listeners for Inputs */
inputRows.forEach(row => {
    const input = row.querySelector("input");
    const error = row.querySelector("span");

    input.addEventListener('input', (event) => { 
        if (input.validity.valid) {
            error.textContent = "";
            error.className = "error " + input.id;
        } else {
            if (input.validity.valueMissing) 
                error.textContent = throwError(input.id, ERROR_TYPES.VALUE_MISSING);
            else if (input.validity.typeMismatch) 
                error.textContent = throwError(input.id, ERROR_TYPES.TYPE_MISMATCH);
            else if (input.validity.tooShort)
                error.textContent = throwError(input.id, ERROR_TYPES.TOO_SHORT, input.minLength, input.value.length);
            else if (input.validity.patternMismatch)
                error.textContent = throwError(input.id, ERROR_TYPES.PATTERN_MISMATCH);            

            error.className = "error active";
        }
    });
});

/* Setup Event Listener for Setup Button */
setup.addEventListener('click', (event) => {
    let tests = [false, false, false];
    let i = 0;
    inputRows.forEach(row => {
        const input = row.querySelector("input");
        const error = row.querySelector("span");

        if (input.validity.valid) {
            error.textContent = "";
            error.className = "error " + input.id;
            
            if (i < 3) tests[i] = true;
        } else {
            if (input.validity.valueMissing) 
                error.textContent = throwError(input.id, ERROR_TYPES.VALUE_MISSING);
            else if (input.validity.typeMismatch) 
                error.textContent = throwError(input.id, ERROR_TYPES.TYPE_MISMATCH);
            else if (input.validity.tooShort)
                error.textContent = throwError(input.id, ERROR_TYPES.TOO_SHORT, input.minLength, input.value.length);    
            else if (input.validity.patternMismatch)
                error.textContent = throwError(input.id, ERROR_TYPES.PATTERN_MISMATCH)            

            error.className = "error active";
        }
        i++;
    });

    if (!tests.includes(false)) comparePasswords();
});

/**
 * Throw Error Function
 * 
 * Returns appropriate error message for given error and id
 * @param {string} id of input object
 * @param {number} error type of error
 * @param {number} minLength default 0
 * @param {number} currentLength default 0
 * @returns {string} error message
 */
function throwError(id, error, minLength=0, currentLength=0) {
    if (id == "username") {
        if (error == ERROR_TYPES.VALUE_MISSING)
            return "You need to enter a username.";
        else if (error == ERROR_TYPES.TOO_SHORT)
            return `Should be ${minLength} characters long. Is ${currentLength} ${currentLength == 1 ? "character" : "characters"} long.`;
    } else if (id == "email") {
        if (error == ERROR_TYPES.VALUE_MISSING)
            return "You need to enter an email address.";
        else if (error == ERROR_TYPES.TYPE_MISMATCH)
            return "Entered value should be an email address.";
    } else if (id == "password") {
        if (error == ERROR_TYPES.VALUE_MISSING)
            return "You need to enter a password.";
        else if (error == ERROR_TYPES.TOO_SHORT)
            return `Entered password must be at least ${minLength} characters long. Currently ${currentLength} ${currentLength == 1 ? "character" : "characters"} long.`;
            else if (error == ERROR_TYPES.PATTERN_MISMATCH)
                return "Your password must contain at least one number, one uppercase and one lower case character, and must be at least 8 characters long.";
    } else if (id == "confirm") {
        if (error == ERROR_TYPES.VALUE_MISSING)
            return "You need to reenter your password.";
        else if (error == ERROR_TYPES.TOO_SHORT)
            return `Entered password must be at least ${minLength} characters long. Currently ${currentLength} ${currentLength == 1 ? "character" : "characters"} long.`;
        else if (error == ERROR_TYPES.PATTERN_MISMATCH)
            return "Your password must contain at least one number, one uppercase and one lower case character, and must be at least 8 characters long.";
        else if (error == ERROR_TYPES.PASSWORD_MISMATCH)
            return "Passwords do not match";
    }
}

/**
 * Compare Passwords Function
 * 
 * Compares the 2 password strings, throws an error 
 * if mismatch is detected.
 */
function comparePasswords() {
    const p1 = document.querySelector("#password");
    const p2 = document.querySelector("#confirm");
    const error = document.querySelector(".confirm");

    if (p1.value != p2.value) {
        error.textContent = throwError(p2.id, ERROR_TYPES.PASSWORD_MISMATCH);            

        error.className = "error active";
    } else
        error.className = "error confirm"
}