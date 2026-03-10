import { useEffect, useState } from "react";
import "./orders.css";
import toast from "react-hot-toast";

export default function Orders(){

const [orders,setOrders] = useState([]);

useEffect(()=>{

const user = JSON.parse(localStorage.getItem("currentUser"));

const ORDERS_KEY = user ? `orders_${user.username}` : "orders_guest";

const stored = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];

setOrders(stored.reverse());

},[]);

const reorder = (items)=>{

const user = JSON.parse(localStorage.getItem("currentUser"));
if(!user) return;

const CART_KEY = `cart_${user.username}`;

localStorage.setItem(CART_KEY, JSON.stringify(items));

window.dispatchEvent(new Event("cartUpdated"));
window.dispatchEvent(new Event("openCart"));

toast.success("Order added to cart 🛒",{
style:{
borderRadius:"12px",
background:"#2E4A7D",
color:"#fff"
}
});

};

return(

<div className="orders-page">

<h1>Your Orders</h1>

{orders.length===0 && (
<p className="no-orders">No orders yet</p>
)}

{orders.map(order=>(

<div key={order.id} className="order-card">

<div className="order-header">

<div>
<strong>Order #{order.id}</strong>
<p>{new Date(order.date).toLocaleDateString()}</p>
</div>

<div className="order-status">
{order.deliveryType === "pickup" ? "Pickup" : "Delivery"}
</div>

</div>

<div className="order-items">

{order.items.map(item=>(

<div key={item.id} className="order-item">

<img src={item.image} alt={item.title} />

<div>
<p>{item.title}</p>
<span>{item.quantity} × {item.price} EGP</span>
</div>

</div>

))}

</div>

<div className="order-footer">

<div className="order-total">
Total: <strong>{order.total} EGP</strong>
</div>

<button
className="order-again"
onClick={()=>reorder(order.items)}
>
Order Again
</button>

</div>

</div>

))}

</div>

);

}