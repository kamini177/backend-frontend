import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTask, updateTaskReminder } from "../features/tasks/taskSlice";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`task ${task.reminder && 'reminder'}`}
      onDoubleClick={ () => dispatch(updateTaskReminder(task))}
    >
      <h3>{task.text} <FaTimes
        style={{ color: 'red' }}
        onClick={ ()=> dispatch(deleteTask(task._id)) }
      /></h3>
      <p>{task.day}</p>
    </div>
  );
};
