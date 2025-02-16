import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import React, { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "./SignIn.scss"

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData
  const navigate = useNavigate()

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const auth = getAuth()
      console.log(email, password)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if (userCredential.user) {
        navigate("/")
      }
      setIsLoading(false)
    } catch (error) {
      console.error("Error during sign-in: ", error)
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <section className="form-section">
      <h1 className=" form-section__title">Увійти</h1>
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
              type="email"
              id="email"
              placeholder="Електронна Пошта"
              className="form-section__form-input"
              value={email}
              onChange={onChange}
            />
            <div className="form-section__form-input-wrap">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Пароль"
                className="form-section__form-input-password"
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
                <Link to="/sign-up">Зареєструватися</Link>
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
          <div className="form-section__border-line"></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div>
              <span style={{ display: "inline-block", fontWeight: "600" }}>
                Demo user email:
              </span>{" "}
              demo@gmail.com
            </div>
            <div>
              <span style={{ display: "inline-block", fontWeight: "600" }}>
                Demo user password:
              </span>{" "}
              123456
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SignIn
