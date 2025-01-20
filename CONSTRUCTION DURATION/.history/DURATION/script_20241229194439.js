const activities = [
    { name: 'Building plan & approvals', days: 90, start: 1, type: 'blue-bg' },
    { name: 'Excavation', days: 2, start: 1, type: 'pink-bg' },
    { name: 'Soakpit/Septic tank', days: 20, start: 1, type: 'blue-bg' },
    { name: 'Dug well/Borewell', days: 2, start: 1, type: 'pink-bg' },
    { name: 'Foundation & Plinth beams', days: 20, start: null, type: 'blue-bg' },
    { name: 'Backfilling', days: 4, start: 25, type: 'pink-bg' },
    { name: 'RCC Column ', days: 7, start: null, type: 'blue-bg' },
    { name: 'Columns, Roof slab, Beams & Staircase', days: 45, start: null, type: 'pink-bg' },
    { name: 'Brickwork, Lintels, Sunshades', days: 30, start: null, type: 'blue-bg' },
    { name: 'Doors & windows', days: 30, start: 1, type: 'pink-bg' },
    { name: 'Installation of doors and windows', days: 15, start: null, type: 'blue-bg' },
    { name: 'Electrical Wiring & Accessories', days: 10, start: null, type: 'pink-bg' },
    { name: 'Plumbing work', days: 7, start: null, type: 'blue-bg' },
    { name: 'Sanitary Installation', days: 5, start: null, type: 'pink-bg' },
    { name: 'Plastering', days: 20, start: null, type: 'blue-bg' },
    { name: 'Flooring', days: 18, start: null, type: 'pink-bg' },
    { name: 'Painting', days: 15, start: null, type: 'blue-bg' },
    { name: 'POP False ceiling', days: 7, start: 171, type: 'pink-bg' },
    { name: 'Modular Kitchen', days: 7, start: 179, type: 'blue-bg' },
    { name: 'Boundary wall', days: 6, start: 121, type: 'pink-bg' },
    { name: 'Water Connection', days: 30, start: 1, type: 'blue-bg' },
    { name: 'Electrical connection', days: 90, start: 1, type: 'pink-bg' }
];
function generateChart() {
    const startDate = new Date(document.getElementById('startDate').value);
    const chart = document.getElementById('ganttChart');
    const timeline = document.getElementById('timeline');
    chart.innerHTML = '';
    timeline.innerHTML = '';
    let lastEndDate = new Date(startDate);
    activities.forEach((activity, index) => {
        const taskName = document.createElement('div');
        taskName.classList.add('task-name', activity.type);
        taskName.innerHTML = `${activity.name}`;
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
        taskDates.classList.add('task-dates', activity.type);
        taskDates.innerText = `${startDay.toLocaleDateString()} - ${endDay.toLocaleDateString()}`;
        chart.appendChild(taskName);
        chart.appendChild(bar);
        chart.appendChild(taskDates);
    });
}
