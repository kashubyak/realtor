import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import "./SignIn.scss"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function onChange(e) {
    setEmail(e.target.value)
  }

  async function onSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
      setIsLoading(false)
    } catch (error) {
      toast.error("Could not send reset password, Enter valid email")
      setIsLoading(false)
    }
  }

  return (
    <section className="form-section">
      <h1 className=" form-section__title">Reset Password</h1>
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
              placeholder="Email address"
              className="form-section__form-input"
              value={email}
              onChange={onChange}
            />

            <div className="form-section__other-detail">
              <p className="form-section__account-signing">
                Немає акаунту?
                <Link to="/sign-up">Регістрація</Link>
              </p>
              <p className="form-section__forgot-password">
                <Link to="/sign-in">Зайти</Link>
              </p>
            </div>
            <button className="form-section__btn-signing" type="submit">
              {isLoading ? "Sending Email..." : "Send reset Email"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
export default ForgotPassword
