"use client";
import React from "react";

import ShopItem from "./ShopItem";
import Filter from "./Filter";
import Cart from "./Cart";
import useShoppingCart from "./useShoppingCart";

import "../styles/styles.css";
import { Input } from "@/components/ui/input";

const Shop = () => {

    const { state, handleFilter, addToCart, handleSearch, removeFromCart, editCart } = useShoppingCart();
    const { data, error, filter, cart, totalCartValue, search } = state;

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (data.length === 0) {
      return <div>Loading...</div>;
    }



  return (
    <div className="container">
      <div className="filter-container">
        <Input value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search..." />
        {data &&
          Array.from(new Set(data.map((item) => item.category))).map(
            (category) => (
              <div key={category}>
                <Filter
                  category={category}
                  isChecked={filter.includes(category)}
                  onCheckboxChange={handleFilter}
                />
              </div>
            )
          )}
      </div>
      <div className="shop-items-container">
        {data &&
          data
          .filter((item) => filter.length === 0 || filter.includes(item.category))
          .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <div key={item.id}>
                <ShopItem
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  brand={item.brand}
                  thumbnail={item.thumbnail}
                  addToCart={() => addToCart(item)}
                />
              </div>
            ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} totalCartValue={totalCartValue} remove={removeFromCart} edit={editCart} />
      </div>
    </div>
  );
};


export default Shop;
