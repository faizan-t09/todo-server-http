import formidable from "formidable";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as nodemailer from "nodemailer";

let mailTransporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "jaketodo2023@outlook.com",
    pass: "todomailtester23",
  },
});

let mailDetails = {
  from: "jaketodo2023@outlook.com",
  to: "rohan.magar@torinit.ca",
  subject: "Todo Created",
  text: "Message from the server",
};

const form = formidable({
  multiples: true,
  uploadDir: "./todoAttachments",
});

const idGenerator = (() => {
  let id = Number(fs.readFileSync(`id.txt`).toString());
  return {
    getId: () => {
      let newId = id;
      fs.writeFile('id.txt',(++id).toString(),()=>{})
      return newId;
    },
  };
})();

function createTodoHandler(req: IncomingMessage, res: ServerResponse) {
  try {
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw err;
      }
      const newTodoId = idGenerator.getId();

      fs.rename(`./todoAttachments/${JSON.parse(JSON.stringify(files.attachment)).newFilename}`, `./todoAttachments/${newTodoId}`, () => {})

      fs.writeFile(
        `./todos/${
          newTodoId
        }.txt`,
        JSON.stringify({
          id: newTodoId,
          title: fields.title,
          description: fields.description,
        }),
        function (err) {
          if (err) throw err;
        }
      );

      res.writeHead(200);
      res.write(
        JSON.stringify(
          {
            id: newTodoId,
            title: fields.title,
            description: fields.description,
          },
          null,
          2
        )
      );
      // mailTransporter.sendMail(mailDetails, function(err, data) {
      //   if(err) {
      //     throw err;
      //   }
      // });
      res.end();
    });
  } catch (err) {
    res.write("Error in creating todo");
    res.end();
  }
}

export default createTodoHandler;
