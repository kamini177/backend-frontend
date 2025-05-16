import { useState } from "react"
import { register } from '../features/Users/userSlice';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { login } from "../features/Users/userSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!password || !email) {
      toast.error("Syötä tarvittavat tiedot", {
        position: "bottom-center",
      });
      return;
    }

    try {
      const resultAction = await dispatch(login(formData));

      if (login.fulfilled.match(resultAction)) {
        toast.success("Kirjautuminen onnistui", {
          position: "bottom-center",
        });
  
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } else if (login.rejected.match(resultAction)) {
        toast.error("Kirjautuminen epäonnistui", {
          position: "bottom-center",
        });
      };
    } catch (error) {
      toast.error("Kirjautuminen epäonnistui", {
        position: "bottom-center",
      });
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <form onSubmit={onSubmit} className="add-form">
        <h2>Kirjaudu</h2>

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

        <button type="submit" className="btn btn-block">
          Kirjaudu
        </button>
      </form>
    </>
  );
};
