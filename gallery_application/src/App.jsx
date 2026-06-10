import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {

  const [UserData, setUserData] = useState([])
  const [index, setIndex] = useState(1)


  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=30`)
    setUserData(response.data)


  }

  useEffect(function () {
    getData()
  }, [index])


  let printUserData = <h3 className='text-gray-400 absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2'> Loading...</h3>
  if (UserData.length > 0) {
    printUserData = UserData.map(function (elem, idx) {
      return <div key={idx}>
        <a href={elem.url} target='_blank'>
          <div className='h-40 w-44 gap-5 rounded-xl overflow-hidden bg-white'>
            <img className='h-full  w-full object-cover' src={elem.download_url} alt=""></img>
          </div>
          <h2 className='font-bold text-lg'>{elem.author}</h2>
        </a>
      </div>
    })
  }




  return (
    <div className='bg-black h-screen  overflow-auto text-white'>






      <div className='flex   p-15 flex-wrap gap-5'>
        {printUserData}

      </div>
      <div className='flex justify-center items-center p-4 '>
        <button
          style={{ opacity: index == 1 ? 0.5 : 1 }}
          onClick={() => {

            if (index > 1) {
              setIndex(index - 1)

              setUserData([])

            }
          }}
          className='bg-red-300  active:scale-75 font-bold text-sm cursor-pointer text-black rounded-xl m-3 p-5'>Prev</button>
        <h4 className='text-xl font-normal'>Page Numbe:{index}</h4>
        <button onClick={() => {
          setIndex(index + 1)
          setUserData([])
        }}
          className='bg-red-300  active:scale-75 text-sm cursor-pointer text-black font-bold rounded-xl m-3 p-5'>Next</button>
      </div>
    </div>
  )
}

export default App
