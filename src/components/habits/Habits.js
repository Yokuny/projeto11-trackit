import { useEffect, useState, useContext } from "react";
import ScreenSize from "../ScreenSize.js";
import Header from "../Header.js";
import Footer from "../Footer.js";
import NewHabit from "./NewHabit.js";
import TaskList from "./TaskList.js";
import { AddHabit, AddHeader, HabitCards } from "./style/HabitCards.js";
import { taskList } from "../../scripts/request";
import { UserContext } from "../../scripts/context-data.js";

const Habits = () => {
  const { token } = useContext(UserContext);
  const [newHabit, setNewHabit] = useState(false);
  const [tasks, setTask] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    taskList(token)
      .then((res) => setTask(res.data))
      .catch((err) => alert(err.response.data.message));
    setRefresh(false);
  }, [token, refresh]);

  return (
    <ScreenSize>
      <Header />
      <AddHabit>
        <AddHeader>
          <p>Meus hábitos</p>
          <button onClick={() => setNewHabit((actual) => !actual)} data-test="habit-create-btn">
            +
          </button>
        </AddHeader>
        {newHabit ? (
          <NewHabit
            close={setNewHabit}
            refresh={setRefresh}
            inputTask={inputTask}
            setInputTask={setInputTask}
          />
        ) : (
          <></>
        )}
      </AddHabit>
      <HabitCards>
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskList key={task.id} task={task} refresh={setRefresh} />)
        ) : (
          <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
        )}
      </HabitCards>
      <Footer />
    </ScreenSize>
  );
};
export default Habits;
