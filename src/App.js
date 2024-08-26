import { Calendar, momentLocalizer } from 'react-big-calendar-modified-enj'
import withDragAndDrop from 'react-big-calendar-modified-enj/lib/addons/dragAndDrop'
import 'react-big-calendar-modified-enj/lib/addons/dragAndDrop/styles.css'
import moment from 'moment'
import './App.scss';
import { useState } from 'react';


const DnDCalendar = withDragAndDrop(Calendar);
const myLocalizer = momentLocalizer(moment)


function App() {
  const [events, setEvents] = useState([
    {
      title: "firstEvent",
      start: new Date(2024, 7, 26),
      end: new Date(2024, 7, 27),
      color: "#000000"
    }
  ]);

  return (
    <div className="App">
      <DnDCalendar
        localizer={myLocalizer}
        events={events}
        resizable={false}
        draggableAccessor={(event) => true}
      />
    </div>
  );
}

export default App;
