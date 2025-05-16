import { Task } from "./Task";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const Tasks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector((state) => state.tasks.tasks) || [];
  const { user } = useSelector((state) => state.user);
  const userId = user?._id || null;

  useEffect(() => {
    
    if (!user) {
      navigate("/login")
      return
    }
    const promise = dispatch(fetchTasks(userId));

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <>
      { tasks.length > 0
        ? tasks.map( ( task ) => <Task key={ task._id } task={ task } /> )
        : "Ei näytettäviä tehtäviä" }
    </>
  );
};

