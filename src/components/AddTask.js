import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTask } from "../features/tasks/taskSlice"

export const AddTask = () => {

  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const dispatch = useDispatch()
  const user = useDispatch((state) => state.user.user)
  const userId = user._id

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Syötä tehtävä')
      return
    }

    if (!day) {
      alert('Syötä päivämäärä')
      return
    }

    const task = { userId, text, day, reminder }
    dispatch(addTask(task))
    
    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>

      <div className="form-control">
        <label>Tehtävä</label>
        <input
          type="text"
          placeholder="Lisää tehtävä"
          value={text}
          onChange={ (e) => setText( e.target.value )}
        />
      </div>

      <div className="form-control">
        <label >Päivämäärä</label>
        <input
          type="text"
          placeholder="Lisää päivämäärä"
          value={day}
          onChange={ (e) =>setDay( e.target.value )}
        />
      </div>

      <div className="form-control form-control-check">
        <label>Muistutus</label>
        <input
          type="checkbox"
          checked={reminder}
          onChange={ (e) => setReminder( e.currentTarget.checked )}
        />
      </div>

      <button type="submit" className="btn btn-block">Tallenna</button>
    </form>
  )
}

