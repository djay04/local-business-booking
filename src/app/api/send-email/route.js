'use server'

import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(request){

    const { name, email, message} = await request.json()

    const resend = new Resend(process.env.RESEND_API_KEY)

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'ksaleh2004@gmail.com',
        subject: 'Greetings from Coffee Shop!',
        html: '<p><Thanks for stopping by! Lets continue the chat, book a time here: https://calendly.com/ksaleh2004/30min Have a <strong>Great</strong> day!</p>'
    })

    return Response.json({
        name: name,
        email: email,
        message: message
    }, {status: 201})

}