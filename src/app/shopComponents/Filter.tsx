"use client";  
import React from 'react';


interface FilterProps {
  category: string;
  isChecked: boolean;
  onCheckboxChange: (category: string) => void;
}


const Filter = (props: FilterProps) => {

  const handleCheckboxChange = () => {
    props.onCheckboxChange(props.category);
  };

  return (
    <div className="filter">
      <div>
        {props.category}
        <input
          type="checkbox"
          checked={props.isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

  
  export default Filter
