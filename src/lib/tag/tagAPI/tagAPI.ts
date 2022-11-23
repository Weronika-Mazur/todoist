import { Tag, TagContent } from "types/tag";
import { fetchService, FetchService } from "services/fetchService";
import { endpoints } from "utils/endpoints";
import { headerJson } from "utils/constants";

class TagAPI {
  constructor(private readonly fetchService: FetchService) {}

  getTags() {
    return this.fetchService.get<undefined, Tag[]>(
      endpoints.tag.getTags,
      headerJson
    );
  }

  addTag(newTag: TagContent) {
    return this.fetchService.post<TagContent, Tag>(
      endpoints.tag.addTag,
      newTag,
      headerJson
    );
  }

  deleteTag(tagId: string) {
    const endpoint = `${endpoints.tag.deleteTag}${tagId}`;
    return this.fetchService.delete<undefined, Tag>(
      endpoint,
      undefined,
      headerJson
    );
  }

  updateTag(tagId: string, changes: TagContent) {
    const endpoint = `${endpoints.tag.updateTag}${tagId}`;
    return this.fetchService.put<TagContent, Tag>(
      endpoint,
      changes,
      headerJson
    );
  }
}

export const tagApi = new TagAPI(fetchService);
