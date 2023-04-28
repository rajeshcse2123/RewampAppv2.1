// import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../Perks'
import axios from 'axios'

export default function PlacesPage() {
  const { action } = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setaddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extrainfo, setExtraInfo] = useState('')
  const [checkIn, setcheckIn] = useState('')
  const [checkOut, setcheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>
  }
  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>
  }
  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }
  const addPhotoByLink = async (ev) => {
    ev.preventDefault()

    const { data: filename } = await axios.post('/upload-by-link', {
      Link: photoLink,
    })

    setaddedPhotos((prev) => {
      return [...prev, filename]
    })
  }

  const uploadPhotos = (ev) => {
    const files = ev.target.files
    const data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i])
    }

    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((res) => {
        const { data: filenames } = res
        setaddedPhotos((prev) => {
          return [...prev, ...filenames]
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      {action !== 'new' && (
        <div className=" text-center">
          <Link
            className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full"
            to={'/account/places/new'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div className="flex flex-col">
          <form>
            {preInput(
              'Title',
              'Title/Heading for your Place,should be short and Eye Catchy',
            )}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="title:For Example Ashirbad Palace"
            />
            {preInput('Address', 'Address your Place')}

            <input
              type="text"
              placeholder="Address:"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />
            {preInput(
              'Photos',
              'Add photos of your place,more photos==more bookings',
            )}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder={'Add using Link....jpg'}
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button
                className="bg-gray-200 px-4 rounded-2xl"
                onClick={addPhotoByLink}
              >
                Upload&nbsp; Photo
              </button>
            </div>

            <div className="grid gap-2 grid-cols-3 lg:grid-cols-6 md:grid-cols-4 mt-2">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div key={link} className="h-32 flex w-full object-cover ">
                    <img
                      className="rounded-2xl"
                      src={
                        link.startsWith('http')
                          ? link
                          : `http://localhost:4000/uploads/${link}`
                      }
                      alt=""
                    />
                  </div>
                ))}

              <label className="h-32 cursor-pointer flex justify-center gap-1 border bg-transparent rounded-2xl p-2 items-center text-2xl text-gray-600">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhotos}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>


            
            {preInput('Description', 'Description of the Place')}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {preInput('Perks', 'Select all the Perks of Your Place')}
            <Perks selected={perks} onChange={setPerks} />

            {preInput('Extra Info', 'House Rules, Cancellation Policy, etc.')}
            <textarea
              value={extrainfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            {preInput(
              'Check In & Out times',
              'add check in and check out times,rembeber to have some time window for cleaning the room between guests',
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check In Time</h3>
                <input
                  type="text"
                  placeholder="14"
                  value={checkIn}
                  onChange={(ev) => setcheckIn(ev.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setcheckOut(ev.target.value)}
                  placeholder="11"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of Guest</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button className="bg-primary my-4 w-96 lg:w-[700px] rounded-xl text-white ">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
