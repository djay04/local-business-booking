'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home(){

    const [leads, setLeads] = useState([])

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
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {leads.map((lead) => {
                        return (<tr key={lead.id}>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.message}</td>
                        </tr>
                    )})}
                    </tbody>
                </table>
    
    </main>)

}