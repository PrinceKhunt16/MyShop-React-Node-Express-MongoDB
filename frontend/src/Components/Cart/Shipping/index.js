import React, { useState, useEffect } from 'react'
import "./style.css"
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import CheckoutStep from '../CheckoutStep';
import { saveShippingInfo } from '../../../Redux/action/cartAction';
import Metadata from '../../Layouts/MetaData';
import ToastContainerBox from '../../Layouts/ToastContainerBox';
import Toast from '../../Layouts/Toast';

const Shipping = ({ history }) => {
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pincode, setPincode] = useState(shippingInfo.pincode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {
            Toast({
                msg: "Phone Number should be 10 digit long"
            });

            return;
        }

        dispatch(
            saveShippingInfo({ address, city, state, country, pincode, phoneNo })
        );

        history.push("/order/confirm");
    }

    return (
        <>
            <ToastContainerBox />
            <Metadata title="Shipping Details" />
            <CheckoutStep activeStep={0} />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <form className="shippingForm" encType="multipart/form-data" onSubmit={(e) => shippingSubmit(e)}>
                        <h2>Shipping</h2>
                        <div className="shippingInput">
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="shippingInput">
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="shippingInput">
                            <input
                                type="number"
                                placeholder="Pincode"
                                required
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </div>
                        <div className="shippingInput">
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                size="10"
                            />
                        </div>
                        <div className="countryBox">
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option
                                    value=""
                                >
                                    Country
                                </option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="stateBox">
                            <select
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option
                                    value=""
                                >
                                    State
                                </option>
                                {State &&
                                    State.getStatesOfCountry(country).map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="shippingBtn">
                            <input
                                type="submit"
                                value="Shipping"
                                className="loginBtn"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping