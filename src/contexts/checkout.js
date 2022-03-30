import React, { useReducer, useEffect, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CHECKOUT_STEPS = {
    SHIPPING: 'shipping',
    PAYMENT: 'payment'
};

const initialState = {
    step: CHECKOUT_STEPS.AUTH,
    shippingAddress: null
};

export const CheckoutStateContext = createContext();
export const CheckoutDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_CHECKOUT_STEP":
            return {
                ...state,
                step: action.payload.step
            };

        case "SET_SHIPPING_ADDRESS":
            return {
                ...state,
                shippingAddress: action.payload.shippingAddress
            };

        default:
            throw new Error(`unknown action : ${action.type}`);
    }
}

export const setCheckoutStep = (dispatch, step) => {
    return dispatch({
        type: "SET_CHECKOUT_STEP",
        payload: {
            step
        }
    });
};

export const saveShippingAddress = (dispatch, shippingAddress) => {
    return dispatch({
        type: "SET_SHIPPING_ADDRESS",
        payload: {
            shippingAddress
        }
    });
};


const CheckoutProvider = ({ children }) => {
    const [checkoutState, setCheckoutState] = useLocalStorage("checkout", null);
    const persistedCheckoutState = {
        ...initialState,
        shippingAddress: checkoutState || {}
    };

    const [state, dispatch] = useReducer(reducer, persistedCheckoutState);

    useEffect(() => {
        setCheckoutState(state.shippingAddress);
    }, [state.shippingAddress]);

    return (
        <CheckoutDispatchContext.Provider value={dispatch}>
            <CheckoutStateContext.Provider value={state}>
                {children}
            </CheckoutStateContext.Provider>
        </CheckoutDispatchContext.Provider>
    )
}

export default CheckoutProvider;