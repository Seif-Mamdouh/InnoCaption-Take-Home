"use client";
import React from 'react'

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import '../styles/styles.css';

interface ShopItemProps {
  title: string;
  price: number;
  rating: number;
  brand: string;
  thumbnail: string;
  addToCart: () => void;
}

const ShopItem = (props: ShopItemProps) => {

  const handleAddToCart = () => {
    props.addToCart();
  }

  return (
    <Card className="shop-card">
      <img src={props.thumbnail} alt={props.title} />
      <CardContent>
        <p>{props.title}</p>
        <p>${props.price}</p>
        <p>rating: {props.rating}</p>
        <p>brand: {props.brand}</p>
      </CardContent>
        <Button onClick={handleAddToCart}> Add To Cart </Button>
    </Card>
  );
}

export default ShopItem
