import SessionItem from '../components/SessionItem';

export default {
  component: SessionItem,
  title: 'Components/SessionItem'
};

const Template = args => <SessionItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: 5,
  title: "React",
  start_time: "2021-11-02T01:02:15.822Z",
  end_time: "2021-11-02T01:02:17.013Z"
}