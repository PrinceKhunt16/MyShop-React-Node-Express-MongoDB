import React, { useEffect, useState } from 'react'
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
    const [displayCountry, setDisplayCountry] = useState(false);
    const [displayState, setDisplayState] = useState(false);
    const [countryName, setCountryName] = useState('');
    const [stateName, setStateName] = useState('');

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

        history.push("/yourorder/confirm");
    }

    useEffect(() => {
        const countries = Country.getAllCountries()

        for (const i of countries) {
            if (country === i.isoCode) {
                setCountryName(i.name)
                break;
            }
        }

        const states = State.getStatesOfCountry(country)

        for (const i of states) {
            if (state === i.isoCode) {
                setStateName(i.name)
                break;
            }
        }
    }, [country, state, displayCountry, displayState])

    return (
        <>
            <ToastContainerBox />
            <Metadata title="Shipping Details" />
            <CheckoutStep activeStep={0} />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <form className="shippingForm" encType="multipart/form-data" onSubmit={(e) => shippingSubmit(e)}>
                        <h2>SHIPPING</h2>
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
                            <h2 className='heading' onClick={() => setDisplayCountry(!displayCountry)}>
                                {countryName !== '' ?
                                    `${countryName}`
                                    :
                                    'Country'
                                }
                            </h2>
                            <div className='countryList' style={{ display: `${displayCountry ? 'block' : 'none'}` }}>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <div key={item.isoCode} value={item.isoCode} onClick={() => {
                                            setCountry(item.isoCode)
                                            setDisplayCountry(!displayCountry)
                                        }}>
                                            {item.name}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="stateBox">
                            <h2 className='heading' onClick={() => setDisplayState(!displayState)}>
                                {stateName !== '' ?
                                    `${stateName}`
                                    :
                                    'State'
                                }
                            </h2>
                            <div className='stateList' style={{ display: `${displayState ? 'block' : 'none'}` }}>
                                {State &&
                                    State.getStatesOfCountry(country).map((item) => (
                                        <div key={item.isoCode} value={item.isoCode} onClick={() => {
                                            setState(item.isoCode)
                                            setDisplayState(!displayState)
                                        }}>
                                            {item.name}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="shippingBtn">
                            <input
                                type="submit"
                                value="SHIPPING"
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