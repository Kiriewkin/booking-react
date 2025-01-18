import React from "react"
import FavoritesList from "./FavoritesList"

export default function Favorites () {
    return (
        <div style={{ padding: "30px 0px" }}>
            <h1 style={{ marginBottom: 20 }} className="h1-hotel">
                Favorites:
            </h1>
            <FavoritesList />
        </div>
    )
}