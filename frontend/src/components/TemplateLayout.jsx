import React from 'react'
import { Outlet } from 'react-router'

function TemplateLayout() {
  return (
    <div className='template-layout'>
        <Outlet />
    </div>
  )
}

export default TemplateLayout