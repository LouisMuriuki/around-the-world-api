function findCombinationsFromText(text) {
  const validPrefixes = [
    "Group",
    "Category",
    "Subcategory",
    "Make",
    "Model",
    "Diagram",
  ];
  const tagRegex = /[^\s,]+/; // Allowed characters for tags(@, !, %, (, ))
  const tags = text
  .split(/(?=Group|Category|Subcategory|Make|Model|Diagram)/) // Split on non-word characters except hyphens and underscores
    .map((tag) =>
    tag.replace(/(^-+|\B[^\w,-]+|\b-+\B)/g, "").trim())
    .filter((tag) => tag !== "" && tagRegex.test(tag))
    .map((tag) => {
      console.log(tag);
      const [prefix, ...valueParts] = tag.split("_");
      const value = valueParts.join("_").replace(/\n/g, ' ');
      if (!validPrefixes.includes(prefix)) return null; // Invalid prefix
      return { prefix, value };
    })
    .filter((tag) => tag !== null)
    .reduce((acc, tag) => {
      console.log(acc, tag);
      if (acc[tag.prefix] !== undefined) return null; // Duplicate tag of same prefix
      acc[tag.prefix] = tag.value;
      return acc;
    }, {});
  console.log(tags, "42");
  if (tags === null) return [];
  if (tags["Group"] === undefined) return []; // No Group tag
  const combinations = [
    ["Group", "Category", "Subcategory"],
    ["Group", "Category"],
    ["Group"],
  ];
  if (tags["Subcategory"] === undefined) {
    combinations[0].pop(); // Remove Subcategory combination if not present
    if (tags["Make"] !== undefined) {
      combinations[1].push("Make"); // Add Make combination if present
      if (tags["Model"] !== undefined) {
        combinations[2].splice(1, 0, "Model"); // Add Model to third combination if present
        if (tags["Diagram"] !== undefined) {
          combinations[2].push("Diagram"); // Add Diagram to third combination if present
        }
      }
    }
  }
    const result = combinations
    .filter((combination) => {
      return combination.every((prefix) => tags[prefix] !== undefined);
    })
    .map((combination) => {
        return combination.flatMap((prefix) => [prefix,tags[prefix]]);
    });
  console.log(result);
  return result;
}

console.log(1);
findCombinationsFromText(
  "--Group_Electric-Pallet-Jack-Parts, Category_Switche@%s-!!Subcategory_Ignition-Switch))@!%"
);
console.log(2);
findCombinationsFromText(
  "Group_Electric-Pallet-Jack-Parts, Category_Switches, Subcategory_Ignition-Switch"
);
console.log(3);
findCombinationsFromText(
  "Category_Switches-Group_Electric-Pallet-Jack-Parts-Subcategory_Ignition-Switch"
);
console.log(4);
findCombinationsFromText("Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas");

console.log(5);
findCombinationsFromText(
  "Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas-Group_Test"
);
findCombinationsFromText('Group_Tools-Hardware-Category_Roll-Pin-Make_U-Line-Model_H-1193')
