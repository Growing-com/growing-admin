import localStorage from "store/localStore";

const useAuth = () => {
  const getAuth = () => {
    const profile = localStorage.getLocalStorage();
    return profile;
  };
  return { getAuth };
};

export default useAuth;
