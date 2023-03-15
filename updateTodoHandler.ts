import formidable from "formidable";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";

const form = formidable({
  multiples: true,
  uploadDir: "./todoAttachments",
});

function updateTodoHandler(
  req: IncomingMessage,
  res: ServerResponse,
  todoId: string
) {
  try {
    form.parse(req, (err, fields, files) => {
      let todo = JSON.parse(
        fs.readFileSync(`./todos/${todoId}.txt`).toString()
      );

      if (typeof fields.title != "undefined") {
        todo.title = fields.title;
      }

      if (typeof fields.description != "undefined") {
        todo.description = fields.description;
      }

      fs.writeFile(
        `./todos/${todoId}.txt`,
        JSON.stringify(todo),
        function (err) {
          if (err) throw err;
        }
      );
      res.write("Todo updated sucessfully");
      res.end();
    });
  } catch (err) {
    res.write("Error in updating todo");
    res.end();
  }
}

export default updateTodoHandler