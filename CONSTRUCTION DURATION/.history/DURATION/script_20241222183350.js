document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('ganttChart').getContext('2d');
    const tasks = [
        'Building plan & approvals', 'Excavation', 'Soakpit/Septic tank', 'Dug well/Borewell',
        'Foundation & Plinth beams', 'Backfilling', 'RCC Column starters',
        'Columns, Roof slab, Beams & Staircase', 'Brickwork, Lintels, Sunshades',
        'Doors & windows', 'Installation of doors and windows',
        'Electrical Wiring & Accessories', 'Plumbing work',
        'Sanitary Installation', 'Plastering', 'Flooring', 'Painting',
        'POP False ceiling', 'Modular Kitchen', 'Boundary wall',
        'Water Connection', 'Electrical connection'
    ];

    const taskSchedules = [
        [1, 90], [1, 2], [1, 20], [1, 2], [3, 22],
        [25, 28], [25, 31], [32, 76], [91, 120], [1, 30],
        [121, 135], [131, 140], [141, 147], [148, 152],
        [153, 172], [173, 190], [191, 205], [171, 178],
        [179, 185], [121, 126], [1, 30], [1, 90]
    ];

    const taskColors = tasks.map((task, index) => {
        const criticalTasks = [
            'Excavation', 'Foundation & Plinth beams', 'RCC Column starters',
            'Columns, Roof slab, Beams & Staircase', 'Brickwork, Lintels, Sunshades',
            'Installation of doors and windows', 'Electrical Wiring & Accessories',
            'Plumbing work', 'Sanitary Installation', 'Plastering', 'Flooring', 'Painting'
        ];
        const parallelTasks = [
            'Building plan & approvals', 'Soakpit/Septic tank', 'Dug well/Borewell',
            'Backfilling', 'Doors & windows', 'POP False ceiling',
            'Boundary wall', 'Water Connection', 'Electrical connection'
        ];
        const individualTasks = ['Modular Kitchen'];

        if (criticalTasks.includes(task)) return 'rgba(255, 99, 132, 0.5)';
        if (parallelTasks.includes(task)) return 'rgba(255, 206, 86, 0.5)';
        if (individualTasks.includes(task)) return 'rgba(75, 192, 192, 0.5)';
        return 'rgba(201, 203, 207, 0.5)';
    });

    const data = {
        labels: tasks,
        datasets: [{
            label: 'Construction Schedule',
            data: taskSchedules.map((range, index) => ({ x: range, y: index })),
            backgroundColor: taskColors,
            borderColor: taskColors.map(color => color.replace('0.5', '1')),
            borderWidth: 1,
            borderSkipped: false,
            barThickness: 15
        }]
    };

    const config = {
        type: 'bar',
        data,
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'No.of Days'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Activity'
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: false
                }
            }
        },
        plugins: [{
            afterDatasetDraw(chart) {
                const { ctx, chartArea: { left, top }, scales: { y, x } } = chart;

                chart.data.datasets[0].data.forEach((dataPoint, index) => {
                    const schedule = taskSchedules[index];
                    const xPosition = x.getPixelForValue(schedule[1]) + 10; // Position text slightly after the bar
                    const yPosition = y.getPixelForValue(index);

                    ctx.fillStyle = 'black';
                    ctx.font = '12px Arial';
                    ctx.fillText(`(${schedule[0]} - ${schedule[1]})`, xPosition, yPosition + 5);
                });
            }
        }]
    };

    new Chart(ctx, config);
});