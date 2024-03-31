"use client";
import React from 'react'

interface CartProps {
  cart: any;
  totalCartValue: number;
}

const Cart = (props: CartProps) => {
  return (
    <div className="cart">
      <h3>Cart</h3>
      <ul>
        {props.cart.map((item: any) => (
          <li key={item.id}>
            <h6>{item.title}</h6>
            <h6>Quantity: {item.quantity}</h6>
            <h6>Price: ${item.totalPrice}</h6>
          </li>
        ))}
      </ul>
      <h6>Total: ${props.totalCartValue}</h6>
    </div>
  );
}

export default Cart
