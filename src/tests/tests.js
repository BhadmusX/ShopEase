import { expect, afterEach, describe, it } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";
import reducerFunc from '../context/reducerFunc.js';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

describe('reducerFunc', () => {
  it('updates qty and returns a new array', () => {
    const initialState = [
      { id: 1, qty: 1, price: 10 },
      { id: 2, qty: 2, price: 20 }
    ];

    const nextState = reducerFunc(initialState, {
      type: 'updateQty',
      payload: { id: 1, qty: 4 }
    });

    expect(nextState).toEqual([
      { id: 1, qty: 4, price: 10 },
      { id: 2, qty: 2, price: 20 }
    ]);
  });

  it('increases qty without mutating the original item', () => {
    const initialState = [{ id: 1, qty: 1, price: 10 }];

    const nextState = reducerFunc(initialState, {
      type: 'increaseQty',
      payload: { id: 1 }
    });

    expect(nextState).toEqual([{ id: 1, qty: 2, price: 10 }]);
    expect(initialState).toEqual([{ id: 1, qty: 1, price: 10 }]);
  });
});