import { BrowserRouter, Routes, Route } from "react-router-dom";

//views imports
import Signin from "../../views/signin";
import Profile from "../../views/profile";
import Campaign from "../../views/campaign";
import Creators from "../../views/creators";
import Dashboard from "../../views/dashboard";
import PaymentLogs from "../../views/payment-logs";
import Notifications from "../../views/notifications";
import ChangePass from "../../views/profile/changePass";
import EditProfile from "../../views/profile/editProfile";
import ForgotPassword from "../../views/forget-password-1";
import ForgotPassword2 from "../../views/forget-password-2";
import ForgotPassword3 from "../../views/forget-password-3";
import CampaignView from "../../views/campaign/campaignView";
import CreatorRequest from "../../views/creators/creatorRequest";
import CreatorsProfile from "../../views/creators/creatorsProfile";
import InitiateCampaign from "../../views/campaign/initiateCampaign";

//components imports
import ClientLayout from "../../components/ClientLayout";
import UserAuthCheck from "../../components/AuthCheck/UserAuthCheck";

const MyRouter = () => {
  return (
    <BrowserRouter basename="/click-coin-admin">
      <Routes>
        <Route path="/signin" index element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-2" element={<ForgotPassword2 />} />
        <Route path="/forgot-password-3" element={<ForgotPassword3 />} />
        <Route
          path="/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
                activeTab="dashboard"
              >
                <Dashboard />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/payment-logs"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Payment Logs",
                  description: "Some Description.",
                }}
              >
                <PaymentLogs />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/profile"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "profile",
                  description: "Some Description.",
                }}
              >
                <Profile />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/profile/editProfile"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "EditProfile",
                  description: "Some Description.",
                }}
              >
                <EditProfile />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/profile/changePass"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "ChangePass",
                  description: "Some Description.",
                }}
              >
                <ChangePass />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/notifications"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notifications",
                  description: "Some Description.",
                }}
              >
                <Notifications />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/creators"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Creators",
                  description: "Some Description.",
                }}
              >
                <Creators />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/creators/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Creators Details",
                  description: "Some Description.",
                }}
              >
                <CreatorsProfile />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/creators/creatorRequest"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "CreatorRequest",
                  description: "Some Description.",
                }}
              >
                <CreatorRequest />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/campaign"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "campaign",
                  description: "Some Description.",
                }}
              >
                <Campaign />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/campaign/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "campaign Details",
                  description: "Some Description.",
                }}
              >
                <CampaignView />
              </ClientLayout>
            </UserAuthCheck>
          }
        />       
        <Route
          path="/campaign/initiateCampaign"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "initiate Campaign",
                  description: "Some Description.",
                }}
              >
                <InitiateCampaign />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
