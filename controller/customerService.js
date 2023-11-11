const axios = require("axios");

const tidioCs = async (req, res) => {
  try {
    const response = await axios.get(
      "https://widget-v4.tidiochat.com/1_199_0/static/js/render.2d14872ff6b53ecaadcb.js"
    );
    // console.log(response.data);
    res.send(response.data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  tidioCs,
};
