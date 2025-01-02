import { Card } from "antd";

import styles from "./index.module.scss"

export default function SearchItem({ city }) {
    return (
        <div>
            <Card className={styles['card-item']}>
                <p>City: {city.label}</p>
            </Card>
        </div>
    )
}