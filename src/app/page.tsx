'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function Home(){

  const [nameFromForm, setNameFromForm] = useState('')
  const [emailFromForm, setEmailFromForm] = useState('')
  const [messageFromForm, setMessageFromForm] = useState('')

  const addLead = async(e) => {

    e.preventDefault()

    const { error } = await supabase.from('leads').insert({
      name: nameFromForm,
      email: emailFromForm,
      message: messageFromForm
      } 
    )

    if (error){
      console.error(error)
      alert('Error')
    } else {
      alert('Inserted')

        const postData = {
        name: nameFromForm,
        email: emailFromForm,
        message: messageFromForm
      }
      
      setNameFromForm('')
      setEmailFromForm('')
      setMessageFromForm('')



      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }).then(response => response.json()).then(data => console.log(data)).catch(error => console.error('Error:', error))

    }
  }


  return (
    <main style={{padding: 40}}>
      <h1>Get a Quote </h1>
      
      <form onSubmit={addLead}>
        <input type="text" placeholder="name" value={nameFromForm} onChange={(e) => setNameFromForm(e.target.value)} required />
        <input type="text" placeholder='email' value={emailFromForm} onChange={(e) => setEmailFromForm(e.target.value)} required/>
        <input type="text" placeholder="message" value={messageFromForm} onChange={(e) => setMessageFromForm(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </main>
  )

}