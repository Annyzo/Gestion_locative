<template>
  <div>
    <div class="header">
      <h4 class="section-header-title">Formulaire d'ajout de locataire</h4>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-header-action">
          <form @submit.prevent="ajouterLocataire">
            <div class="form-group">
              <label for="nom">Nom :</label>
              <input
                type="text"
                class="form-control"
                id="nom"
                v-model="locataire.nom"
                required
              />
            </div>

            <div class="form-group">
              <label for="adresse">Adresse :</label>
              <input
                type="text"
                class="form-control"
                id="adresse"
                v-model="locataire.adresse"
                required
              />
            </div>

            <div class="form-group">
              <label for="coordonnees">Coordonnées :</label>
              <input
                type="text"
                class="form-control"
                id="coordonnees"
                v-model="locataire.coordonnees"
                required
              />
            </div>

            <div class="form-group">
              <label for="email">Email :</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="locataire.email"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary mt-4">
              Ajouter Locataire
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      locataire: {
        nom: "",
        adresse: "",
        coordonnees: "",
        email: "",
      },
    };
  },
  methods: {
    ajouterLocataire() {
      // Vous pouvez traiter les données du locataire ici, par exemple, les envoyer au serveur.
      console.log("Nouveau locataire :", this.locataire);

      // Réinitialiser le formulaire après soumission
      this.locataire = {
        nom: "",
        adresse: "",
        coordonnees: "",
        email: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: #{map-get($spacers, 2)};

  @media #{map-get($display-breakpoints, 'xs-only')} {
    flex-direction: column;

    > div {
      align-self: flex-end;
    }
  }
}

.section {
  margin-bottom: #{map-get($spacers, 8)};

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: #{map-get($spacers, 6)};

    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      flex-direction: column;
    }

    &-title {
      font-weight: #{map-get($font-weights, "medium")};
    }

    &-action {
      display: flex;
      flex-direction: row;

      @media #{map-get($display-breakpoints, 'sm-and-down')} {
        justify-content: flex-end;
        width: 100%;
        margin-top: #{map-get($spacers, 2)};
      }

      @media #{map-get($display-breakpoints, 'xs-only')} {
        flex-direction: column;
        align-items: flex-end;
        margin-top: #{map-get($spacers, 2)};
      }

      > .position {
        &-left {
          margin-right: #{map-get($spacers, 1)};

          @media #{map-get($display-breakpoints, 'xs-only')} {
            margin-right: unset;
            margin-bottom: #{map-get($spacers, 1)};
          }
        }
        &-right {
          margin-left: #{map-get($spacers, 1)};

          @media #{map-get($display-breakpoints, 'xs-only')} {
            margin-left: unset;
            margin-top: #{map-get($spacers, 1)};
          }
        }
      }
    }
  }

  &-body {
    display: flex;
    flex-direction: row;

    @media #{map-get($display-breakpoints, 'md-and-down')} {
      flex-direction: column;
    }

    > .position {
      &-left {
        margin-right: #{map-get($spacers, 4)};

        @media #{map-get($display-breakpoints, 'md-and-down')} {
          margin-right: unset;
          margin-bottom: #{map-get($spacers, 4)};
        }
      }
      &-middle {
        margin-right: #{map-get($spacers, 4)};
        margin-left: #{map-get($spacers, 4)};

        @media #{map-get($display-breakpoints, 'md-and-down')} {
          margin-right: unset;
          margin-left: unset;
          margin-top: #{map-get($spacers, 4)};
          margin-bottom: #{map-get($spacers, 4)};
        }
      }
      &-right {
        margin-left: #{map-get($spacers, 4)};

        @media #{map-get($display-breakpoints, 'md-and-down')} {
          margin-left: unset;
          margin-top: #{map-get($spacers, 4)};
        }
      }
    }
  }
}
</style>
