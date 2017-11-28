
const findLabel = (label, existingLabels) => existingLabels.find(
  ({ name }) => (
    label.name === name || 
    Array.isArray(label.formerNames) && label.formerNames.includes(name)
  )
);

module.exports = function(existingLabels, newLabels) {
  const add = newLabels.filter(label => !findLabel(label, existingLabels));
  const update = newLabels
    .filter(label => {
      const existingLabel = findLabel(label, existingLabels);
      if (!existingLabel) {
        return false;
      }
      return `${label.color.toLowerCase()}${label.name}`
        !== `${existingLabel.color.toLowerCase()}${existingLabel.name}`;
    })
    .map(label => {
      const oldLabel = findLabel(label, existingLabels);
      return {
        url: oldLabel.url,
        name: label.name,
        color: label.color || oldLabel.color,
      };
    });
  return {
    add,
    update,
  }
}