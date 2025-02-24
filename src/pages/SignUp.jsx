import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import React, { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { db } from "../firebase"
import "./SignIn.scss"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { name, email, password } = formData

  const emailIsValid = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
    email
  )
  const passwordIsValid = password.length >= 6 && password.trim() !== ""
  const nameIsValid = name.length >= 3 && name.trim() !== ""

  const navigate = useNavigate()

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!nameIsValid) {
      toast.error("Name should be greater than or equal to 3 characters")
      return
    }
    if (!emailIsValid) {
      toast.error("Enter valid email")
      return
    }
    if (!passwordIsValid) {
      toast.error("Password should be greater than or equal to 6 characters")
      return
    }
    setIsLoading(true)
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const user = userCredential.user
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, "users", user.uid), formDataCopy)
      toast.success("Sign up was successfull")
      navigate("/")
      setIsLoading(false)
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <section className="form-section">
      <h1 className=" form-section__title">Sign Up</h1>
      <div className=" form-section__form-wrapper">
        <div className="form-section__image-wrap">
          <img
            src="https://wallpapers.com/images/hd/real-estate-house-keys-h79pvlxway8mwu2p.jpg"
            alt="key"
          />
        </div>
        <div className="form-section__form-wrap">
          <form onSubmit={onSubmit} className="form-section__form">
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Ім'я"
              className={`form-section__form-input`}
            />

            <input
              type="text"
              id="email"
              placeholder="Електронна Пошта"
              className={`form-section__form-input`}
              value={email}
              onChange={onChange}
            />

            <div className="form-section__form-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Пароль"
                className={`form-section__form-input`}
                onChange={onChange}
                value={password}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="form-section__form-input-password-eye"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="form-section__form-input-password-eye"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div className="form-section__other-detail">
              <p className="form-section__account-signing">
                Немаєте аккаунту?
                <Link to="/sign-in">Увійти</Link>
              </p>
              <p className="form-section__forgot-password">
                <Link to="/forgot-password">Забули пароль?</Link>
              </p>
            </div>

            {isLoading ? (
              <button
                disabled
                className="form-section__btn-signing"
                type="submit"
                style={{ cursor: "default", backgroundColor: "#86a1da" }}
              >
                Вхід...
              </button>
            ) : (
              <button className="form-section__btn-signing" type="submit">
                Увійти
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
export default SignUp
