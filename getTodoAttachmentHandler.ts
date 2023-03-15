import {IncomingMessage,ServerResponse} from "http";
import * as fs from "fs";

function getTodoAttachmentHandler(req:IncomingMessage,res:ServerResponse,todoId:string){
  try {
    fs.readFile(`./todoAttachments/${todoId}`, function (err, data) {
      if (err) {
        return console.error(err);
      }
      res.write(data.toString());
      res.end();
    });
  } catch (err) {
    res.write("Error in reading attachment");
    res.end();
  }
}

export default getTodoAttachmentHandler