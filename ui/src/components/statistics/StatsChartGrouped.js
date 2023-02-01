import 'primereact/resources/primereact.css';
import React, { useState } from 'react';
import { Chart } from 'primereact/chart';

function StatsChartGrouped(props) {
    const namesArray = props.dataSum.map(a => a.Name);
    const sumArray = props.dataSum.map(a => a.Sum);
    const countArray = props.dataCount.map(a => a.Count);

    const a = [];
    for (var i = 0; i < props.dataSum.length; i++) {
        a.push(getRandomColor())
    }

    const chartData = {
        labels: namesArray,
        datasets: [
            {
                data: sumArray,
                backgroundColor: a
            }
        ]
    };

    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#232323'
                }
            }
        }
    });

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const barChartdata = {
        labels: namesArray,
        datasets: [
            {
                label: 'Number of events',
                backgroundColor: '#3293F0',
                borderColor: '#3293F0',
                data: countArray
            }
        ]
    };
    const barChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
            legend: {
                labels: {
                    fontColor: '#232323'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#232323',
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: '#232323'
                },
                grid: {
                    color: '#232323',
                    drawBorder: false
                }
            }
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Chart type="doughnut" data={chartData} options={lightOptions} className="mx-4 my-2" />
            <Chart type="bar" data={barChartdata} options={barChartOptions} className="mx-4 my-2" />
        </div>
    )
}

export default StatsChartGrouped;