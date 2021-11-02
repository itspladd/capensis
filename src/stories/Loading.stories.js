import Loading from '../components/Loading';

export default {
  component: Loading,
  title: 'Components/Loading'
};

const Template = args => <Loading {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: "Loading..."
}