import PriorityList from "components/organisms/Lists/PriorityList/PriorityList";
import TagsList from "components/organisms/Lists/TagsList/TagsList";

const TagsContainer = () => {
  return (
    <main className="w-full mr-[0px]">
      <PriorityList />
      <TagsList />
    </main>
  );
};

export default TagsContainer;
