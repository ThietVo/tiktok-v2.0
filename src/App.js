import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import GlobalStyles from '~/components/GlobalStyles';
import { publicRoutes } from '~/routes';
import { MainLayout } from '~/layouts';
import { getUserApi } from '~/callApi/usersApi';
import { getLikedVideosOfUser } from '~/callApi/likedVideosApi'
import usersSlice from '~/redux/usersSlice';
import likedVideosSlice from '~/redux/likedVideosSlice';

import { auth } from '~/firebase';
import { onAuthStateChanged } from 'firebase/auth';


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            //if logged -> send id logged to redux
            if (currentUser) {
                setTimeout(() => {
                    getUserApi(currentUser.uid).then((result) => dispatch(usersSlice.actions.setUserLogin(result)));
                    //get list videos liked by userLogged and dispatch to redux
                    getLikedVideosOfUser(currentUser.uid).then((result) => {
                      dispatch(likedVideosSlice.actions.setLikedVideos(result));
                    });
                }, 0);
            }
        });
    }, [dispatch]);

    return (
        <GlobalStyles>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = MainLayout;

                            if(route.layout){
                                Layout = route.layout;
                            }else if(route.layout === null){
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
        </GlobalStyles>
    );
}

export default App;
