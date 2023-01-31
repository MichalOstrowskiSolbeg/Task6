import 'primereact/resources/primereact.css';
import React, { useState } from 'react';
import { Chart } from 'primereact/chart';
import { Link } from 'react-router-dom';

function StatsChart(props) {
    const incomePercentage = Number(100 * props.income / (props.expense + props.income)).toFixed(2);
    const expensePercentage = Number(100 * props.expense / (props.expense + props.income)).toFixed(2);
    const chartData = {
        labels: ['Expense', 'Income'],
        datasets: [
            {
                data: [props.expense, props.income],
                backgroundColor: [
                    "#990000",
                    "#009900"
                ],
                hoverBackgroundColor: [
                    "#d93b3b",
                    "#4fdd4f"
                ]
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

    return (
        <>
            <p>Incomes: <span className="font-bold">{props.income} ({ incomePercentage }%)</span></p>
            <p>Expenses: <span className="font-bold">{props.expense} ({ expensePercentage }%)</span></p>
            <div className="flex justify-center items-center">
                <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'flex' }} />
            </div>
        </>
    )
}

export default StatsChart;