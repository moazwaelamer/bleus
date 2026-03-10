import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import "./checkout.css";
import BackButton from "../../components/BackButton/BackButton.jsx";

export default function Checkout(){

const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("currentUser"));

const CART_KEY = user ? `cart_${user.username}` : "cart_guest";
const ORDERS_KEY = user ? `orders_${user.username}` : "orders_guest";

const [items,setItems] = useState([]);
const [deliveryType,setDeliveryType] = useState("delivery");

const [billingInfo,setBillingInfo] = useState({
firstName:"",
lastName:"",
address:"",
phone:""
});

const [cardNumber,setCardNumber] = useState("");
const [expiry,setExpiry] = useState("");
const [cvc,setCvc] = useState("");
const [cardType,setCardType] = useState("");

useEffect(()=>{

const stored = JSON.parse(localStorage.getItem(CART_KEY)) || [];
setItems(stored.map(i=>({...i,quantity:i.quantity || 1})));

},[CART_KEY]);

const subtotal = items.reduce((sum,item)=> sum + item.price * item.quantity,0);

const shipping =
deliveryType==="pickup"
?0
:subtotal>300 || items.length===0
?0
:60;

const total = subtotal + shipping;

const validateLuhn = (number)=>{

const clean = number.replace(/\s/g,"");
let sum = 0;
let shouldDouble = false;

for(let i=clean.length-1;i>=0;i--){

let digit = parseInt(clean[i]);

if(shouldDouble){
digit*=2;
if(digit>9) digit-=9;
}

sum+=digit;
shouldDouble=!shouldDouble;

}

return sum % 10 === 0;

};

const detectCardType = (number)=>{

const clean = number.replace(/\s/g,"");

if(/^4/.test(clean)) return "visa";
if(/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)/.test(clean)) return "mastercard";
if(/^(5078|6271|6361|6362|6363)/.test(clean)) return "meeza";
if(/^3[47]/.test(clean)) return "amex";

return "";

};

const handleCardNumberChange=(e)=>{

let value = e.target.value.replace(/\D/g,"");

if(value.length>16) value=value.slice(0,16);

const formattedValue = value.replace(/(\d{4})(?=\d)/g,"$1 ");

setCardNumber(formattedValue);
setCardType(detectCardType(value));

};

const handleExpiryChange=(e)=>{

let value=e.target.value.replace(/\D/g,"");

if(value.length>4) value=value.slice(0,4);

if(value.length>2){
value=value.slice(0,2)+"/"+value.slice(2);
}

setExpiry(value);

};

const handlePayment=()=>{

if(!billingInfo.firstName || !billingInfo.lastName || !billingInfo.address){
toast.error("Complete billing information");
return;
}

if(!validateLuhn(cardNumber)){
toast.error("Invalid card number");
return;
}

if(!expiry.includes("/") || cvc.length<3){
toast.error("Invalid expiry or CVC");
return;
}

const orderData={
user:user?.username || "guest",
deliveryType,
items,
billingInfo,
subtotal,
shipping,
total,
payment:{cardLast4:cardNumber.slice(-4)},
date:new Date().toISOString()
};

/* ===== SAVE ORDER PER USER ===== */

const orders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];

orders.push({
id: Date.now(),
...orderData
});

localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

/* ===== CLEAR CART ===== */

localStorage.removeItem(CART_KEY);

toast.success("Payment successful");

navigate("/payment-success");

};

return(

<div className="stripe-checkout-container">

<BackButton to="/CartPage" />

<aside className="order-summary-side">

<div className="summary-sticky-content">

<p className="pay-label">Pay BLEUS</p>
<h1 className="total-amount">{total.toFixed(2)} EGP</h1>

{items.map(item=>(

<div key={item.id} className="review-item">

<img src={item.image} alt={item.title}/>

<div>
<p>{item.title}</p>
<p>Qty: {item.quantity}</p>
</div>

<span>{(item.price*item.quantity).toFixed(2)} EGP</span>

</div>

))}

<div className="pricing-footer">

<div className="price-row">
<span>Subtotal</span>
<span>{subtotal.toFixed(2)} EGP</span>
</div>

<div className="price-row">
<span>Shipping</span>
<span>{shipping===0?"Free":`${shipping} EGP`}</span>
</div>

<div className="price-row total-row">
<span>Total</span>
<span>{total.toFixed(2)} EGP</span>
</div>

</div>

</div>

</aside>

<main className="checkout-form-side">

<div className="form-wrapper">

<div className="form-card">

<h2>Delivery Method</h2>

<div className="delivery-options">

<label className={`delivery-card ${deliveryType==="delivery"?"active":""}`}>

<input
type="radio"
value="delivery"
checked={deliveryType==="delivery"}
onChange={(e)=>setDeliveryType(e.target.value)}
/>

<div>
<p>Delivery</p>
<span>Delivered to your address</span>
</div>

</label>

<label className={`delivery-card ${deliveryType==="pickup"?"active":""}`}>

<input
type="radio"
value="pickup"
checked={deliveryType==="pickup"}
onChange={(e)=>setDeliveryType(e.target.value)}
/>

<div>
<p>Pickup</p>
<span>Collect from store</span>
</div>

</label>

</div>

</div>

<div className="form-card">

<h2>Billing Address</h2>

<div className="two-cols">

<input
type="text"
placeholder="First name"
value={billingInfo.firstName}
onChange={(e)=>setBillingInfo({...billingInfo,firstName:e.target.value})}
/>

<input
type="text"
placeholder="Last name"
value={billingInfo.lastName}
onChange={(e)=>setBillingInfo({...billingInfo,lastName:e.target.value})}
/>

</div>

<input
type="text"
placeholder="Phone"
value={billingInfo.phone}
onChange={(e)=>setBillingInfo({...billingInfo,phone:e.target.value})}
/>

<input
type="text"
placeholder="Address"
value={billingInfo.address}
onChange={(e)=>setBillingInfo({...billingInfo,address:e.target.value})}
/>

</div>

<div className="form-card">

<h2>Payment</h2>

<input
className={`card-input ${cardType}`}
type="text"
placeholder="Card number"
value={cardNumber}
onChange={handleCardNumberChange}
/>

<div className="two-cols">

<input
type="text"
placeholder="MM/YY"
value={expiry}
onChange={handleExpiryChange}
/>

<input
type="password"
placeholder="CVC"
value={cvc}
maxLength="3"
onChange={(e)=>setCvc(e.target.value.replace(/\D/g,""))}
/>

</div>

<button className="main-submit-btn" onClick={handlePayment}>
Pay {total.toFixed(2)} EGP
</button>

</div>

</div>

</main>

</div>

);

}