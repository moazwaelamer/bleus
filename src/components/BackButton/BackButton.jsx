import { useNavigate } from "react-router-dom";

export default function BackButton({ to = "/" }) {

const navigate = useNavigate();

return(

<div className="brand-header">

<button
className="cp-nav-back-button"
onClick={()=>navigate(to)}
>

<svg
className="nav-back-arrow"
width="18"
height="18"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2.5"
>
<line x1="19" y1="12" x2="5" y2="12"></line>
<polyline points="12 19 5 12 12 5"></polyline>
</svg>

<div className="text-wrapper">

<span className="default-text">

<img
src="/assest/blue.jpg"
alt="logo"
className="nav-logo-small"
/>

BLEUS

</span>

<span className="hover-text">
HOME
</span>

</div>

</button>

</div>

);

}