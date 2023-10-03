import { ILocatairesController } from "@/interfaces";
import { NotFoundError } from "@/lib/error/NotFoundError";
import { LocatairesSchema } from "./locataires.schema";
import { LocataireCreateInternal, LocataireUpdateInternal } from "@edmp/api";
import { PermissionsLib } from "@/lib";

const LocatairesController: ILocatairesController.ServiceSchema = {
  name: "controller.locataires",

  actions: {
    create: {
      summary: "Create a locataire",
      openapi: LocatairesSchema.create,
      params: LocatairesSchema.locataireCreateParam,
      async handler(ctx) {
        const { user } = ctx.meta;
        if (!user.extended) {
          throw new NotFoundError("Cannot find user");
        }
        const locataireCreate = ctx.params;
        const locataireCreateInternal: LocataireCreateInternal = { ...locataireCreate, userId: user.extended.id };
        PermissionsLib.validateAction("controller.locataires.create", user, "User", {
          id: locataireCreateInternal.userId,
        });
        const locataireCreated = await ctx.call("service.locataires.create", locataireCreateInternal);
        return locataireCreated;
      },
    },

    list: {
      summary: "List locataires",
      openapi: LocatairesSchema.list,
      params: {
        type: "object",
        required: ["userId"],
        additionalProperties: false,
        properties: {
          userId: { type: "string" },
        },
      },
      async handler(ctx) {
        const { user } = ctx.meta;
        const locataires = await ctx.call("service.locataires.list", ctx.params);
        for (const locataire of locataires) {
          PermissionsLib.validateAction("controller.locataires.list", user, "User", { id: locataire.userId });
        }
        return locataires;
      },
    },

    get: {
      summary: "Retrieve a locataire",
      openapi: LocatairesSchema.get,
      params: {
        type: "object",
        required: ["id"],
        additionalProperties: false,
        properties: {
          id: { type: "string" },
        },
      },
      async handler(ctx) {
        const { user } = ctx.meta;
        const { id } = ctx.params;
        const locataire = await ctx.call("service.locataires.get", { id });
        if (!locataire) {
          throw new NotFoundError("Cannot find locataire", { locataireId: id });
        }
        PermissionsLib.validateAction("controller.locataires.get", user, "User", { id: locataire.userId });
        return locataire;
      },
    },

    update: {
      summary: "Update a locataire",
      openapi: LocatairesSchema.update,
      params: LocatairesSchema.locataireUpdateParam,
      async handler(ctx) {
        const { user } = ctx.meta;
        if (!user.extended) {
          throw new NotFoundError("Cannot find user");
        }
        const locataireUpdate = ctx.params;
        const locataireUpdateInternal: LocataireUpdateInternal = { ...locataireUpdate, userId: user.extended.id };
        PermissionsLib.validateAction("controller.locataires.update", user, "User", {
          id: locataireUpdateInternal.userId
        });
        const locataireUpdated = ctx.call("service.locataires.update", locataireUpdateInternal);
        return locataireUpdated;
      },
    },

    delete: {
      summary: "Delete a locataire",
      openapi: LocatairesSchema.remove,
      params: {
        type: "object",
        required: ["id"],
        additionalProperties: false,
        properties: {
          id: { type: "string" },
        },
      },
      async handler(ctx) {
        const { user } = ctx.meta;
        const { id } = ctx.params;
        const locataire = await ctx.call("service.locataires.get", { id });
        if (!locataire) {
          throw new NotFoundError("Cannot find locataire", { locataireId: id });
        }
        PermissionsLib.validateAction("controller.locataires.delete", user, "User", { id: locataire.userId });
        const locataireDeleted = ctx.call("service.locataires.delete", ctx.params);
        return locataireDeleted;
      },
    },
  },
};

export default LocatairesController;
export { LocatairesController };
