import React, { useState } from 'react'

export function CustomerForm({onSubmit, ...customerProps}) {
  const { firstName } = customerProps
  const [customer, setCustomer] = useState(customerProps)
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
        onChange={({target}) => {
          setCustomer(customer => ({
            ...customer,
            firstName: target.value
          }))
        }}
      />
    </form>
  )
}
