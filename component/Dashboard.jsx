import { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import auth from './Firebase'
import TinyMce from './TinyMce'

function Dashboard() {
  const [showInputs, setShowInputs] = useState(false)
  const [content, setContent] = useState('')
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true) 

  const Navigation = useNavigate()  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        Navigation('/login')
      }
      setLoading(false) 
    })
    return () => unsubscribe()
  }, [Navigation])

  if (loading) return <div>Loading...</div> 
  

  const handleClick = () => {
    setShowInputs(true)
  }
  
  return (
    <section className='py-15 dashboard-section'>
      <TinyMce />
    </section>
  )
}


export default Dashboard
