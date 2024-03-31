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
      <h3>Cart</h3>
      <ul>
        {props.cart.map((item: any) => (
          <li key={item.id}>
            <h6>{item.title}</h6>
            <h6>Quantity: {item.quantity}</h6>
            <h6>Price: ${item.totalPrice}</h6>
            <Button onClick={() => handleRemove(item)}>Remove</Button>
            <input
              type="number"
              value={editedQuantity}
              onChange={(e) => setEditedQuantity(e.target.value)}
              placeholder="New Quantity"
            />
            <Button onClick={() => handleEdit(item)}>Edit</Button>
          </li>
        ))}
      </ul>
      <h6>Total: ${props.totalCartValue}</h6>
    </div>
  );
}

export default Cart
