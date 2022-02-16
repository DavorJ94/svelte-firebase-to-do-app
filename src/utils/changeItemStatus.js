export function changeItemStatus(item, arrowType) {
  if (arrowType === "left") {
    const newStatus = item.status === "completed" ? "in-progress" : "todo";
    return newStatus;
  } else {
    const newStatus = item.status === "todo" ? "in-progress" : "completed";
    return newStatus;
  }
}
