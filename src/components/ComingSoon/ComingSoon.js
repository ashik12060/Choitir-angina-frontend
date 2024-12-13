import { faFacebook, faLinkedin, faSquareInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ComingSoon = () => {
  return (
    <div className='flex flex-row sm:flex-column justify-evenly p-20'>
        <div className='p-10 border-2 text-xl'>
            <h5 className='text-4xl'>Social Media Live Links</h5>
            <nav className="space-x-6 pt-10 text-white">
                      <a href="/" className="bg-blue-700 px-4 py-2 rounded-full">
                        <FontAwesomeIcon icon={faFacebook} /> Facebook
                      </a>
                      <a href="/" className="bg-red-600 px-4 py-2 rounded-full">
                        <FontAwesomeIcon icon={faYoutube} /> Youtube
                      </a>

                      <a href="/" className="bg-pink-700 px-4 py-2 rounded-full">
                        <FontAwesomeIcon icon={faSquareInstagram} /> Instagram
                      </a>
                    </nav>

        </div>
        <div className='p-10 border-2 '>
            <h4 className='text-2xl font-bold'>Coming Soon ...</h4>
        </div>
    </div>
  )
}

export default ComingSoon