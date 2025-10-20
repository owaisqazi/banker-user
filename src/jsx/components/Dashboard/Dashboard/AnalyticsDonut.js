import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables, ArcElement } from "chart.js";

// Register ArcElement with Chart.js


const AnalyticsDonut = (props) => {
		Chart.register(...registerables);
		Chart.register(ArcElement);
	const data = {
		weight: 0,
		defaultFontFamily: "Poppins",
		datasets: [
			{
				data: [props.value, 100 - props.value],
				borderWidth: 0,
				backgroundColor: [
					props.backgroundColor,
					props.backgroundColor2,
				],
			},
		],
	};

	const options = {
		width: 110,
		cutoutPercentage: 65,
		responsive: false,
		maintainAspectRatio: true,
		tooltips: { enabled: false },
		hover: { mode: null },
	};

	return (
		<div className="donut1" style={{ marginTop: "-10px" }}>
			<Doughnut data={data} options={options} height={150} width={150} />
		</div>
	);
};

export default AnalyticsDonut;