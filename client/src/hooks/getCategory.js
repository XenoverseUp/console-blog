const getCategory = (categoryKey, categories) => {
  let ctgName;
  let ctgObj;

  categories.forEach((ctg) => {
    if (ctg.path === categoryKey) {
      ctgName = ctg.name;
      ctgObj = ctg;
    }
  });

  return [ctgName, ctgObj];
};

export default getCategory;
