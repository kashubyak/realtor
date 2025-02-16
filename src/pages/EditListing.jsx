import { getAuth } from "firebase/auth"
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"
import Spinner from "../components/Spinner"
import { db } from "../firebase"
import "./CreateListing.scss"

export default function EditListing() {
  const navigate = useNavigate()
  const auth = getAuth()
  const [geolocationEnabled, setGeoLocationEnabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [listing, setListing] = useState(null)
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
    latitude: 0,
    longitude: 0,
    images: {},
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
    images,
  } = formData

  const params = useParams()

  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error(`You can't edit this listing`)
      navigate("/")
    }
  }, [listing, auth.currentUser.uid, navigate])

  useEffect(() => {
    setLoading(true)
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setListing(docSnap.data())
        setFormData({ ...docSnap.data() })
        setLoading(false)
      } else {
        navigate("/")
        toast.error("Listing does not exist")
      }
    }
    fetchListing()
  }, [navigate, params.listingId])

  function onChange(e) {
    let boolean = null
    if (e.target.value === "true") {
      boolean = true
    }
    if (e.target.value === "false") {
      boolean = false
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }))
    }

    // Text and Boolean
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }))
    }
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

    if (images.length > 6) {
      setLoading(false)
      toast.error("Maximum 6 images are allowed")
      return
    }

    let geolocation = {}

    if (geolocationEnabled) {
      return
    } else {
      geolocation.lat = latitude
      geolocation.lng = longitude
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
        const storageRef = ref(storage, filename)
        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log("Upload is " + progress + "% done")
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused")
                break
              case "running":
                console.log("Upload is running")
                break
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false)
      toast.error("Images not uploaded")
      return
    })

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    }
    delete formDataCopy.images
    !formDataCopy.offer && delete formDataCopy.discountedPrice
    delete formDataCopy.latitude
    delete formDataCopy.longitude
    const docRef = doc(db, "listings", params.listingId)
    await updateDoc(docRef, formDataCopy)
    setLoading(false)
    toast.success("Listing Edited")
    navigate(`/category/${formDataCopy.type}/${docRef.id}`)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <main className="create-listing">
      <h1 className="create-listing__heading">Edit Listing</h1>
      <form onSubmit={onSubmit} className="create-listing__form">
<<<<<<< HEAD
        <p className="create-listing__form-sub-heading">Sell / Rent</p>
=======
        <p className="create-listing__form-sub-heading">Продаж / Оренда</p>
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
          </button>
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
          </button>
        </div>
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
          placeholder="Name"
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
          </div>
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
          </div>
        </div>
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
          </button>
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
          </button>
        </div>
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
          </button>
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
          </button>
        </div>
        <p className="create-listing__form-sub-heading">Address</p>
=======
            НІ
          </button>
        </div>
        <p className="create-listing__form-sub-heading">Адреса</p>
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
        {!geolocationEnabled && (
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
            </div>
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
            </div>
          </div>
        )}
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
          </button>
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
          </button>
        </div>
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
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className="create-listing__form-rent">
            <div className="">
              <p className="create-listing__form-sub-heading">
<<<<<<< HEAD
                Discounted price
=======
              Ціна зі знижкою
>>>>>>> origin/master
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
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div style={{ marginBottom: "3rem" }}>
          <p className="create-listing__form-sub-heading">Images</p>
          <p
            style={{
              color: "rgb(76 74 74)",
              fontSize: "12px",
              marginBottom: "5px",
            }}
          >
            The first image will be the cover (max 6) / image file should be
            less than 2mb/image file
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="create-listing__form-input"
            style={{ fontSize: "20px" }}
          />
        </div>
        <button type="submit" className="create-listing__btn-signing">
<<<<<<< HEAD
          Edit Listing
=======
          Редагувати список
>>>>>>> origin/master
        </button>
      </form>
    </main>
  )
}
