// This function takes a string of text as input and returns an array of arrays,
// where each subarray contains a combination of tags in the input text.

function findCombinationsFromText(text) {
  
  // Define a list of valid tag prefixes and a regular expression to validate tags.
  const validPrefixes = ['Group', 'Category', 'Subcategory', 'Make', 'Model', 'Diagram'];
  const tagRegex = /^[A-Za-z0-9_-]+$/; // Allowed characters for tags
  
  // Split the input text into tags, validate each tag, and group them by prefix.
  const tags = text.split(/[^\w-]+/) // Split on non-word characters except hyphens
    .map(tag => tag.trim()) // Remove any leading or trailing whitespace from each tag.
    .filter(tag => tag !== '' && tagRegex.test(tag)) // Remove any invalid tags.
    .map(tag => {
      const [prefix, value] = tag.split('_'); // Split each tag into a prefix and a value.
      if (!validPrefixes.includes(prefix)) return null; // Remove any tags with invalid prefixes.
      return { prefix, value };
    })
    .filter(tag => tag !== null) // Remove any tags with invalid prefixes.
    .reduce((acc, tag) => {
      if (acc[tag.prefix] !== undefined) return null; // Remove any duplicate tags with the same prefix.
      if (tag.prefix === 'Model' && acc['Make'] === undefined) return null; // Remove any Model tags without a corresponding Make tag.
      if (tag.prefix === 'Diagram' && acc['Model'] === undefined) return null; // Remove any Diagram tags without a corresponding Model tag.
      acc[// This function takes a string of text as input and returns an array of arrays,
// where each subarray contains a combination of tags in the input text.

function findCombinationsFromText(text) {
  
  // Define a list of valid tag prefixes and a regular expression to validate tags.
  const validPrefixes = ['Group', 'Category', 'Subcategory', 'Make', 'Model', 'Diagram'];
  const tagRegex = /^[A-Za-z0-9_-]+$/; // Allowed characters for tags
  
  // Split the input text into tags, validate each tag, and group them by prefix.
  const tags = text.split(/[^\w-]+/) // Split on non-word characters except hyphens
    .map(tag => tag.trim()) // Remove any leading or trailing whitespace from each tag.
    .filter(tag => tag !== '' && tagRegex.test(tag)) // Remove any invalid tags.
    .map(tag => {
      const [prefix, value] = tag.split('_'); // Split each tag into a prefix and a value.
      if (!validPrefixes.includes(prefix)) return null; // Remove any tags with invalid prefixes.
      return { prefix, value };
    })
    .filter(tag => tag !== null) // Remove any tags with invalid prefixes.
    .reduce((acc, tag) => {
      if (acc[tag.prefix] !== undefined) return null; // Remove any duplicate tags with the same prefix.
      if (tag.prefix === 'Model' && acc['Make'] === undefined) return null; // Remove any Model tags without a corresponding Make tag.
      if (tag.prefix === 'Diagram' && acc['Model'] === undefined) return null; // Remove any Diagram tags without a corresponding Model tag.
      acc[tag.prefix] = tag.value;
      return acc;
    }, {});
  
  if (tags['Group'] === undefined) return []; // If no Group tag is present, return an empty array.
  
  // Define a list of possible combinations of tags based on which tags are present.
  const combinations = [
    ['Group', 'Category', 'Subcategory'],
    ['Group', 'Category'],
    ['Group']
  ];
  
  // If there is no Subcategory tag, remove the combination that includes Subcategory.
  if (tags['Subcategory'] === undefined) {
    combinations[0].pop();
    // If there is a Make tag, add the combination that includes Make.
    if (tags['Make'] !== undefined) {
      combinations[1].push('Make');
      // If there is a Model tag, add the combination that includes Model and Diagram.
      if (tags['Model'] !== undefined) {
        combinations[2].splice(1, 0, 'Model');
        if (tags['Diagram'] !== undefined) {
          combinations[2].push('Diagram');
        }
      }
    }
  }
  
  // Filter the list of combinations to only include those that include all of the tags in the input text.
  const result = combinations.filter(combination => {
    return combination.every(prefix => tags[prefix] !== undefined);
  }).map(combination => {
    return combination.map(prefix => tags[prefix]);
  });
  
  // Log the result to the console and return it.
  console.log(result);
  return result;
}
] = tag.value;
      return acc;
    }, {});
  
  if (tags['Group'] === undefined) return []; // If no Group tag is present, return an empty array.
  
  // Define a list of possible combinations of tags based on which tags are present.
  const combinations = [
    ['Group', 'Category', 'Subcategory'],
    ['Group', 'Category'],
    ['Group']
  ];
  
  // If there is no Subcategory tag, remove the combination that includes Subcategory.
  if (tags['Subcategory'] === undefined) {
    combinations[0].pop();
    // If there is a Make tag, add the combination that includes Make.
    if (tags['Make'] !== undefined) {
      combinations[1].push('Make');
      // If there is a Model tag, add the combination that includes Model and Diagram.
      if (tags['Model'] !== undefined) {
        combinations[2].splice(1, 0, 'Model');
        if (tags['Diagram'] !== undefined) {
          combinations[2].push('Diagram');
        }
      }
    }
  }
  
  // Filter the list of combinations to only include those that include all of the tags in the input text.
  const result = combinations.filter(combination => {
    return combination.every(prefix => tags[prefix] !== undefined);
  }).map(combination => {
    return combination.map(prefix => tags[prefix]);
  });
  
  // Log the result to the console and return it.
  console.log(result);
  return result;
}
