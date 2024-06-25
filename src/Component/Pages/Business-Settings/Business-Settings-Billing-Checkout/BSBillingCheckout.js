import React, { useState } from 'react';
import './bsBillingCheckout.css';
import CustomDrawer from '../../sideBar/CustomDrawer';

const BSBillingCheckout = () => {
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [country, setCountry] = useState('India');
  const [sessionKey, setSessionKey] = useState(null);

  useEffect(() => {
    const sessionKey = localStorage.getItem("sessionKey");
    setSessionKey(sessionKey);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email,
      cardNumber,
      expiry,
      cvc,
      cardholderName,
      billingAddress,
      country,
    });
  };

  return (
    <div className="subscription">
        <CustomDrawer/>
    <div className="subscription-container">
      <div className="subscription-details">
        <h2>Subscribe to Prefect Cloud - Pro Tier</h2>
        <div className="pricing">
          <p>US$1,850.00 <span>per month</span></p>
        </div>
        <div className="summary">
          <p>Prefect Cloud - Pro Tier</p>
          <p>US$1,850.00</p>
        </div>
        <div className="billed">
            <p>Billed monthly</p>
        </div>
        <hr />
        <div className="total">
          <p>Subtotal</p>
          <p>US$1,850.00</p>
        </div>
        <div className="tax">
          <p>Tax</p>
          <p>Enter address to calculate</p>
        </div>
        <hr />
        <div className="total-due">
          <p>Total due today</p>
          <p>US$1,850.00</p>
        </div>
      </div>
      <form className="payment-form" onSubmit={handleSubmit}>
        <h2>Pay with card</h2>
        <label>Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />
        </label>
        <label>Card information
          <input
            type="text"
            placeholder="1234 1234 1234 1234"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <div className="card-details">
            <input
              type="text"
              placeholder="MM / YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              required
            />
          </div>
        </label>
        <label>Cardholder name
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder='Full name on Card'
            required
          />
        </label>
        <label>Billing address
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
          </select>
          <input
            type="text"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            placeholder="Address"
            required
          />
        </label>
        <button type="submit">Subscribe</button>
        <p className="subscription-info">
          By confirming your subscription, you allow Prefect Technologies, Inc. to charge you for future payments in accordance with their terms. You can always cancel your subscription.
        </p>
      </form>
    </div>
    </div>
  );
};

export default BSBillingCheckout;
