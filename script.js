//Welcome to the Salary Calculator!!!

function handleSubmit(event) {
    console.log('handle submit works...')
    event.preventDefault()
    let newTotal = 0
    console.log("initialValue is: ", newTotal);
    let firstNameInput = document.getElementById('firstName').value
    let lastNameInput = document.getElementById('lastName').value
    let idInput = document.getElementById('identity').value
    let titleInput = document.getElementById('title').value
    let annualSalaryInput = document.getElementById('annualSalary').value
    let messageOutput = document.getElementById('messages')
    let formattedSalary = formatter.format(parseFloat(annualSalaryInput))

    console.log(`incoming information: ${firstNameInput},  ${lastNameInput}, ${idInput}, ${annualSalaryInput}`)
    if (firstNameInput.length > 0 && lastNameInput.length > 0 && idInput.length > 0 && titleInput.length > 0 && annualSalaryInput.length > 0) {
        {
            let tableInfusion = document.getElementById("containerLocation")
            tableInfusion.innerHTML += `<tr>
    <td>${firstNameInput}</td>
    <td>${lastNameInput}</td>
    <td>${idInput}</td>
    <td>${titleInput}</td>
    <td>${formattedSalary}</td>
    <td><button onClick="deleteSubmission(event)">Delete</button></td>
    </tr>
  `
            updateTotalMonthly(parseFloat(annualSalaryInput)); // Update our current totalVal within the <span> HTML element by converting the current annualSalary table submission to an integer base 10 value, then passes that numerical value to our updateTotalMonthly function that performs basic addition to update our <span>! 
        }

    }
    else {
        messageOutput.innerHTML = "* Missing information, please ensure all fields are filled out prior to submission"
    }
    document.getElementById("firstName").value = ""
    document.getElementById("lastName").value = ""
    document.getElementById("identity").value = ""
    document.getElementById("title").value = ""
    document.getElementById("annualSalary").value = ""
}

// End handleSubmit function

function updateTotalMonthly(amount) {
    let totalElement = document.getElementById('totalVal')
    let currentTotal = parseFloat(totalElement.textContent)
    let employeeMonthlySal = amount / 12
    let newTotal = currentTotal + employeeMonthlySal

    totalElement.textContent = newTotal.toFixed(2) 

    checkTotalBudget(newTotal)
}

function checkTotalBudget(total) {
    let footerElement = document.querySelector('footer') // check first element within footer
    console.log("footerElement is: ", footerElement);
    console.log(document.querySelector('footer'));
    if (total > 20000) {
        footerElement.classList.add('over-budget')
        console.log("Warning: Over Budget");
    }
    else {
        footerElement.classList.remove('over-budget')
    }
}

//End addEmployeeInfo function

function deleteSubmission(event) {
    console.log('deleteSubmission works') //Function to handle deletion of an employee on the table
    console.log(event)
    let thisColumn = event.target.parentElement.parentElement
    let deleteTableRow = event.target.parentElement.parentElement // Targets parents parent element, meaning entire table row in this scenario!
    let annualSalaryInput = parseFloat(deleteTableRow.querySelector('td:nth-child(5)').textContent.replace(/[^0-9.-]+/g,""));  // targets specific element when we delete a table, the annual salary, then .replace cleans up the number by removing digits, dots and hyphens so our future computations are not affected
    thisColumn.remove() // removes table row from DOM
    updateTotalMonthlyAfterDelete(annualSalaryInput) // call to function to udpate total monthly after delete

}

// End deleteSubmission

function updateTotalMonthlyAfterDelete(amount) {
    let totalElement = document.getElementById('totalVal'); // set totalElement to target our footer ID totalVal
    let currentTotal = parseFloat(totalElement.textContent)
    let employeeMonthlSal = amount / 12 
    let newTotal = currentTotal - employeeMonthlSal
    totalElement.textContent = newTotal.toFixed(2)
    checkTotalBudget(newTotal)
}

//End deleteSubmission function

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}); // Number formatter for $ values

const formattedNumberTest = formatter.format(1222222222) // Testing formatter functionality
console.log(formattedNumberTest);

///* This application should have a form with five inputs that collect a 
//new employee's *first name, last name, ID number, job title, annual salary*.
//