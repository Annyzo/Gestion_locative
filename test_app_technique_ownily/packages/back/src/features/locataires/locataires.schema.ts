import {
  Locataire,
  LocataireCreate,
  LocataireUpdate,
  LocataireCreateInternal,
  LocataireUpdateInternal,
} from "@edmp/api";
import { JSONSchemaType } from "ajv";
import { OpenAPIV3 } from "openapi-types";

export namespace LocatairesSchema {
  const locataireSchema: OpenAPIV3.SchemaObject & JSONSchemaType<Locataire> = {
    type: "object",
    required: ["id", "nom", "address", "coordinates", "email", "createdAt", "updatedAt"],
    additionalProperties: false,
    properties: {
      id: { type: "string" },
      nom: { type: "string" },
      address: { type: "string" },
      coordinates: { type: "string" },
      email: { type: "string" },
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
    },
  };

  export const locataireParam: JSONSchemaType<Locataire> = {
    type: "object",
    required: ["id", "nom", "address", "coordinates", "email", "createdAt", "updatedAt"],
    additionalProperties: false,
    properties: {
      id: { type: "string" },
      userId: { type: "string" },
      nom: { type: "string" },
      address: { type: "string" },
      coordinates: { type: "string" },
      email: { type: "string" },
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
    },
  };

  const locataireCreateSchema: OpenAPIV3.SchemaObject & JSONSchemaType<LocataireCreate> = {
    type: "object",
    required: ["nom", "email"],
    additionalProperties: false,
    properties: {
      nom: { type: "string" },
      address: { type: "string" },
      coordinates: { type: "string" },
      email: { type: "string" },
    },
  };

  export const locataireCreateParam: JSONSchemaType<LocataireCreate> = {
    type: "object",
    required: ["nom", "email"],
    additionalProperties: false,
    properties: {
      nom: { type: "string" },
      address: { type: "string" },
      coordinates: { type: "string" },
      email: { type: "string" },
    },
  };

  export const locataireCreateInternalParam: JSONSchemaType<LocataireCreateInternal> = {
    type: "object",
    required: ["userId", "nom", "email"],
    additionalProperties: false,
    properties: {
      userId: { type: "string" },
      nom: { type: "string" },
      address: { type: "string" },
      coordinates: { type: "string" },
      email: { type: "string" },
    },
  };

  const locataireUpdateSchema: OpenAPIV3.SchemaObject & JSONSchemaType<LocataireUpdate> = {
    type: "object",
    required: ["id"],
    additionalProperties: false,
    properties: {
      id: { type: "string" },
      nom: { type: "string", nullable: true },
      address: { type: "string", nullable: true },
      coordinates: { type: "string", nullable: true },
      email: { type: "string", nullable: true },
    },
  };

  export const locataireUpdateParam: JSONSchemaType<LocataireUpdate> = {
    type: "object",
    required: ["id"],
    additionalProperties: false,
    properties: {
      id: { type: "string" },
      nom: { type: "string", nullable: true },
      address: { type: "string", nullable: true },
      coordinates: { type: "string", nullable: true },
      email: { type: "string", nullable: true },
    },
  };
  export const locataireUpdateInternalParam: JSONSchemaType<LocataireUpdateInternal> = {
    type: "object",
    required: ["id"],
    additionalProperties: false,
    properties: {
      id: { type: "string" },
      userId: { type: "string", nullable: true },
      nom: { type: "string", nullable: true },
      address: { type: "string", nullable: true },
      coordinates: { type: "string", nullable: true },
      email: { type: "string", nullable: true },
    },
  };

  const parameters: {
    [key in "id"]: OpenAPIV3.ParameterObject;
  } = {
    id: {
      description: "Id of a locataire",
      required: true,
      name: "id",
      in: "path",
      schema: {
        type: "string",
      },
    },
  };

  const queries: {
    [key in "userId"]: OpenAPIV3.ParameterObject;
  } = {
    userId: {
      description: "Id of a user",
      required: true,
      name: "userId",
      in: "query",
      schema: {
        type: "string",
      },
    },
  };

  const responseSchemas: {
    [key in "create" | "list" | "get" | "update" | "delete"]: OpenAPIV3.SchemaObject;
  } = {
    create: locataireSchema,
    list: { type: "array", items: locataireSchema },
    get: locataireSchema,
    update: locataireSchema,
    delete: { type: "boolean" },
  };

  export const create: OpenAPIV3.OperationObject & { $path: string; role: string[] } = {
    summary: "Create a locataire",
    $path: "POST /api/v1/locataires",
    tags: ["Locataire"],
    role: ["member", "support", "admin"],
    security: [{ bearerAuth: [] }, { cookieAuth: [] }],
    operationId: "controller.locataires.create",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: locataireCreateSchema,
        },
      },
    },
    responses: {
      200: {
        description: "The created locataire",
        content: {
          "application/json": {
            schema: responseSchemas.create,
          },
        },
      },
    },
  };

  export const list: OpenAPIV3.OperationObject & { $path: string; role: string[] } = {
    summary: "List locataires",
    $path: "GET /api/v1/locataires",
    tags: ["Locataire"],
    role: ["member", "support", "admin"],
    security: [{ bearerAuth: [] }, { cookieAuth: [] }],
    operationId: "controller.locataires.list",
    parameters: [queries.userId],
    responses: {
      200: {
        description: "List of locataires",
        content: {
          "application/json": {
            schema: responseSchemas.list,
          },
        },
      },
    },
  };

  export const get: OpenAPIV3.OperationObject & { $path: string; role: string[] } = {
    summary: "Get a locataire",
    $path: "GET /api/v1/locataires/{id}",
    tags: ["Locataire"],
    role: ["member", "support", "admin"],
    security: [{ bearerAuth: [] }, { cookieAuth: [] }],
    operationId: "controller.locataires.get",
    parameters: [parameters.id],
    responses: {
      200: {
        description: "A locataire",
        content: {
          "application/json": {
            schema: responseSchemas.get,
          },
        },
      },
    },
  };

  export const update: OpenAPIV3.OperationObject & { $path: string; role: string[] } = {
    summary: "Update a locataire",
    $path: "PUT /api/v1/locataires/{id}",
    tags: ["Locataire"],
    role: ["member", "support", "admin"],
    security: [{ bearerAuth: [] }, { cookieAuth: [] }],
    operationId: "controller.locataires.update",
    parameters: [parameters.id],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: locataireUpdateSchema,
        },
      },
    },
    responses: {
      200: {
        description: "The updated locataire",
        content: {
          "application/json": {
            schema: responseSchemas.update,
          },
        },
      },
    },
  };

  export const remove: OpenAPIV3.OperationObject & { $path: string; role: string[] } = {
    summary: "Delete a locataire",
    $path: "DELETE /api/v1/locataires/{id}",
    tags: ["Locataire"],
    role: ["member", "support", "admin"],
    security: [{ bearerAuth: [] }, { cookieAuth: [] }],
    operationId: "controller.locataires.delete",
    parameters: [parameters.id],
    responses: {
      200: {
        description: "A boolean",
        content: {
          "application/json": {
            schema: responseSchemas.delete,
          },
        },
      },
    },
  };
}
