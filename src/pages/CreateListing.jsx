import { getAuth } from "firebase/auth"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { db } from "../firebase"
import "./CreateListing.scss"

export default function CreateListing() {
  const navigate = useNavigate()
  const auth = getAuth()
  const [geolocationEnabled, setGeoLocationEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 13.095631,
    longitude: 80.20762,
    imageUrls: "",
  })

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    address,
    furnished,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    imageUrls,
  } = formData

  function onChange(e) {
    let boolean = null
    if (e.target.value === "true") {
      boolean = true
    }
    if (e.target.value === "false") {
      boolean = false
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: boolean ?? e.target.value,
    }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)

    if (+discountedPrice >= +regularPrice) {
      setLoading(false)
<<<<<<< HEAD
      toast.error("Discounted price needs to be less than regular price")
=======
      toast.error("Ціна зі знижкою має бути нижчою за звичайну")
>>>>>>> origin/master
      return
    }

    let geolocation = {}

    if (geolocationEnabled) {
      return
    } else {
      geolocation.lat = +latitude
      geolocation.lng = +longitude
    }

    // Перетворення рядка URL в масив
    const imgUrlsArray = imageUrls
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url)

    if (imgUrlsArray.length > 6) {
      setLoading(false)
      toast.error("Maximum 6 images are allowed")
      return
    }

    const formDataCopy = {
      ...formData,
      imgUrls: imgUrlsArray, // Масив URL зображень
      geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    }

    delete formDataCopy.imageUrls
    !formDataCopy.offer && delete formDataCopy.discountedPrice
    delete formDataCopy.latitude
    delete formDataCopy.longitude

    const docRef = await addDoc(collection(db, "listings"), formDataCopy)
    setLoading(false)
    toast.success("Listing created")
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <main className="create-listing">
<<<<<<< HEAD
      <h1 className="create-listing__heading">Create a Listing</h1>
      <form onSubmit={onSubmit} className="create-listing__form">
        <p className="create-listing__form-sub-heading">Sell / Rent</p>
=======
      <h1 className="create-listing__heading">Створіть список</h1>
      <form onSubmit={onSubmit} className="create-listing__form">
        <p className="create-listing__form-sub-heading"> Продаж / Оренда</p>
>>>>>>> origin/master
        <div className="create-listing__form-toggle-btn-wrap">
          <button
            type="button"
            id="type"
            value="sale"
            onClick={onChange}
            className={`create-listing__form-toggle-btn ${type === "rent"
              ? "create-listing__form-toggle-btn--white"
              : "create-listing__form-toggle-btn--black"
              }`}
          >
<<<<<<< HEAD
  sell
=======
            Продаж
>>>>>>> origin/master
          </button >
    <button
      type="button"
      id="type"
      value="rent"
      onClick={onChange}
      className={`create-listing__form-toggle-btn ${type === "sale"
        ? "create-listing__form-toggle-btn--white"
        : "create-listing__form-toggle-btn--black"
        }`}
    >
<<<<<<< HEAD
  rent
          </button >
        </div >
        <p className="create-listing__form-sub-heading">Name</p>
=======
            Оренда
          </button>
        </div>
        <p className="create-listing__form-sub-heading">Ім'я</p>
>>>>>>> origin/master
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
<<<<<<< HEAD
          placeholder="Name"
=======
          placeholder="Ім'я"
>>>>>>> origin/master
          maxLength="32"
          minLength="10"
          required
          className="create-listing__form-input"
        />
        <div className="create-listing__form-small-input-wrap">
          <div>
<<<<<<< HEAD
            <p className="create-listing__form-sub-heading">Beds</p>
=======
            <p className="create-listing__form-sub-heading">Ліжка</p>
>>>>>>> origin/master
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className=" create-listing__form-input"
            />
          </div >
    <div>
<<<<<<< HEAD
            <p className="create-listing__form-sub-heading">Baths</p>
=======
            <p className="create-listing__form-sub-heading">Ванни</p>
>>>>>>> origin/master
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="create-listing__form-input"
            />
          </div >
        </div >
<<<<<<< HEAD
        <p className=" create-listing__form-sub-heading">Parking spot</p>
=======
        <p className=" create-listing__form-sub-heading">Парковка</p>
>>>>>>> origin/master
        <div className="create-listing__form-toggle-btn-wrap">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`create-listing__form-toggle-btn ${!parking
              ? "create-listing__form-toggle-btn--white"
              : "create-listing__form-toggle-btn--black"
              }`}
          >
<<<<<<< HEAD
  Yes
=======
            ТАК
>>>>>>> origin/master
          </button >
    <button
      type="button"
      id="parking"
      value={false}
      onClick={onChange}
      className={`create-listing__form-toggle-btn ${parking
        ? "create-listing__form-toggle-btn--white"
        : "create-listing__form-toggle-btn--black"
        }`}
    >
<<<<<<< HEAD
  no
          </button >
        </div >
        <p className=" create-listing__form-sub-heading">Furnished</p>
=======
            НІ
          </button>
        </div>
        <p className=" create-listing__form-sub-heading">Меблі</p>
>>>>>>> origin/master
        <div className="create-listing__form-toggle-btn-wrap">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`create-listing__form-toggle-btn ${!furnished
              ? "create-listing__form-toggle-btn--white"
              : "create-listing__form-toggle-btn--black"
              }`}
          >
<<<<<<< HEAD
  yes
=======
            ТАК
>>>>>>> origin/master
          </button >
    <button
      type="button"
      id="furnished"
      value={false}
      onClick={onChange}
      className={`create-listing__form-toggle-btn ${furnished
        ? "create-listing__form-toggle-btn--white"
        : "create-listing__form-toggle-btn--black"
        }`}
    >
<<<<<<< HEAD
  no
          </button >
        </div >
        <p className="create-listing__form-sub-heading">Address</p>
=======
            НІ
          </button>
        </div>
        <p className="create-listing__form-sub-heading">Адрес</p>
>>>>>>> origin/master
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
<<<<<<< HEAD
          placeholder="Address"
=======
          placeholder="Адрес"
>>>>>>> origin/master
          required
          className="create-listing__form-input"
        />
  {
    !geolocationEnabled && (
      <div className="create-listing__form-rent">
        <div className="">
<<<<<<< HEAD
              <p className="create-listing__form-sub-heading">Latitude</p>
=======
              <p className="create-listing__form-sub-heading">Широта</p>
>>>>>>> origin/master
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                required
                min="-90"
                max="90"
                step="any"
                className="create-listing__form-input"
                placeholder="Ex: 13.095631"
              />
            </div >
      <div className="" style={{ marginLeft: "1.4rem" }}>
<<<<<<< HEAD
              <p className="create-listing__form-sub-heading">Longitude</p>
=======
              <p className="create-listing__form-sub-heading">Довгота</p>
>>>>>>> origin/master
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                required
                min="-180"
                max="180"
                step="any"
                className="create-listing__form-input"
                placeholder="Ex: 80.207620"
              />
            </div >
          </div >
        )
  }
<<<<<<< HEAD
        <p className="create-listing__form-sub-heading">Description</p>
=======
        <p className="create-listing__form-sub-heading">Опис</p>
>>>>>>> origin/master
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
<<<<<<< HEAD
          placeholder="Description"
          required
          className="create-listing__form-input"
        />
        <p className="create-listing__form-sub-heading">Offer</p>
=======
          placeholder="Опис"
          required
          className="create-listing__form-input"
        />
        <p className="create-listing__form-sub-heading">Пропозиція</p>
>>>>>>> origin/master
        <div className="create-listing__form-toggle-btn-wrap">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`create-listing__form-toggle-btn ${!offer
              ? "create-listing__form-toggle-btn--white"
              : "create-listing__form-toggle-btn--black"
              }`}
          >
<<<<<<< HEAD
  yes
=======
            ТАК
>>>>>>> origin/master
          </button >
    <button
      type="button"
      id="offer"
      value={false}
      onClick={onChange}
      className={`create-listing__form-toggle-btn ${offer
        ? "create-listing__form-toggle-btn--white"
        : "create-listing__form-toggle-btn--black"
        }`}
    >
<<<<<<< HEAD
  no
=======
            НІ
>>>>>>> origin/master
          </button >
        </div >
    <div className="create-listing__form-rent">
      <div className="">
<<<<<<< HEAD
            <p className="create-listing__form-sub-heading">Regular price</p>
=======
            <p className="create-listing__form-sub-heading">Звичайна ціна</p>
>>>>>>> origin/master
            <div className="create-listing__form-toggle-rent-btn-wrap">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="400000000"
                required
                className="create-listing__form-input"
              />
              {type === "rent" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "1.4rem",
                  }}
                >
                  <p
                    className="create-listing__form-rent-month"
                    style={{ width: "100px", fontSize: "1.2rem" }}
                  >
<<<<<<< HEAD
                    ₹ / Month
=======
                    ₴ / Місяць
>>>>>>> origin/master
                  </p >
                </div >
              )
}
            </div >
          </div >
        </div >
  { offer && (
    <div className="create-listing__form-rent">
      <div className="">
        <p className="create-listing__form-sub-heading">
          Discounted price
        </p>
        <div className="create-listing__form-toggle-rent-btn-wrap">
          <input
            type="number"
            id="discountedPrice"
            value={discountedPrice}
            onChange={onChange}
            min="50"
            max="400000000"
            required={offer}
            className="create-listing__form-input"
          />
          {type === "rent" && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "1.4rem",
              }}
            >
              <p
                className="create-listing__form-rent-month"
                style={{ width: "100px", fontSize: "1.2rem" }}
              >
<<<<<<< HEAD
                      ₹ / Month
=======
                      ₴ / Місяць
>>>>>>> origin/master
                    </p >
                  </div >
                )}
              </div >
            </div >
          </div >
        )}
<<<<<<< HEAD
        <p className="create-listing__form-sub-heading">Images (URLs)</p>
        <p style={{ color: "rgb(76 74 74)", fontSize: "12px", marginBottom: "5px" }}>
          Enter up to 6 image URLs, separated by commas.
=======
        <p className="create-listing__form-sub-heading">Зображення (URLs)</p>
    <p style={{ color: "rgb(76 74 74)", fontSize: "12px", marginBottom: "5px" }}>
      Введіть до 6 URL-адрес зображень, розділених комами.
>>>>>>> origin/master
    </p>
    <textarea
      id="imageUrls"
      value={imageUrls}
      onChange={onChange}
<<<<<<< HEAD
      placeholder="Enter image URLs, separated by commas"
=======
          placeholder="Введіть URL-адреси зображень, розділивши їх комами"
>>>>>>> origin/master
      required
      className="create-listing__form-input"
      rows="3"
    />
    <button type="submit" className="create-listing__btn-signing">
<<<<<<< HEAD
          Create Listing
=======
          Створити список
>>>>>>> origin/master
        </button >
      </form >
    </main >
  )
}
