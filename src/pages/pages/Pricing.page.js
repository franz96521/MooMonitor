import React from "react";
import { Row } from "react-bootstrap";
import CardGroup from "react-bootstrap/esm/CardGroup";

const planContents = [
    {
        header: "Free",
        price: 0,
        features: [
            "10 users included",
            "2 GB of storage",
            "Email support",
            "Help center access"
        ],
        buttonLabel: "Sign up for free",
        outline: true
    },
    {
        header: "Pro",
        price: 15,
        features: [
            "20 users included",
            "10 GB of storage",
            "Priority email support",
            "Help center access"
        ],
        buttonLabel: "Get started",
        outline: false
    },
    {
        header: "Enterprise",
        price: 29,
        features: [
            "30 users included",
            "15 GB storage",
            "Phone and email support",
            "Help center access"
        ],
        buttonLabel: "Contact us",
        outline: false
    },
    {
        header: "Black Magic",
        price: 666,
        features: [
            "666 users included",
            "666 GB storage",
            "Phone and email support",
            "Help center access",
            "Free cookies"
        ],
        buttonLabel: "Contact us",
        outline: false
    }
];

const Plan = (props) => {
    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header">
                <h4 className="my-0 font-weight-normal">
                    {props.header}
                </h4>
            </div>
            <div className="card-body">
                <h1 className="card-title pricing-card-title">
                    {`$${props.price}`}
                    <small className="text-muted">
                        / mo
                    </small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                    {props.features.map((feature: any, i: any) => (
                        <li key={i}>{feature}</li>
                    ))}
                </ul>
                <button
                    className={`btn btn-lg btn-block ${props.outline
                        ? "btn-outline-primary"
                        : "btn-primary"
                        }`}
                    type="button"
                >
                    {props.buttonLabel}
                </button>
            </div>
        </div>
    );
};

const Pricing = () => {
    const plans = planContents.map((obj, i) => {
        return (
            <Plan
                key={obj.header}
                header={obj.header}
                price={obj.price}
                features={obj.features}
                buttonLabel={obj.buttonLabel}
                outline={obj.outline}
            />
        );
    });

    return (
        <div style={{
            height: "90vh",
        }}>
            <div style={{ textAlign: "center" }}>
                <h1 className="display-4">The best prices for you</h1>
            </div>
            <section>
                <div className="d-flex align-items-center justify-content-center" >
                    <img
                        className="img-fluid rounded"
                        loading="lazy"
                        src="https://th.bing.com/th?id=OSK.HERO8Z5euZxaUFb7TaW-8c_qKi_DwytYPSXc5u8PjRdxDyY&w=472&h=280&c=13&rs=2&o=6&oif=webp&dpr=1.5&pid=SANGAM"
                        alt=""
                        style={{
                            width: "50%",
                            height: "auto",
                            marginBottom: "2rem",
                            borderRadius: "3rem"
                        }}
                    />
                </div>
            </section>

            <section>
                <div className="d-flex align-items-center justify-content-center">

                    <CardGroup style={{
                        width: "60%",
                        margin: "auto"
                    }}>
                        {plans}
                    </CardGroup>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
