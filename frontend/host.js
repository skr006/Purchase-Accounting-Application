
const appMode = import.meta.env.VITE_APP_MODE || "local";
const localHost = import.meta.env.VITE_LOCAL_BACKEND_URL || "http://localhost:5001";
const deployedHost = import.meta.env.VITE_DEPLOYED_BACKEND_URL || import.meta.env.VITE_BACKEND_IP || localHost;

const host = appMode === "deployed" ? deployedHost : localHost;

export default host;
