import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { taskStore } from './TaskStore';

const App = observer(() => {
    useEffect(() => {
        taskStore.fetchTasks();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Task Tracker</h1>
            {taskStore.error && <p style={{ color: 'red' }}>{taskStore.error}</p>}
            {taskStore.loading ? <p>Loading...</p> : (
                <ul>
                    {taskStore.tasks.map(task => (
                        <li key={task.id}>
                            <strong>{task.title}</strong> - {task.status}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={() => taskStore.addTask({title: "New Task", status: "TODO"})}>
                Add Task
            </button>
        </div>
    );
});

// THIS is where this line belongs:
export default App;