import { AppointmentsDayView } from "./components/appointmentsDayView";
import { sampleAppointments } from "./sampleData";

function App() {
  return (
    <div className="App">
      <AppointmentsDayView appointments={sampleAppointments}/>
    </div>
  );
}

export default App;
