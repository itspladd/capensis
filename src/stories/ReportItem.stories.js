import COLORS from '../constants/colors'

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
  color: COLORS.GREEN
}

Full.args = {
  title: "Gaming",
  progress: 100,
  goal: 100,
  color: COLORS.RED
}

Overfilled.args = {
  title: "Being Rad",
  progress: 130,
  goal: 100,
  color: COLORS.PURPLE
}