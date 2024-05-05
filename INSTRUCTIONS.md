# Weekend Challenge: JS Salary Calculator

Your task is to create an application that records employee salaries and adds salaries up to report monthly costs.

## Tips For Success

The weekend assignments in Tier 2 are different than what we've been doing so far.  Please take a few minutes to watch [this video](https://vimeo.com/892049929) (password: `pr1me`).  It will help you get oriented and set you up for success!

## Requirements:

* This application should have a form with five inputs that collect a new employee's *first name, last name, ID number, job title, annual salary*.

* When the "Submit" button is clicked:
    * A new employee row should be added to the table.
    * The footer's total monthly cost should be updated.
    * The form inputs should be cleared out.

* If the total monthly cost **exceeds $20,000**, apply an `over-budget` CSS class to the footer element.
    * When applied, this CSS class should provide a clear visual indication that the monthly cost has been exceeded. (This could be as simple as turning the footer text red.)

* Create a "Delete" button that removes an employee from the DOM.
    * **For base mode**, the total monthly cost **does not** need to be updated when an employee is deleted.

## Please Don't Fork This Repo:

Instead of forking, please click **Use This Template** (the green button) and name your new repo **weekend-salary-calculator**. Then, you can clone it as usual.

By clicking **Use This Template**, you are essentially still forking the repo. But, the difference is that:
* It will appear as a **public** repository in your GitHub.
* All of the previous commits on this repo will not be included in your copy.

## You're Basically Starting From Scratch:

Besides the automated tests, the only file we have provided you with is `index.html`. You'll need to create and source the other files you'll need.

## About the Built-In Tests:

After you've cloned this repository, you'll need to:
* Run `cd weekend-salary-calculator` to get "inside" the project directory.
* Run `npm install` to install the libraries that the automated tests rely on.

Then, at any point, you can execute the test suite by running:
* `npm test`

Nifty!

**FOR THE TESTS TO WORK**:
* Your form's submit button **must** have a `data-testid="submitButton"` attribute. Like so:
  * ```html
    <button data-testid="submitButton">
      Submit
    </button>
    ```
* Your form's inputs must have these exact attributes:
    * `data-testid="firstNameInput"`
    * `data-testid="lastNameInput"`
    * `data-testid="idInput"`
    * `data-testid="titleInput"`
    * `data-testid="annualSalaryInput"`
* You must use a `<table>` element, where each employee is represented by a single `<tr>`.
* The *total monthly* cost must be rendered somewhere inside the `<footer>` element.
* The `over-budget` CSS class must be applied to the `<footer>` element when the total monthly salary exceeds $20,000.

**PLEASE DO**:
* Leverage the tests to ensure that you are satisfying each of the requirements.
* Run the tests often to verify your code's behavior as you implement each step of required functionality.

## Wireframe:

![Wireframe](salary-calc-wireframe.png)

---

## Stretch Goals:

* Add styling or extra functionality that fits with the theme of this assignment. (Feel free to be super creative!)

* When an employee is deleted, update the footer's monthly cost to reflect that employee's removal. _HINT:_ You will need to figure out which employee was removed, in order to subtract their salary from the total. This is tricky! 


