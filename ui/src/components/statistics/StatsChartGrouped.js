import 'primereact/resources/primereact.css';
import React, { useState } from 'react';
import { Chart } from 'primereact/chart';

function StatsChartGrouped(props) {
    const names = props.data.map(a => a.Name);
    const sum = props.data.map(a => a.Sum);

    const a = [];
    for (var i = 0; i < props.data.length; i++) {
        a.push(getRandomColor())
    }

    const chartData = {
        labels: names,
        datasets: [
            {
                data: sum,
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

    return (
        <>
            
        <div className="flex justify-center items-center">
            <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'flex' }} />
            </div>
        </>
    )
}

export default StatsChartGrouped;