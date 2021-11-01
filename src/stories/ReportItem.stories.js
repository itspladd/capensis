import Color from 'colorjs.io';

import ReportItem from '../components/ReportItem';

export default {
  component: ReportItem,
  title: 'Components/ReportItem'
};

const Template = args => <ReportItem {...args} />;

export const Unfilled = Template.bind({});
export const Half = Template.bind({});
export const Full = Template.bind({});
export const Overfilled = Template.bind({});

Unfilled.args = {
  title: "Law School",
  progress: 0,
  goal: 420
}

Half.args = {
  title: "React",
  progress: 330,
  goal: 660,
  color: "#00ff00"
}

Full.args = {
  title: "Gaming",
  progress: 100,
  goal: 100,
  color: "#ff0000"
}

Overfilled.args = {
  title: "Being Rad",
  progress: 130,
  goal: 100,
  color: "#ff00ff"
}