import './styles.scss';

export function Modal (props) {
  return (
    <div className={`modal modal-visible-${props.isVisible}`}>
      <div className="modal__backdrop">
        <div className="modal__body">
          123
        </div>
      </div>
    </div>
  )
}