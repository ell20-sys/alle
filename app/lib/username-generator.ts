export const generateUsername = () => {
  const adjectives = ["Swift", "Clever", "Brave", "Mysterious", "Lively"];
  const nouns = ["Fox", "Hawk", "Panther", "Sparrow", "Wolf"];
  return (
    adjectives[Math.floor(Math.random() * adjectives.length)] +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
};
