import React from 'react'

export function CustomerForm({firstName}) {
  return (
    <form id="customer">
      <label htmlFor="firstName">First name</label>
      <input 
        type="text"
        name="firstName"
        id="firstName"
        value={firstName}
      />
    </form>
  )
}
