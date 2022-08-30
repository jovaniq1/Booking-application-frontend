import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const GraphComponent = () => {
  const state = {
    options: {
      chart: {
        id: 'apexchart-example',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    },
    series: [
      {
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
  };

  console.log('line graph');
  return (
    <ApexCharts
      options={state.options}
      series={state.series}
      type="bar"
      width={500}
      height={320}
    />
  );
};
export default GraphComponent;
