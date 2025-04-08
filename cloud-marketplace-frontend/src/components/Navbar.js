import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogoClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/role-selection");
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          className="text-white text-xl font-bold cursor-pointer"
          onClick={handleLogoClick}
        >
          Cloud Marketplace
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
