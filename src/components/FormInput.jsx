import React, { useState } from 'react'


const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { errorMessage, label, id, onChange, role, productId , ...inputprops } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className='w-full px-4 flex flex-col'>
      <label className='text-white p-3'>{label}</label>
      {
        (inputprops.name == "article" && role != 1 && productId != null) ?
          <p className='bg-gray-300 text-black placeholder:text-[#535860] py-2 px-4 rounded'>
            {inputprops.value}
          </p>
          :
          <input
            className='bg-white text-black placeholder:text-[#535860] py-2 px-4 rInput rounded'
            onChange={onChange}
            onFocus={() => inputprops.name === "email" && setFocused(true)}
            {...inputprops}
            onBlur={handleFocus}
            focused={focused.toString()}
          />
      }
      <span className='text-red-400 text-xs wrap p-3 error'>{errorMessage}</span>
    </div>
  )
}

export default FormInput