import ReportBar from '../components/ReportBar';

export default {
  component: ReportBar,
  title: 'Components/ReportBar'
};

const Template = args => <ReportBar {...args} />;

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