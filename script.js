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
    const data = {
      name: document.getElementById("username").value,
      category: document.getElementById("category").value,
      item: document.getElementById("item").value,
      rice: document.getElementById("rice").value,
      note: document.getElementById("note").value,
      timestamp: new Date().toISOString()
    };
  
    fetch('https://order-system-1044726438520.asia-east1.run.app', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(resp => alert('送出成功！'))
    .catch(err => alert('送出失敗'));
  }
  