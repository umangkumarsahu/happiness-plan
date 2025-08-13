import React from 'react'
export default function TripCard({title, desc}){
  return (
    <div className="card">
      <div className="icon">✈️</div>
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  )
}
