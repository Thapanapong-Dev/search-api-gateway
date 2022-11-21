const express = require("express");
const app = express();
const request = require("request");
const baseURL = "http://localhost:9000/trips";
const cors = require("cors");

app.use(cors());

// Get Search
app.get("/api/trips", function (req, res, next) {
  request(baseURL, async function (error, response, body) {
    if (error) throw error;
    let message = "";

    if (!error && response.statusCode == 200) {
      const data = await JSON.parse(body);
      const searches = req.query;
      const filteredTrips = data.filter((trip) => {
        let isValid = false;
        for (key in searches) {
          let contents = trip[key];
          let search = searches[key].replace(/\s+/g, "").trim();
          if (key === "tags") {
            for (content_item of contents) {
              if (
                content_item.search(search) !== -1 ||
                search.search(content_item) !== -1
              )
                isValid = true;
            }
          } else if (key === "title" || key === "description") {
            if (contents.search(search) !== -1) isValid = true;
          } else if (key === "eid") {
            if (contents === search) isValid = true;
          }
        }
        return isValid;
      });

      if (filteredTrips.length > 0) {
        message = "Results found";
      } else {
        message = "No results found";
      }

      return res.send({ error: false, data: filteredTrips, message: message });
    } else {
      return res.send({ error: true, message: "Error 404 (No results found)" });
    }
  });
});

// Get All Trips
app.get("/api/all-trips", function (req, res, next) {
  request(baseURL, async function (error, response, body) {
    if (error) throw error;
    let message = "";
    const searches = req.query;

    if (!error && response.statusCode == 200) {
      const data = await JSON.parse(body);
      const keys = Object.keys(searches);
      if (data.length > 0) {
        message = "Results found";
      } else {
        message = "No results found";
      }

      if (keys.length > 0) {
        return res.send({
          error: true,
          message: "Error 404 (No results found)",
        });
      } else {
        return res.send({ error: false, data: data, message: message });
      }
    } else {
      return res.send({ error: true, message: "Error 404 (No results found)" });
    }
  });
});

app.listen(5000, () => {
  console.log("Search API-Gateway is running on port 5000");
  console.log("All trips API Ex: http://localhost:5000/api/all-trips");
  console.log(
    "Search API Ex: http://localhost:5000/api/trips?title=คู่มือเที่ยว"
  );
});
