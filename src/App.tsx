import React from 'react'

import './App.css'

const App: React.FC = () => {

  return (
    <>
      <div className='wrapper'>
        <div className='video'>
          {/* poster */}
          <img src="/posters/poster_1.jpg" alt="Poster 1" />
        </div>
        <div className='video'>
          {/* poster */}
          <img src="/posters/poster_2.jpg" alt="Poster 2" />
        </div>
        <div className='video'>
          {/* poster */}
          <img src="/posters/poster_3.jpg" alt="Poster 3" />
        </div>
      </div>
    </>
  )
}

export default App
