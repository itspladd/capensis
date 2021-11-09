import PureSessionItem from '../components/PureSessionItem';

export default {
  component: PureSessionItem,
  title: 'Components/PureSessionItem'
};

const Template = args => <PureSessionItem {...args} />;

export const Default = Template.bind({});
export const Editing = Template.bind({});
export const Submitting = Template.bind({});
export const Success = Template.bind({});

Default.args = {
  id: 5,
  project_id: 3,
  title: "",
  refDay: "2021-11-02T01:22:15.822Z",
  start: "10:45",
  end: "15:20",
  status: "stable"
}

Editing.args = {
  id: 5,
  project_id: 3,
  title: "",
  refDay: "2021-11-02T01:22:15.822Z",
  start: "10:45",
  end: "15:20",
  status: "editing"
}

Submitting.args = {
  id: 5,
  project_id: 3,
  title: "",
  refDay: "2021-11-02T01:22:15.822Z",
  start: "10:45",
  end: "15:20",
  status: "submitting"
}

Success.args = {
  id: 5,
  project_id: 3,
  title: "",
  refDay: "2021-11-02T01:22:15.822Z",
  start: "10:45",
  end: "15:20",
  status: "success"
}