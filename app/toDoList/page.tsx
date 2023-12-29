"use client";
import { Box, Grid, Button, Input, TextField } from "@mui/material/";
import { useRef, useState, useEffect } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container  minHeight={500}>
        <Grid item xs={12}>
          <h1 className="text-3xl text-center mt-12">To Do List</h1>
        </Grid>
        <Grid container justifyContent="center" >
          <Grid item>
            <TextField
              variant="outlined"
              id="outlined-basic"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Grid item xs={12}>
              <Button onClick={handleAddTask}>Add Task</Button>
            </Grid>
          </Grid>
        </Grid>
      
      <Grid container justifyContent="center" spacing={12}>
        <Grid item>
          {tasks.map((task, index) => (
            <li key={index}>
              {`#${index + 1}) `} {task}{" "}
              <Button onClick={() => handleDeleteTask(index)}>Delete</Button>
            </li>
          ))}
        </Grid>
      </Grid>
      </Grid>
    </Box>
  );
};

export default ToDoList;
