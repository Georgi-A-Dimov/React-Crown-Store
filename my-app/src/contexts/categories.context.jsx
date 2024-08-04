import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    const value = { categoriesMap };

    useEffect(() => {
        // note: to use an async function in useEffect it needs to be wrapped up in another async function and then invoked.
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
            console.log(categoriesMap);
        };

        getCategoryMap();
    }, []);

    return (<CategoriesContext.Provider value={value} > {children} </CategoriesContext.Provider>)
};