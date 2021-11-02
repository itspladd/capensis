import COLORS from '../constants/colors'

import Report from '../components/Report';

export default {
  component: Report,
  title: 'Components/Report'
};

const Template = args => <Report {...args} />;

export const Default = Template.bind({});

Default.args ={
  projects:[{
    title: "Law School",
    progress: 0,
    goal: 420
  },
  {
    title: "React",
    progress: 330,
    goal: 660,
    color: COLORS.GREEN
  },
  {
    title: "Gaming",
    progress: 100,
    goal: 100,
    color: COLORS.RED
  },
  {
    title: "Being Rad",
    progress: 130,
    goal: 100,
    color: COLORS.PURPLE
  }]
};