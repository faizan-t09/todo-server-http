import formidable from "formidable";
import {IncomingMessage,ServerResponse} from "http";
import * as fs from "fs";

function deleteTodoHandler(req:IncomingMessage,res:ServerResponse,todoId:string){try {
  fs.unlink(`./todos/${todoId}.txt`, (err) => {
    if (err) {
      throw err;
    }
  });
  fs.unlink(`./todoAttachments/${todoId}`, (err) => {
    if (err) {
      throw err;
    }
  });

  res.write("Deleted todo sucessfully");
  res.end();
} catch (err) {
  res.write("Error while deleting todo");
  res.end();
}}

export default deleteTodoHandler