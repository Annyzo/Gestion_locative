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
import { MetaUser, LocatairesService, Locataire, LocataireCreateInternal, LocataireUpdateInternal } from "@edmp/api";
import { IMailerMixin } from "@/interfaces";

/**
 * * Permanent
 */
// Name
type ServiceName = "service.locataires";

// Actions
type ServiceActionsSchema = ServiceActionsSchemaCustom<
  ServiceSettingSchema,
  ServiceName,
  ILocatairesService.Service,
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
  ILocatairesService.Service,
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
type CallActionsNamesAvailable = ILocatairesService.CallActionsNames;
type CallActionsContextAvailable = ILocatairesService.CallActionsContext;

// Events
type ServiceEventsNames = never;
type EmitEventsNamesAvailable = `${ILocatairesService.EmitEventsNames}`;
type EmitEventsContextAvailable = ILocatairesService.EmitEventsContext;

// Methods
type ServiceMethodsAvailable = ILocatairesService.ServiceMethods &
  IMailerMixin.ServiceMethods<ILocatairesService.Service>;

/**
 * * Export
 */
export namespace ILocatairesService {
  export type ServiceSchema = ServiceSchemaCustom<ServiceSettingSchema> & {
    name: ServiceName;
    mixins: [IMailerMixin.ServiceSchema];
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
    "service.locataires.create": {
      params: LocataireCreateInternal;
      meta: { user: MetaUser };
      response: LocatairesService.CreateOut;
    };
    "service.locataires.list": {
      params: Partial<LocatairesService.ListIn>;
      meta: { user: MetaUser };
      response: LocatairesService.ListOut;
    };
    "service.locataires.get": {
      params: LocatairesService.GetIn;
      meta: { user: MetaUser };
      response: LocatairesService.GetOut | undefined;
    };
    "service.locataires.update": {
      params: LocataireUpdateInternal;
      meta: { user: MetaUser };
      response: LocatairesService.UpdateOut;
    };
    "service.locataires.delete": {
      params: LocatairesService.DeleteIn;
      meta: { user: MetaUser };
      response: LocatairesService.DeleteOut;
    };
  }

  // Events
  export enum EmitEventsNames {
    CREATED = "locataire.created",
    UPDATED = "locataire.updated",
    DELETED = "locataire.deleted",
  }
  export interface EmitEventsContext extends EmitEventsContextCustom {
    [EmitEventsNames.CREATED]: {
      params: {
        params: CallActionsContext["service.locataires.create"]["params"];
        locataire: Locataire;
      };
      meta: { user: MetaUser };
    };
    [EmitEventsNames.UPDATED]: {
      params: {
        params: CallActionsContext["service.locataires.update"]["params"];
        locataire: Locataire;
      };
      meta: { user: MetaUser };
    };
    [EmitEventsNames.DELETED]: {
      params: {
        params: CallActionsContext["service.locataires.delete"]["params"];
        locataire: Locataire;
      };
      meta: { user: MetaUser };
    };
  }

  // Methods
  export interface ServiceMethods extends ServiceMethodsCustom {}
}
