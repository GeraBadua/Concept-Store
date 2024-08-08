'use client';

import { useUser } from "@auth0/nextjs-auth0/client"

const ProfileClient = () => {
    const { user, error, isLoading } = useUser;

    if (isLoading) return <div>Loading...</div>
    if (error) return (error.message);
    return user ? (
    <div>
        <img src={user.picture} alt={user.name}></img>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
    </div>
    ) : (
        <div>No user is logged</div>
    );
};

export default ProfileClient;