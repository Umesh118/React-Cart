import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { CheckoutStateContext, CheckoutDispatchContext, CHECKOUT_STEPS, setCheckoutStep, saveShippingAddress } from '../contexts/checkout';
import { CartStateContext } from '../contexts/cart';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import _get from 'lodash.get';
// import Input from '../components/';
import { phoneRegExp } from '../constants/common';

const AddressSchema = Yup.object().shape({
    fullname: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(phoneRegExp, "Phone number is not valid 10 digit number")
        .min(10, "Phone number is too short")
        .max(10, "Phone number is too long"),
    addressLine: Yup.string().required("Door No. & street name is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    code: Yup.string().required("ZIP/postal code is required"),
    country: Yup.string().required("Country is required")
});

const LoginStep = () => {
    const history = useHistory();
    const checkoutDispatch = useContext(CheckoutDispatchContext);
    const handleContinueShopping = () => {
        history.push("/");
    }

    const handleProceed = () => {
        setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
    }

    return (
        <div className='detail-container'>
            <h2>Sign In now!</h2>
            <div>
                <p>Logged in as Umesh</p>
            </div>
            <div className='actions'>
                <button className="outline" onClick={() => handleContinueShopping()}>
                    <i className='rsc-icon-arrow_back' /> Continue Shopping
                </button>
                <button onClick={() => handleProceed()}>
                    Proceed <i className='rsc-icon-arrow_forward' />
                </button>
            </div>
        </div>
    );
};

const AddressStep = () => {
    const checkoutDispatch = useContext(CheckoutDispatchContext);

    const handleBackToLogin = () => {
        setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.AUTH);
    };

    const hadnleSaveAddress = (addressData) => {
        saveShippingAddress(checkoutDispatch, addressData);
    };

    return (
        <div className='detail-container'>
            <h2>Shipping Address</h2>
            <Formik
                initialValues={{
                    fullname: "Umesh",
                    phoneNumber: "9999999999",
                    addressLine: "A2, Shubham Residancy",
                    city: "Washim",
                    state: "Maharashtra",
                    country: "India",
                    code: "888888"
                }}
                validationSchema={AddressSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        const addressData = { ...values };
                        resetForm();
                        hadnleSaveAddress(addressData);
                    }
                    catch (err) {
                        console.log(err);
                    }
                }}
            >
                {() => (
                    <Form>
                        <div className='field-group'>
                            <Field
                                name="fullanem"
                                type="text"
                                placeholder="Full Name"
                            />

                            <Field
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone Number"
                            />
                        </div>
                        <Field
                            name="addressLine"
                            type="text"
                            placeholder="Door no. & Street"
                        />
                        <div className='field-group'>
                            <Field
                                name="city"
                                type="text"
                                placeholder="City"
                            />
                            <Field
                                name="state"
                                type="text"
                                placeholder="State"
                            />
                        </div>
                        <div className='field-group'>
                            <Field
                                name="code"
                                type="text"
                                placeholder="ZIP/Postal Code"
                            />
                            <Field
                                name="country"
                                type="text"
                                placeholder="Country"
                            />
                        </div>
                        <div className='actions'>
                            <button type='button' className='outline' onClick={() => handleBackToLogin()}>
                                <i className='rsc-icon-arrow_back' /> Login as different user
                            </button>
                            <button type='submit'>
                                Save Address <i className='rsc-icon-arrow_forward' />
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const PaymentStep = () => {
    const { shippingAddress } = useContext(CheckoutStateContext);
    const checkoutDispatch = useContext(CheckoutDispatchContext);

    const handleBackToAddress = () => {
        setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
    };

    const handlePayment = () => { };

    return (
        <div className='detail-container'>
            <h2>Payment</h2>
            <div className='actions'>
                <button
                    type='button'
                    className='outline'
                    onClick={() => handleBackToAddress()}
                >
                    <i className='rsc-icon-arrow_back' /> Back To Shipping Details
                </button>
                <button disabled={!shippingAddress} onClick={() => handlePayment()}>
                    Save Address
                    <i className='rsc-icon-arrow_forward' />
                </button>
            </div>
        </div>
    );
};

const Checkout = () => {
    const { items = [] } = useContext(CartStateContext);
    const { step, shippingAddress } = useContext(CheckoutStateContext);
    const checkoutDispatch = useContext(CheckoutDispatchContext);
    const totalItems = items.length;

    const handleClickTimeline = (nextStep) => {
        setCheckoutStep(checkoutDispatch, nextStep)
    };

    return (
        <div className='checkout-page'>
            <div className='container'>
                <div className='order-details'>
                    <ul className='timeline'>
                        <li
                            className={classNames({
                                done: shippingAddress,
                                active: step === CHECKOUT_STEPS.SHIPPING
                            })}
                            onClick={() => handleClickTimeline(CHECKOUT_STEPS.SHIPPING)}>
                            <h2>Shipping</h2>
                            <i className='rsc-icon-check_circle' />
                        </li>
                        <li
                            className={classNames({
                                done: false,
                                active: step === CHECKOUT_STEPS.PAYMENT
                            })}
                            onClick={() => handleClickTimeline(CHECKOUT_STEPS.PAYMENT)}>
                            <h2>Payment</h2>
                            <i className='rsc-icon-check_circle' />
                        </li>
                    </ul>
                    {step === CHECKOUT_STEPS.SHIPPING && AddressStep}
                    {step === CHECKOUT_STEPS.PAYMENT && PaymentStep}
                </div>
                <div className='order-summary'>
                    <h2>Summary
                        <span> {`(${totalItems}) Items`} </span>
                    </h2>
                    <ul className='cart-items'>
                        {items.map((product) => {
                            return (
                                <li className='cart-item' key={product.name}>
                                    <img className='product-image' src={product.image} />
                                    <div className='product-info'>
                                        <p className='product-name' > {product.name} </p>
                                        <p className='product-price'> {product.price} </p>
                                    </div>
                                    <div className='product-total'>
                                        <p className='quantity'>
                                            {`${product.quantity} ${product.quantity > 1 ? "Nos." : "No."
                                                }`}
                                        </p>
                                        <p className='amount'> {product.quantity * product.price} </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <ul className='total-breakup'>
                        <li>
                            <p>Subtotal</p>
                            <p> 5000 </p>
                        </li>
                        <li>
                            <p>Tax</p>
                            <p> 5000 </p>
                        </li>
                        <li>
                            <p>Shipping</p>
                            <p>5000</p>
                        </li>
                        <li>
                            <p>Total</p>
                            <p>5000</p>
                        </li>
                    </ul>


                </div>
            </div>
        </div>
    );
};

export default Checkout;