import { Calendar, momentLocalizer } from 'react-big-calendar-modified-enj'
import withDragAndDrop from 'react-big-calendar-modified-enj/lib/addons/dragAndDrop'
import 'react-big-calendar-modified-enj/lib/addons/dragAndDrop/styles.css'
import moment from 'moment'
import './App.scss';
import { Modal } from './components/Modal/Modal';
import { useState, useCallback } from 'react';


const DnDCalendar = withDragAndDrop(Calendar);
const myLocalizer = momentLocalizer(moment);


function App() {
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "firstEvent",
      start: new Date(2024, 7, 26),
      end: new Date(2024, 7, 27),
      bgColor: "#000000"
    },
    {
      id: 1,
      title: "secondEvent",
      start: new Date(2024, 7, 26, 16, 30),
      end: new Date(2024, 7, 26, 16, 40),
      bgColor: "#ff0000"
    },
    {
      id: 2,
      title: "thirdEvent",
      start: new Date(2024, 7, 26, 15, 30),
      end: new Date(2024, 7, 26, 15, 40),
      bgColor: "#00ff00"
    },
    {
      id: 3,
      title: "fourthEvent",
      start: new Date(2024, 7, 26),
      end: new Date(2024, 7, 27),
      bgColor: "#0000ff"
    }
  ]);

  const [modalVisible, setModalVisible] = useState(true)

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if (allDay && !droppedOnAllDaySlot) {
          event.allDay = false;
      }

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay: event.allDay }]
      })
    },
    [setEvents]
  )

  return (
    <div className="App">
      <Modal isVisible={modalVisible}/>
      <DnDCalendar
        localizer={myLocalizer}
        events={events}
        resizable={false}
        draggableAccessor={(event) => true}

        onEventDrop={moveEvent}
      />
    </div>
  );
}

export default App;
