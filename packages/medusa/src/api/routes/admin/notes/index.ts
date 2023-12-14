import { Router } from "express"
import { Note } from "../../../.."
import { DeleteResponse, PaginatedResponse } from "../../../../types/common"
import middlewares from "../../../middlewares"
import "reflect-metadata"
import {processIdentifierMiddleware} from "../../../middlewares/validators/identifier-existence";

const route = Router()

export default (app) => {
  app.use("/notes", processIdentifierMiddleware, route)

  route.get("/:id", middlewares.wrap(require("./get-note").default))

  route.get("/", middlewares.wrap(require("./list-notes").default))

  route.post("/", middlewares.wrap(require("./create-note").default))

  route.post("/:id", middlewares.wrap(require("./update-note").default))

  route.delete("/:id", middlewares.wrap(require("./delete-note").default))

  return app
}

/**
 * @schema AdminNotesRes
 * type: object
 * description: "The note's details."
 * required:
 *   - note
 * properties:
 *   note:
 *     description: Note details.
 *     $ref: "#/components/schemas/Note"
 */
export type AdminNotesRes = {
  note: Note
}

/**
 * @schema AdminNotesDeleteRes
 * type: object
 * required:
 *   - id
 *   - object
 *   - deleted
 * properties:
 *   id:
 *     type: string
 *     description: The ID of the deleted Note.
 *   object:
 *     type: string
 *     description: The type of the object that was deleted.
 *     default: note
 *   deleted:
 *     type: boolean
 *     description: Whether or not the Note was deleted.
 *     default: true
 */
export type AdminNotesDeleteRes = DeleteResponse

/**
 * @schema AdminNotesListRes
 * type: object
 * description: "The list of notes with pagination fields."
 * required:
 *   - notes
 *   - count
 *   - offset
 *   - limit
 * properties:
 *   notes:
 *     type: array
 *     description: An array of notes
 *     items:
 *       $ref: "#/components/schemas/Note"
 *   count:
 *     type: integer
 *     description: The total number of items available
 *   offset:
 *     type: integer
 *     description: The number of notes skipped when retrieving the notes.
 *   limit:
 *     type: integer
 *     description: The number of items per page
 */
export type AdminNotesListRes = PaginatedResponse & {
  notes: Note[]
}
export * from "./create-note"
export * from "./delete-note"
export * from "./get-note"
export * from "./list-notes"
export * from "./update-note"
