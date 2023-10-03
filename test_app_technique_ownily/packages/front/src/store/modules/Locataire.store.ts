import store from "@/store/root";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Locataire, LocatairesService } from "@edmp/api";
import Vue from "vue";
import { locatairesService } from "@/services";

export interface LocatairesState {
  loading: boolean;
  Locataires: Locataire[];
}

@Module({
  name: "locataires-store",
  dynamic: true,
  namespaced: true,
  store,
})
export class LocatairesStore extends VuexModule implements LocatairesState {
  loading = false;
  locataires: Locataire[] = [];

  @Mutation
  reset(): void {
    this.loading = false;
    this.locataires = [];
  }

  @Mutation
  setLoading(isLoading: boolean): void {
    this.loading = isLoading;
  }

  // * Locataires
  @Action
  async fetchLocataires(params: LocatairesService.ListIn) {
    try {
      this.setLoading(true);
      const locataires = await locatairesService.list(params);
      for (const Locataire of locataires) {
        this.setLocataire(Locataire);
      }
      return locataires;
    } finally {
      this.setLoading(false);
    }
  }

  get getLocatairesBy() {
    return (filter: Pick<Locataire, "locataire">) => {
      return this.locataires.filter((locataire) => {
        const LocataireFilteredKey = {};
        Object.keys(filter).forEach((filterKey) => {
          LocataireFilteredKey[filterKey] = locataire[filterKey];
        });
        return JSON.stringify(filter) === JSON.stringify(LocataireFilteredKey);
      });
    };
  }

  // * Locataire
  @Mutation
  setLocataire(locataire: Locataire) {
    const index = this.locataires.findIndex(({ id }) => id == locataire.id);
    if (index !== -1) {
      Vue.set(this.locataires, index, locataire);
    } else {
      this.locataires.push(locataire);
    }
  }

  @Mutation
  delLocataire(locataireId: Locataire["id"]) {
    const index = this.locataires.findIndex(({ id }) => id == locataireId);
    if (index !== -1) {
      this.locataires.splice(index, 1);
    }
  }

  get getLocataire() {
    return (locataireId: string) => {
      return this.locataires.find((locataire) => locataire.id === locataireId);
    };
  }

  // Create
  @Action
  async createLocataire(locataireCreate: LocatairesService.CreateIn) {
    try {
      this.setLoading(true);
      const locataireCreated = await locatairesService.create(locataireCreate);
      this.setLocataire(locataireCreated);
      return locataireCreated;
    } finally {
      this.setLoading(false);
    }
  }

  @Action
  async updateLocataire(locataireUpdate: LocatairesService.UpdateIn) {
    try {
      this.setLoading(true);
      const locataireUpdated = await LocatairesService.update(locataireUpdate);
      this.setLocataire(locataireUpdated);
      return locataireUpdated;
    } finally {
      this.setLoading(false);
    }
  }

  @Action
  async deleteLocataire(params: LocatairesService.DeleteIn) {
    try {
      this.setLoading(true);
      const locataireDeleted = await locatairesService.delete(params);
      if (locataireDeleted) {
        this.delLocataire(params.id);
      }
      return locataireDeleted;
    } finally {
      this.setLoading(false);
    }
  }
}
