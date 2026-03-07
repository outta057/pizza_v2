import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
	totalPrice,
	items,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(obj => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				});
			}

			state.totalPrice = calcTotalPrice(state.items);
		},

		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find(obj => obj.id === action.payload);
			if (findItem && findItem.count > 0) {
				findItem.count--;
			}
		},

		removeItem(state, action: PayloadAction<{ id: string }>) {
			state.items = state.items.filter(obj => obj.id !== action.payload.id);
		},
		clearItem(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const selectorCart = (state: RootState) => state.cart;

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
