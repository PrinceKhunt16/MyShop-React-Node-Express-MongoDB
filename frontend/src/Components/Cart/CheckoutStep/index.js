import React from 'react'
import "./style.css"
import { Typography, Stepper, StepLabel, Step } from "@mui/material";

const CheckoutStep = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping <br /> Details</Typography>,
        },
        {
            label: <Typography>Confirm <br /> Order</Typography>,
        },
        {
            label: <Typography>Pay <br /> Payment</Typography>,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };

    return (
        <>
            <div className="stepperBody">
                <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                    {steps.map((item, index) => (
                        <Step
                            key={index}
                            active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}
                        >
                            <StepLabel
                                style={{
                                    color: activeStep >= index ? "rgba(0, 0, 0)" : "rgba(0, 0, 0, 0.649)",
                                }}
                                className={`stepLebel ${activeStep >= index ? "changeIcon" : "doNotChange"}`}
                            >
                                {item.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </>
    )
}

export default CheckoutStep