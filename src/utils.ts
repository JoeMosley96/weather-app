export const formatTimestamp = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short", // Adds timezone info
  });
};

export function dynamicSort(sortCategory: string, isDescending: boolean) {
  let sortOrder = 1;
  if (isDescending) {
    sortOrder = -1;
  }
  return function (a:any, b:any) {
    if (sortCategory === "Severity") {
      // console.log(new Date(a.properties[sortCategory]).getTime());
      const result =
        a.properties[sortCategory] < b.properties[sortCategory]
          ? -1
          : a.properties[sortCategory] > b.properties[sortCategory]
            ? 1
            : 0;
      return result * sortOrder;
    } else {
      console.log(new Date(a.properties[sortCategory]).getTime());
      const result =
        new Date(a.properties[sortCategory]).getTime() <
        new Date(b.properties[sortCategory]).getTime()
          ? -1
          : new Date(a.properties[sortCategory]).getTime() >
              new Date(b.properties[sortCategory]).getTime()
            ? 1
            : 0;
      return result * sortOrder;
    }
  };
}
