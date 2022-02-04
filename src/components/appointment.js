import { useState } from 'react'
// const dumbData = {
//   customer: { 
//     firstName: 'Ashley',
//     lastName: 'Jones',
//     phoneNumber: '(123)555-0123'
//   },
//   stylist: 'Jay Speares',
//   startsAt: '2019-02-02 09:30',
//   service: 'Cut',
//   notes: ''
// }

const appointmentTimeOfDay = startAt => {
  const [h, m] = new Date(startAt).toTimeString().split(':')

  return `${h}:${m}`
}

function Appointment({customer}){
  return (
    <h1>
      {customer.firstName}
    </h1>
  )
}

export const AppointmentsDayView = ({appointments}) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0)
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((appointment, index) => (
          <li key={appointment.startsAt}>
            <button
              onClick={() => setSelectedAppointment(index)} 
              type="button"
            >
              {appointmentTimeOfDay(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
        ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>

  )
}