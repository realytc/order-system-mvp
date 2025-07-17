# ✅ Dockerfile：部署靜態網站 + 健康檢查支援
FROM nginx:alpine

# 複製靜態網頁內容
COPY . /usr/share/nginx/html

# 複製自訂 Nginx 設定（支援 /health 路由）
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]