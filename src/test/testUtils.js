import checkPropTypes from 'check-prop-types';
import rootReducer from '../store/reducers';
import { createStore, applyMiddleware } from 'redux';
import { middlewares } from '../store';

export const storeFactory = initialState => {
  const createStoreWithMiddlewares = applyMiddleware(...middlewares)(createStore)
  return createStoreWithMiddlewares(rootReducer, initialState);
}

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

export const checkPropErrorUndefined = (component, props) => {
  const propError = checkPropTypes(component.propTypes, props, 'prop', component.name);
  expect(propError).toBeUndefined();
}