import React, { useState } from 'react'
import waspLogo from './waspLogo.png'
import './Main.css'

import logout from '@wasp/auth/logout.js'
import createTask from '@wasp/actions/createTask'
import getTasks from '@wasp/queries/getTasks'
import { useQuery } from '@wasp/queries'

const SignOut = () => {
  return (
    <button onClick={logout}>Logout</button>
  )
}

const MainPage = ({ user }) => {
  const { data: tasks, isFetching, error } = useQuery(getTasks)

  return (
    <div className="container">
      <main>
        <div>
          <span>You are logged in as {user.email}</span>
          <SignOut />
        </div>
        <br/>

        <NewTaskForm />

        <br/>
        <div>
          {tasks && <TasksList tasks={tasks} />}

          {isFetching && 'Fetching...'}
          {error && 'Error: ' + error}
        </div>

      </main>
    </div>
  )
}

const NewTaskForm = (props) => {
  const defaultDescription = ''
  const [description, setDescription] = useState(defaultDescription)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await createTask({ description })
      setDescription(defaultDescription) // Reset the form field.
    } catch (err) {
      window.alert('Error: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input type='submit' value='Create task' />
    </form>
  )
}

const Task = (props) => (
  <div>
    <input
      type='checkbox' id={props.task.id}
      checked={props.task.isDone} readonly
    />
    {props.task.description}
  </div>
)

const TasksList = (props) => {
  if (!props.tasks?.length) return 'No tasks'
  return props.tasks.map((task, idx) => <Task task={task} key={idx} />)
}

export default MainPage
