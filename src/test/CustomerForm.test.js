import ReactTestUtils from 'react-dom/test-utils'
import { createContainer } from './domManipulator'
import { CustomerForm } from '../components/CustomerForm'

describe('CustomerForm', () => {
  let render, container
  beforeEach(() => {
    ({container, render} = createContainer())
  })
  
  const form = id => container.querySelector(`form[id="${id}"]`)
  const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`)
  const field = (name) => form('customer').elements[name]
  
  const expectToBeInputFieldOfTypeText = (formElement, inputType="text") => {
    expect(formElement).not.toBeNull()
    expect(formElement.tagName).toEqual('INPUT')
    expect(formElement.type).toEqual(inputType)
  }

  const itRendersAsATextBox = (fieldName, inputType='text') =>
    it('renders as a text box', () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName), inputType);
    });
  const itIncludesExistingValue = fieldName => 
    it('includes the existing value', () => {
      render(<CustomerForm {...{[fieldName]: 'value'}}/>)
      const targetField = field(fieldName)
      
      expect(targetField.value).toEqual('value')
    })
  const itRendersALabel = (fieldName, textContent) =>
    it('renders a label', () => {
      render(<CustomerForm />)

      expect(labelFor(fieldName).textContent).toEqual(textContent)
    })
  const itAssignsAnIdThatMatchesTheLabelId = fieldName =>
    it('assigns an id that matches the label id', () => {
      render(<CustomerForm />)
      expect(field(fieldName).id).toEqual(fieldName)
    })
  const itSubmitsExistingValue = (fieldName, value="value") =>
    it('saves existing value when submitted',async () => {
      expect.hasAssertions()
      render(
        <CustomerForm
          {...{[fieldName]: value}}
          onSubmit={(props) => {
            expect(props[fieldName]).toEqual(value)
          }}
        />
      )
      ReactTestUtils.Simulate.submit(form('customer'));
    })
  const itSubmitNewValue = (fieldName, value="value", newValue="value2") =>
    it('saves new value when submitted', async () => {
      expect.hasAssertions()
      render(
        <CustomerForm
          {...{[fieldName]: value}}
          firstName="Ashley"
          onSubmit={(props) =>
            expect(props[fieldName]).toEqual(newValue)
          }
        />
      )

      ReactTestUtils.Simulate.change(field(fieldName), {
        target: {
          value: newValue,
          name: fieldName
        }
      })
      ReactTestUtils.Simulate.submit(form('customer'))

    })

  it('renders a form', () => {
    render(<CustomerForm/>)
    
    expect(form('customer')).not.toBeNull();
  })

  describe('first name field', () => {
    itRendersAsATextBox('firstName')
    itIncludesExistingValue('firstName')
    itRendersALabel('firstName', 'First name')
    itAssignsAnIdThatMatchesTheLabelId('firstName')
    itSubmitsExistingValue('firstName')
    itSubmitNewValue('firstName')
  })
  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesExistingValue('lastName');
    itRendersALabel('lastName', 'Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSubmitsExistingValue('lastName');
    itSubmitNewValue('lastName')
  })
  describe('phone number field', () => {
    itRendersAsATextBox('phone', 'tel');
    itIncludesExistingValue('phone');
    itRendersALabel('phone', 'Phone number');
    itAssignsAnIdThatMatchesTheLabelId('phone');
    itSubmitsExistingValue('phone', 23123);
    itSubmitNewValue('phone', 1231, 6564);
  })

  it('has a submit button', () => {
    render(<CustomerForm />)
    const submitButton = container.querySelector('input[type="submit"]')

    expect(submitButton).not.toBeNull() 
  })
})