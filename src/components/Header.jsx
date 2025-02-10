import { getAuth, onAuthStateChanged } from "firebase/auth"
import React, { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import "./Header.scss"

const Header = () => {
  const [pageState, setPageState] = useState({
    path: "sign-in",
    menuName: "Війти",
  })
  const { path, menuName } = pageState

  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState({
          path: "profile",
          menuName: "Профіль",
        })
      } else {
        setPageState({
          path: "sign-in",
          menuName: "Увійти",
        })
      }
    })
  }, [auth])

  return (
    <div className="header">
      <header className="header__container">
        <Link to="/" className="header__logo">
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
          ></img>
        </Link>
        <nav>
          <ul className="header__menus">
            <NavLink to="/" className="header__menu">
              Домашня сторінка
            </NavLink>

            <NavLink to="/offers" className="header__menu">
              Пропозиції
            </NavLink>

            <NavLink to={`/${path}`} className="header__menu">
              {menuName}
            </NavLink>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header
