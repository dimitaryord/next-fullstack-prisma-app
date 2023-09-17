'use client'

import { useEffect } from "react"

const getUsers = async () => {
    console.log(await fetch('/api/users'))
}

function HomeView() {
  useEffect(() =>{
    getUsers()
  }, [])

  return (
    <div className="text-3xl">
      <p>This is a place where book opinion matters.</p>
      <p className="text-xl">Join us and start disusing with other people about your favorite book.</p>
    </div>
  )
}

export default HomeView
