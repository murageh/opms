import PageLayout from "../layouts/PageLayout";
import styles from '../styles/Home.module.css'
import React from "react";

export function refreshPage() {
    window.location.reload();
}

const Home = () => {
    // const dispatch = useAppDispatch();
    // const count = useAppSelector(selectCount);
    // const [incrementAmount, setIncrementAmount] = useState<number>(0);

    return (
        <div className={styles.container}>
            <h2>
                This is the homepage.
            </h2>
        </div>
    );
}

Home.Layout = PageLayout;
export default Home;