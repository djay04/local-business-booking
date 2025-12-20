'use server'

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'


export async function GET(){

    const { data, error } = await supabase.from('leads').select()

    if (!error) {

        return Response.json({
            data
        }
        )

    } else {
        return Response.json({
            status: error
        })
    }

    
}