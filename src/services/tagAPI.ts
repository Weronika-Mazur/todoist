import { Tag, TagContent } from "types/type";
import { fetchService, FetchService } from "./fetchService";
import { endpoints } from "utils/endpoints";

class TagAPI {
  constructor(private readonly fetchService: FetchService) {}

  getTags() {
    return this.fetchService.get<undefined, Tag[]>(endpoints.tag.getTags);
  }

  addTag(newTag: TagContent) {
    return this.fetchService.post<TagContent, Tag>(
      endpoints.tag.addTag,
      newTag
    );
  }

  deleteTag(tagId: string) {
    const endpoint = `${endpoints.tag.deleteTag}${tagId}`;
    return this.fetchService.delete<undefined, Tag>(endpoint);
  }

  updateTag(tagId: string, changes: TagContent) {
    const endpoint = `${endpoints.tag.updateTag}${tagId}`;
    return this.fetchService.put<TagContent, Tag>(endpoint, changes);
  }
}

export const tagApi = new TagAPI(fetchService);
