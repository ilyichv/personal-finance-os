export function getDate(date: string) {
  if (!date || date === "today") return new Date();
  if (date === "yesterday") {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  }

  return new Date(date);
}

export function getPeriod(period: string) {
  const now = new Date();
  const start = new Date();
  const end = new Date();

  switch (period) {
    case "last_month":
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      end.setDate(0);
      break;
    case "current_week":
      start.setDate(now.getDate() - now.getDay());
      break;
    case "last_week":
      start.setDate(now.getDate() - now.getDay() - 7);
      end.setDate(now.getDate() - now.getDay() - 1);
      break;
    // default to current month
    default:
      start.setDate(1);
      break;
  }

  return { start, end };
}
