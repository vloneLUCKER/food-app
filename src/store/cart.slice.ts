import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const CART_PERSISTENT_STATE = "cart";

export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clean: (state) => {
      state.items = [];
    },
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
      } else {
        state.items.map((i) => {
          i.id === action.payload ? (i.count += 1) : (i.count += 0);
          return i;
        });
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items.map((i) => {
        i.id === action.payload ? (i.count -= 1) : (i.count += 0);
        return i;
      });
      state.items = state.items.filter((i) => i.count !== 0);
    },
    removeAll: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
