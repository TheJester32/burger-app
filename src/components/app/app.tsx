import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useLocation, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../header/appHeader";
import { LoginPage } from "../../pages/login/login";
import { HomePage } from "../../pages/home/home";
import { Register } from "../../pages/register/register";
import { ForgotPassword } from "../../pages/forgotPassword/forgotPassword";
import { ResetPassword } from "../../pages/resetPassword/resetPassword";
import { Profile } from "../../pages/profile/profile";
import { ProfileOrders } from "../profileOrders/profileOrders";
import { FeedPage } from "../../pages/feed/feed";
import { IngredientPage } from "../../pages/ingredient/ingredient";
import { RouteGuard } from "../routes/protectedRouteElement";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store/store";

function App() {
  const location = useLocation();
  const background = location.state && location.state.modal;
  const { isAuthentficated } = useSelector((state: RootState) => state.user);

  return (
    <DndProvider backend={HTML5Backend}>
      <Header isAuthentficated={isAuthentficated} />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<RouteGuard element={<LoginPage />} isProtected={false} />} />
        <Route path="/register" element={<RouteGuard element={<Register />} isProtected={false} />} />
        <Route path="/forgot-password" element={<RouteGuard element={<ForgotPassword />} isProtected={false} />} />
        <Route path="/reset-password" element={
          sessionStorage.getItem("forgotPasswordInitiated") === "true" 
            ? <RouteGuard element={<ResetPassword />} isProtected={false} />
            : <Navigate to="/forgot-password" replace />
        } />
        <Route path="/profile" element={<RouteGuard element={<Profile />} isProtected={true} />}>
          <Route path="orders" element={<RouteGuard element={<ProfileOrders />} isProtected={true} />} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientPage />} />
        </Routes>
      )}
    </DndProvider>
  );
}

export default App;
