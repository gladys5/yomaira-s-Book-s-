import axios from "axios"
import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  })
  const [error, setError] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const bookId = location.pathname.split("/")[2]

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book)
      navigate("/")
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <div className="form">
      <h1>Actualiza el libro</h1>
      <input
        type="text"
        placeholder="Titulo"
        name="title"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Descripcion"
        name="description"
        onChange={handleChange}
      />

      <input
        type="number"
        placeholder="Precio"
        name="price"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Imagen"
        name="cover"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Actualizar</button>
      {error && "Something went wrong!"}
      <Link to="/">Ver todos</Link>
    </div>
  )
}

export default Update
