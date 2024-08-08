const ProfileClient = ({ user }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <p><strong>Email:</strong> {user.email}</p>
        {/* Puedes agregar más información del usuario aquí si está disponible */}
      </div>
    );
  };
  
  export default ProfileClient;
  