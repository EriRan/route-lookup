import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { createRouteLookupStore } from '../../../../reducers';
import RouteResult from './RouteResult';

test('Render it', () => {
  // TODO: Do something about i18n translation warning here
  const component = renderer.create(
    <Provider store={createRouteLookupStore()}><RouteResult /></Provider>,
  );

  expect(component).toBeDefined();
});