window.__ModuleLoader__.load({
	id: "dsh-ds-balance",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let jsxRuntime = require("react/jsx-runtime");
		//#region 样式：DeepSeek 余额波浪能量条（对齐 DSH 主题变量）
		// 能量条为纯装饰：双层 SVG 波浪前后交错流动（波面起伏）+ "快吸慢呼"式呼吸，
		// 外层入口与面板常驻动画，不表达任何比例语义。
		const css = ".dsb_layer{flex:none;align-items:center;width:100%;margin:8px 0 0;display:flex;position:relative}.dsb_layer.dsb_rail{width:52px;margin:0;justify-content:center}.dsb_badge{box-sizing:border-box;width:100%;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:none;border-radius:12px;align-items:center;gap:8px;padding:7px 10px 7px 8px;font-family:inherit;font-size:14px;display:flex;overflow:hidden;text-align:left}.dsb_badge:hover{background:var(--dsw-alias-interactive-bg-hover-solid)}.dsb_badge[data-active]{background:var(--dsw-alias-interactive-bg-hover)}.dsb_icon{flex:none;width:24px;height:24px;border-radius:50%;background-size:200% 200%;color:#fff;justify-content:center;align-items:center;font-size:12px;font-weight:700;line-height:1;display:inline-flex;animation:dsb-flow 11s linear infinite,dsb-breathe var(--dsb-breathe-dur,4.2s) ease-in-out infinite}.dsb_rail .dsb_badge{width:52px;height:20px;border-radius:10px;padding:0;position:relative}.dsb_rail .dsb_badge[data-dsb-error]{background:var(--dsw-alias-fill-l2)}.dsb_railWaves{position:absolute;inset:0;overflow:hidden;border-radius:10px}.dsb_railAmount{position:relative;z-index:1;color:#fff;font-size:9px;line-height:20px;font-variant-numeric:tabular-nums;text-shadow:0 0 3px rgba(0,0,0,.55),0 1px 2px rgba(0,0,0,.4);white-space:nowrap;pointer-events:none}.dsb_rail .dsb_badge[data-dsb-error] .dsb_railAmount{color:var(--dsw-alias-state-error-primary);text-shadow:none}.dsb_main{flex:1;min-width:0;flex-direction:column;gap:5px;display:flex}.dsb_row1{align-items:center;gap:6px;display:flex}.dsb_label{color:var(--dsw-alias-label-primary);font-size:12px;line-height:16px;white-space:nowrap}.dsb_count{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-size:12px;line-height:16px;white-space:nowrap}.dsb_countError{color:var(--dsw-alias-state-error-primary)}.dsb_bar{flex:none;width:100%;height:14px;border-radius:999px;background:var(--dsw-alias-fill-l2);overflow:hidden;position:relative}.dsb_waves{position:absolute;inset:0;animation:dsb-breathe var(--dsb-breathe-dur,4.2s) ease-in-out infinite}.dsb_wave{position:absolute;top:0;left:0;height:100%;width:200%;display:block}.dsb_waveBack{opacity:.42;animation:dsb-wave var(--dsb-waveBack-dur,7s) linear infinite}.dsb_waveFront{opacity:.8;animation:dsb-wave var(--dsb-waveFront-dur,5.2s) linear infinite reverse}.dsb_panel{z-index:30;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);width:320px;max-width:calc(100vw - 24px);box-shadow:var(--dsw-shadow-lv2);border-radius:12px;flex-direction:column;display:flex;position:fixed;bottom:76px;left:12px;overflow:hidden}.dsb_header{box-sizing:border-box;border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);flex:none;justify-content:space-between;align-items:center;min-height:44px;padding:10px 12px;display:flex;gap:8px}.dsb_title{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:20px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dsb_refresh{width:24px;height:24px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;font-size:13px;line-height:1;display:inline-flex;flex:none}.dsb_refresh:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}.dsb_refresh:disabled{opacity:.4;cursor:default}.dsb_close{width:24px;height:24px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;font-size:13px;line-height:1;display:inline-flex;flex:none}.dsb_close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}.dsb_body{flex-direction:column;gap:10px;padding:14px 12px 12px;display:flex}.dsb_totalRow{align-items:baseline;gap:8px;display:flex}.dsb_totalLabel{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px;flex:none}.dsb_total{color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;font-size:24px;font-weight:600;line-height:30px}.dsb_barBig{height:14px;flex:none}.dsb_rows{flex-direction:column;gap:2px;margin:0;padding:0;list-style:none;display:flex}.dsb_row{justify-content:space-between;align-items:center;min-height:26px;display:flex}.dsb_rowLabel{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.dsb_rowValue{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-size:12px;line-height:18px}.dsb_error{color:var(--dsw-alias-state-error-primary);margin:0;font-size:12px;line-height:18px}.dsb_note{color:var(--dsw-alias-label-tertiary);margin:0;font-size:11px;line-height:16px}@keyframes dsb-wave{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}@keyframes dsb-breathe{0%{opacity:.72}35%{opacity:1}100%{opacity:.72}}@keyframes dsb-flow{0%{background-position:0% 50%}100%{background-position:100% 50%}}@media (prefers-reduced-motion:reduce){.dsb_wave,.dsb_waves,.dsb_icon{animation:none}}.dsb_chartWrap{flex-direction:column;gap:6px;margin-top:4px;display:flex}.dsb_chartHead{justify-content:space-between;align-items:baseline;display:flex}.dsb_chartTitle{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.dsb_chartTotal{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-size:12px;line-height:18px}.dsb_chart{align-items:flex-end;gap:3px;height:64px;padding:0 2px;display:flex;position:relative}.dsb_tip{position:absolute;top:-30px;transform:translateX(-50%);background:#1f2328;color:#fff;border-radius:8px;padding:4px 8px;font-size:11px;line-height:16px;display:flex;gap:6px;pointer-events:none;white-space:nowrap;z-index:5;box-shadow:var(--dsw-shadow-lv2)}.dsb_tipTime{opacity:.75}.dsb_col{flex:1;height:100%;justify-content:flex-end;display:flex;min-width:0}.dsb_colFill{width:100%;border-radius:3px 3px 0 0;transition:height .3s ease}.dsb_col[data-hover] .dsb_colFill{filter:brightness(1.15)}.dsb_colEmpty{width:100%;height:2px;border-radius:1px;background:var(--dsw-alias-fill-l2)}.dsb_chartAxis{justify-content:space-between;color:var(--dsw-alias-label-caption);font-size:10px;line-height:14px;display:flex}.dsb_chartNote{color:var(--dsw-alias-label-caption);margin:0;font-size:10px;line-height:14px}.dsb_gear{width:24px;height:24px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;font-size:13px;line-height:1;display:inline-flex;flex:none}.dsb_gear:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}.dsb_gear[data-on]{color:var(--dsw-alias-button-primary-fill,#4d6bfe)}.dsb_link{width:24px;height:24px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;font-size:13px;line-height:1;display:inline-flex;flex:none}.dsb_link:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}.dsb_settings{flex-direction:column;gap:8px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:10px;display:flex}.dsb_setRow{flex-direction:column;gap:4px;display:flex}.dsb_setLabel{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}.dsb_setChips{flex-wrap:wrap;gap:4px;display:flex}.dsb_setChip{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font:inherit;font-size:11px;line-height:18px;cursor:pointer;background:0 0;border-radius:999px;padding:1px 10px}.dsb_setChip:hover{background:var(--dsw-alias-interactive-bg-hover)}.dsb_setChip[data-on]{border-color:var(--dsw-alias-button-primary-fill,#4d6bfe);color:var(--dsw-alias-button-primary-fill,#4d6bfe);background:var(--dsw-alias-interactive-bg-hover)}.dsb_uninstall{border:1px solid var(--dsw-alias-state-error-primary,#ef4444);color:var(--dsw-alias-state-error-primary,#ef4444);font:inherit;font-size:11px;line-height:18px;cursor:pointer;background:0 0;border-radius:999px;padding:1px 10px;align-self:flex-start}.dsb_uninstall:hover{background:var(--dsw-alias-interactive-bg-hover-danger)}.dsb_uninstall:disabled{opacity:.4;cursor:default}.dsb_badge[data-dsb-alert] .dsb_count{color:var(--dsw-alias-state-error-primary,#ef4444)}.dsb_rail .dsb_badge[data-dsb-alert] .dsb_railAmount{text-shadow:0 0 4px rgba(120,0,0,.85),0 1px 2px rgba(0,0,0,.4)}.dsb_alertInputRow{align-items:center;gap:6px;color:var(--dsw-alias-label-secondary);font-size:11px;line-height:16px;display:flex}.dsb_input{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;border-radius:8px;padding:2px 8px;width:80px}.dsb_input:focus{outline:none;border-color:var(--dsw-alias-button-primary-fill,#4d6bfe)}.dsb_modalMask{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:1000;justify-content:center;align-items:center;display:flex}.dsb_modal{background:var(--dsw-alias-bg-base,#fff);border:1px solid var(--dsw-alias-border-l1);border-radius:14px;box-shadow:var(--dsw-shadow-lv3);width:320px;max-width:calc(100vw - 48px);flex-direction:column;gap:10px;padding:18px;display:flex}.dsb_modalTitle{color:var(--dsw-alias-state-error-primary,#ef4444);font-size:15px;font-weight:600;line-height:22px}.dsb_modalBody{color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px;margin:0}.dsb_modalActions{justify-content:flex-end;gap:8px;display:flex}.dsb_modalBtn{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:20px;cursor:pointer;background:0 0;border-radius:8px;padding:4px 14px}.dsb_modalBtn:hover{background:var(--dsw-alias-interactive-bg-hover)}.dsb_modalBtnPrimary{background:var(--dsw-alias-button-primary-fill,#4d6bfe);border-color:var(--dsw-alias-button-primary-fill,#4d6bfe);color:#fff}.dsb_modalBtnPrimary:hover{opacity:.9;background:var(--dsw-alias-button-primary-fill,#4d6bfe)}";
		const tagId = "dsh-ds-balance/balance.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-ds-balance";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion
		//#region 余额波浪能量条组件
		/** 币种符号表：未知币种直接显示代码。 */
		const CURRENCY_SYMBOLS = { CNY: "¥", USD: "$" };
		/** 默认自动刷新间隔（毫秒），设置面板可切换 10/30/60 秒。 */
		const DEFAULT_REFRESH_MS = 10 * 1000;
		/** 刷新频率档位。 */
		const REFRESH_OPTIONS = [
			{ ms: 10 * 1000, label: "10秒" },
			{ ms: 30 * 1000, label: "30秒" },
			{ ms: 60 * 1000, label: "60秒" }
		];
		/** 动画速度档位：双层波浪与呼吸的时长（秒）。 */
		const SPEEDS = {
			slow: { waveBack: 11, waveFront: 8, breathe: 6.5, label: "慢" },
			normal: { waveBack: 7, waveFront: 5.2, breathe: 4.2, label: "标准" },
			fast: { waveBack: 4, waveFront: 3, breathe: 2.6, label: "快" }
		};
		/**
		 * 颜色主题表：每套包含后层/前层渐变（5 色标，首尾同色闭环）、
		 * 圆钮渐变（4 色标）与柱形图渐变（普通柱 2 色 + 当前柱 2 色）。
		 * 色相按相邻小步递进，保证过渡平滑。
		 */
		const THEMES = {
			ocean: {
				name: "海洋",
				back: ["hsl(216,72%,58%)", "hsl(196,68%,52%)", "hsl(176,62%,48%)", "hsl(158,58%,48%)", "hsl(216,72%,58%)"],
				front: ["hsl(232,70%,64%)", "hsl(214,68%,60%)", "hsl(252,65%,62%)", "hsl(278,62%,60%)", "hsl(232,70%,64%)"],
				icon: ["hsl(220,78%,62%)", "hsl(190,72%,54%)", "hsl(280,72%,62%)", "hsl(220,78%,62%)"],
				col: ["hsl(220,72%,60%)", "hsl(190,68%,52%)"],
				colCurrent: ["hsl(45,80%,56%)", "hsl(15,80%,58%)"]
			},
			forest: {
				name: "森林",
				back: ["hsl(150,60%,44%)", "hsl(120,55%,40%)", "hsl(90,58%,42%)", "hsl(60,62%,44%)", "hsl(150,60%,44%)"],
				front: ["hsl(160,65%,52%)", "hsl(130,60%,46%)", "hsl(100,58%,44%)", "hsl(70,60%,46%)", "hsl(160,65%,52%)"],
				icon: ["hsl(150,62%,46%)", "hsl(90,60%,42%)", "hsl(50,68%,48%)", "hsl(150,62%,46%)"],
				col: ["hsl(150,60%,46%)", "hsl(90,58%,44%)"],
				colCurrent: ["hsl(45,80%,56%)", "hsl(15,80%,58%)"]
			},
			sunset: {
				name: "晚霞",
				back: ["hsl(20,75%,58%)", "hsl(40,78%,55%)", "hsl(0,70%,54%)", "hsl(340,65%,52%)", "hsl(20,75%,58%)"],
				front: ["hsl(35,85%,62%)", "hsl(10,80%,58%)", "hsl(350,72%,56%)", "hsl(320,68%,54%)", "hsl(35,85%,62%)"],
				icon: ["hsl(30,85%,58%)", "hsl(0,75%,55%)", "hsl(330,72%,56%)", "hsl(30,85%,58%)"],
				col: ["hsl(30,80%,56%)", "hsl(0,70%,52%)"],
				colCurrent: ["hsl(45,80%,56%)", "hsl(15,80%,58%)"]
			},
			violet: {
				name: "紫夜",
				back: ["hsl(265,70%,58%)", "hsl(290,68%,54%)", "hsl(315,65%,50%)", "hsl(230,70%,52%)", "hsl(265,70%,58%)"],
				front: ["hsl(275,72%,64%)", "hsl(255,68%,60%)", "hsl(235,66%,58%)", "hsl(300,65%,58%)", "hsl(275,72%,64%)"],
				icon: ["hsl(270,72%,60%)", "hsl(310,68%,56%)", "hsl(230,72%,58%)", "hsl(270,72%,60%)"],
				col: ["hsl(270,70%,58%)", "hsl(310,65%,52%)"],
				colCurrent: ["hsl(45,80%,56%)", "hsl(15,80%,58%)"]
			}
		};
		/** 每小时用量记录的 localStorage 键名。 */
		const HOURS_KEY = "dsh-ds-balance:hours";
		/** 面板设置的 localStorage 键名。 */
		const SETTINGS_KEY = "dsh-ds-balance:settings";
		/** 首次运行且无任何历史记录时，自动播种 24 小时演示数据（便于立刻查看图表效果）。 */
		const SEED_DEMO_ON_FIRST_RUN = true;
		/** 默认面板设置。 */
		const DEFAULT_SETTINGS = { theme: "ocean", speed: "normal", refreshMs: DEFAULT_REFRESH_MS, alertEnabled: false, alertThreshold: 100 };
		/**
		 * 告警主题：余额跌破告警线时整套能量条/圆钮/柱形图切换为红色系
		 * （结构与其他主题一致：5 色标渐变、首尾同色闭环）。
		 */
		const ALERT_THEME = {
			back: ["hsl(0,75%,52%)", "hsl(10,80%,50%)", "hsl(350,72%,48%)", "hsl(330,70%,48%)", "hsl(0,75%,52%)"],
			front: ["hsl(0,80%,60%)", "hsl(15,82%,56%)", "hsl(340,75%,56%)", "hsl(320,72%,54%)", "hsl(0,80%,60%)"],
			icon: ["hsl(0,78%,56%)", "hsl(20,82%,52%)", "hsl(340,75%,54%)", "hsl(0,78%,56%)"],
			col: ["hsl(0,75%,52%)", "hsl(15,78%,48%)"],
			colCurrent: ["hsl(0,78%,54%)", "hsl(20,80%,50%)"]
		};
		/** 读取面板设置并与默认值合并（容错：坏数据回落默认）。 */
		function loadSettings() {
			try {
				if (typeof localStorage === "undefined") return { ...DEFAULT_SETTINGS };
				const raw = localStorage.getItem(SETTINGS_KEY);
				if (raw === null) return { ...DEFAULT_SETTINGS };
				const parsed = JSON.parse(raw);
				const theme = parsed?.theme in THEMES ? parsed.theme : DEFAULT_SETTINGS.theme;
				const speed = parsed?.speed in SPEEDS ? parsed.speed : DEFAULT_SETTINGS.speed;
				const refreshMs = REFRESH_OPTIONS.some((item) => item.ms === parsed?.refreshMs) ? parsed.refreshMs : DEFAULT_SETTINGS.refreshMs;
				const alertEnabled = typeof parsed?.alertEnabled === "boolean" ? parsed.alertEnabled : DEFAULT_SETTINGS.alertEnabled;
				const alertThreshold = Number.isFinite(parsed?.alertThreshold) && parsed.alertThreshold >= 0 ? parsed.alertThreshold : DEFAULT_SETTINGS.alertThreshold;
				return { theme, speed, refreshMs, alertEnabled, alertThreshold };
			} catch {
				return { ...DEFAULT_SETTINGS };
			}
		}
		/** 持久化面板设置。 */
		function saveSettings(settings) {
			try {
				if (typeof localStorage === "undefined") return;
				localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
			} catch {
				/* 忽略配额/隐私模式异常 */
			}
		}
		/** 用量记录最多保留的小时条数（图表只取最近 24 条，留余量）。 */
		const HOURS_MAX = 48;
		/** 一小时毫秒数。 */
		const HOUR_MS = 60 * 60 * 1000;
		/**
		 * 读取每小时用量记录（数组按小时时间戳升序）。
		 * localStorage 不可用时（SSR/隐私模式）返回空数组。
		 * @returns {Array<{ts: number, start: number, end: number}>}
		 */
		function loadHours() {
			try {
				if (typeof localStorage === "undefined") return [];
				const raw = localStorage.getItem(HOURS_KEY);
				if (raw === null) return [];
				const parsed = JSON.parse(raw);
				return Array.isArray(parsed) ? parsed : [];
			} catch {
				return [];
			}
		}
		/** 持久化每小时用量记录（容量受限时静默失败）。 */
		function saveHours(hours) {
			try {
				if (typeof localStorage === "undefined") return;
				localStorage.setItem(HOURS_KEY, JSON.stringify(hours));
			} catch {
				/* 忽略配额/隐私模式异常 */
			}
		}
		/**
		 * 把一次余额采样并入小时记录，返回更新后的数组（无变化时返回 null）。
		 * 消耗 = 该小时期初余额 - 当前余额（不低于 0）；余额回升视为充值，
		 * 重置该小时期初基准，避免下一小时出现虚高消耗。
		 * @param {number} total - 当前总余额。
		 * @param {number} nowMs - 当前时间（毫秒）。
		 * @returns {Array<{ts: number, start: number, end: number}> | null}
		 */
		function recordHour(total, nowMs) {
			if (!Number.isFinite(total)) return null;
			const hourTs = Math.floor(nowMs / HOUR_MS) * HOUR_MS;
			const hours = loadHours();
			const last = hours[hours.length - 1];
			if (last !== undefined && last.ts === hourTs) {
				if (total > last.end + 0.001) {
					// 余额回升：视为充值，重置本小时期初基准。
					last.start = total;
					last.end = total;
				} else {
					last.end = Math.min(last.end, total);
				}
			} else {
				// 新小时：期初 = 上一小时期末，除非余额回升（充值）。
				const base = last !== undefined ? last.end : total;
				hours.push({ ts: hourTs, start: total > base + 0.001 ? total : base, end: total });
			}
			const trimmed = hours.length > HOURS_MAX ? hours.slice(-HOURS_MAX) : hours;
			saveHours(trimmed);
			return trimmed;
		}
		/**
		 * 生成 24 小时演示数据：从当前余额向前回推，白天活跃、深夜低消耗，
		 * 单调递减（无充值），带 demo 标记供图表注明。
		 * @param {number} total - 当前总余额。
		 * @param {number} nowMs - 当前时间（毫秒）。
		 * @returns {Array<{ts: number, start: number, end: number, demo: boolean}>}
		 */
		function buildDemoHours(total, nowMs) {
			const hourTs = Math.floor(nowMs / HOUR_MS) * HOUR_MS;
			let seed = 7;
			const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
			const rows = [];
			let end = total;
			for (let i = 23; i >= 0; i -= 1) {
				const ts = hourTs - (23 - i) * HOUR_MS;
				const hour = new Date(ts).getHours();
				let spend = (hour >= 0 && hour < 7)
					? (rnd() < 0.3 ? 0 : 0.02 + rnd() * 0.10)
					: 0.05 + rnd() * 1.20;
				spend = Math.round(spend * 100) / 100;
				const start = Math.round((end + spend) * 100) / 100;
				rows.push({ ts, start, end, demo: true });
				end = start;
			}
			return rows;
		}
		/**
		 * 波浪路径：viewBox 240×12，两个正弦周期（每 120 一个），
		 * 波面在 y=3（峰）与 y=9（谷）之间小幅起伏，下部填满——
		 * 配合 width:200% 与 translateX(-50%) 循环实现无缝流动。
		 * 振幅收窄让波浪更柔和，避免大幅起伏带来的跳跃感。
		 */
		const WAVE_PATH = "M0,6 C20,3 40,3 60,6 C80,9 100,9 120,6 C140,3 160,3 180,6 C200,9 220,9 240,6 L240,12 L0,12 Z";
		/** 汇总 balance_infos 中某一字段（字符串金额求和，容错）。 */
		function sumField(data, field) {
			const items = data?.balance_infos;
			if (!Array.isArray(items) || items.length === 0) return Number.NaN;
			let total = 0;
			for (const item of items) {
				const value = Number(item[field]);
				if (Number.isFinite(value)) total += value;
			}
			return total;
		}
		/** 金额格式化：两位小数、千分位。 */
		function formatMoney(value) {
			return value.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		}
		/** 主要币种符号（badge 与面板统一使用）。 */
		function primarySymbol(data) {
			const currency = data?.balance_infos?.[0]?.currency;
			if (typeof currency !== "string") return "";
			return CURRENCY_SYMBOLS[currency] ?? `${currency} `;
		}
		/**
		 * 双层波浪：后层蓝青系慢速右移，前层蓝紫系反向流动，两层色相邻近、
		 * 交错时不撞色；渐变色标按小步色相递进（每 25% 长度约 20 度），
		 * 首尾同色形成闭环；整体做"快吸慢呼"呼吸。
		 * @returns {ReturnType<typeof jsxRuntime.jsxs>} 波浪层 JSX。
		 */
		function renderWaves(theme) {
			const stopsOf = (id, colors) => colors.map((color, index) => jsxRuntime.jsx("stop", {
				offset: String(index / (colors.length - 1)),
				stopColor: color
			}, `${id}-${index}`));
			return jsxRuntime.jsxs("span", {
				className: "dsb_waves",
				children: [
					jsxRuntime.jsx("svg", {
						className: "dsb_wave dsb_waveBack",
						viewBox: "0 0 240 12",
						preserveAspectRatio: "none",
						"aria-hidden": true,
						children: jsxRuntime.jsxs("g", {
							children: [
								jsxRuntime.jsxs("defs", {
									children: [
										jsxRuntime.jsxs("linearGradient", {
											id: "dsb-grad-back",
											x1: "0",
											x2: "1",
											children: stopsOf("back", theme.back)
										})
									]
								}),
								jsxRuntime.jsx("path", { fill: "url(#dsb-grad-back)", d: WAVE_PATH })
							]
						})
					}),
					jsxRuntime.jsx("svg", {
						className: "dsb_wave dsb_waveFront",
						viewBox: "0 0 240 12",
						preserveAspectRatio: "none",
						"aria-hidden": true,
						children: jsxRuntime.jsxs("g", {
							children: [
								jsxRuntime.jsxs("defs", {
									children: [
										jsxRuntime.jsxs("linearGradient", {
											id: "dsb-grad-front",
											x1: "0",
											x2: "1",
											children: stopsOf("front", theme.front)
										})
									]
								}),
								jsxRuntime.jsx("path", { fill: "url(#dsb-grad-front)", d: WAVE_PATH })
							]
						})
					})
				]
			});
		}
		/**
		 * 侧栏底部余额入口：宽侧栏显示「总余额 ¥xxx + 波浪能量条」，
		 * 窄侧栏显示圆形 ¥ 图标（带呼吸）；点击展开明细面板。
		 * 波浪能量条为纯装饰，不表达比例——DeepSeek 接口只返回当前剩余金额，
		 * 无历史充值/消耗数据，任何百分比都缺基准。
		 * 更新时机：挂载即查、每 10 秒自动刷新、页面重新可见时刷新、
		 * 每次展开面板刷新、手动点「刷新」。刷新期间保留旧数据，仅金额数字随结果更新。
		 * @param {{ wide?: boolean }} props - 侧栏 SlotRenderer 传入的宽度标志。
		 */
		function BalancePanel({ wide = true }) {
			const [state, setState] = react.useState({ status: "loading", data: null, error: null, at: 0 });
			const [open, setOpen] = react.useState(false);
			const [hours, setHours] = react.useState(() => loadHours());
			const [settings, setSettings] = react.useState(() => loadSettings());
			const [settingsOpen, setSettingsOpen] = react.useState(false);
			const [hoverIndex, setHoverIndex] = react.useState(null);
			const [uninstallState, setUninstallState] = react.useState("idle");
			const [alertModalOpen, setAlertModalOpen] = react.useState(false);
			const [thresholdDraft, setThresholdDraft] = react.useState(String(loadSettings().alertThreshold));
			const alertDismissed = react.useRef(false);
			const seededRef = react.useRef(false);
			const inflight = react.useRef(null);
			const panelRef = react.useRef(null);
			const badgeRef = react.useRef(null);
			/** 更新设置并持久化。 */
			const updateSettings = react.useCallback((patch) => {
				setSettings((prev) => {
					const next = { ...prev, ...patch };
					saveSettings(next);
					return next;
				});
			}, []);
			/**
			 * 卸载插件：确认后调用 host 面卸载端点（移除 cordis.patch.yml 登记
			 * 并删除插件文件），重启 dsh web 后彻底生效。
			 */
			const handleUninstall = react.useCallback(async () => {
				if (!window.confirm("确定卸载 dsh-ds-balance 插件？\n将移除 DSH 配置中的插件登记并删除插件文件，重启 dsh web 后彻底生效。")) return;
				setUninstallState("busy");
				try {
					const res = await fetch("/api/deepseek-balance/uninstall", { method: "POST" });
					const body = await res.json().catch(() => null);
					if (res.ok && body?.ok) {
						// 顺手清理本插件在浏览器本地保存的设置与用量记录。
						try {
							localStorage.removeItem(HOURS_KEY);
							localStorage.removeItem(SETTINGS_KEY);
						} catch {
							/* 忽略清理异常 */
						}
						window.alert(`${body.message ?? "已卸载"}。重启 dsh web 后插件消失。`);
						// 保持 busy：插件即将失效，面板无需恢复。
					} else {
						window.alert(`卸载失败：${body?.error ?? `HTTP ${res.status}`}`);
						setUninstallState("idle");
					}
				} catch (error) {
					window.alert(`卸载失败：${error instanceof Error ? error.message : String(error)}`);
					setUninstallState("idle");
				}
			}, []);
			const load = react.useCallback(() => {
				if (inflight.current !== null) inflight.current();
				let cancelled = false;
				inflight.current = () => { cancelled = true; };
				// refreshing 时保留旧数据与旧金额，只等新结果到达后原子替换。
				setState((prev) => ({ ...prev, status: prev.data === null ? "loading" : "refreshing", error: null }));
				fetch("/api/deepseek-balance", { cache: "no-store" })
					.then(async (res) => {
						const body = await res.json().catch(() => null);
						if (cancelled) return;
						if (!res.ok || body === null || body.error !== undefined) {
							setState({ status: "error", data: null, error: (body?.error) || `HTTP ${res.status}`, at: Date.now() });
						} else {
							setState({ status: "ready", data: body, error: null, at: Date.now() });
						}
					})
					.catch((error) => {
						if (cancelled) return;
						setState({ status: "error", data: null, error: error instanceof Error ? error.message : String(error), at: Date.now() });
					})
					.finally(() => {
						inflight.current = null;
					});
			}, []);
			// 挂载即查询；卸载时取消在途请求。
			react.useEffect(() => load(), [load]);
			react.useEffect(() => () => { if (inflight.current !== null) inflight.current(); }, []);
			// 按设置的频率自动刷新（设置面板可切 10/30/60 秒）。
			react.useEffect(() => {
				const timer = setInterval(load, settings.refreshMs);
				return () => clearInterval(timer);
			}, [load, settings.refreshMs]);
			// 页面从后台切回可见时立即刷新。
			react.useEffect(() => {
				const onVisible = () => { if (document.visibilityState === "visible") load(); };
				document.addEventListener("visibilitychange", onVisible);
				return () => document.removeEventListener("visibilitychange", onVisible);
			}, [load]);
			// 每次打开面板都取一次最新值。
			react.useEffect(() => { if (open) load(); }, [open, load]);
			// 面板打开时：点击面板或入口按钮以外的区域即关闭。
			react.useEffect(() => {
				if (!open) return;
				const onDown = (event) => {
					const target = event.target;
					if (panelRef.current !== null && panelRef.current.contains(target)) return;
					if (badgeRef.current !== null && badgeRef.current.contains(target)) return;
					setOpen(false);
				};
				document.addEventListener("mousedown", onDown);
				return () => document.removeEventListener("mousedown", onDown);
			}, [open]);
			const total = sumField(state.data, "total_balance");
			const topped = sumField(state.data, "topped_up_balance");
			const symbol = primarySymbol(state.data);
			const unavailable = state.data !== null && state.data.is_available === false;
			const hasMoney = Number.isFinite(total);
			// 每次余额采样并入小时用量记录（基于余额变化估算，数据自安装后积累）。
			react.useEffect(() => {
				if (!Number.isFinite(total)) return;
				const next = recordHour(total, Date.now());
				if (next !== null) setHours(next);
			}, [total]);
			// 最近 24 小时柱形图数据：每根柱 = 该小时余额消耗。
			const nowMs = Date.now();
			const currentHourTs = Math.floor(nowMs / HOUR_MS) * HOUR_MS;
			const columns = [];
			for (let i = 23; i >= 0; i -= 1) {
				const ts = currentHourTs - i * HOUR_MS;
				const rec = hours.find((item) => item.ts === ts);
				const consumed = rec !== undefined ? Math.max(0, rec.start - rec.end) : 0;
				columns.push({ ts, consumed, current: i === 0 });
			}
			const maxConsumed = columns.reduce((max, col) => Math.max(max, col.consumed), 0);
			const todayStart = new Date(nowMs);
			todayStart.setHours(0, 0, 0, 0);
			const todayTotal = columns.reduce((sum, col) => (col.ts >= todayStart.getTime() ? sum + col.consumed : sum), 0);
			const hourLabel = (ts, current) => (current ? "现在" : `${new Date(ts).getHours()}时`);
			// 当前主题与速度档；CSS 变量驱动波浪/呼吸时长（面板与 badge 同属一个 DOM 子树，自动继承）。
			// 告警激活时整套配色切换为红色告警主题（能量条/圆钮/柱形图全红）。
			const alertActive = settings.alertEnabled && hasMoney && total <= settings.alertThreshold;
			const theme = alertActive ? ALERT_THEME : (THEMES[settings.theme] ?? THEMES.ocean);
			const speed = SPEEDS[settings.speed] ?? SPEEDS.normal;
			const cssVars = {
				"--dsb-waveBack-dur": `${speed.waveBack}s`,
				"--dsb-waveFront-dur": `${speed.waveFront}s`,
				"--dsb-breathe-dur": `${speed.breathe}s`
			};
			// 告警弹窗：首次跌破弹一次；余额回升到阈值之上后重新武装。
			react.useEffect(() => {
				if (alertActive) {
					if (!alertDismissed.current) {
						setAlertModalOpen(true);
						alertDismissed.current = true;
					}
				} else {
					alertDismissed.current = false;
				}
			}, [alertActive]);
			// 模态打开时支持 ESC 关闭。
			react.useEffect(() => {
				if (!alertModalOpen) return;
				const onKey = (event) => {
					if (event.key === "Escape") setAlertModalOpen(false);
				};
				document.addEventListener("keydown", onKey);
				return () => document.removeEventListener("keydown", onKey);
			}, [alertModalOpen]);
			// 设置中的告警线变化时同步输入框草稿。
			react.useEffect(() => {
				setThresholdDraft(String(settings.alertThreshold));
			}, [settings.alertThreshold]);
			// 首次运行且无任何历史记录时，自动播种 24 小时演示数据（便于立刻查看图表效果）。
			react.useEffect(() => {
				if (seededRef.current) return;
				if (loadHours().length > 0 || !SEED_DEMO_ON_FIRST_RUN) {
					seededRef.current = true;
					return;
				}
				if (!Number.isFinite(total)) return;
				seededRef.current = true;
				const rows = buildDemoHours(total, Date.now());
				saveHours(rows);
				setHours(rows);
			}, [total]);
			const hasDemoRows = hours.some((item) => item.demo === true);
			const badgeMoney = hasMoney ? `${symbol}${formatMoney(total)}` : (state.status === "error" ? "查询失败" : "…");
			const badgeTitle = hasMoney
				? `DeepSeek 余额：${symbol}${formatMoney(total)}${alertActive ? `（已低于告警线 ${symbol}${formatMoney(settings.alertThreshold)}）` : ""}`
				: "DeepSeek 余额";
			const barIdle = state.status === "error";
			return jsxRuntime.jsxs("div", {
				className: wide ? "dsb_layer" : "dsb_layer dsb_rail",
				style: cssVars,
				children: [
					open && jsxRuntime.jsxs("section", {
						className: "dsb_panel",
						"data-dsb-panel": true,
						"aria-label": "DeepSeek 账户余额",
						ref: panelRef,
						children: [
							jsxRuntime.jsxs("header", {
								className: "dsb_header",
								children: [
									jsxRuntime.jsx("span", { className: "dsb_title", children: "DeepSeek 余额" }),
									jsxRuntime.jsx("button", {
										type: "button",
										className: "dsb_link",
										"aria-label": "打开官方后台用量明细",
										title: "官方后台（用量明细）",
										onClick: () => {
											// 跳转 DeepSeek 开放平台官方用量页，精确数据以官方后台为准。
											window.open("https://platform.deepseek.com/usage", "_blank", "noopener");
										},
										children: "↗"
									}),
									jsxRuntime.jsx("button", {
										type: "button",
										className: "dsb_gear",
										"data-on": settingsOpen || void 0,
										"aria-label": "设置",
										"aria-expanded": settingsOpen,
										title: "设置",
										onClick: () => setSettingsOpen((value) => !value),
										children: "⚙"
									}),
									jsxRuntime.jsx("button", {
										type: "button",
										className: "dsb_refresh",
										"aria-label": "刷新",
										title: "刷新",
										disabled: state.status === "loading" || state.status === "refreshing",
										onClick: () => load(),
										children: "↻"
									}),
									jsxRuntime.jsx("button", {
										type: "button",
										className: "dsb_close",
										"aria-label": "关闭",
										onClick: () => setOpen(false),
										children: "✕"
									})
								]
							}),
							jsxRuntime.jsxs("div", {
								className: "dsb_body",
								children: [
									state.status === "error" && jsxRuntime.jsx("p", {
										className: "dsb_error",
										role: "alert",
										children: `查询失败：${state.error}`
									}),
									state.data === null && state.status !== "error" && jsxRuntime.jsx("p", {
										className: "dsb_note",
										children: "正在查询余额…"
									}),
									state.data !== null && jsxRuntime.jsxs(jsxRuntime.Fragment, {
										children: [
											jsxRuntime.jsxs("div", {
												className: "dsb_totalRow",
												children: [
													jsxRuntime.jsx("span", { className: "dsb_totalLabel", children: "总余额" }),
													jsxRuntime.jsx("span", {
														className: "dsb_total",
														children: hasMoney ? `${symbol}${formatMoney(total)}` : "--"
													})
												]
											}),
											jsxRuntime.jsx("div", {
												className: "dsb_bar dsb_barBig",
												"aria-hidden": true,
												children: renderWaves(theme)
											}),
											alertActive && jsxRuntime.jsx("p", {
												className: "dsb_error",
												role: "alert",
												children: `⚠️ 余额已低于告警线 ${symbol}${formatMoney(settings.alertThreshold)}，请及时充值`
											}),
											jsxRuntime.jsxs("ul", {
												className: "dsb_rows",
												children: [
													jsxRuntime.jsxs("li", { className: "dsb_row", children: [jsxRuntime.jsx("span", { className: "dsb_rowLabel", children: "充值余额" }), jsxRuntime.jsx("span", { className: "dsb_rowValue", children: Number.isFinite(topped) ? `${symbol}${formatMoney(topped)}` : "--" })] })
												]
											}),
											jsxRuntime.jsxs("div", {
												className: "dsb_chartWrap",
												children: [
													jsxRuntime.jsxs("div", {
														className: "dsb_chartHead",
														children: [
															jsxRuntime.jsx("span", { className: "dsb_chartTitle", children: "每小时用量（估算）" }),
															jsxRuntime.jsx("span", { className: "dsb_chartTotal", children: `今日 ${symbol}${formatMoney(todayTotal)}` })
														]
													}),
													jsxRuntime.jsx("div", {
														className: "dsb_chart",
														"aria-hidden": true,
														children: [
															columns.map((col, index) => {
																const pct = maxConsumed > 0 && col.consumed > 0 ? Math.max(6, (col.consumed / maxConsumed) * 100) : 0;
																return jsxRuntime.jsx("div", {
																	className: "dsb_col",
																	"data-hover": hoverIndex === index || void 0,
																	onMouseEnter: () => setHoverIndex(index),
																	onMouseLeave: () => setHoverIndex(null),
																	children: col.consumed > 0.001
																		? jsxRuntime.jsx("div", {
																			className: "dsb_colFill",
																			"data-current": col.current || void 0,
																			style: {
																				height: `${pct}%`,
																				background: `linear-gradient(180deg, ${(col.current ? theme.colCurrent : theme.col).join(",")})`
																			}
																		})
																		: jsxRuntime.jsx("div", { className: "dsb_colEmpty" })
																}, col.ts);
															}),
															hoverIndex !== null && columns[hoverIndex] !== undefined && jsxRuntime.jsxs("div", {
																className: "dsb_tip",
																style: {
																	left: `${Math.min(Math.max(((hoverIndex + 0.5) / columns.length) * 100, 12), 88)}%`
																},
																children: [
																	jsxRuntime.jsx("span", { className: "dsb_tipTime", children: hourLabel(columns[hoverIndex].ts, columns[hoverIndex].current) }),
																	jsxRuntime.jsx("span", { children: `${symbol}${formatMoney(columns[hoverIndex].consumed)}` })
																]
															})
														]
													}),
													jsxRuntime.jsxs("div", {
														className: "dsb_chartAxis",
														children: [
															jsxRuntime.jsx("span", { children: `${new Date(columns[0].ts).getHours()}时` }),
															jsxRuntime.jsx("span", { children: `${new Date(columns[6].ts).getHours()}时` }),
															jsxRuntime.jsx("span", { children: `${new Date(columns[12].ts).getHours()}时` }),
															jsxRuntime.jsx("span", { children: `${new Date(columns[18].ts).getHours()}时` }),
															jsxRuntime.jsx("span", { children: "现在" })
														]
													}),
													jsxRuntime.jsx("p", {
														className: "dsb_chartNote",
														children: hasDemoRows
															? "图表含演示数据，将随真实采样自然覆盖；数据仅存本浏览器，清理缓存会丢失，精确用量以官方后台为准"
															: "按余额变化本地估算，数据仅存本浏览器（清理缓存会丢失）；精确用量以官方后台为准"
													})
												]
											}),
											settingsOpen && jsxRuntime.jsxs("div", {
												className: "dsb_settings",
												children: [
													jsxRuntime.jsxs("div", {
														className: "dsb_setRow",
														children: [
															jsxRuntime.jsx("span", { className: "dsb_setLabel", children: "颜色" }),
															jsxRuntime.jsx("div", {
																className: "dsb_setChips",
																children: Object.entries(THEMES).map(([key, item]) => jsxRuntime.jsx("button", {
																	type: "button",
																	className: "dsb_setChip",
																	"data-on": settings.theme === key || void 0,
																	onClick: () => updateSettings({ theme: key }),
																	children: item.name
																}, key))
															})
														]
													}),
													jsxRuntime.jsxs("div", {
														className: "dsb_setRow",
														children: [
															jsxRuntime.jsx("span", { className: "dsb_setLabel", children: "动画速度" }),
															jsxRuntime.jsx("div", {
																className: "dsb_setChips",
																children: Object.entries(SPEEDS).map(([key, item]) => jsxRuntime.jsx("button", {
																	type: "button",
																	className: "dsb_setChip",
																	"data-on": settings.speed === key || void 0,
																	onClick: () => updateSettings({ speed: key }),
																	children: item.label
																}, key))
															})
														]
													}),
													jsxRuntime.jsxs("div", {
														className: "dsb_setRow",
														children: [
															jsxRuntime.jsx("span", { className: "dsb_setLabel", children: "余额刷新" }),
															jsxRuntime.jsx("div", {
																className: "dsb_setChips",
																children: REFRESH_OPTIONS.map((item) => jsxRuntime.jsx("button", {
																	type: "button",
																	className: "dsb_setChip",
																	"data-on": settings.refreshMs === item.ms || void 0,
																	onClick: () => updateSettings({ refreshMs: item.ms }),
																	children: item.label
																}, item.label))
															})
														]
													}),
													jsxRuntime.jsxs("div", {
														className: "dsb_setRow",
														children: [
															jsxRuntime.jsx("span", { className: "dsb_setLabel", children: "余额告警" }),
															jsxRuntime.jsx("div", {
																className: "dsb_setChips",
																children: [
																	jsxRuntime.jsx("button", {
																		type: "button",
																		className: "dsb_setChip",
																		"data-on": settings.alertEnabled || void 0,
																		onClick: () => updateSettings({ alertEnabled: true }),
																		children: "开启"
																	}, "alert-on"),
																	jsxRuntime.jsx("button", {
																		type: "button",
																		className: "dsb_setChip",
																		"data-on": settings.alertEnabled ? void 0 : true,
																		onClick: () => updateSettings({ alertEnabled: false }),
																		children: "关闭"
																	}, "alert-off")
																]
															}),
															jsxRuntime.jsxs("div", {
																className: "dsb_alertInputRow",
																children: [
																	jsxRuntime.jsx("span", { children: "告警线" }),
																	jsxRuntime.jsx("input", {
																		className: "dsb_input",
																		type: "number",
																		min: "0",
																		step: "1",
																		value: thresholdDraft,
																		onChange: (event) => setThresholdDraft(event.target.value),
																		onBlur: () => {
																			const value = Number(thresholdDraft);
																			if (Number.isFinite(value) && value >= 0) {
																				updateSettings({ alertThreshold: value });
																			} else {
																				setThresholdDraft(String(settings.alertThreshold));
																			}
																		}
																	}),
																	jsxRuntime.jsx("span", { children: "元" })
																]
															})
														]
													}),
													jsxRuntime.jsxs("div", {
														className: "dsb_setRow",
														children: [
															jsxRuntime.jsx("span", { className: "dsb_setLabel", children: "卸载" }),
															jsxRuntime.jsx("button", {
																type: "button",
																className: "dsb_uninstall",
																disabled: uninstallState === "busy",
																onClick: () => handleUninstall(),
																children: uninstallState === "busy" ? "卸载中…" : "卸载插件"
															})
														]
													})
												]
											}),
											unavailable && jsxRuntime.jsx("p", { className: "dsb_error", children: "账户当前不可用（is_available=false）" })
										]
									}),
									state.at > 0 && jsxRuntime.jsxs("p", {
										className: "dsb_note",
										children: [
											`更新时间 ${new Date(state.at).toLocaleTimeString("zh-CN")}`,
											` · 每 ${Math.round(settings.refreshMs / 1000)} 秒自动更新`
										]
									})
								]
							})
						]
					}),
					jsxRuntime.jsxs("button", {
						type: "button",
						className: "dsb_badge",
						"data-dsb-badge": true,
						"data-dsb-error": state.status === "error" || void 0,
						"data-dsb-alert": alertActive || void 0,
						"data-active": open || void 0,
						"aria-label": badgeTitle,
						"aria-expanded": open,
						title: badgeTitle,
						ref: badgeRef,
						onClick: () => setOpen((value) => !value),
						children: [
							wide && jsxRuntime.jsx("span", {
								className: "dsb_icon",
								"aria-hidden": true,
								style: { background: `linear-gradient(135deg, ${theme.icon.join(",")})` },
								children: "¥"
							}),
							wide && jsxRuntime.jsxs("span", {
								className: "dsb_main",
								children: [
									jsxRuntime.jsxs("span", {
										className: "dsb_row1",
										children: [
											jsxRuntime.jsx("span", { className: "dsb_label", children: "总余额" }),
											jsxRuntime.jsx("span", {
												className: state.status === "error" ? "dsb_count dsb_countError" : "dsb_count",
												children: badgeMoney
											})
										]
									}),
									jsxRuntime.jsx("span", {
										className: "dsb_bar",
										"aria-hidden": true,
										children: barIdle ? null : renderWaves(theme)
									})
								]
							}),
							!wide && jsxRuntime.jsx("span", {
								className: "dsb_railWaves",
								"aria-hidden": true,
								children: barIdle ? null : renderWaves(theme)
							}),
							!wide && jsxRuntime.jsx("span", {
								className: "dsb_railAmount",
								children: badgeMoney
							})
						]
					}),
					alertModalOpen && jsxRuntime.jsxs("div", {
						className: "dsb_modalMask",
						// 点击遮罩空白处关闭；点模态内容不关闭（target===currentTarget 判定）。
						onMouseDown: (event) => {
							if (event.target === event.currentTarget) setAlertModalOpen(false);
						},
						children: [
							jsxRuntime.jsxs("div", {
								className: "dsb_modal",
								role: "alertdialog",
								"aria-modal": true,
								"aria-label": "余额不足提醒",
								children: [
									jsxRuntime.jsx("div", { className: "dsb_modalTitle", children: "⚠️ 余额不足提醒" }),
									jsxRuntime.jsx("p", {
										className: "dsb_modalBody",
										children: `当前余额 ${symbol}${formatMoney(total)}，已低于你设置的告警线 ${symbol}${formatMoney(settings.alertThreshold)}。请及时充值，避免影响使用。`
									}),
									jsxRuntime.jsxs("div", {
										className: "dsb_modalActions",
										children: [
											jsxRuntime.jsx("button", {
												type: "button",
												className: "dsb_modalBtn",
												onClick: () => setAlertModalOpen(false),
												children: "知道了"
											}),
											jsxRuntime.jsx("button", {
												type: "button",
												className: "dsb_modalBtn dsb_modalBtnPrimary",
												onClick: () => {
													window.open("https://platform.deepseek.com/top_up", "_blank", "noopener");
													setAlertModalOpen(false);
												},
												children: "去充值"
											})
										]
									})
								]
							})
						]
					})
				]
			});
		}
		//#endregion
		//#region 客户端插件主体
		/** 所需客户端服务：slots（挂载侧栏底部入口）。 */
		const inject = ["slots"];
		/**
		 * 客户端插件入口：把余额波浪能量条注册到侧栏底部操作区。
		 * 注册失败只记录错误、不抛异常——UI 插件故障不应拖垮整个 GUI boot
		 * （shell 的 boot 是 fail-loud 的，任何 fiber 失败都会白屏）。
		 * @param {object} ctx - 客户端根上下文。
		 */
		function apply(ctx) {
			try {
				ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
					name: "sidebar.footer.action",
					id: "ds-balance",
					order: -10
				}, BalancePanel));
			} catch (error) {
				console.error("dsh-ds-balance: 挂载余额面板失败", error);
			}
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map
