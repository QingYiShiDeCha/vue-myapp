const tableData = [
  {
    id: 56,
    name: "柯西-施瓦兹不等式马克杯",
    type: "马克杯",
    sales: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
  },
  {
    id: 57,
    name: "泊松分布马克杯",
    type: "马克杯",
    sales: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
  },
  {
    id: 58,
    name: "余弦定理马克杯",
    type: "马克杯",
    sales: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
  },
  {
    id: 59,
    name: "正弦定理马克杯",
    type: "马克杯",
    sales: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
  },
]


const goodsname = tableData.map(item => item.name)

console.log(goodsname);