import { ICollection, NishanArg, TSchemaUnit } from "../types";
import { shortid } from "../utils";
import Data from "./Data";

/**
 * A class to represent a column schema of a collection
 * @noInheritDoc
 */

export default class SchemaUnit<T extends TSchemaUnit> extends Data<ICollection> {
  schema_id: string;

  constructor(arg: NishanArg & { schema_id: string }) {
    super({ ...arg, type: "collection" });
    this.schema_id = arg.schema_id
  }

  // ? FEAT:1:M Change schema_id method
  // ? FEAT:1:H Change column datatype

  async update(arg: T) {
    const data = this.getCachedData();
    data.schema[this.schema_id] = { ...data.schema[this.schema_id], ...arg }
    this.saveTransactions([this.updateOp([], { schema: data.schema })])
    this.updateCacheManually([this.id]);
  }

  async delete() {
    const data = this.getCachedData();
    delete data.schema[this.schema_id];
    this.saveTransactions([this.updateOp([], { schema: data.schema })])
    this.updateCacheManually([this.id]);
  }

  async duplicate() {
    const data = this.getCachedData(),
      id = shortid();
    data.schema[id] = data.schema[this.schema_id];
    this.saveTransactions([this.updateOp([], { schema: data.schema })])
    this.updateCacheManually([this.id]);
  }
}