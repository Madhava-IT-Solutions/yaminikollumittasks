const tasks = [
    { name: "Building plan & approvals", start: 1, end: 90 },
    { name: "Excavation", start: 1, end: 2 },
    { name: "Soakpit/Septic tank", start: 1, end: 20 },
    { name: "Dug well/Borewell", start: 1, end: 2 },
    { name: "Foundation & Plinth beams", start: 3, end: 22 },
    { name: "Backfilling", start: 25, end: 28 },
    { name: "RCC Column starters", start: 25, end: 31 },
    { name: "Columns, Roof slab, Beams & Staircase", start: 32, end: 76 },
    { name: "Brickwork, Lintels, Sunshades", start: 91, end: 120 },
    { name: "Installation of doors and windows", start: 121, end: 135 },
    { name: "Electrical Wiring & Accessories", start: 131, end: 140 },
    { name: "Plumbing work", start: 141, end: 147 },
    { name: "Sanitary Installation", start: 148, end: 152 },
    { name: "Plastering", start: 153, end: 172 },
    { name: "Flooring", start: 173, end: 190 },
    { name: "Painting", start: 191, end: 205 }
];

function renderYAxis() {
    const yAxisLabels = document.querySelector('.y-axis-labels');
    tasks.forEach(task => {
        const label = document.createElement('div');
        label.textContent = task.name;
        yAxisLabels.appendChild(label);
    });
}

function renderXAxis() {
    const xAxisLabels = document.querySelector('.x-axis-labels');
    for (let day = 1; day <= 210; day++) {
        const dayLabel = document.createElement('div');
        dayLabel.textContent = day % 10 === 0 ? day : '';
        xAxisLabels.appendChild(dayLabel);
    }
}

function renderGanttChart() {
    const ganttChart = document.getElementById("gantt-chart");

    tasks.forEach((task, index) => {
        const row = document.createElement("div");
        row.classList.add("gantt-row");

        const bar = document.createElement("div");
        bar.classList.add("gantt-bar");

        const dayWidth = 10;  // Each day = 10px width for scaling
        const startPosition = (task.start - 1) * dayWidth;
        const barWidth = (task.end - task.start + 1) * dayWidth;

        bar.style.left = `${startPosition}px`;
        bar.style.width = `${barWidth}px`;
        bar.style.top = `${index * 40}px`;

        const dateLabel = document.createElement("div");
        dateLabel.classList.add("gantt-date");
        dateLabel.textContent = `${task.start}-${task.end}`;
        dateLabel.style.left = `${startPosition + barWidth + 5}px`;

        ganttChart.appendChild(bar);
        ganttChart.appendChild(dateLabel);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderYAxis();
    renderXAxis();
    renderGanttChart();
});
