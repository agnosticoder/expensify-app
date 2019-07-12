import { shallow } from 'enzyme';
import React from 'react';
import LoadingPage from '../../components/LoadingPage';

test('should render Loading Page correctly', () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper).toMatchSnapshot();
});

