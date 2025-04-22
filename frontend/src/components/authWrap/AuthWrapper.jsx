import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "../../store/userSlice";
import config from "../../config/config";

const AuthWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {user} = useSelector(state => state.user);
  
  // Define path access permissions
  const pathPermissions = {
    '/': ['admin', 'user', 'guest'], // Home page accessible to all
    '/login': ['guest'], // Login page only for logged out users
    '/user': ['user'], // User dashboard only for regular users
    '/admin': ['admin'] // Admin panel only for admins
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const session = localStorage.getItem('session');
      try {
        const { data } = await axios.get(`${config.API_URL}/api/auth/${session}`, { withCredentials: true });
        dispatch(login(data.data));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  useEffect(() => {
    // Only check access permissions after loading is complete
    if (!loading) {
      const currentPath = location.pathname;
      const userRole = user?.role || 'guest';
      
      // Find the path that matches the current URL
      // First check exact matches
      let matchedPath = pathPermissions[currentPath];
      
      // If no exact match, check for parent paths (e.g. /admin/users would fall under /admin)
      if (!matchedPath) {
        for (const path in pathPermissions) {
          if (currentPath.startsWith(path) && path !== '/') {
            matchedPath = pathPermissions[path];
            break;
          }
        }
      }
      
      // Default to home page permissions if no path match
      const allowedRoles = matchedPath || pathPermissions['/'];
      
      // Redirect if user doesn't have permission
      if (!allowedRoles.includes(userRole)) {
        if (userRole === 'admin') {
          navigate('/admin');
        } else if (userRole === 'user') {
          navigate('/user');
        } else {
          navigate('/login');
        }
      }
    }
  }, [loading, location.pathname, user, navigate]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthWrapper;