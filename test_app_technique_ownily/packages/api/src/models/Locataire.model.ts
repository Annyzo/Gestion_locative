import { Document, model, Schema, ToObjectOptions } from "mongoose";
import { ulid } from "ulid";
import { RequireField } from "./Common.model";

/**
 * Types
 */
export type Locataire = {
  id: string;
  userId: string;
  nom: string;
  address: string;
  coordinates: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type LocataireCreate = Omit<Locataire, "id" | "userId" | "createdAt" | "updatedAt">;
export type LocataireCreateInternal = Omit<Locataire, "id" | "createdAt" | "updatedAt">;
export type LocataireUpdate = RequireField<Partial<Omit<Locataire, "createdAt" | "updatedAt">>, "id">;
export type LocataireUpdateInternal = RequireField<Partial<Omit<Locataire, "createdAt" | "updatedAt">>, "id">;

/**
 * Model
 */
export type LocataireDocument = Locataire & Document<string>;
const locataireSchema = new Schema<LocataireDocument>(
  {
    _id: { type: String, default: () => ulid() },
    userId: { type: String, index: true, required: true },
    nom: { type: String, required: true },
    address: { type: String, required: false },
    coordinates:  { type: String, required: false },
    email: { type: String, required: true, unique: true }
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform(
        doc: Omit<LocataireDocument, "createdAt" | "updatedAt"> & { _id: string; createdAt: Date; updatedAt: Date },
        ret: Locataire & { _id?: string },
        options: ToObjectOptions
      ): Omit<Locataire, "_id"> {
        ret.id = doc._id;
        delete ret._id;
        return ret;
      }
    }
  }
);
export const LocataireModel = model<LocataireDocument>("Locataire", locataireSchema, "Locataires");

/**
 * API
 */
export namespace LocatairesService {
  export type CreateIn = LocataireCreate;
  export type CreateOut = Locataire;

  export type ListIn = Pick<Locataire, "userId">;
  export type ListOut = Locataire[];

  export type GetIn = Pick<Locataire, "id">;
  export type GetOut = Locataire;

  export type UpdateIn = LocataireUpdate;
  export type UpdateOut = Locataire;

  export type DeleteIn = Pick<Locataire, "id">;
  export type DeleteOut = boolean;
}
