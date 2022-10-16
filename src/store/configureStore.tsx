import { legacy_createStore, Store } from 'redux';
import modules, { StoreState } from './modules';

export default function configureStore(): Store<StoreState> {
  const store = legacy_createStore(
    modules,
  );
  return store;
}
