import lists from "../../_data/lists";

const generateListName = (listId) => {
	const list = lists.find(({ value }) => value == listId);

	return list.name;
};

export default generateListName;
