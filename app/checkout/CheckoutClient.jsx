'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Lock,
  CreditCard,
  Smartphone,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Printer,
  ShoppingBag,
  Truck,
  AlertCircle
} from 'lucide-react';
import Photo from '@/components/Photo';
import Steps from '@/components/Steps';
import { useCart } from '@/components/CartProvider';
import { inr } from '@/lib/data';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
];

export default function CheckoutClient() {
  const router = useRouter();
  const {
    lines,
    subtotal,
    discount,
    promoCode,
    shippingMethod,
    setShippingMethod,
    shippingCost,
    total,
    clear
  } = useCart();

  // Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Uttar Pradesh');
  const [pincode, setPincode] = useState('');
  const [sameBilling, setSameBilling] = useState(true);

  // Payment State
  const [payMethod, setPayMethod] = useState('upi'); // 'upi' | 'card' | 'net' | 'cod'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Submission & Validation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const validate = () => {
    const errs = {};
    if (!email || !email.includes('@') || !email.includes('.')) {
      errs.email = 'Please provide a valid email address.';
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      errs.phone = 'Please provide a valid 10-digit mobile number.';
    }
    if (!firstName.trim()) errs.firstName = 'First name is required.';
    if (!lastName.trim()) errs.lastName = 'Last name is required.';
    if (!address1.trim()) errs.address1 = 'Street address is required.';
    if (!city.trim()) errs.city = 'City or District is required.';
    if (!pincode.trim() || pincode.trim().length !== 6 || isNaN(Number(pincode))) {
      errs.pincode = 'Valid 6-digit Indian PIN code required.';
    }

    if (payMethod === 'upi' && !upiId.includes('@')) {
      errs.upiId = 'Please enter a valid UPI ID (e.g. name@okhdfcbank or 9876543210@paytm).';
    }
    if (payMethod === 'card') {
      const cleanCard = cardNumber.replace(/\s+/g, '');
      if (cleanCard.length < 15) errs.cardNumber = 'Valid 16-digit card number required.';
      if (!cardExpiry.includes('/') || cardExpiry.length < 5) errs.cardExpiry = 'Format MM/YY required.';
      if (cardCvv.length < 3) errs.cardCvv = 'Valid 3 or 4-digit CVV required.';
      if (!cardName.trim()) errs.cardName = 'Name on card is required.';
    }
    if (!agreedTerms) {
      errs.terms = 'You must accept the sacred terms and conditions.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `AST-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = {
        orderId: orderNumber,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }),
        timestamp: new Date().toISOString(),
        customer: {
          name: `${firstName} ${lastName}`,
          email,
          phone,
          address: `${address1}${address2 ? ', ' + address2 : ''}, ${city}, ${stateName} - ${pincode}, India`
        },
        items: lines.map((l) => ({
          slug: l.slug,
          name: l.p.name,
          cat: l.p.cat,
          price: l.p.price,
          qty: l.qty,
          size: l.size,
          color: l.color,
          img: l.p.img
        })),
        pricing: {
          subtotal,
          discount,
          promoCode,
          shippingCost,
          shippingMethod,
          total
        },
        payment: {
          method: payMethod.toUpperCase(),
          status: payMethod === 'cod' ? 'VERIFICATION PENDING' : 'CONFIRMED'
        },
        status: 'Commission Confirmed — Handcrafting in Atelier'
      };

      // Save to localStorage order history
      try {
        const existing = JSON.parse(localStorage.getItem('astha-orders') || '[]');
        localStorage.setItem('astha-orders', JSON.stringify([orderData, ...existing]));
      } catch {}

      // Clear the shopping cart
      clear();
      setCompletedOrder(orderData);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1400);
  };

  // If order is completed, show Order Confirmation view
  if (completedOrder) {
    return (
      <div className="wrap page order-confirmed-root">
        <div className="order-confirmed-card">
          <div className="order-header-strip center-t">
            <CheckCircle2 size={54} color="var(--gold)" className="mb" aria-hidden="true" />
            <span className="eyebrow">ORDER CONFIRMED & COMMENCING</span>
            <h1 className="serif big">Your Sacred Commission is Placed</h1>
            <p className="lead muted">
              Thank you, <b>{completedOrder.customer.name}</b>. Your order <b>#{completedOrder.orderId}</b> has been received and registered at our atelier.
            </p>
          </div>

          <div className="order-details-grid mt">
            <div className="order-summary-box">
              <h2 className="serif big2 mb">Commissioned Vestments</h2>
              <div className="order-items-list">
                {completedOrder.items.map((it) => (
                  <div key={it.slug + it.size} className="line">
                    <Photo src={it.img} className="line-img sm-img" alt={it.name} />
                    <div className="grow">
                      <small className="eyebrow">{it.cat}</small>
                      <h3 className="serif">{it.name}</h3>
                      <p className="sm muted">
                        {it.color} • {it.size} • Qty {it.qty}
                      </p>
                      <b>{inr(it.price * it.qty)}</b>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-breakdown mt">
                <div className="between sm">
                  <span>Subtotal</span>
                  <span>{inr(completedOrder.pricing.subtotal)}</span>
                </div>
                {completedOrder.pricing.discount > 0 && (
                  <div className="between sm green">
                    <span>Discount ({completedOrder.pricing.promoCode})</span>
                    <span>- {inr(completedOrder.pricing.discount)}</span>
                  </div>
                )}
                <div className="between sm">
                  <span>Shipping</span>
                  <span>{completedOrder.pricing.shippingCost === 0 ? 'Complimentary' : inr(completedOrder.pricing.shippingCost)}</span>
                </div>
                <hr />
                <div className="between">
                  <b>Total Paid</b>
                  <b className="big2">{inr(completedOrder.pricing.total)}</b>
                </div>
              </div>
            </div>

            <div className="order-info-sidebar">
              <div className="info-block">
                <span className="eyebrow">DELIVERY RECIPIENT</span>
                <p><b>{completedOrder.customer.name}</b></p>
                <p className="sm muted">{completedOrder.customer.address}</p>
                <p className="sm muted">Phone: {completedOrder.customer.phone}</p>
                <p className="sm muted">Email: {completedOrder.customer.email}</p>
              </div>

              <div className="info-block mt">
                <span className="eyebrow">DISPATCH ESTIMATE</span>
                <p><b>Estimated Dispatch: 2–3 Business Days</b></p>
                <p className="sm muted">
                  Hand-inspected, steam-pressed, and wrapped inside breathable cotton covers before dispatch via insured courier.
                </p>
              </div>

              <div className="info-block mt">
                <span className="eyebrow">PAYMENT SUMMARY</span>
                <p><b>Method: {completedOrder.payment.method}</b></p>
                <span className="tag-b mt-xs">{completedOrder.payment.status}</span>
              </div>

              <div className="order-action-buttons mt">
                <button
                  type="button"
                  className="btn ghost full"
                  onClick={() => window.print()}
                >
                  <Printer size={16} aria-hidden="true" />
                  <span>PRINT SACRED RECEIPT</span>
                </button>
                <Link href={`/track?orderId=${completedOrder.orderId}`} className="btn full mt-xs">
                  <span>TRACK CONSIGNMENT</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link href="/shop" className="ul-s sm center-t d-block mt-xs">
                  Return to आstha Store
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If bag is empty and no completed order, show empty state
  if (lines.length === 0) {
    return (
      <div className="wrap page center-t">
        <ShoppingBag size={48} className="gold mb" aria-hidden="true" />
        <h1 className="serif big2">Your Bag is Empty</h1>
        <p className="muted max-w-sm" style={{ margin: '0 auto' }}>
          Please add ceremonial vestments or sacred apparel to your bag before proceeding to checkout.
        </p>
        <Link href="/shop" className="btn mt">
          BROWSE CATALOGUE
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap page checkout-root">
      <div className="co-head">
        <span className="eyebrow">A CONSIDERED PURCHASE</span>
        <h1 className="serif big">Checkout & Sacred Commission</h1>
        <p className="muted">One final step to your ceremonial essentials.</p>
        <Steps at={1} />
      </div>

      <div className="checkout-grid">
        {/* Left: Customer & Address & Payment Form */}
        <form onSubmit={handlePlaceOrder} className="co-form">
          {/* Contact Details */}
          <section className="form-card">
            <div className="between">
              <h2 className="serif big2">1. Contact Information</h2>
              <span className="sm muted">Guest Checkout</span>
            </div>

            <div className="two mt">
              <label className="field">
                <span className="sm">Email Address for Dispatch Updates *</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((err) => ({ ...err, email: null }));
                  }}
                  placeholder="father.thomas@diocese.in or your email"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>

              <label className="field">
                <span className="sm">Mobile Number (for Courier SMS) *</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((err) => ({ ...err, phone: null }));
                  }}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </label>
            </div>
          </section>

          {/* Delivery Address */}
          <section className="form-card mt">
            <h2 className="serif big2">2. Delivery Address (India)</h2>
            <div className="two mt">
              <label className="field">
                <span className="sm">First Name *</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (errors.firstName) setErrors((err) => ({ ...err, firstName: null }));
                  }}
                  placeholder="Aarav or Fr. Thomas"
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </label>

              <label className="field">
                <span className="sm">Last Name *</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (errors.lastName) setErrors((err) => ({ ...err, lastName: null }));
                  }}
                  placeholder="Sharma or SJ"
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </label>
            </div>

            <label className="field mt-xs">
              <span className="sm">Street Address / House / Monastery / Parish *</span>
              <input
                type="text"
                value={address1}
                onChange={(e) => {
                  setAddress1(e.target.value);
                  if (errors.address1) setErrors((err) => ({ ...err, address1: null }));
                }}
                placeholder="Flat / House No., Church Road, Temple Lane"
              />
              {errors.address1 && <span className="field-error">{errors.address1}</span>}
            </label>

            <label className="field mt-xs">
              <span className="sm">Area, Landmark or Institution (Optional)</span>
              <input
                type="text"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                placeholder="Near Cathedral / Ashram Premises"
              />
            </label>

            <div className="two mt-xs">
              <label className="field">
                <span className="sm">City / District *</span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city) setErrors((err) => ({ ...err, city: null }));
                  }}
                  placeholder="Varanasi, Bengaluru, Kochi..."
                />
                {errors.city && <span className="field-error">{errors.city}</span>}
              </label>

              <label className="field">
                <span className="sm">PIN Code (6 digits) *</span>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    if (errors.pincode) setErrors((err) => ({ ...err, pincode: null }));
                  }}
                  placeholder="221001"
                />
                {errors.pincode && <span className="field-error">{errors.pincode}</span>}
              </label>
            </div>

            <div className="two mt-xs">
              <label className="field">
                <span className="sm">State / Union Territory *</span>
                <select
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="state-select"
                  aria-label="State or Union Territory"
                >
                  {indianStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span className="sm">Country</span>
                <input type="text" value="India" readOnly disabled className="readonly-input" aria-label="Country" />
              </label>
            </div>

            <label className="row g8 sm mt">
              <input
                type="checkbox"
                checked={sameBilling}
                onChange={(e) => setSameBilling(e.target.checked)}
              />
              <span>Billing address is identical to delivery address</span>
            </label>
          </section>

          {/* Delivery Method Choice */}
          <section className="form-card mt">
            <h2 className="serif big2">3. Delivery Method</h2>
            <div className="delivery-options-grid mt">
              <div
                className={`pay ${shippingMethod === 'standard' ? 'on' : ''}`}
                onClick={() => setShippingMethod('standard')}
              >
                <div className="between">
                  <span className="row g12">
                    <i className="radio" />
                    <b>Complimentary Insured Courier</b>
                  </span>
                  <span className="green">FREE</span>
                </div>
                <p className="muted sm">
                  Pan-India transit in 5–7 business days. Hand-packed in protective garment cases.
                </p>
              </div>

              <div
                className={`pay ${shippingMethod === 'express' ? 'on' : ''}`}
                onClick={() => setShippingMethod('express')}
              >
                <div className="between">
                  <span className="row g12">
                    <i className="radio" />
                    <b>Atelier Express Priority Dispatch</b>
                  </span>
                  <b>₹450</b>
                </div>
                <p className="muted sm">
                  Expedited dispatch in 24 hours; arrives in 2–3 business days via air express.
                </p>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="form-card mt">
            <div className="between">
              <h2 className="serif big2">4. Payment Preference</h2>
              <span className="sm muted">All amounts in INR</span>
            </div>

            {/* UPI */}
            <div
              className={`pay mt-xs ${payMethod === 'upi' ? 'on' : ''}`}
              onClick={() => setPayMethod('upi')}
            >
              <div className="between">
                <span className="row g12">
                  <i className="radio" />
                  <b>UPI (Google Pay / PhonePe / Paytm / BHIM)</b>
                </span>
                <Smartphone size={20} aria-hidden="true" />
              </div>
              {payMethod === 'upi' && (
                <div className="pay-subpanel" onClick={(e) => e.stopPropagation()}>
                  <p className="sm muted">
                    Enter your Virtual Payment Address (VPA) / UPI ID:
                  </p>
                  <label className="field mt-xs">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        if (errors.upiId) setErrors((err) => ({ ...err, upiId: null }));
                      }}
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      aria-label="UPI ID"
                    />
                    {errors.upiId && <span className="field-error">{errors.upiId}</span>}
                  </label>
                  <span className="sm green">
                    Instant app notification will be triggered upon checkout.
                  </span>
                </div>
              )}
            </div>

            {/* Card */}
            <div
              className={`pay mt-xs ${payMethod === 'card' ? 'on' : ''}`}
              onClick={() => setPayMethod('card')}
            >
              <div className="between">
                <span className="row g12">
                  <i className="radio" />
                  <b>Credit or Debit Card</b>
                </span>
                <CreditCard size={20} aria-hidden="true" />
              </div>
              {payMethod === 'card' && (
                <div className="pay-subpanel" onClick={(e) => e.stopPropagation()}>
                  <div className="row g8 mb-xs">
                    <span className="net">VISA</span>
                    <span className="net">Mastercard</span>
                    <span className="net">RuPay</span>
                  </div>
                  <label className="field">
                    <span className="sm">Card Number</span>
                    <input
                      type="text"
                      value={cardNumber}
                      maxLength={19}
                      onChange={(e) => {
                        setCardNumber(e.target.value);
                        if (errors.cardNumber) setErrors((err) => ({ ...err, cardNumber: null }));
                      }}
                      placeholder="4111 •••• •••• 1234"
                      aria-label="Credit or debit card number"
                    />
                    {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                  </label>
                  <div className="two mt-xs">
                    <label className="field">
                      <span className="sm">Expiry (MM/YY)</span>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          setCardExpiry(e.target.value);
                          if (errors.cardExpiry) setErrors((err) => ({ ...err, cardExpiry: null }));
                        }}
                        placeholder="12/28"
                        aria-label="Card expiry date"
                      />
                      {errors.cardExpiry && <span className="field-error">{errors.cardExpiry}</span>}
                    </label>
                    <label className="field">
                      <span className="sm">CVV / CVC</span>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => {
                          setCardCvv(e.target.value);
                          if (errors.cardCvv) setErrors((err) => ({ ...err, cardCvv: null }));
                        }}
                        placeholder="•••"
                        aria-label="Card security code"
                      />
                      {errors.cardCvv && <span className="field-error">{errors.cardCvv}</span>}
                    </label>
                  </div>
                  <label className="field mt-xs">
                    <span className="sm">Name on Card</span>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => {
                        setCardName(e.target.value);
                        if (errors.cardName) setErrors((err) => ({ ...err, cardName: null }));
                      }}
                      placeholder="CARDHOLDER NAME"
                      aria-label="Cardholder full name"
                    />
                    {errors.cardName && <span className="field-error">{errors.cardName}</span>}
                  </label>
                </div>
              )}
            </div>

            {/* Net Banking */}
            <div
              className={`pay mt-xs ${payMethod === 'net' ? 'on' : ''}`}
              onClick={() => setPayMethod('net')}
            >
              <div className="between">
                <span className="row g12">
                  <i className="radio" />
                  <b>Net Banking</b>
                </span>
                <Landmark size={20} aria-hidden="true" />
              </div>
              {payMethod === 'net' && (
                <div className="pay-subpanel" onClick={(e) => e.stopPropagation()}>
                  <label className="field">
                    <span className="sm">Select Your Bank:</span>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="state-select"
                      aria-label="Select net banking bank"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                    </select>
                  </label>
                </div>
              )}
            </div>

            {/* Terms checkbox */}
            <label className="row g8 sm mt">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
              />
              <span>
                I agree to the <Link href="/terms" className="ul-s">Terms & Conditions</Link> and <Link href="/privacy" className="ul-s">Privacy Policy</Link>.
              </span>
            </label>
            {errors.terms && <span className="field-error d-block mt-xs">{errors.terms}</span>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn full between place-order-btn mt"
            >
              <span>{isSubmitting ? 'COMMENCING SACRED ORDER...' : `CONFIRM & PAY ${inr(total)}`}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
            <p className="center-t muted sm mt-xs">
              <ShieldCheck size={14} aria-hidden="true" /> 256-Bit SSL Encrypted • Direct Atelier Fulfillment
            </p>
          </section>
        </form>

        {/* Right: Sticky Order Summary */}
        <aside className="co-sum" aria-label="Order items and totals">
          <div className="between">
            <h2 className="serif big2">Order Summary</h2>
            <span className="sm muted">{lines.length} {lines.length === 1 ? 'piece' : 'pieces'}</span>
          </div>

          <div className="co-items-list">
            {lines.map((l) => (
              <div key={`${l.slug}-${l.size}`} className="line">
                <Photo src={l.p.img} tone={l.p.tone} className="line-img sm-img" alt={l.p.name} />
                <div className="grow">
                  <small className="eyebrow">{l.p.cat}</small>
                  <h3 className="serif">{l.p.name}</h3>
                  <p className="sm muted">
                    {l.color} • {l.size} • Qty {l.qty}
                  </p>
                  <b>{inr(l.p.price * l.qty)}</b>
                </div>
              </div>
            ))}
          </div>

          <div className="co-totals-block mt">
            <div className="between sm">
              <span>Subtotal</span>
              <span>{inr(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="between sm green">
                <span>Voucher Concession ({promoCode})</span>
                <span>- {inr(discount)}</span>
              </div>
            )}

            <div className="between sm">
              <span>Insured Transit</span>
              <span>{shippingCost === 0 ? <span className="green">Complimentary</span> : inr(shippingCost)}</span>
            </div>

            <hr />

            <div className="between">
              <b>Payable Total</b>
              <b className="big2">{inr(total)}</b>
            </div>

            <p className="sm muted mt-xs">
              All taxes and duties included • No hidden handling surcharges
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

