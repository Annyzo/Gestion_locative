/* eslint-disable @typescript-eslint/no-empty-interface */
import {
  CallActionsContextCustom,
  ContextCustom,
  EmitEventsContextCustom,
  ServiceActionsSchemaCustom,
  ServiceCustom,
  ServiceEventsSchemaCustom,
  ServiceMethodsCustom,
  ServiceSchemaCustom,
  ServiceSettingSchemaCustom,
} from "moleculer";
import { MetaUser, LocatairesService } from "@edmp/api";
import { ILocatairesService } from "@/interfaces";

/**
 * * Permanent
 */
// Name
type ServiceName = "controller.locataires";

// Actions
type ServiceActionsSchema = ServiceActionsSchemaCustom<
  ServiceSettingSchema,
  ServiceName,
  ILocatairesController.Service,
  ServiceActionsNames,
  CallActionsNamesAvailable,
  CallActionsContextAvailable,
  ServiceEventsNames,
  EmitEventsNamesAvailable,
  EmitEventsContextAvailable
>;

// Events
type ServiceEventsSchema = ServiceEventsSchemaCustom<
  ServiceSettingSchema,
  ILocatairesController.Service,
  CallActionsNamesAvailable,
  CallActionsContextAvailable,
  ServiceEventsNames,
  EmitEventsNamesAvailable,
  EmitEventsContextAvailable
>;

/**
 * * Config
 */
// Settings
interface ServiceSettingSchema extends ServiceSettingSchemaCustom {}

// Actions
type ServiceActionsNames = "create" | "list" | "get" | "update" | "delete";
type CallActionsNamesAvailable = ILocatairesController.CallActionsNames | ILocatairesService.CallActionsNames;
type CallActionsContextAvailable = ILocatairesController.CallActionsContext & ILocatairesService.CallActionsContext;

// Events
type ServiceEventsNames = never;
type EmitEventsNamesAvailable = `${ILocatairesController.EmitEventsNames}`;
type EmitEventsContextAvailable = ILocatairesController.EmitEventsContext;

// Methods
type ServiceMethodsAvailable = ILocatairesController.ServiceMethods;

/**
 * * Export
 */
export namespace ILocatairesController {
  export type ServiceSchema = ServiceSchemaCustom<ServiceSettingSchema> & {
    name: ServiceName;
    // mixins: [];
    // settings: ServiceSettingSchema;
    // created: (this: Service) => void;
    // started: (this: Service) => Promise<void>;
    actions: ServiceActionsSchema;
    // events: ServiceEventsSchema;
    // methods: ServiceMethods;
  };

  // Service (this)
  export type Service = ServiceCustom<ServiceSettingSchema, ServiceMethodsAvailable>;

  // Context
  export type Context<ThisName extends CallActionsNames | ServiceEventsNames> = ContextCustom<
    ThisName,
    CallActionsNamesAvailable,
    CallActionsContextAvailable,
    ServiceEventsNames,
    EmitEventsNamesAvailable,
    EmitEventsContextAvailable
  >;

  // Actions
  export type CallActionsNames = `${ServiceName}.${ServiceActionsNames}`;
  export interface CallActionsContext extends CallActionsContextCustom {
    "controller.locataires.create": {
      params: LocatairesService.CreateIn;
      meta: { user: MetaUser };
      response: LocatairesService.CreateOut;
    };
    "controller.locataires.list": {
      params: LocatairesService.ListOut;
      meta: { user: MetaUser };
      response: LocatairesService.ListOut;
    };
    "controller.locataires.get": {
      params: LocatairesService.GetIn;
      meta: { user: MetaUser };
      response: LocatairesService.GetOut;
    };
    "controller.locataires.update": {
      params: LocatairesService.UpdateIn;
      meta: { user: MetaUser };
      response: LocatairesService.UpdateOut;
    };
    "controller.locataires.delete": {
      params: LocatairesService.DeleteIn;
      meta: { user: MetaUser };
      response: LocatairesService.DeleteOut;
    };
  }

  // Events
  export enum EmitEventsNames {}
  export interface EmitEventsContext extends EmitEventsContextCustom {}

  // Methods
  export interface ServiceMethods extends ServiceMethodsCustom {}
}
