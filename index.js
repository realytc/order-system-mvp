exports.receiveOrder = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*'); // ✅ 允許所有來源
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      // CORS 預檢請求
      res.status(204).send('');
      return;
    }
  
    const order = req.body;
    console.log("✅ 收到訂單：", order);
  
    res.status(200).json({ message: "訂單接收成功", order });
  };
  