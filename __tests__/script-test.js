// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
// 🔥 DO NOT MODIFY THIS FILE!!!!! 🔥
// 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

const { fireEvent, getByText, queryByText, getByTestId, configure } = require('@testing-library/dom')
require('@testing-library/jest-dom')
const { JSDOM } = require('jsdom')

const fs = require('fs')
const path = require('path')

const htmlFile = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')
const jsFile = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8')


let dom
let container

describe(`Weekend Salary Calculator:`, () => {
  // to limit verbosity in error message
  configure({
    getElementError: (message, container) => {
      const error = new Error(message);
      error.name = 'TestingLibraryElementError';
      error.stack = error.stack.substring(0,150);
      return error;
    },
  });
  
  beforeAll(() => {
    // Silence console.log statements while the tests run:
    console.log = () => {}
  })

  beforeEach(() => {
    dom = new JSDOM(htmlFile, { runScripts: 'dangerously' })

    // Execute script.js within the context of our jsdom instance:
    dom.window.eval(jsFile)

    container = dom.window.document.body
  })

  const testEmployees = [
    {
      firstName: 'Annemiek',
      lastName: 'van Vleuten',
      id: '10101',
      title: 'Professional Cyclist',
      annualSalary: '120012'
    },
    {
      firstName: 'Coco',
      lastName: 'Gauff',
      id: '20202',
      title: 'Professional Tennis Player',
      annualSalary: '96000'
    },
    {
      firstName: 'Marta',
      lastName: 'Vieira da Silva',
      id: '30303',
      title: 'Professional Soccer Player',
      annualSalary: '72007' //24001.58
    }
  ]

  // This helper function:
    // 1. Selects all five employee inputs.
    // 2. Populates the inputs with data from the employee that
    //    gets passed in as an argument.
    // 3. Selects the submit button.
    // 4. Clicks the submit button.
  function submitEmployee(container, employee) {
    // Select all five employee inputs:
    const firstNameInput = getByTestId(container, 'firstNameInput')
    const lastNameInput = getByTestId(container, 'lastNameInput')
    const idInput = getByTestId(container, 'idInput')
    const titleInput = getByTestId(container, 'titleInput')
    const annualSalaryInput = getByTestId(container, 'annualSalaryInput')
    
    // Populate the inputs with employee data:
    fireEvent.change(firstNameInput, {target: {value: employee.firstName}})
    fireEvent.change(lastNameInput, {target: {value: employee.lastName}})
    fireEvent.change(idInput, {target: {value: employee.id}})
    fireEvent.change(titleInput, {target: {value: employee.title}})
    fireEvent.change(annualSalaryInput, {target: {value: employee.annualSalary}})
    
    // Select the submit button:
    const submitButton = getByTestId(container, 'submitButton')
    
    // Click the submit button:
    submitButton.click()
  }

  it(`Adds a single new employee's data to the table`, () => {
    const table = container.querySelector('table')
    
    submitEmployee(container, testEmployees[0])

    // Verify that the new employee's info is in the table:
    expect(getByText(table, /Annemiek/)).toBeInTheDocument()
    expect(getByText(table, /van Vleuten/)).toBeInTheDocument()
    expect(getByText(table, /10101/)).toBeInTheDocument()
    expect(getByText(table, /Professional Cyclist/)).toBeInTheDocument()
    expect(getByText(table, /120012|120,012/)).toBeInTheDocument()
  })

  it(`Adds multiple new employees' data to the table`, () => {
    const table = container.querySelector('table')
    
    submitEmployee(container, testEmployees[0])

    // Verify that the first new employee's info is in the table:
    expect(getByText(table, /Annemiek/)).toBeInTheDocument()
    expect(getByText(table, /van Vleuten/)).toBeInTheDocument()
    expect(getByText(table, /10101/)).toBeInTheDocument()
    expect(getByText(table, /Professional Cyclist/)).toBeInTheDocument()
    expect(getByText(table, /120012|120,012/)).toBeInTheDocument()

    submitEmployee(container, testEmployees[1])

    // Verify that the second new employee's info is in the table:
    expect(getByText(table, /Coco/)).toBeInTheDocument()
    expect(getByText(table, /Gauff/)).toBeInTheDocument()
    expect(getByText(table, /20202/)).toBeInTheDocument()
    expect(getByText(table, /Professional Tennis Player/)).toBeInTheDocument()
    expect(getByText(table, /96000|96,000/)).toBeInTheDocument()
  })

  it(`Clears out the form inputs after a new employee is submitted`, () => {
    const table = container.querySelector('table')
    
    submitEmployee(container, testEmployees[0])

    // Select all five employee inputs:
    const firstNameInput = getByTestId(container, 'firstNameInput')
    const lastNameInput = getByTestId(container, 'lastNameInput')
    const idInput = getByTestId(container, 'idInput')
    const titleInput = getByTestId(container, 'titleInput')
    const annualSalaryInput = getByTestId(container, 'annualSalaryInput')

    // Verify that each input has been cleared:
    expect(firstNameInput).not.toHaveValue()
    expect(lastNameInput).not.toHaveValue()
    expect(idInput).not.toHaveValue()
    expect(titleInput).not.toHaveValue()
    expect(annualSalaryInput).not.toHaveValue()
  })

  it(`Updates the total monthly salary value when a single employee is added`, () => {
    const footer = container.querySelector('footer')
    
    submitEmployee(container, testEmployees[0])

    expect(getByText(footer, /10001|10,001/)).toBeInTheDocument()
  })

  it(`Updates the total monthly salary value when multiple employees are added`, () => {
    const footer = container.querySelector('footer')

    submitEmployee(container, testEmployees[0])
    submitEmployee(container, testEmployees[1])

    expect(getByText(footer, /18001|18,001/)).toBeInTheDocument()
  })

  it(`Applies the 'over-budget' CSS class to the footer when the total monthly salary exceeds $20,000`, () => {
    const footer = container.querySelector('footer')
    //To make sure its not hardcoded
    expect(footer).not.toHaveClass('over-budget')

    
    submitEmployee(container, testEmployees[0])
    submitEmployee(container, testEmployees[1])
    submitEmployee(container, testEmployees[2])

    expect(footer).toHaveClass('over-budget')
  })

  it(`Removes the correct employee table row when a delete button is clicked`, () => {
    const table = container.querySelector('table')
    
    submitEmployee(container, testEmployees[0])
    submitEmployee(container, testEmployees[1])
    submitEmployee(container, testEmployees[2])
    
    const tableButtons = table.querySelectorAll('button')
    const secondRowsButton = tableButtons[1]

    secondRowsButton.click()

    // Expect the second row to have been deleted:
    expect(queryByText(table, /Coco/)).not.toBeInTheDocument()
    expect(queryByText(table, /Gauff/)).not.toBeInTheDocument()
    expect(queryByText(table, /20202/)).not.toBeInTheDocument()
    expect(queryByText(table, /Professional Tennis Player/)).not.toBeInTheDocument()
    expect(queryByText(table, /96000|96,000/)).not.toBeInTheDocument()

    // Expect that the first row was not deleted:
    expect(getByText(table, /Annemiek/)).toBeInTheDocument()
    expect(getByText(table, /van Vleuten/)).toBeInTheDocument()
    expect(getByText(table, /10101/)).toBeInTheDocument()
    expect(getByText(table, /Professional Cyclist/)).toBeInTheDocument()
    expect(getByText(table, /120012|120,012/)).toBeInTheDocument()

    // Expect that the third row was not deleted:
    expect(getByText(table, /Marta/)).toBeInTheDocument()
    expect(getByText(table, /Vieira da Silva/)).toBeInTheDocument()
    expect(getByText(table, /30303/)).toBeInTheDocument()
    expect(getByText(table, /Professional Soccer Player/)).toBeInTheDocument()
    expect(getByText(table, /72007|72,007/)).toBeInTheDocument()
  })

  // TODO Stretch Tests:
    // Total monthly salary is correctly calculated after deleting an employee.
    // Check for rounding logic.
        // 24001.583 becomes 24001.58
    // Check for money formatting:
        // 24001 becomes $24,001.00
        // 24001.583 becomes $24,000.58
    // A new employee is not added to the DOM if:
        // An input was not provided text
        // A duplicate id value was provided
})
