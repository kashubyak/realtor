import { getAuth, updateProfile } from "firebase/auth"
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import Notiflix from "notiflix"
import { useEffect, useState } from "react"
import { FcHome } from "react-icons/fc"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ListingItem from "../components/ListingItem"
import { db } from "../firebase"
import "./Profile.scss"

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [listIsLoading, setListIsLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData

  function onLogout() {
    auth.signOut()
    navigate("/")
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit() {
    setIsLoading(true)
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name: name,
        })
      }
      toast.success("Деталі профілю оновлено")
      setIsLoading(false)
    } catch (error) {
      toast.error("Не вдалося оновити дані профілю")
    }
  }

  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings")
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      )
      const querySnap = await getDocs(q)
      let listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings(listings)
      setListIsLoading(false)
    }
    fetchUserListings()
  }, [auth.currentUser.uid])

  const confirmDelete = (listingId) => {
    Notiflix.Confirm.show(
      "Видалити товар!!!",
      "Ви збираєтеся видалити цей продукт",
      "Видалити",
      "Скасувати",
      function okCb() {
        deleteListing(listingId)
      },
      function cancelCb() {
        console.log("Delete Canceled")
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "red",
        okButtonBackground: "red",
        cssAnimationStyle: "zoom",
      }
    )
  }

  async function deleteListing(listingId) {
    await deleteDoc(doc(db, "listings", listingId))
    const updatedListings = listings.filter(
      (listing) => listing.id !== listingId
    )
    setListings(updatedListings)
    toast.success("Список успішно видалено")
  }

  function onEdit(listingId) {
    navigate(`/edit-listing/${listingId}`)
  }

  return (
    <>
      <section className=" profile">
        <h1 className=" profile__header">My Profile</h1>
        <div className="profile__form-btn-wrap">
          <form className="profile__form">
            {/* Name Input */}

            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`profile__form-input ${changeDetail ? "profile__form-input--modifier" : ""
                }`}
            />

            {/* Email Input */}

            <input
              type="email"
              id="email"
              disabled
              className="profile__form-input"
              value={email}
            />

            <div className="profile__form-links">
              <p className="profile__form-name-change-link">
                  Ви хочете змінити своє ім'я?
                <span
                  onClick={() => {
                    changeDetail && onSubmit()
                    setChangeDetail((prevState) => !prevState)
                  }}
                  className="profile__form-name-change-link-name"
                >
                  {!isLoading && changeDetail ? (
                    "Застосувати зміни"
                  ) : isLoading ? (
                    <div className="loader--little"></div>
                  ) : (
                    "Редагувати"
                  )}
                </span>
              </p>
              <p onClick={onLogout} className="profile__form-sign-out">
                Вийти
              </p>
            </div>
          </form>
          <button type="submit" className="profile__home-sell-btn">
            <Link to="/create-listing" className="profile__home-sell-btn-link">
              <FcHome className="profile__home-sell-btn-logo" />
              Продати або здати в оренду свій будинок
            </Link>
          </button>
        </div>
      </section>
      <div className="user-listings-section">
        {listIsLoading && <div className="loader"></div>}
        {!listIsLoading && listings.length > 0 && (
          <>
<<<<<<< HEAD
            <h2 className="user-listings-section__header">My Listings</h2>
=======
            <h2 className="user-listings-section__header">Мої оголошення</h2>
>>>>>>> origin/master
            <ul className="user-listings-section__listing">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => confirmDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}
