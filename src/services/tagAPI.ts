import { Tag, TagContent } from "types/type";
import { fetchService, FetchService } from "./fetchService";

class TagAPI {
  constructor(private readonly fetchService: FetchService) {}

  getTags() {
    return this.fetchService.get<undefined, Tag[]>("tags/get-tags");
  }
  addTag(newTag: TagContent) {
    return this.fetchService.post<TagContent, Tag>("tags/add-tag", newTag);
  }

  deleteTag(tagId: string) {
    const endpoint = `tags/delete-tag/${tagId}`;
    return this.fetchService.delete<undefined, Tag>(endpoint);
  }

  updateTag(tagId: string, changes: TagContent) {
    const endpoint = `tags/change-tag/${tagId}`;
    return this.fetchService.put<TagContent, Tag>(endpoint, changes);
  }
}

export const tagApi = new TagAPI(fetchService);
