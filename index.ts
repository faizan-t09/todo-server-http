import * as http from "http";
import { ServerResponse } from "http";
import * as url from "url";
import createTodoHandler from "./createTodoHandler";
import getTodoAttachmentHandler from "./getTodoAttachmentHandler";
import deleteTodoHandler from "./deleteTodoHandler";
import updateTodoHandler from "./updateTodoHandler";

let server = http.createServer(async function (req: any, res: ServerResponse) {
  const { pathname, query } = url.parse(req.url, true);

  if (req.method === "POST" && pathname === "/createTodo") {
    createTodoHandler(req, res);
  }

  if (req.method === "GET" && pathname === "/readAttachment") {
    getTodoAttachmentHandler(req, res, query.id as string);
  }

  if (req.method === "DELETE" && pathname === "/deleteTodo") {
    deleteTodoHandler(req, res, query.id as string);
  }

  if (req.method === "PUT" && pathname === "/updateTodo") {
    updateTodoHandler(req, res, query.id as string);
  }
});

server.listen(8080, () => {
  console.log("Listening on port 8080");
});
