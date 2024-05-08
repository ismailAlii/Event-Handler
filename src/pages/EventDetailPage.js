import React from 'react'
import { json, redirect, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem'

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail')
  const event = data.event
  return <EventItem event={event} />
}

export default EventDetailPage

export const loader = async ({ request, params }) => {
  const { id } = params
  const response = await fetch(`http://localhost:8080/events/${id}`)

  if (!response.ok) {
    throw json({ message: 'Could not fetch event!' }, { status: 500 })
  }

  return response
}

export const action = async ({ params, request }) => {
  const id = params.id
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  })

  if (!response.ok) {
    throw json({ message: 'Could not Delete event!' }, { status: 500 })
  }
  return redirect('/events')
}
