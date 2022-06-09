import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from '~/components/GlobalStyles';
import { publicRoutes } from '~/routes';
import { MainLayout } from '~/layouts';
import { Fragment } from 'react';

function App() {

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
