import React from 'react';
import Chart from "react-google-charts";


export const getPieChart = (data, title, color1, color2) => {

    const options = {
        title: title,
        pieHole: 0.5,
        slices: [
            {
                color: color1
            },
            {
                color: color2
            }
        ],
        legend: {
            position: "bottom",
            alignment: "center",
            textStyle: {
                color: "233238",
                fontSize: 14
            }
        },
        tooltip: {
            showColorCode: true
        },
        chartArea: {
            left: 25,
            right: 25,
            top: 30,
            width: "100%",
            height: "80%",

        },
        fontName: "Roboto",
        fontSize: 15
    };

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            graph_id={title}
            width="100%"
            height="320px"
            legend_toggle
        />
    );
}

