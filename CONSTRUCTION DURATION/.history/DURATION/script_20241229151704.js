const activities = [
    { name: 'Building plan & approvals', days: 90, start: 1, type: 'parallel' },
    { name: 'Excavation', days: 2, start: 1, type: 'critical' },
    { name: 'Soakpit/Septic tank', days: 20, start: 1, type: 'parallel' },
    { name: 'Dug well/Borewell', days: 2, start: 1, type: 'parallel' },
    { name: 'Foundation & Plinth beams', days: 20, start: 3, type: 'critical' },
    { name: 'Backfilling', days: 4, start: 25, type: 'parallel' },
    { name: 'RCC Column ', days: 7, start: 25, type: 'critical' },
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

    // Generate timeline
    for (let i = 0; i <= 210; i += 10) {
        const timeBlock = document.createElement('div');
        timeBlock.innerText = i;
        timeline.appendChild(timeBlock);
    }

    // Generate Gantt chart
    activities.forEach((activity, index) => {
        const taskName = document.createElement('div');
        taskName.classList.add('task-name');
        taskName.innerHTML = `${activity.name} 
            <input type="number" value="${activity.days}" min="1" onchange="updateDays(${index}, this.value)">`;

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


// Set time to 09:00 AM for start and end
const timeString = '09:00 AM';
const startDateWithTime = `${startDay.toLocaleDateString()} ${timeString}`;
const endDateWithTime = `${endDay.toLocaleDateString()} ${timeString}`;

const taskDates = document.createElement('div');
taskDates.classList.add('task-dates');
taskDates.innerText = `${startDateWithTime} - ${endDateWithTime}`;

        chart.appendChild(taskName);
        chart.appendChild(bar);
        chart.appendChild(taskDates);
    });
}

function updateDays(index, newDays) {
    activities[index].days = parseInt(newDays, 10);
    generateChart();
}

// Set default date to today
window.onload = function () {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    document.getElementById('startDate').value = todayStr;
    generateChart();

};
