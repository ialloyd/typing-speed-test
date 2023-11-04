import React from 'react'
import { GlobalStyles } from './Styles/global'
import TypingBox from './Components/TypingBox'

const App = () => {
  return (
    <div className='canvas'>
      <GlobalStyles />
      <div>Header</div>
      <TypingBox/>
      <div>Footer</div>
    </div>
  )
}

export default App