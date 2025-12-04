import { Route, Routes } from 'react-router-dom';

import { IndexPage } from './pages/index.page';

const RoutePath = () => {
    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
        </Routes>
    );
};

export { RoutePath };
