const menuData = {
    "便當類": [
      { "名稱": "炸雞腿便當", "飯量選項": ["正常", "減半", "無飯"] },
      { "名稱": "控肉便當(一塊一塊的，偏瘦)", "飯量選項": ["正常", "減半", "無飯"] },
      { "名稱": "滷雞腿便當", "飯量選項": ["正常", "減半", "無飯"] },
      { "名稱": "炸雞排便當", "飯量選項": ["正常", "減半", "無飯"] },
      { "名稱": "炸排骨便當", "飯量選項": ["正常", "減半", "無飯"] },
      { "名稱": "香腸便當", "飯量選項": ["正常", "減半", "無飯"] },
      { "名稱": "菜飯便當(原4個菜，會多加1份)", "飯量選項": ["正常", "減半", "無飯"] }
    ],
    "單點類": ["炸雞腿", "炸雞排"]
  };
  
  function handleCategoryChange() {
    const categorySelect = document.getElementById("category");
    const category = categorySelect.value;
    const itemSelect = document.getElementById("item");
    const riceSelect = document.getElementById("rice");
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
  
    // 加入「請選擇品項」預設選項
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "請選擇品項";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    itemSelect.appendChild(defaultOption);
  
    if (category === "bento") {
      menuData["便當類"].forEach(item => {
        const option = document.createElement("option");
        option.value = item.名稱;
        option.textContent = item.名稱;
        itemSelect.appendChild(option);
      });
  
      // 飯量選單初始化
      riceSelect.innerHTML = "";
      const defaultRiceOption = document.createElement("option");
      defaultRiceOption.textContent = "請選擇飯量";
      defaultRiceOption.value = "請選擇飯量";
      defaultRiceOption.disabled = true;
      defaultRiceOption.selected = true;
      riceSelect.appendChild(defaultRiceOption);
  
      ["正常", "減半", "無飯"].forEach(riceOption => {
        const option = document.createElement("option");
        option.value = riceOption;
        option.textContent = riceOption;
        riceSelect.appendChild(option);
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
  
  function submitOrder() {
    const name = document.getElementById("username").value.trim();
    const category = document.getElementById("category").value;
    const item = document.getElementById("item").value;
    const rice = document.getElementById("rice")?.value || "";
    const note = document.getElementById("note").value;
  
    const resultBox = document.getElementById("result");
    const button = document.getElementById("submitBtn");
  
    if (!name || !category || !item) {
      alert("請填寫姓名、選擇類別與品項！");
      return;
    }
  
    // ✅ 若是便當類，飯量必須選擇
    if (category === "bento" && (!rice || rice === "請選擇飯量")) {
      alert("請選擇飯量！");
      return;
    }
  
    button.disabled = true;
    button.textContent = "送出中...";
  
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbxi-jKrXkJznjFwYjN3m2z99Qhe4OSP_HOMC9MntE3gTE5UeozXFcSmFfcEijhnHHoF/exec',
      method: 'GET',
      data: {
        name,
        category,
        item,
        rice,
        note
      },
      success: function (responseText) {
        console.log("✅ 回應訊息：", responseText);
        resultBox.style.display = "block";
        resultBox.innerHTML = `
          <h3>✅ 訂單已送出！</h3>
          <p><strong>姓名：</strong>${name}</p>
          <p><strong>類別：</strong>${category === 'bento' ? '便當類' : '單點類'}</p>
          <p><strong>品項：</strong>${item}</p>
          ${category === 'bento' ? `<p><strong>飯量：</strong>${rice}</p>` : ""}
          ${note ? `<p><strong>備註：</strong>${note}</p>` : ""}
        `;
  
        // 清空欄位
        document.getElementById("username").value = "";
        document.getElementById("category").value = "";
        document.getElementById("item").innerHTML = "";
        document.getElementById("note").value = "";
        document.getElementById("itemSection").style.display = "none";
        document.getElementById("riceSection").style.display = "none";
      },
      error: function (xhr, status, error) {
        alert("❌ 發送失敗：" + error);
      },
      complete: function () {
        button.disabled = false;
        button.textContent = "提交訂單";
      }
    });
  }

  // 訂單截止時間：2025/7/25 23:59:59
const deadline = new Date("2025-07-25T23:59:59").getTime();

function startCountdown() {
  const countdownBox = document.getElementById("countdown");

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const remaining = deadline - now;

    if (remaining <= 0) {
      clearInterval(timer);
      // 停用點餐功能
      document.getElementById("submitBtn").disabled = true;
      document.getElementById("username").disabled = true;
      document.getElementById("category").disabled = true;
      document.getElementById("item").disabled = true;
      document.getElementById("rice").disabled = true;
      document.getElementById("note").disabled = true;

      // 顯示結束訊息
      countdownBox.innerHTML = "<strong>⛔ 點餐已結束</strong>";
      countdownBox.style.color = "red";
      return;
    }

    // 計算剩餘時間
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    // 顯示倒數時間
    countdownBox.innerHTML = `⏰ 點餐倒數：${days}天 ${hours}時 ${minutes}分 ${seconds}秒`;
  }, 1000);
}

startCountdown();
