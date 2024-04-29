const api_local_url = "http://localhost:5000";
const api_production_url = "https://backend.qr-menu.xyz";

const mode = "dev";

let base_url = "";

if (mode === "dev") {
  base_url = api_local_url;
} else {
  base_url = api_production_url;
}

const overrideStyle = {
  display: "flex",
  margin: "0 auto",
  height: "24px",
  justifyContent: "center",
  alignItems: "center",
};

export { base_url, overrideStyle };
