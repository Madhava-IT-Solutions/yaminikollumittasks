const activities = [
    { name: 'Building plan & approvals', days: 90, start: 1, type: 'parallel' },
    { name: 'Excavation', days: 2, start: 1, type: 'critical' },
    { name: 'Soakpit/Septic tank', days: 20, start: 1, type: 'parallel' },
    { name: 'Dug well/Borewell', days: 2, start: 1, type: 'parallel' },
    { name: 'Foundation & Plinth beams', days: 20, start: null, type: 'critical' },
    { name: 'Backfilling', days: 4, start: 25, type: 'parallel' },
    { name: 'RCC Column ', days: 7, start: null, type: 'critical' },
    { name: 'Columns, Roof slab, Beams & Staircase', days: 45, start: null, type: 'critical' },
    { name: 'Brickwork, Lintels, Sunshades', days: 30, start: null, type: 'critical' },
    { name: 'Doors & windows', days: 30, start: 1, type: 'parallel' },
    { name: 'Installation of doors and windows', days: 15, start: null, type: 'critical' },
    { name: 'Electrical Wiring & Accessories', days: 10, start: null, type: 'critical' },
    { name: 'Plumbing work', days: 7, start: null, type: 'critical' },
    { name: 'Sanitary Installation', days: 5, start: null, type: 'critical' },
    { name: 'Plastering', days: 20, start: null, type: 'critical' },
    { name: 'Flooring', days: 18, start: null, type: 'critical' },
    { name: 'Painting', days: 15, start: null, type: 'critical' },
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

    let lastEndDate = new Date(startDate);
    activities.forEach((activity, index) => {
        if (activity.type === 'critical') {
            activity.start = Math.ceil((lastEndDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
            const startDay = new Date(startDate);
            startDay.setDate(startDay.getDate() + activity.start - 1);
            lastEndDate = new Date(startDay);
            lastEndDate.setDate(lastEndDate.getDate() + activity.days);
        }
    });

    for (let i = 0; i <= 210; i += 10) {
        const timeBlock = document.createElement('div');
        timeBlock.innerText = i;
        timeline.appendChild(timeBlock);
    }

    activities.forEach((activity, index) => {
        const rowClass = index % 2 === 0 ? 'pink-bg' : 'blue-bg';

        const taskName = document.createElement('div');
        taskName.classList.add('task-name', rowClass);
        taskName.innerHTML = `${activity.name} 
            <input type="number" value="${activity.days}" min="1" onchange="updateDays(${index}, this.value)">`;

        const bar = document.createElement('div');
        bar.classList.add('bar', activity.type);

        const startDay = new Date(startDate);
        startDay.setDate(startDay.getDate() + activity.start - 1);

        const endDay = new Date(startDay);
        endDay.setDate(endDay.getDate() + activity.days - 1);

        bar.style.width = `${activity.days * 5}px`;
        bar.style.marginLeft = `${activity.start * 5}px`;
        bar.innerText = `${activity.days} days`;

        const taskDates = document.createElement('div');
        taskDates.classList.add('task-dates', rowClass);
        taskDates.innerText = `${startDay.toLocaleDateString()} - ${endDay.toLocaleDateString()}`;

        chart.appendChild(taskName);
        chart.appendChild(bar);
        chart.appendChild(taskDates);
    });
}

function updateDays(index, newDays) {
    activities[index].days = parseInt(newDays, 10);
    generateChart();
}

window.onload = function () {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    document.getElementById('startDate').value = todayStr;
    generateChart();
};

const COST_PER_SQMT = 16810;
        
        function calculateCost() {
            const unitFactor = parseFloat(document.getElementById('unit').value);
            const area = parseFloat(document.getElementById('area').value);
            const floors = parseInt(document.getElementById('floor').value);
            
            if (isNaN(area) || area <= 0 || isNaN(floors) || floors < 0) {
                alert('Please enter valid area and number of floors.');
                return;
            }

            const floorFactor = 1 + 0.67 * floors;
            const tentativeCost = area * COST_PER_SQMT * unitFactor * floorFactor;

            const lossPerDay = (tentativeCost * 8.5) / 365 + 300;
            const lossPerMonth = lossPerDay * 30;
            const lossPerYear = lossPerMonth * 12;

            document.getElementById('tentativeCost').textContent = `₹ ${Math.round(tentativeCost)}`;
            document.getElementById('delayPerDay').textContent = `₹ ${Math.round(lossPerDay)}`;
            document.getElementById('delayPerMonth').textContent = `₹ ${Math.round(lossPerMonth)}`;
            document.getElementById('delayPerYear').textContent = `₹ ${Math.round(lossPerYear)}`;
        }