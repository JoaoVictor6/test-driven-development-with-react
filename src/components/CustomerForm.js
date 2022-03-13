import React, { useState } from 'react'

export function CustomerForm({onSubmit, ...customerProps}) {
  const { firstName, lastName, phone } = customerProps
  const [customer, setCustomer] = useState(customerProps)
  const handleChange = ({target}) => {
    setCustomer(customer => ({
      ...customer,
      [target.name]: target.value
    }))
  }
  return (
    <form 
      id="customer"
      onSubmit={() => onSubmit(customer)}
    >
      <label htmlFor="firstName">First name</label>
      <input 
        type="text"
        name="firstName"
        id="firstName"
        value={firstName}
        onChange={handleChange}
      />
      <label htmlFor="lastName">Last name</label>
      <input 
        type="text"
        id="lastName"
        name="lastName"
        defaultValue={lastName}
        onChange={handleChange}
      />
      <label htmlFor="phone">Phone number</label>
      <input 
        type="tel"
        name="phone"
        id="phone"
        defaultValue={phone}
        onChange={handleChange}
      />
      <input type="submit" value="add" />
    </form>
  )
}
