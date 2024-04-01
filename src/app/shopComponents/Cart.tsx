"use client";
import React from 'react';
import { Button } from "@/components/ui/button";

interface CartProps {
  cart: any;
  totalCartValue: number;
  remove: (item: any) => void;
  edit: (item: any) => void;
}

const Cart = (props: CartProps) => {
  
  const [editedQuantity, setEditedQuantity] = React.useState("");

  const handleRemove = (itemToRemove) => {
    props.remove(itemToRemove);
  };

  const handleEdit = (itemToEdit) => { 
        if (editedQuantity.trim() === "") {
          return;
        }
    
    const newQuantity = parseInt(editedQuantity);
    
    if (isNaN(newQuantity) || newQuantity <= 0) {
      return;
        }

    const editedItem = { ...itemToEdit, quantity: newQuantity };
    props.edit(editedItem);
    
    setEditedQuantity("");
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {props.cart.map((item: any) => (
          <li key={item.id}>
            <h6>{item.title}</h6>
            <h6>Quantity: {item.quantity}</h6>
            <h6>Price: ${item.totalPrice}</h6>
            <Button className="cart-button" onClick={() => handleRemove(item)}>
              Remove
            </Button>
            <input
              type="number"
              value={editedQuantity}
              onChange={(e) => setEditedQuantity(e.target.value)}
              placeholder="New Quantity"
            />
            <Button className="cart-button" onClick={() => handleEdit(item)}>
              Edit
            </Button>
          </li>
        ))}
      </ul>
      <h4>Total: ${props.totalCartValue}</h4>
    </div>
  );
}

export default Cart
