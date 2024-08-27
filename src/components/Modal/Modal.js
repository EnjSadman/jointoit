import './styles.scss';
import {useState, useEffect, useRef} from 'react'

export function Modal (props) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2024");

  const isFirstRender = useRef(true)

  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (props.modalDate !== undefined) {
      setTitle(props.modalDate.title);
      setColor(props.modalDate.bgColor);
      setAllDay(props.modalDate.allDay);
      setTimeStart(`${props.modalDate.start.getHours()}:${props.modalDate.start.getMinutes()}`);
      setTimeEnd(`${props.modalDate.end.getHours()}:${props.modalDate.end.getMinutes()}`);
      if (
          props.modalDate.start.getHours() == 0 
          && props.modalDate.end.getHours() == 0
          && props.modalDate.start.getMinutes() == 0
          && props.modalDate.end.getMinutes() == 0
        ) {
        setAllDay(true);
      } else {
        setAllDay(false);
      }
      if (props.modalDate.end.getDate() < 10) {
        setDay(`0${props.modalDate.end.getDate()}`)
      } else {
        setDay(`${props.modalDate.end.getDate()}`)
      }

      if (props.modalDate.end.getMonth() < 10) {
        setMonth(`0${props.modalDate.end.getMonth()}`)
      } else {
        setMonth(`${props.modalDate.end.getMonth()}`)
      }

      setYear(`${props.modalDate.end.getFullYear()}`)
    }

  }, [props])

  return (
    <div className={`modal modal-visible-${props.isVisible}`}>
      <div
        className="modal__backdrop"
        onClick={() => {
          props.setModalVisible(false);
        }}
      >
        <div
          className="modal__body"
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <input
            type='text'
            maxLength='30'
            minLength='1'
            value={title}
            placeholder='title'
            onChange={(event) => {
              setTitle(event.target.value)
            }}
          />
          <input
            type='color'
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
           <label>
            all day long?
            <input
              type='checkbox'
              checked={allDay}
              onChange={() => {
                setAllDay(!allDay)
              }
              }
            />
          </label> 
          <input
            type='date'
            onChange={(event) => {
              const result = event.target.value.split("-");
              setYear(result[0]);
              setMonth(result[1]);
              setDay(result[2]);
            }}
            value={`${year}-${month}-${day}`}
          />
          {
            (allDay) ? "" : <div>
              <input
                type='time'
                value={timeStart}
                onChange={(event) => {
                  setTimeStart(event.target.value)
                }}
              />
              <input
                type='time'
                value={timeEnd}
                onChange={(event) => {
                  setTimeEnd(event.target.value)
                }}
              />
            </div>

          }

          <div className='modal__buttons'>
            <button
              onClick={(event) => {
                event.stopPropagation()
                props.setModalVisible(false);
              }}
            >
              cancel
            </button>
            <button
              onClick={() => {
                props.setWholeList(props.wholeList.filter(el => el.id !== props.modalDate.id))
                props.setModalVisible(false)
                props.setModalDate()
              }}
              
            >
              delete
            </button>
            <button
              onClick={() => {
                if (props.modalDate !== undefined) {
                  const tempIndex = props.wholeList.findIndex(el => el.id == props.modalDate.id);
                  if (allDay) {
                    props.wholeList[tempIndex] = {
                      id: Math.max(...props.wholeList.map(el => el.id)),
                      title: title,
                      bgColor: color,
                      start: new Date(year, month, day, 0, 0 ,0),
                      end: new Date(year, month, day, 0, 0, 0)
                    } 
                  } else {
                    const splitStart = timeStart.split(":");
                    const splitEnd = timeEnd.split(":");
                    props.wholeList[tempIndex] = {
                      id: Math.max(...props.wholeList.map(el => el.id)),
                      title: title,
                      bgColor: color,
                      start: new Date(year, month, day, splitStart[0], splitStart[1],0),
                      end: new Date(year, month, day, splitEnd[0], splitEnd[1], 0)
                    } 
                  }
                  props.setModalVisible(false);
                }
              }}
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}