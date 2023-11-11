const axios = require("axios");

const tidioCs = async (req, res) => {
  try {
    const response = await axios.get(
      "https://code.tidio.co/txkewoad3m6ljztgupk3qynve1zmunpr.js"
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
