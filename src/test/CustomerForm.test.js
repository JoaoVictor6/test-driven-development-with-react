import { createContainer } from "./domManipulator"
import { CustomerForm } from '../components/CustomerForm'
import ReactTestUtils from 'react-dom/test-utils'
describe('CustomerForm', () => {
  let render, container
  const form = id => container.querySelector(`form[id="${id}"]`)
  beforeEach(() => {
    ({container, render} = createContainer())
  })

  const expectToBeInputFieldOfTypeText = (formElement) => {
    expect(formElement).not.toBeNull()
    expect(formElement.tagName).toEqual('INPUT')
    expect(formElement.type).toEqual('text')
  }
  const firstNameField = () => form('customer').elements.firstName

  it('renders a form', () => {
    render(<CustomerForm/>)
    
    expect(form('customer')).not.toBeNull();
  })

  it('renders the first name field as a text box', () => {
    render(<CustomerForm />)

    expectToBeInputFieldOfTypeText(firstNameField())
  })

  it('includes the existing value for the first name', () => {
    render(<CustomerForm firstName="Ashley"/>)
    const field = firstNameField()
    
    expect(field.value).toEqual('Ashley')
  })

  const labelFor = formElement => container.querySelector(`label[for="${formElement}"]`)
  it('renders a label for the first name field', () => {
    render(<CustomerForm />)
  
    expect(labelFor('firstName').textContent).toEqual('First name')
  })

  it('assigns an id that matches the label id to the first name field', () => {
    render(<CustomerForm />)
    expect(firstNameField().id).toEqual('firstName')
  })

  it('saves existing first name when submitted',async () => {
    expect.hasAssertions()
    render(
      <CustomerForm 
        firstName="Ashley"
        onSubmit={({ firstName }) => {
          expect(firstName).toEqual("Ashley")
        }}
      />
    )
    ReactTestUtils.Simulate.submit(form('customer'));
  })

  it('saves new first name when submitted', async () => {
    expect.hasAssertions()
    render(
      <CustomerForm 
        firstName="Ashley"
        onSubmit={({ firstName }) =>
          expect(firstName).toEqual('Jamie')
        }
      />
    )

    ReactTestUtils.Simulate.change(firstNameField(), {
      target: {
        value: 'Jamie'
      }
    })
    ReactTestUtils.Simulate.submit(form('customer'))

  })
})