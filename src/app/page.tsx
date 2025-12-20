'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function Home(){

  const [nameFromForm, setNameFromForm] = useState('')
  const [emailFromForm, setEmailFromForm] = useState('')
  const [messageFromForm, setMessageFromForm] = useState('')
  const [submittedForm, setSubmittedForm] = useState(false)

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
    } else {
      setSubmittedForm(true)

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
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-8">
      <div className="max-w-2xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-amber-900 mb-4">Welcome to Coffee Shop!</h1>
        <h3 className="text-2xl text-amber-700 mb-2"><strong>Best coffee in Columbus</strong></h3>
        <p className="text-gray-600">Family-owned business for 25+ years</p>
      </div>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
      {submittedForm? (
        <div className="bg-green-100 p-6 text-xl font-semibold text-center rounded-lg"> ✓ Success! We'll be in touch.</div>
      ) : (
        <>
        <h2 className="text-3xl font-bold mb-6">Get a Quote</h2>
        <form className="space-y-4" onSubmit={addLead}>
        <input className="w-full p-3 border border-gray-300 rounded-lg" type="text" placeholder="name" value={nameFromForm} onChange={(e) => setNameFromForm(e.target.value)} required />
        <input className="w-full p-3 border border-gray-300 rounded-lg" type="text" placeholder='email' value={emailFromForm} onChange={(e) => setEmailFromForm(e.target.value)} required/>
        <input className="w-full p-3 border border-gray-300 rounded-lg" type="text" placeholder="message" value={messageFromForm} onChange={(e) => setMessageFromForm(e.target.value)} required />
        <button className="w-full bg-amber-600 text-white p-3 rounded-lg font-semibold hover:bg-amber-700" type="submit">Submit</button>
      </form>
       </>
      )}
      </div>
      </div>
    </main>
  )

}