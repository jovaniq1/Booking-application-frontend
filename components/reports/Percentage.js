import dynamic from 'next/dynamic'; // need for apexcharts window bug
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false }); // change Charts to ApexCharts needed for window bug as well
const PercentageComponent = () => {
  const optionsBar = {
    chart: {
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 0,
    },
    xaxis: {
      categories: ['Fav Color'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.35,
        gradientToColors: undefined,
        inverseColors: false,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [90, 0, 100],
      },
    },

    legend: {
      position: 'bottom',
      horizontalAlign: 'right',
    },
  };
  const seriesBar = [
    {
      name: 'blue',
      data: [32],
    },
    {
      name: 'green',
      data: [41],
    },
    {
      name: 'yellow',
      data: [12],
    },
    {
      name: 'red',
      data: [65],
    },
  ];
  return (
    <div className="col percentage-chart">
      <ApexCharts
        options={optionsBar}
        height={140}
        series={seriesBar}
        type="bar"
        width={500}
      />
    </div>
  );
};

export default PercentageComponent;
