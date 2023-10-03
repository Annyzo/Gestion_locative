import { Locataire, LocataireModel, LocataireCreateInternal, LocataireUpdateInternal } from "@edmp/api";
import { RepositoryLib } from "@/lib";
import { ILocatairesService } from "@/interfaces";

export namespace LocatairesRepository {
  export const create = async (
    service: ILocatairesService.Service,
    ctx: ILocatairesService.Context<"service.locataires.create">,
    params: LocataireCreateInternal
  ): Promise<Locataire> => {
    const doc = await LocataireModel.create(params);
    const locataireCreated = RepositoryLib.transformDocuments(doc);
    void ctx.emit("locataire.created", { locataire: locataireCreated, params });
    return locataireCreated;
  };

  export const list = async (
    service: ILocatairesService.Service,
    ctx: ILocatairesService.Context<"service.locataires.list">,
    params: ILocatairesService.Context<"service.locataires.list">["params"]
  ): Promise<Locataire[]> => {
    const docs = await LocataireModel.find(params);
    const locataires = RepositoryLib.transformDocuments(docs);
    return locataires;
  };

  export const get = async (
    service: ILocatairesService.Service,
    ctx: ILocatairesService.Context<"service.locataires.get">,
    params: ILocatairesService.Context<"service.locataires.get">["params"]
  ): Promise<Locataire | undefined> => {
    const { id } = params;
    const doc = await LocataireModel.findById(id);
    const locataire = RepositoryLib.transformDocuments(doc);
    return locataire;
  };

  export const update = async (
    service: ILocatairesService.Service,
    ctx: ILocatairesService.Context<"service.locataires.update">,
    params: LocataireUpdateInternal
  ): Promise<Locataire> => {
    const doc = await LocataireModel.findByIdAndUpdate(
      params.id,
      {
        $set: params,
      },
      {
        upsert: true,
        new: true,
      }
    );
    const locataireUpdated = RepositoryLib.transformDocuments(doc);
    void ctx.emit("locataire.updated", { locataire: locataireUpdated, params });
    return locataireUpdated;
  };

  export const remove = async (
    service: ILocatairesService.Service,
    ctx: ILocatairesService.Context<"service.locataires.delete">,
    params: ILocatairesService.Context<"service.locataires.delete">["params"]
  ): Promise<boolean> => {
    const { id } = params;
    const doc = await LocataireModel.findByIdAndDelete(id);
    const locataireDeleted = RepositoryLib.transformDocuments(doc);
    if (locataireDeleted) {
      void ctx.emit("locataire.deleted", { locataire: locataireDeleted, params: ctx.params });
    }
    return !!locataireDeleted;
  };
}
