import React from "react";
import { CardElement } from "react-stripe-elements";

class CardSection extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          border: "1px solid rgba(42,53,60,0.3)",
          padding: "17px"
        }}
      >
        <CardElement
          style={{
            base: {
              color: "#bbb",
              fontFamily: "Proxima Nova, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              "::placeholder": {
                color: "#bbb"
              }
            }
          }}
        />
      </div>
    );
  }
}

export default CardSection;
