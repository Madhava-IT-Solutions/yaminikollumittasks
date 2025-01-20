

const activities = [
    { name: 'Building plan & approvals', days: 90, start: 1, type: 'parallel' },
    { name: 'Excavation', days: 2, start: 1, type: 'critical' },
    { name: 'Soakpit/Septic tank', days: 20, start: 1, type: 'parallel' },
    { name: 'Dug well/Borewell', days: 2, start: 1, type: 'parallel' },
    { name: 'Foundation & Plinth beams', days: 20, start: 3, type: 'critical' },
    { name: 'Backfilling', days: 4, start: 25, type: 'parallel' },
    { name: 'RCC Column starters', days: 7, start: 25, type: 'critical' },
    { name: 'Columns, Roof slab, Beams & Staircase', days: 45, start: 32, type: 'critical' },
    { name: 'Brickwork, Lintels, Sunshades', days: 30, start: 91, type: 'critical' },
    { name: 'Doors & windows', days: 30, start: 1, type: 'parallel' },
    { name: 'Installation of doors and windows', days: 15, start: 121, type: 'critical' },
    { name: 'Electrical Wiring & Accessories', days: 10, start: 131, type: 'critical' },
    { name: 'Plumbing work', days: 7, start: 141, type: 'critical' },
    { name: 'Sanitary Installation', days: 5, start: 148, type: 'critical' },
    { name: 'Plastering', days: 20, start: 153, type: 'critical' },
    { name: 'Flooring', days: 18, start: 173, type: 'critical' },
    { name: 'Painting', days: 15, start: 191, type: 'critical' },
    { name: 'POP False ceiling', days: 7, start: 171, type: 'parallel' },
    { name: 'Modular Kitchen', days: 7, start: 179, type: 'individual' },
    { name: 'Boundary wall', days: 6, start: 121, type: 'parallel' },
    { name: 'Water Connection', days: 30, start: 1, type: 'parallel' },
    { name: 'Electrical connection', days: 90, start: 1, type: 'parallel' }
];

function generateChart() {
    const startDate = new Date(document.getElementById('startDate').value);
    const chart = document.getElementById('ganttChart');
    const timeline = document.getElementById('timeline');
    chart.innerHTML = '';
    timeline.innerHTML = '';
    
    for (let i = 0; i <= 210; i += 10) {
        const timeBlock = document.createElement('div');
        timeBlock.innerText = i;
        timeline.appendChild(timeBlock);
    }
    
    activities.forEach(activity => {
        const taskName = document.createElement('div');
        taskName.classList.add('task-name');
        taskName.innerText = activity.name;
        
        const bar = document.createElement('div');
        bar.classList.add('bar', activity.type);
        
        const startDay = new Date(startDate);
        startDay.setDate(startDay.getDate() + activity.start - 1);
        const endDay = new Date(startDay);
        endDay.setDate(endDay.getDate() + activity.days);
        
        bar.style.width = `${activity.days * 5}px`;
        bar.style.marginLeft = `${activity.start * 5}px`;
        bar.innerText = `${activity.days} days`;
        
        const taskDates = document.createElement('div');
        taskDates.classList.add('task-dates');
        taskDates.innerText = `${startDay.toLocaleDateString()} - ${endDay.toLocaleDateString()}`;
        
        chart.appendChild(taskName);
        chart.appendChild(bar);
        chart.appendChild(taskDates);
    });
}







const COST_PER_SQMT = 15310;
const MULTIPLIERS = {
    sqm: 1,
    sqyd: 0.8361273574,
    sqft: 0.09290304
};

function calculateCost() {
    const area = parseFloat(document.getElementById('area').value);
    const unit = document.getElementById('unit').value;
    const floor = parseInt(document.getElementById('floor').value);

    if (isNaN(area) || area <= 0 || isNaN(floor) || floor < 0) {
        alert("Please enter a valid area and floor.");
        return;
    }

    const multiplier = MULTIPLIERS[unit];
    const floorFactor = 1 + (0.67 * floor);
    const tentativeCost = Math.floor(area * multiplier * COST_PER_SQMT * floorFactor);

    const lossPerDay = Math.floor((tentativeCost * 8.5 / 100 / 365) + 300);
    const lossPerMonth = Math.floor(lossPerDay * 30);
    const lossPerYear = Math.floor(lossPerDay * 365);

    document.getElementById('tentativeCost').innerText = tentativeCost;
    document.getElementById('lossPerDay').innerText = lossPerDay;
    document.getElementById('lossPerMonth').innerText = lossPerMonth;
    document.getElementById('lossPerYear').innerText = lossPerYear;
    document.getElementById('resultTable').style.display = 'table';
}

function resetForm() {
    document.getElementById('area').value = '';
    document.getElementById('unit').value = 'sqm';
    document.getElementById('floor').value = '';
    document.getElementById('resultTable').style.display = 'none';
}

