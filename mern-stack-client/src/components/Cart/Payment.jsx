
import { loadStripe } from "@stripe/stripe-js";

import PaymentExtra from './PaymentExtra.jsx'
import { Elements } from "@stripe/react-stripe-js";

const Payment = ({ stripeApiKey }) => {

  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
    <PaymentExtra />
    </Elements>
  );
};

export default Payment;
