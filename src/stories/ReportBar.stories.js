import { Redirect } from 'react-router';
import ReportBar from '../components/ReportBar';

export default {
  component: ReportBar,
  title: 'Components/ReportBar'
};

const Template = args => <ReportBar {...args} />;

export const Unfilled = Template.bind({})

Unfilled.args = {
  progress: 0,
  goal: 100,
  color: "#ff0000"
}