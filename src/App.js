import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRouters } from '~/routers';
import DefaultLayout from '~/layouts';
import { Fragment, useCallback, useContext, useEffect } from 'react';
import * as currentUserService from '~/services/AuthService';
import { ContextProvider } from './Context';

const App = () => {
    const { setDataCurrentUser } = useContext(ContextProvider);
    const token = localStorage.getItem('tokenLogin');
    const getCurrentUser = useCallback(async () => {
        if (token) {
            await currentUserService.currentUser(setDataCurrentUser);
        }
    }, [setDataCurrentUser, token]);
    useEffect(() => {
        getCurrentUser();
    }, [getCurrentUser, token]);
    return (
        <Router>
            <div>
                <Routes>
                    {publicRouters.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
