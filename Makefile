.DEFAULT_GOAL := help
.PHONY: help install dev test build preview clean ci

help: ## 顯示可用指令
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  %-10s %s\n", $$1, $$2}'

install: ## 安裝依賴（npm ci）
	npm ci

dev: ## 啟動開發伺服器 (http://localhost:5173)
	npm run dev

test: ## 執行測試
	npm test

build: ## 型別檢查並建置至 dist/
	npm run build

preview: ## 預覽建置結果
	npm run preview

ci: install test build ## 模擬 CI：安裝、測試、建置

clean: ## 刪除 dist/
	rm -rf dist
