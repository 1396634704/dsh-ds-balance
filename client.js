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
		const css = ".dsb_layer{flex:none;align-items:center;width:100%;margin:8px 0 0;display:flex;position:relative}.dsb_layer.dsb_rail{width:52px;margin:0;justify-content:center}.dsb_badge{box-sizing:border-box;width:100%;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:none;border-radius:12px;align-items:center;gap:8px;padding:7px 10px 7px 8px;font-family:inherit;font-size:14px;display:flex;overflow:hidden;text-align:left}.dsb_badge:hover{background:var(--dsw-alias-interactive-bg-hover-solid)}.dsb_badge[data-active]{background:var(--dsw-alias-interactive-bg-hover)}.dsb_icon{flex:none;width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,hsl(220,78%,62%),hsl(190,72%,54%),hsl(280,72%,62%),hsl(220,78%,62%));background-size:200% 200%;color:#fff;justify-content:center;align-items:center;font-size:12px;font-weight:700;line-height:1;display:inline-flex;animation:dsb-flow 11s linear infinite,dsb-breathe 4.2s ease-in-out infinite}.dsb_rail .dsb_badge{width:52px;height:20px;border-radius:10px;padding:0;position:relative}.dsb_rail .dsb_badge[data-dsb-error]{background:var(--dsw-alias-fill-l2)}.dsb_railWaves{position:absolute;inset:0;overflow:hidden;border-radius:10px}.dsb_railAmount{position:relative;z-index:1;color:#fff;font-size:9px;line-height:20px;font-variant-numeric:tabular-nums;text-shadow:0 0 3px rgba(0,0,0,.55),0 1px 2px rgba(0,0,0,.4);white-space:nowrap;pointer-events:none}.dsb_rail .dsb_badge[data-dsb-error] .dsb_railAmount{color:var(--dsw-alias-state-error-primary);text-shadow:none}.dsb_main{flex:1;min-width:0;flex-direction:column;gap:5px;display:flex}.dsb_row1{align-items:center;gap:6px;display:flex}.dsb_label{color:var(--dsw-alias-label-primary);font-size:12px;line-height:16px;white-space:nowrap}.dsb_count{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-size:12px;line-height:16px;white-space:nowrap}.dsb_countError{color:var(--dsw-alias-state-error-primary)}.dsb_bar{flex:none;width:100%;height:14px;border-radius:999px;background:var(--dsw-alias-fill-l2);overflow:hidden;position:relative}.dsb_waves{position:absolute;inset:0;animation:dsb-breathe 4.2s ease-in-out infinite}.dsb_wave{position:absolute;top:0;left:0;height:100%;width:200%;display:block}.dsb_waveBack{opacity:.42;animation:dsb-wave 7s linear infinite}.dsb_waveFront{opacity:.8;animation:dsb-wave 5.2s linear infinite reverse}.dsb_panel{z-index:30;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);width:320px;max-width:calc(100vw - 24px);box-shadow:var(--dsw-shadow-lv2);border-radius:12px;flex-direction:column;display:flex;position:fixed;bottom:76px;left:12px;overflow:hidden}.dsb_header{box-sizing:border-box;border-bottom:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);flex:none;justify-content:space-between;align-items:center;min-height:44px;padding:10px 12px;display:flex;gap:8px}.dsb_title{color:var(--dsw-alias-label-primary);font-size:13px;font-weight:500;line-height:20px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dsb_refresh{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:18px;cursor:pointer;background:0 0;border-radius:999px;padding:2px 10px;flex:none}.dsb_refresh:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.dsb_refresh:disabled{opacity:.4;cursor:default}.dsb_close{width:24px;height:24px;color:var(--dsw-alias-label-tertiary);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;font-size:14px;line-height:1;display:inline-flex;flex:none}.dsb_close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-secondary)}.dsb_body{flex-direction:column;gap:10px;padding:14px 12px 12px;display:flex}.dsb_totalRow{align-items:baseline;gap:8px;display:flex}.dsb_totalLabel{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px;flex:none}.dsb_total{color:var(--dsw-alias-label-primary);font-variant-numeric:tabular-nums;font-size:24px;font-weight:600;line-height:30px}.dsb_barBig{height:14px;flex:none}.dsb_rows{flex-direction:column;gap:2px;margin:0;padding:0;list-style:none;display:flex}.dsb_row{justify-content:space-between;align-items:center;min-height:26px;display:flex}.dsb_rowLabel{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.dsb_rowValue{color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;font-size:12px;line-height:18px}.dsb_error{color:var(--dsw-alias-state-error-primary);margin:0;font-size:12px;line-height:18px}.dsb_note{color:var(--dsw-alias-label-tertiary);margin:0;font-size:11px;line-height:16px}@keyframes dsb-wave{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}@keyframes dsb-breathe{0%{opacity:.72}35%{opacity:1}100%{opacity:.72}}@keyframes dsb-flow{0%{background-position:0% 50%}100%{background-position:100% 50%}}@media (prefers-reduced-motion:reduce){.dsb_wave,.dsb_waves,.dsb_icon{animation:none}}";
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
		/** 自动刷新间隔（毫秒）：用户要求 10 秒一次。 */
		const AUTO_REFRESH_MS = 10 * 1000;
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
		function renderWaves() {
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
											children: [
												jsxRuntime.jsx("stop", { offset: "0", stopColor: "hsl(216,72%,58%)" }),
												jsxRuntime.jsx("stop", { offset: "0.25", stopColor: "hsl(196,68%,52%)" }),
												jsxRuntime.jsx("stop", { offset: "0.5", stopColor: "hsl(176,62%,48%)" }),
												jsxRuntime.jsx("stop", { offset: "0.75", stopColor: "hsl(158,58%,48%)" }),
												jsxRuntime.jsx("stop", { offset: "1", stopColor: "hsl(216,72%,58%)" })
											]
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
											children: [
												jsxRuntime.jsx("stop", { offset: "0", stopColor: "hsl(232,70%,64%)" }),
												jsxRuntime.jsx("stop", { offset: "0.25", stopColor: "hsl(214,68%,60%)" }),
												jsxRuntime.jsx("stop", { offset: "0.5", stopColor: "hsl(252,65%,62%)" }),
												jsxRuntime.jsx("stop", { offset: "0.75", stopColor: "hsl(278,62%,60%)" }),
												jsxRuntime.jsx("stop", { offset: "1", stopColor: "hsl(232,70%,64%)" })
											]
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
			const inflight = react.useRef(null);
			const panelRef = react.useRef(null);
			const badgeRef = react.useRef(null);
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
			// 每 10 秒自动刷新。
			react.useEffect(() => {
				const timer = setInterval(load, AUTO_REFRESH_MS);
				return () => clearInterval(timer);
			}, [load]);
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
			const badgeMoney = hasMoney ? `${symbol}${formatMoney(total)}` : (state.status === "error" ? "查询失败" : "…");
			const badgeTitle = hasMoney ? `DeepSeek 余额：${symbol}${formatMoney(total)}` : "DeepSeek 余额";
			const barIdle = state.status === "error";
			return jsxRuntime.jsxs("div", {
				className: wide ? "dsb_layer" : "dsb_layer dsb_rail",
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
										className: "dsb_refresh",
										disabled: state.status === "loading" || state.status === "refreshing",
										onClick: () => load(),
										children: "刷新"
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
												children: renderWaves()
											}),
											jsxRuntime.jsxs("ul", {
												className: "dsb_rows",
												children: [
													jsxRuntime.jsxs("li", { className: "dsb_row", children: [jsxRuntime.jsx("span", { className: "dsb_rowLabel", children: "充值余额" }), jsxRuntime.jsx("span", { className: "dsb_rowValue", children: Number.isFinite(topped) ? `${symbol}${formatMoney(topped)}` : "--" })] })
												]
											}),
											unavailable && jsxRuntime.jsx("p", { className: "dsb_error", children: "账户当前不可用（is_available=false）" })
										]
									}),
									state.at > 0 && jsxRuntime.jsxs("p", {
										className: "dsb_note",
										children: [
											`更新时间 ${new Date(state.at).toLocaleTimeString("zh-CN")}`,
											" · 每 10 秒自动更新"
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
						"data-active": open || void 0,
						"aria-label": badgeTitle,
						"aria-expanded": open,
						title: badgeTitle,
						ref: badgeRef,
						onClick: () => setOpen((value) => !value),
						children: [
							wide && jsxRuntime.jsx("span", { className: "dsb_icon", "aria-hidden": true, children: "¥" }),
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
										children: barIdle ? null : renderWaves()
									})
								]
							}),
							!wide && jsxRuntime.jsx("span", {
								className: "dsb_railWaves",
								"aria-hidden": true,
								children: barIdle ? null : renderWaves()
							}),
							!wide && jsxRuntime.jsx("span", {
								className: "dsb_railAmount",
								children: badgeMoney
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
