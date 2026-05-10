var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("form-section");

    // Hide all sections
    for (let i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }

    // Show the current tab
    x[n].style.display = "block";

    // Adjust button visibility
    document.getElementById("prevBtn").style.display = n === 0 ? "none" : "inline";
    document.getElementById("nextBtn").innerHTML = n === (x.length - 1) ? "Submit" : "Next";
}

function nextPrev(n) {
    var x = document.getElementsByClassName("form-section");

    // If moving forward, validate the current section first
    if (n === 1 && !validateCurrentSection()) return false;

    // Hide current section
    x[currentTab].style.display = "none";

    // Update current tab index
    currentTab += n;

    // If reached the end, submit the form
    if (currentTab >= x.length) {
        document.getElementById("myForm").submit();
        return false;
    }

    // Show the new current tab
    showTab(currentTab);
}

function validateCurrentSection() {
    switch (currentTab) {
        case 0:
            return validateSection1();
        case 1:
            return validateSection2();
        case 2:
            return validateSection3();
        case 3:
            return validateSection4();
        case 4:
            return validateSection5();
        case 5:
            return validateSection6();
        default:
            return true;
    }
}

function validateSection1() {
    // Get form inputs
    var fields = {
        surname: document.getElementById('surname').value.trim(),
        firstNames: document.getElementById('first_names').value.trim(),
        initials: document.getElementById('initials').value.trim(),
        dob: document.getElementById('date_of_birth').value,
        idNumber: document.getElementById('id_number').value.trim(),
        phoneNumber: document.getElementById('phone_number').value.trim(),
        email: document.getElementById('email').value.trim(),
        physicalAddress: document.getElementById('physical_address').value.trim(),
        cityTown: document.getElementById('city_town').value.trim(),
        suburb: document.getElementById('suburb').value.trim(),
        province: document.getElementById('province').value
    };

    // Required fields validation
    for (var field in fields) {
        if (fields[field] === "") {
            alert(capitalize(field) + " is required.");
            return false;
        }
    }

    // Specific validations
    if (!/^\d{10}$/.test(fields.phoneNumber)) {
        alert("Valid Phone Number is required (10 digits).");
        return false;
    }

    if (!validateEmail(fields.email)) {
        alert("Valid Email is required.");
        return false;
    }

    if (!validateDateOfBirthAndID()) {
        return false;
    }

    // Proceed to the next section if all fields are valid
    return true;
}

// Helper function to capitalize field names for better alert messages
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, " ");
}

function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

function validateDateOfBirthAndID() {
    // Get the date of birth and ID number
    var dobField = document.getElementById('date_of_birth');
    var idNumberField = document.getElementById('id_number');

    // Date of birth in format DD MMM YYYY
    var dob = new Date(dobField.value); // Parsing date from input field
    var yearOfBirth = dob.getFullYear();
    var monthOfBirth = dob.getMonth() + 1; // Month is 0-based
    var dayOfBirth = dob.getDate();

    // ID number format YYMMDDSSSSCAZ
    var idNumber = idNumberField.value.trim();

    // Extract YY, MM, DD from ID number
    var idYearOfBirth = parseInt(idNumber.substring(0, 2));
    var idMonthOfBirth = parseInt(idNumber.substring(2, 4));
    var idDayOfBirth = parseInt(idNumber.substring(4, 6));

    // Adjust idYearOfBirth to a full year (assuming people born in the 1900s or 2000s)
    var currentYear = new Date().getFullYear();
    var century = (idYearOfBirth <= currentYear % 100) ? 2000 : 1900;
    idYearOfBirth += century;

    // Compare date of birth and ID number
    if (yearOfBirth !== idYearOfBirth || monthOfBirth !== idMonthOfBirth || dayOfBirth !== idDayOfBirth) {
        alert("ID and Date of Birth do not match!");
        return false;
    }

    return true;
}

function validateSection2() {
    // Get form inputs
    var bankName = document.getElementById('bank_name').value.trim();
    var branchCode = document.getElementById('branch_code').value.trim();
    var accountNumber = document.getElementById('account_number').value.trim();
    var accountType = document.getElementById('account_type').value.trim();
    var accountHolder = document.getElementById('account_holder').value.trim();

    // Validate Bank Name
    if (bankName === "") {
        alert("Bank Name is required.");
        return false;
    }

    // Validate Branch Code (you can add specific format validation if needed)
    if (branchCode === "" || !/^\d{6}$/.test(branchCode)) {
        alert("Valid Branch Code is required (6 digits).");
        return false;
    }

    // Validate Account Number (you can add specific format validation)
    if (accountNumber === "" || !/^\d{8,12}$/.test(accountNumber)) {
        alert("Valid Account Number is required (8-12 digits).");
        return false;
    }

    // Validate Account Type
    if (accountType === "") {
        alert("Account Type is required.");
        return false;
    }

    // Validate Account Holder Name
    if (accountHolder === "") {
        alert("Account Holder is required.");
        return false;
    }

    // Proceed to next section if all fields are valid
    return true;
}

function validateSection3() {
    // Get the values of the form inputs
    var selfEmployedYes = document.getElementById('self_employed_yes').checked;
    var selfEmployedNo = document.getElementById('self_employed_no').checked;
    var occupation = document.getElementById('occupation').value.trim();
    var employer = document.getElementById('employer').value.trim();
    var employerPhone = document.getElementById('employer_phone').value.trim();
    var employerAddress = document.getElementById('employer_address').value.trim();
    var department = document.getElementById('department').value.trim();
    var dateJoinedEmployer = document.getElementById('date_joined_employer').value.trim();

    // Validate that self-employment is selected
    if (!selfEmployedYes && !selfEmployedNo) {
        alert("Please indicate whether you are self-employed.");
        return false;
    }

    // If the user is not self-employed, validate the employer fields
    if (selfEmployedNo) {
        if (occupation === "") {
            alert("Occupation is required.");
            return false;
        }
        if (employer === "") {
            alert("Employer's Name is required.");
            return false;
        }
        if (employerPhone === "" || !/^\d{10}$/.test(employerPhone)) {
            alert("A valid Employer's Contact is required (10 digits).");
            return false;
        }
        if (employerAddress === "") {
            alert("Employer's Address is required.");
            return false;
        }
        if (department === "") {
            alert("Department is required.");
            return false;
        }
        if (dateJoinedEmployer === "") {
            alert("Date Joined Employer is required.");
            return false;
        }
    }

    // If the user is self-employed, you might only need to validate occupation
    if (selfEmployedYes && occupation === "") {
        alert("Occupation is required for self-employed individuals.");
        return false;
    }

    // Proceed to the next section if validation passes
    return true;
}

// Function to check if input is a valid number
function isValidNumber(value) {
    return !isNaN(value) && value.trim() !== "";
}

// Function to calculate totals for Main Applicant and Spouse
function calculateIncomeTotals() {
    // Get all income values for the main applicant
    let incomeMain = document.getElementById('income_main').value || 0;
    let overtimeMain = document.getElementById('overtime_main').value || 0;
    let commissionMain = document.getElementById('commission_main').value || 0;
    let otherIncomeMain = document.getElementById('other_income_main').value || 0;
    let carAllowanceMain = document.getElementById('car_allowance_main').value || 0;

    // Get all income values for the spouse
    let incomeSpouse = document.getElementById('income_spouse').value || 0;
    let overtimeSpouse = document.getElementById('overtime_spouse').value || 0;
    let commissionSpouse = document.getElementById('commission_spouse').value || 0;
    let otherIncomeSpouse = document.getElementById('other_income_spouse').value || 0;
    let carAllowanceSpouse = document.getElementById('car_allowance_spouse').value || 0;

    // Convert the values to numbers and calculate the totals
    let totalMain = parseFloat(incomeMain) + parseFloat(overtimeMain) + parseFloat(commissionMain) + parseFloat(otherIncomeMain) + parseFloat(carAllowanceMain);
    let totalSpouse = parseFloat(incomeSpouse) + parseFloat(overtimeSpouse) + parseFloat(commissionSpouse) + parseFloat(otherIncomeSpouse) + parseFloat(carAllowanceSpouse);

    // Display the totals
    document.getElementById('totalIncomeMain').textContent = totalMain.toFixed(2);
    document.getElementById('totalIncomeSpouse').textContent = totalSpouse.toFixed(2);

    // Update the hidden fields with the calculated totals
    document.getElementById('hiddenTotalMain').value = totalMain;
    document.getElementById('hiddenTotalSpouse').value = totalSpouse;
}

// Function to validate Section 4
function validateSection4() {
    let incomeMain = document.getElementById('income_main').value.trim();
    let incomeSpouse = document.getElementById('income_spouse').value.trim();

    // Validate main applicant's payroll income
    if (!isValidNumber(incomeMain)) {
        alert("Please enter a valid number for Main Applicant's Payroll Income.");
        return false;
    }

    // Validate spouse's payroll income if filled
    if (incomeSpouse && !isValidNumber(incomeSpouse)) {
        alert("Please enter a valid number for Spouse's Payroll Income.");
        return false;
    }

    // Proceed to the next section if validation passes
    return true;
}

// Function to calculate the total expenses for both the main applicant and spouse
function calculateExpenseTotals() {
    // Get all inputs for main applicant and spouse expenses
    const mainApplicantExpenses = document.querySelectorAll('.expenseMain input');
    const spouseExpenses = document.querySelectorAll('.expenseSpouse input');

    // Function to calculate the sum of input values
    function calculateTotal(expenses) {
        let total = 0;
        expenses.forEach(input => {
            const value = parseFloat(input.value) || 0; // Default to 0 if input is empty or invalid
            total += value;
        });
        return total.toFixed(2); // Return total with two decimal places
    }

    // Calculate total for main applicant and spouse
    const totalMain = calculateTotal(mainApplicantExpenses);
    const totalSpouse = calculateTotal(spouseExpenses);

    // Set the calculated totals to the span elements and hidden inputs
    document.getElementById('totalExpenseMain').textContent = totalMain;
    document.getElementById('hiddentotalExpenseMain').value = totalMain;

    document.getElementById('totalExpanseSpouse').textContent = totalSpouse;
    document.getElementById('hiddentotalExpenseSpouse').value = totalSpouse;
}

// Function to validate the expense section
function validateSection5() {
    let isValid = true;
    const expenseInputs = document.querySelectorAll('#section-5 input[type="text"]');

    expenseInputs.forEach(input => {
        if (input.value.trim() === "") {
            input.style.border = "2px solid red";
            isValid = false;
        } else {
            input.style.border = "";
        }
    });

    return isValid;
}

// Function to calculate and validate fields in Section 6
function validateSection6() {
    // Get values from the form
    const creditAdvanced = parseFloat(document.getElementById('creditAdvance').value) || 0;
    const numInstallments = document.getElementById('NumOfinstallments').value;
    const monthlyInterestRate = parseFloat(document.querySelector('input[name="monthly_interest_rate"]').value) || 0;
    const interestType = document.querySelector('.InterestType').value;

    // Validate required fields
    if (!creditAdvanced || creditAdvanced <= 0) {
        alert('Please enter a valid Credit Advanced amount.');
        return false;
    }

    if (!numInstallments || numInstallments <= 0) {
        alert('Please select a valid number of installments.');
        return false;
    }

    if (!monthlyInterestRate || monthlyInterestRate <= 0) {
        alert('Please enter a valid Monthly Interest Rate.');
        return false;
    }

    if (!interestType) {
        alert('Please select an Interest Type.');
        return false;
    }


    const creditAdvanceValue = document.getElementById("creditAdvance").value.trim();

    // Input validation
    if (isNaN(creditAdvanceValue) || creditAdvanceValue <= 0) {
        alert("Invalid credit advanced value. Please enter a positive number.");
        return;
    }
}

function calculateLoan() {
    const creditAdvanceValue = parseFloat(document.getElementById("creditAdvance").value) || 0;
    const numInstallments = parseInt(document.getElementById("NumOfinstallments").value) || 0;
    const initialFeeRate = 0.1;
    const monthlyFeeRate = 0.05;

    if (creditAdvanceValue > 0) {
        const initialFee = creditAdvanceValue * initialFeeRate;
        const monthlyFee = creditAdvanceValue * monthlyFeeRate;

        const totalCredit = creditAdvanceValue + initialFee + monthlyFee;

        // Update hidden inputs and display values
        document.getElementById("hiddenInitalisedFeeRate").value = initialFee.toFixed(2);
        document.getElementById("initialFeeDisplay").textContent = initialFee.toFixed(2);

        document.getElementById("hiddenMonthlyFee").value = monthlyFee.toFixed(2);
        document.getElementById("monthlyFeeDisplay").textContent = monthlyFee.toFixed(2);

        const rateOfferedTotal = initialFee + monthlyFee;
        document.getElementById("hiddenRateOffered").value = rateOfferedTotal.toFixed(2);
        document.getElementById("rateBeingOfferedDisplay").textContent = rateOfferedTotal.toFixed(2);

        document.getElementById("hiddenTotalCredit").value = totalCredit.toFixed(2);
        document.getElementById("totalCreditDisplay").textContent = totalCredit.toFixed(2);

        // Calculate monthly installment
        if (numInstallments > 0) {
            const monthlyInstallment = totalCredit / numInstallments;
            document.getElementById("hiddenMonthlyInstallment").value = monthlyInstallment.toFixed(2);
            document.getElementById("monthlyInstallmentDisplay").textContent = monthlyInstallment.toFixed(2);

            const loanTerm = numInstallments + " Months";
            document.getElementById("hiddenTermsOfLoan").value = loanTerm;
            document.getElementById("termsOfLoanDisplay").textContent = loanTerm;
        }
        const totalInterest = totalCredit - creditAdvanceValue;
        document.getElementById("hiddenTotalInterest").value = totalInterest.toFixed(2); // Convert to string with 2 decimal places
        document.getElementById("totalInterestDisplay").textContent = totalInterest.toFixed(2); // Format as currency
    
    }
}

// Add onkeyup event listeners
document.getElementById("creditAdvance").addEventListener("keyup", calculateLoan);
document.getElementById("NumOfinstallments").addEventListener("keyup", calculateLoan);

function installments() {
    const numInstallments = document.getElementById("NumOfinstallments").value;

    let loanTerm = numInstallments + " Months";

    document.getElementById("hiddenTermsOfLoan").value = loanTerm;
    document.getElementById("termsOfLoanDisplay").textContent = loanTerm;

    document.getElementById("hiddenTotalInstallment").value = loanTerm;
    document.getElementById("totalInstallmentsDisplay").textContent = loanTerm;
}
document.getElementById("NumOfinstallments").addEventListener("change", installments);


function submitForm() {
    // Perform final validation
    if (!validateAllSections()) {
        alert("Please ensure all sections are filled out correctly.");
        return;
    }

    // Get the form element
    const form = document.getElementById('myForm');

    // Create a FormData object
    const formData = new FormData(form);

    // Add calculated totals to formData
    formData.append('totalIncome_mainApplicant', document.getElementById('hiddenTotalMain').value);
    formData.append('totalIncome_spouse', document.getElementById('hiddenTotalSpouse').value);
    formData.append('totalExpense_mainApplicant', document.getElementById('hiddentotalExpenseMain').value);
    formData.append('totalExpense_spouse', document.getElementById('hiddentotalExpenseSpouse').value);
    formData.append('totalCredit', document.getElementById('hiddenTotalCredit').value);
    formData.append('totalInterest', document.getElementById('hiddenTotalInterest').value);
    formData.append('totalInstallments', document.getElementById('hiddenTotalInstallment').value);
    formData.append('monthlyInstallment', document.getElementById('hiddenMonthlyInstallment').value);

    // Submit the form data
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                alert('Form submitted successfully!');

            } else {
                alert('There was an error submitting the form. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the form. Please try again later.');
        });
}

function validateAllSections() {
    // Validate all sections
    for (let i = 0; i < 6; i++) {
        currentTab = i;
        if (!validateCurrentSection()) {
            return false;
        }
    }
    return true;
}