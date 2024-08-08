import { getSession } from "@auth0/nextjs-auth0"

const ProfileServer = async () => {
    const session = await getSession();
    const user = session?.user;

    if(!user){
        return null;
    }
    return user ? (
    <div className="text-white">
        
        <h2>{user.name}</h2>
        <p>{user.email}</p>
    </div>
    ) : (
        <div>No user is logged</div>
    );
};

export default ProfileServer;