import { useEffect } from "react";

import { useAppDispatch } from "store/hooks";
import { fetchTaskArray } from "features/todo/todoSlice";

import "./Home.scss";
import NavBar from "components/NavBar/NavBar";
import TaskContainer from "../TaskContainer/TaskContainer";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTaskArray());
  }, [dispatch]);

  return (
    <div>
      <NavBar />

      <div className="container">
        <TaskContainer />
      </div>
    </div>
  );
};

export default Home;
