const getCapitalizedText = (text) => {
  if (text === null || text === undefined) return;

  const stringText = String(text);

  if (stringText.length === 0) return '';

  return stringText.charAt(0).toUpperCase() + stringText.slice(1);
};
export default getCapitalizedText;
