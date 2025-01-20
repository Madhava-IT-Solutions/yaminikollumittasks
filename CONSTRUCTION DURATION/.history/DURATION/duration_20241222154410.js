// Data for the Gantt chart
const tasks = [
    { name: "Building plan & approvals", start: 1, end: 90 },
    { name: "Excavation", start: 1, end: 2 },
    { name: "Soakpit/Septic tank", start: 1, end: 20 },
    { name: "Dug well/Borewell", start: 1, end: 2 },
    { name: "Foundation & Plinth beams", start: 3, end: 22 },
    { name: "Backfilling", start: 25, end: 28 },
    { name: "RCC Column starters", start: 25, end: 31 },
    { name: "Colimns, Roof slab, Beams & Staircase", start: 32, end: 76 },
    { name: "Brickwork, Lintels, Sunshades", start: 91, end: 120 },
    { name: "Doors & windows", start: 1, end: 30 },
    { name: "Installation of doors and windows", start: 121, end: 135 },
    { name: "Electrical Wiring & Accessories", start: 131, end: 140 },
    { name: "Plumbing work", start: 141, end: 147 },
    { name: "Sanitary Installation", start: 148, end: 152 },
    { name: "Plastering", start: 153, end: 172 },
    { name: "Flooring", start: 173, end: 190 },
    { name: "Painting", start: 191, end: 205 },
    { name: "POP False ceiling", start: 171, end: 178 },
    { name: "Modular Kitchen", start: 179, end: 185 },
    { name: "Boundary wall", start: 121, end: 126 },
    { name: "Water Connection", start: 1, end: 30 },
    { name: "Electrical connection", start: 1, end: 90 },
];

// Render the Gantt chart
function renderGanttChart() {
    const ganttChart = document.getElementById("gantt-chart");

    tasks.forEach((task) => {
        const row = document.createElement("div");
        row.classList.add("gantt-row");

        const taskLabel = document.createElement("div");
        taskLabel.classList.add("task-label");
        taskLabel.textContent = task.name;

        const barContainer = document.createElement("div");
        barContainer.classList.add("gantt-bar-container");

        const bar = document.createElement("div");
        bar.classList.add("gantt-bar");
        const startPosition = task.start * 10; // Scale factor
        const barWidth = (task.end - task.start + 1) * 10; // Scale factor
        bar.style.left = `${startPosition}px`;
        bar.style.width = `${barWidth}px`;
        bar.textContent = `${task.start}-${task.end}`;

        barContainer.appendChild(bar);
        row.appendChild(taskLabel);
        row.appendChild(barContainer);
        ganttChart.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", renderGanttChart);
