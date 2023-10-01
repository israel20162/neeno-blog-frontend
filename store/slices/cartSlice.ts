import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface itemInCart {
    id: number,
    title: string,
    price: number,
    decription: object,
    quantity: number
}
export interface CounterState {
    cart: []
}


const initialState: CounterState = {
    cart:[],
}

export const counterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: {
            reducer(state:any, action: PayloadAction<Partial<itemInCart>>) {
                const itemInCart: itemInCart = state.cart.find(
                    (item: itemInCart) => item.id === action.payload.id
                );
                if (itemInCart) {
                    itemInCart.quantity++;
                } else {
                    state.cart.push({ ...action.payload, quantity: 1 });
                }
            },
            prepare(id, title, price, description) {
                return {
                    payload: {
                        id,
                        title,
                        price,
                        description

                    }
                }
            }
        },
        incrementQuantity: (state: any, action: PayloadAction<number>) => {
            const item: itemInCart = state.cart.find((item: itemInCart) => item.id === action.payload);
            item.quantity++;
        },
        decrementQuantity: (state: any, action: PayloadAction<number>) => {
            const item: itemInCart = state.cart.find((item: itemInCart) => item.id === action.payload);
            if (item.quantity === 1) {
                item.quantity = 1;
            } else {
                item.quantity--;
            }
        },
        removeItem: (state: any, action: PayloadAction<number>) => {
            const removeItem = state.cart.filter(
                (item: itemInCart) => item.id !== action.payload
            );
            state.cart = removeItem;
        },
        clearCart: (state: any, action) => {
            localStorage.removeItem('persist:root')
            state.cart = []
        }

    },
})

// Action creators are generated for each case reducer function
export const { addToCart ,incrementQuantity, decrementQuantity,clearCart,removeItem } = counterSlice.actions

export default counterSlice.reducer