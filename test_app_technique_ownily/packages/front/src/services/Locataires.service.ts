import { LocatairesService } from "@edmp/api";
import axios from "axios";

const api = "/api/v1/examples";

class LocatairesService {
  async create(locataireCreate: LocatairesService.CreateIn) {
    return axios
      .post<LocatairesService.CreateOut>(`${api}`, locataireCreate)
      .then((res) => res.data);
  }

  async list(params: LocatairesService.ListIn) {
    return axios
      .get<LocatairesService.ListOut>(`${api}`, { params })
      .then((res) => {
        console.log('res', res);
        return res.data;
      });
  }

  async get({ id }: LocatairesService.GetIn) {
    return axios.get<LocatairesService.GetOut>(`${api}/${id}`).then((res) => {
      return res.data;
    });
  }

  async update({ id, ...userUpdate }: LocatairesService.UpdateIn) {
    return axios
      .put<LocatairesService.UpdateOut>(`${api}/${id}`, userUpdate)
      .then((res) => res.data);
  }

  async delete({ id }: LocatairesService.DeleteIn) {
    return axios
      .delete<LocatairesService.DeleteOut>(`${api}/${id}`)
      .then((res) => res.data);
  }
}

// Export a singleton instance in the global namespace
export const locatairesService = new LocatairesService();
