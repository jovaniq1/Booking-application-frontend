import GraphComponent from '../../components/reports/Graph';
import PercentageComponent from '../../components/reports/Percentage';
import RadialComponent from '../../components/reports/Radial';
import RadialBarComponent from '../../components/reports/RadialBar';
const ReportsPage = () => {
  console.log('Reports');
  return (
    <div>
      <GraphComponent />
      <PercentageComponent />
      <RadialComponent />
      <RadialBarComponent />
    </div>
  );
};
export default ReportsPage;
