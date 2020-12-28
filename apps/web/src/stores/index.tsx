import React from 'react';
import { Counter } from './counter';

export const createStores = () => {
  const counter = new Counter();

  return {
    counter,
  };
};

export type Stores = ReturnType<typeof createStores>;

const context = React.createContext<Stores | null>(null);

export const StoresProvider: React.FC<{ stores: Stores }> = ({
  stores,
  children,
}) => {
  const { Provider } = context;

  return <Provider value={stores}>{children}</Provider>;
};

export function useStores(): Stores {
  const stores = React.useContext(context);

  if (!stores) {
    throw new Error(
      'stores context was not found - StoreProvider was not used',
    );
  }

  return stores;
}
