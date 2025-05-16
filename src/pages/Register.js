import { useState } from "react";
import { register } from '../features/Users/userSlice';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name || !email) {
      toast.error('Syötä tarvittavat tiedot', {
        position: "bottom-center"
      })
      return
    }

    if (password !== password2) {
      toast.error('Salasanat eivät täsmää', {
        position: "bottom-center"
      })
      return
    }
      
    dispatch(register(formData))

    setTimeout(()=> {navigate("/login")}, 2500)
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      <form onSubmit={onSubmit}>
        <h2>Rekisteröidy</h2>

        <div className="form-control">
          <label htmlFor="name">Nimi</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Syötä nimesi"
            onChange={onChange}
          />
        </div>

        <div className="form-control">
          <label htmlFor="email">Sähköposti</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Syötä sähköpostiosoite"
            onChange={onChange}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Salasana</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Syötä salasana"
            onChange={onChange}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password2">Salasana uudestaan</label>
          <input
            type="password"
            name="password2"
            value={password2}
            placeholder="Syötä salasana uudestaan"
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-block">Rekisteröidy</button>

      </form>
    </>
  )
}
