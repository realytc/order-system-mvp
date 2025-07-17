const menuData = {
    "便當類": [
      { "名稱": "炸雞腿便當", "飯量選項": ["正常", "無飯"]},
      { "名稱": "控肉便當(一塊一塊的，偏瘦)", "飯量選項": ["正常", "無飯"]},
      { "名稱": "滷雞腿便當", "飯量選項": ["正常", "無飯"]},
      { "名稱": "雞排便當", "飯量選項": ["正常", "無飯"] },
      { "名稱": "排骨便當", "飯量選項": ["正常", "無飯"]  },
      { "名稱": "香腸便當", "飯量選項": ["正常", "無飯"]},
      { "名稱": "菜飯便當(原4個菜，會多加1份)", "飯量選項": ["正常", "無飯"]}
    ],
    "單點類": ["炸雞腿", "炸雞排"]
  };
  
  function handleCategoryChange() {
    const categorySelect = document.getElementById("category");
    const category = categorySelect.value;
    const itemSelect = document.getElementById("item");
    const riceSection = document.getElementById("riceSection");
    const itemSection = document.getElementById("itemSection");
  
    const previous = handleCategoryChange.lastSelected;
  
    if (previous && previous !== category) {
      const confirmSwitch = confirm(
        `您已選擇過『${previous === 'bento' ? '便當類' : '單點類'}』，確定要切換為『${category === 'bento' ? '便當類' : '單點類'}』嗎？\n此動作將清除先前的選擇。`
      );
      if (!confirmSwitch) {
        categorySelect.value = previous;
        return;
      }
    }
  
    handleCategoryChange.lastSelected = category;
    itemSelect.innerHTML = "";
  
    if (category === "bento") {
      menuData["便當類"].forEach(item => {
        const option = document.createElement("option");
        option.value = item.名稱;
        option.textContent = item.名稱;
        itemSelect.appendChild(option);
      });
      itemSection.style.display = "block";
      riceSection.style.display = "block";
    } else if (category === "side") {
      menuData["單點類"].forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        itemSelect.appendChild(option);
      });
      itemSection.style.display = "block";
      riceSection.style.display = "none";
    } else {
      itemSection.style.display = "none";
      riceSection.style.display = "none";
    }
  }
  

  // script.js 中送出資料
  function submitOrder() {
    const name = document.getElementById("username").value.trim();
    const category = document.getElementById("category").value;
    const item = document.getElementById("item").value;
    const rice = document.getElementById("rice")?.value || "";
    const note = document.getElementById("note").value;
  
    const resultBox = document.getElementById("result");
    const button = document.getElementById("submitBtn");
  
    // 檢查必填欄位
    if (!name || !category || !item) {
      alert("請填寫姓名、選擇類別與品項！");
      return;
    }
  
    // 顯示送出中狀態
    button.disabled = true;
    button.textContent = "送出中...";
  
    const data = {
      name,
      category,
      item,
      rice,
      note,
      timestamp: new Date().toISOString()
    };
  
    fetch('https://order-system-1044726438520.asia-east1.run.app', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) throw new Error('送出失敗');
      return res.json();
    })
    .then(() => {
      // 顯示成功回饋訊息
      resultBox.style.display = "block";
      resultBox.innerHTML = `
        <h3>✅ 訂單已送出！</h3>
        <p><strong>姓名：</strong>${name}</p>
        <p><strong>類別：</strong>${category === 'bento' ? '便當類' : '單點類'}</p>
        <p><strong>品項：</strong>${item}</p>
        ${category === 'bento' ? `<p><strong>飯量：</strong>${rice}</p>` : ""}
        ${note ? `<p><strong>備註：</strong>${note}</p>` : ""}
      `;
  
      // 清空表單欄位
      document.getElementById("username").value = "";
      document.getElementById("category").value = "";
      document.getElementById("item").innerHTML = "";
      document.getElementById("note").value = "";
      document.getElementById("itemSection").style.display = "none";
      document.getElementById("riceSection").style.display = "none";
    })
    .catch(err => {
      alert("❌ 發送失敗：" + err.message);
    })
    .finally(() => {
      button.disabled = false;
      button.textContent = "提交訂單";
    });
  }
  