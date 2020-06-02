import React from 'react';
import { shallow, mount } from 'enzyme';
import { BackOfficeRoutes } from '@routes/urls';
import OverdueLoansList from './OverdueLoansList';
import testData from '@testData/loans.json';

jest.mock('react-router-dom');
jest.mock('@pages/backoffice/components');
jest.mock('@config/invenioConfig');
BackOfficeRoutes.loanDetailsFor = jest.fn(pid => `url/${pid}`);

const data = {
  hits: [
    {
      id: 1,
      pid: 'loan1',
      metadata: {
        ...testData[0],
        item: { barcode: 123 },
      },
    },
    {
      id: 2,
      pid: 'loan2',
      metadata: {
        ...testData[1],
        item: { barcode: 123 },
      },
    },
  ],
  total: 2,
};

describe('OverdueLoansList tests', () => {
  let component;
  afterEach(() => {
    if (component) {
      component.unmount();
    }
  });

  it('should load the details component', () => {
    const component = shallow(
      <OverdueLoansList
        data={{ hits: [], total: 0 }}
        fetchOverdueLoans={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('should fetch loans on mount', () => {
    const mockedFetchLoans = jest.fn();
    component = mount(
      <OverdueLoansList
        data={{ hits: [], total: 0 }}
        fetchOverdueLoans={mockedFetchLoans}
      />
    );
    expect(mockedFetchLoans).toHaveBeenCalled();
  });

  it('should render show a message with no loans', () => {
    component = mount(
      <OverdueLoansList
        data={{ hits: [], total: 0 }}
        fetchOverdueLoans={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
    const message = component
      .find('Message')
      .filterWhere(element => element.prop('data-test') === 'no-results');
    expect(message).toHaveLength(1);
  });

  it('should render loans', () => {
    component = mount(
      <OverdueLoansList data={data} fetchOverdueLoans={() => {}} />
    );

    expect(component).toMatchSnapshot();
    const rows = component
      .find('TableRow')
      .filterWhere(
        element =>
          element.prop('data-test') === 'loan1' ||
          element.prop('data-test') === 'loan2'
      );
    expect(rows).toHaveLength(2);

    const footer = component
      .find('TableRow')
      .filterWhere(element => element.prop('data-test') === 'footer');
    expect(footer).toHaveLength(0);
  });
});
