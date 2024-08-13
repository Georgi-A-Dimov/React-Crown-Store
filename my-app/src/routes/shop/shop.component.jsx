import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import ItemDetails from '../item-details/item-details.component';

const Shop = () => {

    return (
        <Routes>
            <Route path=':category/:id' element={<ItemDetails/>}/>
            <Route path=':category' element={<Category/>}/>
            <Route index element={<CategoriesPreview/>}/>
        </Routes>
    )
};

export default Shop;