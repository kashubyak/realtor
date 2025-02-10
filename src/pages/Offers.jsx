import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import ListingItem from "../components/ListingItem"
import { db } from "../firebase"
import "./Offers.scss"

const Offers = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchListing] = useState(null)

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingRef = collection(db, "listings")
        // Create query
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(8)
        )

        // Execute query
        const querySnap = await getDocs(q)
        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchListing(lastVisible)
        const listings = []
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("Could not fetch listing")
      }
    }

    fetchListings()
  }, [])

  async function onFetchMoreListings() {
    try {
      const listingRef = collection(db, "listings")
      const q = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(4)
      )
      const querySnap = await getDocs(q)
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchListing(lastVisible)
      const listings = []
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error("Could not fetch listing")
    }
  }

  return (
    <div className="offer">
      <h1 className="offer__title">Пропозиції</h1>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <div className="loader loader--big"></div>
        </div>
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="offer__listing">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className="offer__load-more-btn-wrap">
              <button
                onClick={onFetchMoreListings}
                className="offer__load-more-btn"
              >
                Load more
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Актуальних пропозицій немає</p>
      )}
    </div>
  )
}

export default Offers
