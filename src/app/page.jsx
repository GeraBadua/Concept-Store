import LandingPage from "@/components/LandingPage";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';

const Home = () => {
  return (
    <UserProvider>
    <LandingPage />
    </UserProvider>
  );
};

export default Home;
