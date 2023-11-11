const axios = require("axios");

const tidioCs = async (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://widget-v4.tidiochat.com/1_199_0/static/js/render.2d14872ff6b53ecaadcb.js",
    headers: {},
  };

  axios
    .request(config)
    .then((response) => {
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};






module.exports = {
  tidioCs,
};
