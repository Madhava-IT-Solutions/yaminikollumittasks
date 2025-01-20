// Set default values
document.addEventListener('DOMContentLoaded', function () {
    const defaultPrincipal = 100000; // 10,000
    const defaultInterest = 8.50; // 8.50%
    const defaultTenure = 20; // 20 years

    setDefaultValues(defaultPrincipal, defaultInterest, defaultTenure);
});

// Function to set default values
function setDefaultValues(principal, interest, tenure) {
    document.getElementById('principal').value = formatAmount(principal);
    document.getElementById('loan-range').value = principal;
    document.getElementById('loan-value').textContent = formatAmount(principal);

    document.getElementById('interest').value = interest.toFixed(2);
    document.getElementById('interest-range').value = interest;
    document.getElementById('interest-value').textContent = interest.toFixed(2);

    document.getElementById('tenure').value = tenure;
    document.getElementById('tenure-range').value = tenure;
    document.getElementById('tenure-value').textContent = tenure;
}

// Format numbers with commas
function formatAmount(value) {
    return new Intl.NumberFormat('en-IN').format(value || 0); // Replace NaN with 0
}

// Format numbers with two decimal places
function formatAmountWithDecimals(value) {
    return value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// EMI Calculation Formula
function calculateEMI(principal, annualRate, tenureInMonths) {
    const ratePerMonth = annualRate / (12 * 100);
    if (ratePerMonth === 0) return 0; // Handle division by zero
    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureInMonths)) / (Math.pow(1 + ratePerMonth, tenureInMonths) - 1);
    return emi || 0; // Replace NaN with 0
}

// Amortization Schedule Calculation
function generateAmortizationSchedule(principal, annualRate, tenureInMonths) {
    const ratePerMonth = annualRate / (12 * 100);
    const emi = calculateEMI(principal, annualRate, tenureInMonths);
    let schedule = [];
    let balance = principal;

    for (let month = 1; month <= tenureInMonths; month++) {
        const interestPaid = balance * ratePerMonth;
        const principalPaid = emi - interestPaid;
        balance -= principalPaid;

        schedule.push({
            month: month,
            principalPaid: formatAmountWithDecimals(principalPaid > 0 ? principalPaid : 0),
            interestPaid: formatAmountWithDecimals(interestPaid > 0 ? interestPaid : 0),
            remainingBalance: formatAmountWithDecimals(balance > 0 ? balance : 0),
        });
    }

    return schedule;
}

// Plot EMI Graph
function plotGraph(emiSchedule) {
    const ctx = document.getElementById('emiGraph').getContext('2d');
    const months = emiSchedule.map(item => item.month);
    const principalPaid = emiSchedule.map(item => parseFloat(item.principalPaid.replace(/,/g, '')));
    const interestPaid = emiSchedule.map(item => parseFloat(item.interestPaid.replace(/,/g, '')));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Principal Paid',
                    data: principalPaid,
                    borderColor: 'green',
                    fill: false,
                },
                {
                    label: 'Interest Paid',
                    data: interestPaid,
                    borderColor: 'red',
                    fill: false,
                },
            ],
        },
    });
}

// Form Submission
document.getElementById('emi-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const principal = parseFloat(document.getElementById('principal').value.replace(/,/g, '')) || 0;
    const interestRate = parseFloat(document.getElementById('interest').value) || 0;
    const tenure = parseInt(document.getElementById('tenure').value) || 0;
    const tenureInMonths = tenure * 12;

    // Calculate EMI
    const emi = calculateEMI(principal, interestRate, tenureInMonths);
    document.getElementById('emi-amount').textContent = `₹${formatAmountWithDecimals(emi)}`;

    // Generate Amortization Schedule
    const schedule = generateAmortizationSchedule(principal, interestRate, tenureInMonths);
    const tableBody = document.getElementById('amortization-schedule').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    schedule.forEach(item => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = item.month;
        row.insertCell(1).textContent = item.principalPaid;
        row.insertCell(2).textContent = item.interestPaid;
        row.insertCell(3).textContent = item.remainingBalance;
    });

    // Plot EMI Graph
    plotGraph(schedule);

    // Show Results
    document.querySelector('.emi-result').style.display = 'block';
    document.querySelector('.graph-container').style.display = 'block';
    document.querySelector('.amortization-table').style.display = 'block';
    document.querySelector('.bank-offers').style.display = 'block';
});

// Reset functionality
document.getElementById('reset-btn').addEventListener('click', function () {
    const defaultPrincipal = 100000; // 10,000
    const defaultInterest = 8.50; // 8.50%
    const defaultTenure = 20; // 20 years

    setDefaultValues(defaultPrincipal, defaultInterest, defaultTenure);

    document.querySelector('.emi-result').style.display = 'none';
    document.querySelector('.graph-container').style.display = 'none';
    document.querySelector('.amortization-table').style.display = 'none';
    document.querySelector('.bank-offers').style.display = 'none';
    document.getElementById('emi-amount').textContent = '₹0';
});

// Sync Slider and Input
function syncSliderAndInput(slider, input, display, isDecimal = false) {
    slider.addEventListener('input', function () {
        const value = isDecimal ? parseFloat(slider.value).toFixed(2) : parseInt(slider.value);
        input.value = isDecimal ? value : formatAmount(value);
        display.textContent = isDecimal ? value : formatAmount(value);
    });

    input.addEventListener('input', function () {
        const numericValue = parseFloat(input.value.replace(/,/g, '')) || 0;
        slider.value = numericValue;
        display.textContent = isDecimal ? numericValue.toFixed(2) : formatAmount(numericValue);
    });
}

// Sync Loan Amount
syncSliderAndInput(
    document.getElementById('loan-range'),
    document.getElementById('principal'),
    document.getElementById('loan-value')
);

// Sync Interest Rate
syncSliderAndInput(
    document.getElementById('interest-range'),
    document.getElementById('interest'),
    document.getElementById('interest-value'),
    true // Allow decimals for interest
);

// Sync Tenure
syncSliderAndInput(
    document.getElementById('tenure-range'),
    document.getElementById('tenure'),
    document.getElementById('tenure-value')
);
