import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Nabvar"
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
