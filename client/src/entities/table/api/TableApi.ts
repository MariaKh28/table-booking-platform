import { AxiosError } from "axios";
import { axiosInstance } from "../../../shared/lib/axiosInstance";
import { IApiResponseReject, IApiResponseSuccess } from "../../../shared/types";
import { ArrayTableType, SearchTablesParams } from "../model";
import { defaultRejectedAxiosError } from "../../../shared/consts";

class TableApi {
  static async getTables(params: SearchTablesParams) {
    try {
      const queryParams = new URLSearchParams({
        date: params.date,
      });

      if (params.partySize) {
        queryParams.append("partySize", params.partySize.toString());
      }

      const { data } = await axiosInstance.get<
        IApiResponseSuccess<ArrayTableType>
      >(`api/search?${queryParams.toString()}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<IApiResponseReject>;
      if (!axiosError.response) {
        return defaultRejectedAxiosError as IApiResponseReject;
      }
      return axiosError.response.data;
    }
  }
}
export default TableApi;
