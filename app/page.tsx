
'use client'

import { useEffect, useState } from 'react'

export default function Home() {

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete Project Update', done: false },
    { id: 2, text: 'Edit Instagram Reel', done: true }
  ])

  const [taskInput, setTaskInput] = useState('')
  const [noteTitle, setNoteTitle] = useState('')
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState([] as any[])
  const [seconds, setSeconds] = useState(1500)
  const [running, setRunning] = useState(false)
  const [dark, setDark] = useState(true)
  const [focusMode, setFocusMode] = useState(false)

  useEffect(() => {
    const savedTasks = localStorage.getItem('focusflow_tasks')
    const savedNotes = localStorage.getItem('focusflow_notes')

    if(savedTasks) setTasks(JSON.parse(savedTasks))
    if(savedNotes) setNotes(JSON.parse(savedNotes))
  }, [])

  useEffect(() => {
    localStorage.setItem('focusflow_tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem('focusflow_notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    let timer:any

    if(running && seconds > 0){
      timer = setInterval(() => {
        setSeconds(prev => prev - 1)
      },1000)
    }

    return () => clearInterval(timer)
  }, [running, seconds])

  useEffect(() => {
    const water = setInterval(() => {
      alert('💧 Drink Water')
    }, 7200000)

    const sit = setInterval(() => {
      alert('🚶 You are sitting too long')
    }, 3600000)

    return () => {
      clearInterval(water)
      clearInterval(sit)
    }
  }, [])

  const addTask = () => {
    if(!taskInput) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskInput,
        done: false
      }
    ])

    setTaskInput('')
  }

  const toggleTask = (id:number) => {
    setTasks(tasks.map(task =>
      task.id === id
      ? { ...task, done: !task.done }
      : task
    ))
  }

  const deleteTask = (id:number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const saveNote = () => {
    if(!noteTitle || !noteText) return

    setNotes([
      {
        id: Date.now(),
        title: noteTitle,
        text: noteText,
        date: new Date().toLocaleDateString()
      },
      ...notes
    ])

    setNoteTitle('')
    setNoteText('')
  }

  const minutes = String(Math.floor(seconds / 60)).padStart(2,'0')
  const secs = String(seconds % 60).padStart(2,'0')

  return (
    <main style={{
      minHeight:'100vh',
      background: dark
      ? 'linear-gradient(135deg,#071226,#0b1f3a,#09111d)'
      : '#f5f7fb',
      color: dark ? 'white' : '#111',
      padding:'30px',
      fontFamily:'Arial'
    }}>

      {focusMode && (
        <div style={{
          position:'fixed',
          inset:0,
          background:'#000',
          zIndex:9999,
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          alignItems:'center'
        }}>
          <h1 style={{fontSize:'72px',color:'#facc15'}}>
            FOCUS MODE
          </h1>

          <button
            onClick={() => setFocusMode(false)}
            style={{
              padding:'18px 28px',
              border:'none',
              borderRadius:'18px',
              background:'#facc15',
              fontWeight:'bold',
              cursor:'pointer'
            }}
          >
            Force Stop
          </button>
        </div>
      )}

      <div style={{maxWidth:'1450px',margin:'auto'}}>

        <div style={{
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          marginBottom:'40px'
        }}>

          <div>
            <h1 style={{
              fontSize:'72px',
              margin:0,
              color:'#facc15'
            }}>
              FocusFlow
            </h1>

            <p style={{color: dark ? '#bfdbfe' : '#333'}}>
              Superman Productivity Workspace ⚡
            </p>
          </div>

          <div style={{display:'flex',gap:'14px'}}>

            <button
              onClick={() => setDark(!dark)}
              style={darkBtn}
            >
              {dark ? '☀️' : '🌙'}
            </button>

            <div style={{
              width:'90px',
              height:'90px',
              borderRadius:'26px',
              background:'linear-gradient(135deg,#dc2626,#facc15)',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              color:'black',
              fontWeight:'900',
              fontSize:'48px'
            }}>
              S
            </div>

          </div>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'2fr 1fr',
          gap:'24px'
        }}>

          <div>

            <section style={card}>

              <div style={header}>
                <h2 style={title}>Daily Missions</h2>

                <button style={yellowBtn} onClick={addTask}>
                  + Add Mission
                </button>
              </div>

              <div style={{display:'flex',gap:'12px',marginBottom:'18px'}}>
                <input
                  value={taskInput}
                  onChange={(e)=>setTaskInput(e.target.value)}
                  placeholder='Enter task'
                  style={input}
                />
              </div>

              {tasks.map((task:any)=>(
                <div key={task.id} style={taskBox}>

                  <div style={taskLeft}>
                    <input
                      type='checkbox'
                      checked={task.done}
                      onChange={()=>toggleTask(task.id)}
                    />

                    <div>
                      <div style={{
                        fontSize:'20px',
                        fontWeight:'700',
                        textDecoration: task.done ? 'line-through' : 'none'
                      }}>
                        {task.text}
                      </div>

                      <div style={small}>
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={()=>deleteTask(task.id)}
                    style={iconBtn}
                  >
                    🗑️
                  </button>

                </div>
              ))}

            </section>

            <section style={card}>

              <div style={header}>
                <h2 style={title}>Brain Notes</h2>

                <button style={yellowBtn} onClick={saveNote}>
                  Save
                </button>
              </div>

              <input
                value={noteTitle}
                onChange={(e)=>setNoteTitle(e.target.value)}
                placeholder='Note title'
                style={input}
              />

              <textarea
                value={noteText}
                onChange={(e)=>setNoteText(e.target.value)}
                placeholder='Write your notes...'
                style={textarea}
              />

            </section>

            <section style={card}>

              <h2 style={title}>Saved Notes</h2>

              {notes.map((note:any)=>(
                <div key={note.id} style={noteBox}>

                  <h3>{note.title}</h3>

                  <small>{note.date}</small>

                  <p>{note.text}</p>

                </div>
              ))}

            </section>

          </div>

          <div>

            <section style={focusCard}>

              <h2 style={{
                fontSize:'46px',
                marginTop:0
              }}>
                Focus Arena
              </h2>

              <div style={timerCircle}>

                <div style={timerInner}>

                  <h1 style={{
                    fontSize:'72px',
                    margin:0
                  }}>
                    {minutes}:{secs}
                  </h1>

                  <p style={{color:'#bfdbfe'}}>
                    Ultimate Focus Session
                  </p>

                </div>

              </div>

              <div style={center}>

                <button
                  style={yellowBtn}
                  onClick={()=>setRunning(true)}
                >
                  Start
                </button>

                <button
                  style={darkBtn}
                  onClick={()=>setRunning(false)}
                >
                  Stop
                </button>

                <button
                  style={darkBtn}
                  onClick={()=>{
                    setFocusMode(true)
                    setRunning(true)
                  }}
                >
                  Focus Mode
                </button>

              </div>

            </section>

            <section style={card}>

              <h2 style={title}>Power Boosts</h2>

              <div style={boost}>
                <div>
                  <strong>💧 Water Reminder</strong>
                  <p style={small}>Every 2 hours</p>
                </div>
              </div>

              <div style={boost}>
                <div>
                  <strong>🚶 Sitting Alert</strong>
                  <p style={small}>Every 1 hour</p>
                </div>
              </div>

            </section>

          </div>

        </div>

      </div>
    </main>
  )
}

const card:any = {
  background:'rgba(255,255,255,0.05)',
  borderRadius:'32px',
  padding:'28px',
  marginBottom:'24px',
  backdropFilter:'blur(18px)'
}

const header:any = {
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center',
  marginBottom:'22px'
}

const title:any = {
  fontSize:'38px',
  margin:0
}

const yellowBtn:any = {
  background:'linear-gradient(135deg,#facc15,#f59e0b)',
  border:'none',
  color:'black',
  padding:'14px 24px',
  borderRadius:'18px',
  fontWeight:'700',
  cursor:'pointer'
}

const darkBtn:any = {
  background:'rgba(255,255,255,0.12)',
  border:'none',
  color:'white',
  padding:'14px 24px',
  borderRadius:'18px',
  cursor:'pointer'
}

const input:any = {
  width:'100%',
  padding:'18px',
  borderRadius:'18px',
  border:'none',
  marginBottom:'16px',
  background:'rgba(255,255,255,0.08)',
  color:'white'
}

const textarea:any = {
  width:'100%',
  height:'180px',
  padding:'18px',
  borderRadius:'18px',
  border:'none',
  background:'rgba(255,255,255,0.08)',
  color:'white'
}

const taskBox:any = {
  background:'rgba(255,255,255,0.05)',
  borderRadius:'24px',
  padding:'18px',
  marginBottom:'14px',
  display:'flex',
  justifyContent:'space-between',
  alignItems:'center'
}

const taskLeft:any = {
  display:'flex',
  alignItems:'center',
  gap:'14px'
}

const small:any = {
  color:'#bfdbfe'
}

const iconBtn:any = {
  border:'none',
  background:'rgba(255,255,255,0.08)',
  width:'42px',
  height:'42px',
  borderRadius:'14px',
  color:'white',
  cursor:'pointer'
}

const noteBox:any = {
  background:'rgba(255,255,255,0.05)',
  padding:'18px',
  borderRadius:'22px',
  marginBottom:'14px'
}

const focusCard:any = {
  background:'linear-gradient(135deg,#0f172a,#1d4ed8,#991b1b)',
  borderRadius:'34px',
  padding:'28px',
  marginBottom:'24px',
  textAlign:'center'
}

const timerCircle:any = {
  width:'260px',
  height:'260px',
  margin:'auto',
  borderRadius:'50%',
  background:'conic-gradient(#facc15 0% 70%, rgba(255,255,255,0.1) 70%)',
  padding:'16px',
  marginBottom:'28px'
}

const timerInner:any = {
  width:'100%',
  height:'100%',
  borderRadius:'50%',
  background:'#071226',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column'
}

const center:any = {
  display:'flex',
  justifyContent:'center',
  gap:'12px',
  flexWrap:'wrap'
}

const boost:any = {
  background:'rgba(255,255,255,0.05)',
  padding:'18px',
  borderRadius:'22px',
  marginBottom:'14px'
}
