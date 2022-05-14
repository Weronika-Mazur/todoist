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
}

export const tagApi = new TagAPI(fetchService);
