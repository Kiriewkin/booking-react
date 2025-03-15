import { useTranslation } from "react-i18next"
import FavoritesList from "./FavoritesList"

export default function Favorites () {
    const {t} = useTranslation()
    return (
        <div>
            <h1 style={{ marginBottom: 20 }} className="h1-hotel">
                {t("favorites")}:
            </h1>
            <FavoritesList />
        </div>
    )
}