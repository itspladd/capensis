import { Redirect } from 'react-router';
import ReportBar from '../components/ReportBar';

export default {
  component: ReportBar,
  title: 'Components/ReportBar'
};

const Template = args => <ReportBar {...args} />;

export const Unfilled = Template.bind({});
export const Half = Template.bind({})

Unfilled.args = {
  progress: 0,
  goal: 100,
  color: "#ff0000"
}

Half.args = {
  progress: 50,
  goal: 100,
  color: "#00ff00"
}