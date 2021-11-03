import SessionItem from '../components/SessionItem';

export default {
  component: SessionItem,
  title: 'Components/SessionItem'
};

const Template = args => <SessionItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: 5,
  project_id: 3,
  title: "React",
  start_time: "2021-11-02T01:22:15.822Z",
  end_time: "2021-11-02T02:10:17.013Z"
}