import { useDispatch } from 'react-redux'
import './CartItem.css'
import {Link} from 'react-router-dom'

const CartItem = ({item,deleteCartItems}) => {
  const dispatch=useDispatch()
  return (
   <div className="CartItemCard">
    <img src={item.images[0].url} alt="item image" />
    <div className="">
      <Link to={`/product/${item.product}`} >{item.name}</Link>
      <span>{`Price : $${item.price}`}</span>
      <p onClick={()=>dispatch(deleteCartItems(item._id))}>Remove</p>
    </div>
   </div>
  )
}

export default CartItem