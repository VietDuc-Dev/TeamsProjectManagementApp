import mongoose, { Document, Schema } from "mongoose";
import {
  Permissions,
  PermissionsType,
  Roles,
  RoleType,
} from "../enums/role.enum";
import { RolePermissions } from "../utils/role-permission";

export interface RoleDocumnet extends Document {
  name: RoleType;
  permissions: Array<PermissionsType>;
}

const roleSchema = new Schema<RoleDocumnet>(
  {
    name: {
      type: String,
      enum: Object.values(Roles),
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
      enum: Object.values(Permissions),
      required: true,
      default: function (this: RoleDocumnet) {
        return RolePermissions[this.name];
      },
    },
  },
  {
    timestamps: true,
  }
);

const RoleModel = mongoose.model<RoleDocumnet>("Role", roleSchema);
export default RoleModel;
