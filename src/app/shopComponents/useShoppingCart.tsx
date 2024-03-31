"use client";
import React from "react";

const useShoppingCart = () => {
  const [state, setState] = React.useState({
    data: [],
    error: null,
    filter: [],
    cart: [],
    totalCartValue: 0,
    search: ""
  });

  React.useEffect(() => {
    const limit = 9;

    fetch(`https://dummyjson.com/products?limit=${limit}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setState((prevState) => ({ ...prevState, data: data.products }));
        },
        (error) => setState((prevState) => ({ ...prevState, error: error }))
      );
  }, []);

  const handleFilter = (category) => {
    setState((prevState) => {
      if (prevState.filter.includes(category)) {
        return {
          ...prevState,
          filter: prevState.filter.filter((item) => item !== category),
        };
      } else {
        return { ...prevState, filter: [...prevState.filter, category] };
      }
    });
  };

  const addToCart = (itemToAdd) => {
    const existingCartItemIndex = state.cart.findIndex(
      (item) => item.id === itemToAdd.id
    );

    if (existingCartItemIndex !== -1) {
      const updatedCart = [...state.cart];
      updatedCart[existingCartItemIndex].quantity += 1;
      updatedCart[existingCartItemIndex].totalPrice =
        updatedCart[existingCartItemIndex].quantity *
        updatedCart[existingCartItemIndex].price;
      const totalCartValue = updatedCart.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      setState((prevState) => ({
        ...prevState,
        cart: updatedCart,
        totalCartValue: totalCartValue,
      }));
    } else {
      const newCartItem = {
        ...itemToAdd,
        quantity: 1,
        totalPrice: itemToAdd.price,
      };
      const newCart = [...state.cart, newCartItem];
      const totalCartValue = newCart.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      setState((prevState) => ({
        ...prevState,
        cart: newCart,
        totalCartValue: totalCartValue,
      }));
    }
  };

const handleSearch = (searchTerm) => {
  setState((prevState) => ({
    ...prevState,
    search: searchTerm,
    filter: (prevState.data || []).filter((item) =>
      item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));
};


  return {
    state,
    handleFilter,
    addToCart,
    handleSearch,
  };
};

export default useShoppingCart;
