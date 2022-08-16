export const randomChoiceList = (list: any[]): any => {
  return list[Math.floor(Math.random() * list.length)];
};
