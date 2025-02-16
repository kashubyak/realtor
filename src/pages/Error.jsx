import React from "react"
import { Link } from "react-router-dom"
import "./Error.scss"

const ErrorPage = () => {
  return (
    <div className="error">
      <Link to="/" className="error__logo">
        <img
          src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
          alt="logo"
          width={"200px"}
          style={{ marginTop: "20px", marginBottom: "10px" }}
        />
      </Link>
      <h2 className="error__title">Шукаєте щось?</h2>
      <p className="error__para">
      Вибачте Веб-адреса, яку ви ввели, не є робочою сторінкою на нашому сайті.</p>
      <h2 className="error__guide">
        ▶ Перейти до ріелторів <Link to="/">Home</Link> Page
      </h2>
    </div>
  )
}

export default ErrorPage
