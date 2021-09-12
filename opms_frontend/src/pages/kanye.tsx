import React from 'react';
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {kanyeQuoteSelector} from "../features/kanye/selectors";
import {getKanyeQuote} from "../features/kanye/actions";
import PageLayout from "../layouts/PageLayout";

const Kanye = () => {
    const dispatch = useAppDispatch();
    const {
        data,
        pending,
        error,
    } = useAppSelector(kanyeQuoteSelector);

    return (
        <div>
            <h2>Generate random Kanye West quote</h2>
            {pending && <p>Loading...</p>}
            {data && <p>{data.quote}</p>}
            {error && <p>Oops, something went wrong</p>}
            <button onClick={() => dispatch(getKanyeQuote())} disabled={pending}>
                Generate Kanye Quote
            </button>
        </div>
    );
};

Kanye.Layout = PageLayout;
export default Kanye;
