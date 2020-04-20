import React from 'react';
import { withRouter, Switch } from "react-router-dom";
import { AuthLayout, MainLayout } from "./layouts";
import qs from 'qs';

import Home from "./pages/Home";
import { SeriesIndex, SeriesSingular } from "./pages/Series";
import SettingsLayout from "./pages/Settings";
import Video from "./pages/Video";
import Distribute from './pages/Distribute';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Distribution from './components/dialogs/Distribution';

const renderWithLayout = (Component, Layout) => <Layout>{Component}</Layout>;

const Routes = ({
    history
}) => {
    const popupId = qs.parse(window.location.search.substring(1)).popup

    function handleCloseDistributionPopup () {
        const search = qs.parse(window.location.search.substring(1))
        delete search.popup
        const stringifiedSearch = qs.stringify(search);
        const path = stringifiedSearch ? `${history.location.pathname}?${stringifiedSearch}` : history.location.pathname
        history.replace(path);
    }

    return (
        <>
            <Switch>
                <ProtectedRoute
                    path="/"
                    exact
                    render={() => renderWithLayout(<Home />, MainLayout)}
                />
                <ProtectedRoute
                    path="/series"
                    exact
                    render={() => renderWithLayout(<SeriesIndex />, MainLayout)}
                />
                <ProtectedRoute
                    path="/series/:id"
                    exact
                    render={routeProps =>
                    renderWithLayout(<SeriesSingular {...routeProps} />, MainLayout)
                    }
                />
                <ProtectedRoute
                    path="/settings"
                    render={() => renderWithLayout(<SettingsLayout />, MainLayout)}
                />
                <ProtectedRoute
                    path="/video/:id"
                    exact
                    render={routeProps =>
                    renderWithLayout(<Video {...routeProps} />, MainLayout)
                    }
                />
                <ProtectedRoute
                    path="/distribute"
                    exact
                    render={routeProps =>
                    renderWithLayout(<Distribute {...routeProps} />, MainLayout)
                    }
                />
                <PublicRoute
                    path="/signin"
                    exact
                    render={() => renderWithLayout(<SignIn />, AuthLayout)}
                />
                <PublicRoute
                    path="/signup"
                    render={() => renderWithLayout(<SignUp />, AuthLayout)}
                />
            </Switch>
            <Distribution open={popupId} onClose={handleCloseDistributionPopup} />
        </>
    );
};

export default withRouter(Routes);