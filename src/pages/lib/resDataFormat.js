export const formatDataForRowSpan = (data) => {
  const newData = JSON.parse(JSON.stringify(data));
  return newData.reduce((result, item) => {
    //首先将name字段作为新数组result取出
    if (result.indexOf(item.name) < 0) {
      result.push(item.name)
    }
    return result
  }, []).reduce((result, name) => {
    //将name相同的数据作为新数组取出，并在其内部添加新字段**rowSpan**
    const children = newData.filter(item => item.name === name);
    result = result.concat(
      children.map((item, index) => ({
        ...item,
        rowSpan: index === 0 ? children.length : 0,//将第一行数据添加rowSpan字段
      }))
    )
    return result;
  }, [])
}

export default {
  formatDataForRowSpan
};
