import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {

const navigate = useNavigate();
const [order,setOrder] = useState(null);

useEffect(()=>{

const orders = JSON.parse(localStorage.getItem("orders")) || [];
const saved = orders[orders.length - 1]; // آخر طلب

if(!saved){
navigate("/");
}else{
setOrder(saved);
}

},[navigate]);

if(!order) return null;

return(

<div className="success-container">

<div className="success-card">

<div className="success-icon">✔</div>

<h2>Payment Successful</h2>

<div className="success-details">

<div>
<strong>Total Paid:</strong> {order.total.toFixed(2)} EGP
</div>

<div>
<strong>Delivery:</strong> {order.deliveryType}
</div>

<div>
<strong>Items:</strong> {order.items.length}
</div>

<div>
<strong>Date:</strong> {new Date(order.date).toLocaleString()}
</div>

<div className="card-display">
<span>Card ending **** {order.payment.cardLast4}</span>
</div>

</div>

<button
onClick={()=>navigate("/")}
className="success-btn"
>

Continue Shopping

</button>

</div>

</div>

);

}