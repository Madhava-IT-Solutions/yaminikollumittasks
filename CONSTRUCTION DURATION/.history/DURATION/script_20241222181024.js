document.getElementById('nextButton').addEventListener('click', () => {
    const unitSelect = document.getElementById('unitSelect');
    const unit = unitSelect.value;
  
    const costPerSqMeter = 19810;
    const conversionFactors = {
      squareMeter: 1,
      squareYard: 1.19599005,
      squareFeet: 10.7639104,
    };
  
    const selectedFactor = conversionFactors[unit];
    const tentativeCost = costPerSqMeter * selectedFactor;
    const lossPerDay = 650;
    const lossPerMonth = 19500;
    const lossPerYear = 237250;
  
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = `
      <tr>
        <td>₹ ${tentativeCost.toFixed(2)}</td>
        <td>₹ ${lossPerDay}</td>
        <td>₹ ${lossPerMonth}</td>
        <td>₹ ${lossPerYear}</td>
      </tr>
    `;
  
    document.getElementById('resultTable').classList.remove('hidden');
  });
  