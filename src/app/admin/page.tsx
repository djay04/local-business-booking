'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home(){

    const [leads, setLeads] = useState([])
    const [search, setSearch] = useState('')

    useEffect( () => {

        const fetchData = async () => {
            const { data, error } = await supabase.from('leads').select()

            if (!error){
                setLeads(data)
            } else {
                console.error(error)
                alert('Error!')
            }
        }

        fetchData()
    }, [])

    return (<main>
                <h1>
                    <strong>
                        Admin View
                    </strong>
                </h1>
                <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leads.filter((lead) => {
                        
                        if (lead.name?.toLowerCase().includes(search) || lead.email?.toLowerCase().includes(search)){
                            return true
                        } else {
                            return false
                        }
                    }).map((lead) => {
                        return (<tr key={lead.id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.message}</td>
                            <td>{lead.date}</td>
                            <td>
                                <select value={lead.status} onChange={async (e) => {

                                    const newStatus = e.target.value

                                    const { error } = await supabase.from('leads').update({status: newStatus}).eq('id', lead.id)
                                    
                                    if (error){
                                        console.error('Supabase error:', error)
                                        return
                                    }

                                    const updatedLeads = leads.map((l) => {
                                        if (l.id == lead.id){
                                            const updated = {
                                                ...l,
                                                status: newStatus
                                            }
                                            return updated
                                        } else {
                                            return l
                                        }
                                    })
                                    
                                    setLeads(updatedLeads)
                                }}>
                                    <option value="new">new</option>
                                    <option value="contacted">contacted</option>
                                    <option value="closed">closed</option>
                                </select>
                            </td>
                        </tr>
                    )})}
                    </tbody>
                </table>
    
    </main>)

}