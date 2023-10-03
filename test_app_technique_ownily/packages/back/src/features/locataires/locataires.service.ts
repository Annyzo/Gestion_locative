import { ILocatairesService } from "@/interfaces";
import { LocatairesSchema } from "./locataires.schema";
import { LocatairesRepository } from "./locataires.repository";

const LocatairesService: ILocatairesService.ServiceSchema = {
  name: "service.locataires",

  actions: {
    create: {
      summary: "Create a locataire",
      params: LocatairesSchema.locataireCreateParam,
      async handler(ctx) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const locataireCreated = await LocatairesRepository.create(this, ctx, ctx.params);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return locataireCreated;
      },
    },

    list: {
      summary: "List locataires",
      params: {
        type: "object",
        additionalProperties: false,
        properties: {
          userId: { type: "string", nullable: true },
        },
      },
      async handler(ctx) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await LocatairesRepository.list(this, ctx, ctx.params);
      },
    },

    get: {
      summary: "Get a locataire by id",
      params: {
        type: "object",
        required: ["id"],
        additionalProperties: false,
        properties: {
          id: { type: "string" },
        },
      },
      async handler(ctx) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await LocatairesRepository.get(this, ctx, ctx.params);
      },
    },

    update: {
      summary: "Update a locataire",
      params: LocatairesSchema.locataireUpdateParam,
      async handler(ctx) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const locataireUpdated = await LocatairesRepository.update(this, ctx, ctx.params);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return locataireUpdated;
      },
    },

    delete: {
      summary: "Delete a locataire",
      params: {
        type: "object",
        required: ["id"],
        additionalProperties: false,
        properties: {
          id: { type: "string" },
        },
      },
      async handler(ctx) {
        return await LocatairesRepository.remove(this, ctx, ctx.params);
      },
    },
  },
};

export default LocatairesService;
export { LocatairesService };
