export function getDate(date: string) {
  if (!date || date === "today") return new Date();
  if (date === "yesterday") {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  }

  return new Date(date);
}
