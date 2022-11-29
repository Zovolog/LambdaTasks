const inquirer = require("inquirer");
const tinyurl = require("tinyurl-api");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const { google } = require("googleapis");

let api = `2SBVdLndvGPT4RXVfVuHIBF0OE7us9F2jUUIdWHK2ALS1urTyzYG770Ha9Eq`;

const google_api_folder_id = "14sMtAOBT3EPWIE5FHBCSC84oCWrpjDEb";

async function uploadFile(url, ext, name) {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "./googlekey.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const driveService = google.drive({
      version: "v3",
      auth,
    });

    const fileMetaData = {
      name: `${name}${ext}`,
      parents: [google_api_folder_id],
    };

    const media = {
      mimeType: `image/${ext}`,
      body: fs.createReadStream(url),
    };

    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      field: "id",
    });
    return response.data.id;
  } catch (err) {
    console.log("Upload file error", err);
  }
}

function shortLink(data, agreement) {
  if (agreement) {
    axios({
      url: "https://api.tinyurl.com/create",
      method: "post",
      headers: {
        Authorization: `Bearer ${api}`,
      },
      data: {
        url: `https://drive.google.com/uc?export=view&id=${data}`,
        domain: "tiny.one",
      },
    }).then(function (response) {
      console.log(response.data.data.tiny_url);
    });
  } else {
    console.log(`https://drive.google.com/uc?export=view&id=${data}`);
  }
}

function askForINfo() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Drag and drop image here and press ENTER: ",
        name: "url",
      },
      {
        type: "confirm",
        message: "Would you like to changa name of the file?: ",
        name: "changeName",
        when(answers) {
          let details = path.parse(answers.url);
          console.log(
            `Name of file: ${details.name}`,
            `Extension of file: ${details.ext}`
          );
          return answers.url;
        },
      },
      {
        type: "input",
        message: "Type name of image (without extension aka .jpg, .png): ",
        name: "nameOfFile",
        when(answers) {
          if (answers.changeName) {
            return answers.changeName;
          }
          return answers.changeName;
        },
      },
      {
        type: "confirm",
        message: "Would you like to short your link?: ",
        name: "shortLink",
        when(answers) {
          console.log({ name: answers.nameOfFile });
          return answers.changeName;
        },
      },
    ])
    .then((answers) => {
      let details = path.parse(answers.url);
      if (answers.changeName) {
        uploadFile(answers.url, details.ext, answers.nameOfFile).then(
          (data) => {
            shortLink(data, answers.shortLink);
          }
        );
      } else {
        uploadFile(answers.url, details.ext, details.name).then((data) => {
          shortLink(data, answers.shortLink);
        });
      }
    });
}
askForINfo();
