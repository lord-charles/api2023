const axios = require("axios");
const vouchers = require("../models/vouchers");

// Function to generate a unique code
const generateUniqueCode = () => {
  // Generate a random number between 1000000000 and 9999999999
  const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

  return randomNumber.toString();
};

// Function to add user to Mikrotik
const addUserToMikrotik = async ({ name, profile, uptime, bytes, period }) => {
  // Function to calculate future date
  function calculateFutureDate(uptime) {
    const currentTimestamp = Date.now();
    const hours = parseInt(uptime, 10);

    if (!isNaN(hours)) {
      const futureTimestamp = currentTimestamp + hours * 60 * 60 * 1000;
      const futureTimestampWith3Hours = futureTimestamp + 3 * 60 * 60 * 1000;
      const futureDate = new Date(futureTimestampWith3Hours);
      return futureDate.toLocaleString();
    } else {
      return "Invalid input. Please provide a valid 'uptime' value in hours.";
    }
  }

  const future = calculateFutureDate(period);

  const data = {
    "limit-bytes-total": bytes,
    "limit-uptime": uptime,
    name,
    password: name,
    profile,
    server: "hotspot1",
    comment: future,
  };

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://sg-9.hostddns.us:4341/rest/ip/hotspot/user/add",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic YWRtaW46MDI2MTQ=",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);
    console.log(response.data);
  } catch (error) {
    console.log("Error adding user to Mikrotik:", error);
  }
};

// Controller function to create vouchers
const createVouchers = async (req, res) => {
  const { uptime, bytes, period, profile, timesToIterate, Amount } = req.body;

  try {
    for (let i = 0; i < timesToIterate; i++) {
      const name = generateUniqueCode();
      // Add user to Mikrotik
      await addUserToMikrotik({
        name,
        profile,
        uptime,
        bytes,
        period,
      });

      // Create voucher object
      const voucher = new vouchers({
        Voucher: name,
        Amount,
        bandwidth: bytes,
        devices: "2",
      });

      // Save voucher to the database
      await voucher.save();

      // Log the voucher before creation
      console.log(`Creating voucher ${i + 1}: ${name}`);

      // Wait for 2 seconds before creating another voucher
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    res
      .status(200)
      .json({ message: `${timesToIterate} vouchers created successfully` });
  } catch (error) {
    console.error("Error creating vouchers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createVouchers,
};
