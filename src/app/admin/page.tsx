'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home(){

    const [leads, setLeads] = useState<any[]>([])
    const [search, setSearch] = useState('')
    const [searchStatus, setSearchStatus] = useState('')

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

    return (<main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-8">

                <div className="max-w-6xl mx-auto">

                {/* title */}
                <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">
                        Admin View
                </h1>

                {/* White box for everything */}
                <div className="bg-white p-8 rounded-lg shadow-lg text-amber-800 font-bold">
                {/* Search and filter input */}
                {/* Your table goes here */}
                <div className="flex gap-4 mb-6">
                    <input className="flex-1 p-3 border border-gray-300 rounded-lg" placeholder="Search by Name or Email" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                    <select className="w-48 p-3 border border-gray-300 rounded-lg" value={searchStatus} onChange={(e) => {
                    setSearchStatus(e.target.value)
                    }}>
                        <option value="All">All</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                </select>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="font-bold text-amber-800"> 
                        <th className="p-3 text-left border-b-2 border-gray-200">Name</th>
                        <th className="p-3 text-left border-b-2 border-gray-200">Email</th>
                        <th className="p-3 text-left border-b-2 border-gray-200">Message</th>
                        <th className="p-3 text-left border-b-2 border-gray-200">Date</th>
                        <th className="p-3 text-left border-b-2 border-gray-200">Status</th>
                    </tr>
                    </thead>
                    <tbody className="font-bold text-amber-800">
                    {leads.filter((lead) => {

                        const matchesSearch = lead.name?.toLowerCase().includes(search) || lead.email?.toLowerCase().includes(search)
                        const matchesStatus = lead.status === searchStatus || searchStatus === "All"
                        
                        if (matchesSearch && matchesStatus){
                            return true
                        } else {
                            return false
                        }
                    }).map((lead) => {
                        return (<tr key={lead.id} className="rounded-lg shadow-lg">
                            <td className="p-3 border-b border-gray-100">{lead.name}</td>
                            <td className="p-3 border-b border-gray-100">{lead.email}</td>
                            <td className="p-3 border-b border-gray-100">{lead.message}</td>
                            <td className="p-3 border-b border-gray-100">{lead.date}</td>
                            <td className="p-3 border-b border-gray-100">
                                <select className="p-2 border border-gray-300 rounded bg-white" value={lead.status} onChange={async (e) => {

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
        </div>
    </div>
    </main>)

}