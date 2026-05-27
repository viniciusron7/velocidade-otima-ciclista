

      const KMH = 3.6;
      const G = 9.81;

      function vLinearForce(t, m, F, b) {
        if (b <= 0) return (F * t) / m;
        const vinf = F / b;
        const tau = m / b;
        return vinf * (1 - Math.exp(-t / tau));
      }
      function xLinearForce(t, m, F, b) {
        if (b <= 0) return 0.5 * (F / m) * t * t;
        const vinf = F / b;
        const tau = m / b;
        return vinf * t - vinf * tau * (1 - Math.exp(-t / tau));
      }
      function aLinearForce(t, m, F, b) {
        const v = vLinearForce(t, m, F, b);
        return (F - b * v) / m;
      }

      function vQuadForce(t, m, F, c) {
        if (c <= 0) return (F * t) / m;
        const vinf = Math.sqrt(F / c);
        const tau = m / Math.sqrt(F * c);
        return vinf * Math.tanh(t / tau);
      }
      function xQuadForce(t, m, F, c) {
        if (c <= 0) return 0.5 * (F / m) * t * t;
        const vinf = Math.sqrt(F / c);
        const tau = m / Math.sqrt(F * c);
        return vinf * tau * Math.log(Math.cosh(t / tau));
      }
      function aQuadForce(t, m, F, c) {
        const v = vQuadForce(t, m, F, c);
        return (F - c * v * v) / m;
      }

      function vLinearPower(t, m, P, b) {
        if (b <= 0 || P <= 0) return 0;
        const vstar2 = P / b;
        const u = 1 - Math.exp((-2 * b * t) / m);
        return Math.sqrt(Math.max(vstar2 * u, 0));
      }

      function t95Numeric(vinf, m, P, c) {
        const target = 0.95 * vinf;
        let v = 1e-3,
          t = 0;
        const dt = 0.01;
        for (let i = 0; i < 100000; i++) {
          const fv = (vv) => (P / vv - c * vv * vv) / m;
          const k1 = fv(v);
          const k2 = fv(v + (dt * k1) / 2);
          const k3 = fv(v + (dt * k2) / 2);
          const k4 = fv(v + dt * k3);
          v += (dt * (k1 + 2 * k2 + 2 * k3 + k4)) / 6;
          t += dt;
          if (v >= target) return t;
          if (t > 2000) break;
        }
        return NaN;
      }

      const BIKE_STAGE_HTML =
        '<div class="bike-stage">' +
        '<div class="bike-riding">' +
        '<div class="cyclist">' +
        '<div class="bike">' +
        '<div class="leftTyre"></div>' +
        '<div class="rightTyre"></div>' +
        '<div class="wheel"></div>' +
        '<div class="pedals"></div>' +
        '<div class="chain"></div>' +
        "</div>" +
        '<div class="girl">' +
        '<div class="top"></div>' +
        '<div class="rightArm"></div>' +
        '<div class="leftArm"></div>' +
        '<div class="head"></div>' +
        '<div class="hair"></div>' +
        '<div class="strap"></div>' +
        '<div class="trousers">' +
        '<div class="leftLeg"><div class="leftcalf"></div></div>' +
        '<div class="rightLeg"><div class="calf"></div></div>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

      function injectBikes() {
        ["bike-L", "bike-Q", "hero-bike"].forEach((id) => {
          const el = document.getElementById(id);
          if (el && !el.querySelector(".bike-stage")) {
            el.insertAdjacentHTML("beforeend", BIKE_STAGE_HTML);
          }
        });
      }

      function updateBikeWheels(bikeEl, distancePx) {
        if (!bikeEl) return;
        const tyres = bikeEl.querySelectorAll(".leftTyre, .rightTyre");
        if (tyres.length === 0) return;
        const isHero = bikeEl.classList.contains("bike-icon-hero");
        const scale = isHero ? 0.42 : 0.3;
        const wheelRadiusPx = 85 * scale;
        if (wheelRadiusPx <= 0) return;
        const angleRad = distancePx / wheelRadiusPx;
        const angleDeg = (angleRad * 180) / Math.PI;
        const rot = "rotate(" + angleDeg.toFixed(2) + "deg)";
        tyres.forEach((t) => {
          t.style.transform = rot;
        });
      }

      const animState = {
        paused: true,
        dynElapsed: 0,
        heroElapsed: 0,
        lastDynFrameTime: null,
        lastHeroFrameTime: null,
      };

      function setPaused(paused) {
        if (animState.paused === paused) return;
        animState.paused = paused;
        animState.lastDynFrameTime = null;
        animState.lastHeroFrameTime = null;
        const btn = document.getElementById("playPauseBtn");
        if (!btn) return;
        btn.classList.toggle("paused", paused);
        btn.setAttribute("aria-pressed", paused ? "false" : "true");
        const icon = btn.querySelector(".pp-icon");
        const label = btn.querySelector(".pp-label");
        if (icon) icon.textContent = paused ? "▶" : "❚❚";
        if (label) label.textContent = paused ? "Play" : "Pause";
      }

      function animateHeroBike() {
        const bike = document.getElementById("hero-bike");
        if (!bike) return;
        const scene = bike.parentElement;
        if (!scene) return;
        const cycleMs = 8500;

        function frame(now) {
          if (animState.lastHeroFrameTime !== null && !animState.paused) {
            animState.heroElapsed =
              (animState.heroElapsed + (now - animState.lastHeroFrameTime)) %
              cycleMs;
          }
          animState.lastHeroFrameTime = now;

          const frac = animState.heroElapsed / cycleMs;
          const sceneW = scene.clientWidth;
          const bikeW = bike.clientWidth || 160;
          const startX = -bikeW - 8;
          const endX = sceneW + 8;
          const xPx = startX + frac * (endX - startX);
          bike.style.left = xPx + "px";

          const travel = xPx - startX;
          updateBikeWheels(bike, travel);

          requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      }

      const COL = {
        paper: "rgba(0,0,0,0)",
        plot: "rgba(0,0,0,0)",
        text: "#3d3a35",
        grid: "#e2dccb",
        zero: "#9b937d",
        line: "#9b937d",
        legendBg: "rgba(255, 254, 248, 0.92)",
        legendBorder: "#cfc9b8",
        hoverBg: "#fbfaf4",
        hoverBorder: "#cfc9b8",
        hoverText: "#1c1a17",
        linear: "#1d3f7a",
        quadratic: "#7a1f1f",
        gold: "#8a5a18",
        accent: "#2a4a7a",
        green: "#2e5d2a",
      };

      function baseLayout(extras = {}) {
        return Object.assign(
          {
            paper_bgcolor: COL.paper,
            plot_bgcolor: COL.plot,
            font: {
              color: COL.text,
              family: '"EB Garamond", Georgia, serif',
              size: 15,
            },
            margin: { t: 18, r: 22, b: 58, l: 70 },
            xaxis: {
              gridcolor: COL.grid,
              zerolinecolor: COL.zero,
              linecolor: COL.line,
              tickfont: {
                family: '"Inter", sans-serif',
                size: 13,
                color: COL.text,
              },
              title: {
                font: {
                  family: '"EB Garamond", serif',
                  size: 17,
                  color: COL.text,
                },
              },
            },
            yaxis: {
              gridcolor: COL.grid,
              zerolinecolor: COL.zero,
              linecolor: COL.line,
              tickfont: {
                family: '"Inter", sans-serif',
                size: 13,
                color: COL.text,
              },
              title: {
                font: {
                  family: '"EB Garamond", serif',
                  size: 17,
                  color: COL.text,
                },
              },
            },
            legend: {
              bgcolor: COL.legendBg,
              bordercolor: COL.legendBorder,
              borderwidth: 1,
              font: {
                family: '"EB Garamond", serif',
                size: 17,
                color: COL.text,
              },
            },
            hoverlabel: {
              bgcolor: COL.hoverBg,
              bordercolor: COL.hoverBorder,
              font: {
                color: COL.hoverText,
                family: '"EB Garamond", serif',
                size: 14,
              },
            },
          },
          extras,
        );
      }

      const dynState = {
        mode: "F",
        m: 75,
        F: 18,
        P: 250,
        b: 1.32,
        c: 0.165,
        tmax: 120,
        plotKind: "vt",
        N: 220,
      };

      function setVal(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
      }

      function formatNum(x, dp = 2) {
        if (!isFinite(x)) return "—";
        return x.toFixed(dp);
      }

      function buildDynData() {
        const { m, F, P, b, c, tmax, mode, N } = dynState;
        const ts = [];
        for (let i = 0; i <= N; i++) ts.push((i / N) * tmax);

        let vL, vQ, xL, xQ, aL, aQ, pL, pQ;

        if (mode === "F") {
          vL = ts.map((t) => vLinearForce(t, m, F, b));
          vQ = ts.map((t) => vQuadForce(t, m, F, c));
          xL = ts.map((t) => xLinearForce(t, m, F, b));
          xQ = ts.map((t) => xQuadForce(t, m, F, c));
          aL = ts.map((t) => aLinearForce(t, m, F, b));
          aQ = ts.map((t) => aQuadForce(t, m, F, c));
          pL = vL.map((v) => b * v * v);
          pQ = vQ.map((v) => c * v * v * v);
        } else {
          vL = ts.map((t) => vLinearPower(t, m, P, b));
          vQ = new Array(ts.length).fill(0);
          xQ = new Array(ts.length).fill(0);
          let vCur = 1e-3,
            xCur = 0;
          vQ[0] = 0;
          xQ[0] = 0;
          const dt = tmax / N;
          for (let i = 0; i < N; i++) {
            const fv = (vv) => (P / vv - c * vv * vv) / m;
            const k1 = fv(vCur);
            const k2 = fv(vCur + (dt * k1) / 2);
            const k3 = fv(vCur + (dt * k2) / 2);
            const k4 = fv(vCur + dt * k3);
            const vMid = vCur + (dt * (k1 + 2 * k2 + 2 * k3 + k4)) / 6;
            xCur += 0.5 * (vCur + vMid) * dt;
            vCur = Math.max(1e-6, vMid);
            vQ[i + 1] = vCur;
            xQ[i + 1] = xCur;
          }
          xL = new Array(ts.length).fill(0);
          for (let i = 1; i < ts.length; i++) {
            xL[i] = xL[i - 1] + 0.5 * (vL[i - 1] + vL[i]) * (ts[i] - ts[i - 1]);
          }
          aL = vL.map((v, i) => (v > 1e-6 ? (P / v - b * v) / m : 0));
          aQ = vQ.map((v, i) => (v > 1e-6 ? (P / v - c * v * v) / m : 0));
          pL = vL.map((v) => b * v * v);
          pQ = vQ.map((v) => c * v * v * v);
        }

        return { ts, vL, vQ, xL, xQ, aL, aQ, pL, pQ };
      }

      function updateDynStats() {
        const { m, F, P, b, c, mode } = dynState;
        let vinfL, vinfQ, tauL, tauQ, t95L, t95Q;
        if (mode === "F") {
          vinfL = F / b;
          vinfQ = Math.sqrt(F / c);
          tauL = m / b;
          tauQ = m / (c * vinfQ);
          t95L = tauL * Math.log(20);
          t95Q = tauQ * Math.atanh(0.95);
        } else {
          vinfL = Math.sqrt(P / b);
          vinfQ = Math.cbrt(P / c);
          tauL = m / (2 * b);
          tauQ = m / (3 * c * vinfQ * vinfQ);
          t95L = tauL * Math.log(1 / (1 - 0.9025));
          t95Q = t95Numeric(vinfQ, m, P, c);
        }
        setVal("st-vinf-L", formatNum(vinfL, 2) + " m/s");
        setVal("st-vinf-Q", formatNum(vinfQ, 2) + " m/s");
        setVal("st-tau-L", formatNum(tauL, 1) + " s");
        setVal("st-tau-Q", formatNum(tauQ, 1) + " s");
        setVal("st-t95-L", formatNum(t95L, 1) + " s");
        setVal("st-t95-Q", formatNum(t95Q, 1) + " s");
        setVal("st-vinf-Lkmh", formatNum(vinfL * KMH, 1) + " km/h");
        setVal("st-vinf-Qkmh", formatNum(vinfQ * KMH, 1) + " km/h");
      }

      function plotDynamics() {
        const data = buildDynData();
        const { ts, vL, vQ, xL, xQ, aL, aQ, pL, pQ } = data;
        const kind = dynState.plotKind;
        let yL, yQ, yLabel;
        if (kind === "vt") {
          yL = vL;
          yQ = vQ;
          yLabel = "v (m/s)";
        } else if (kind === "xt") {
          yL = xL;
          yQ = xQ;
          yLabel = "x (m)";
        } else if (kind === "at") {
          yL = aL;
          yQ = aQ;
          yLabel = "a (m/s²)";
        } else {
          yL = pL;
          yQ = pQ;
          yLabel = "P (W)";
        }

        const traces = [
          {
            x: ts,
            y: yL,
            mode: "lines",
            name: "Modelo I  (F ∝ v)",
            line: { color: COL.linear, width: 2.2, shape: "spline" },
            hovertemplate:
              "<b>Modelo I</b><br>t = %{x:.1f} s<br>" +
              yLabel.replace(/\(.*\)/, "").trim() +
              " = %{y:.2f}<extra></extra>",
          },
          {
            x: ts,
            y: yQ,
            mode: "lines",
            name: "Modelo II  (F ∝ v²)",
            line: {
              color: COL.quadratic,
              width: 2.2,
              shape: "spline",
              dash: "solid",
            },
            hovertemplate:
              "<b>Modelo II</b><br>t = %{x:.1f} s<br>" +
              yLabel.replace(/\(.*\)/, "").trim() +
              " = %{y:.2f}<extra></extra>",
          },
        ];

        if (kind === "vt") {
          const { m, F, P, b, c, mode } = dynState;
          const vinfL = mode === "F" ? F / b : Math.sqrt(P / b);
          const vinfQ = mode === "F" ? Math.sqrt(F / c) : Math.cbrt(P / c);
          traces.push({
            x: [ts[0], ts[ts.length - 1]],
            y: [vinfL, vinfL],
            mode: "lines",
            showlegend: false,
            line: { color: COL.linear, width: 1, dash: "dot" },
            hoverinfo: "skip",
          });
          traces.push({
            x: [ts[0], ts[ts.length - 1]],
            y: [vinfQ, vinfQ],
            mode: "lines",
            showlegend: false,
            line: { color: COL.quadratic, width: 1, dash: "dot" },
            hoverinfo: "skip",
          });
        }

        const layout = baseLayout({
          xaxis: Object.assign({}, baseLayout().xaxis, {
            title: {
              text: "t (s)",
              font: {
                family: '"EB Garamond", serif',
                size: 17,
                color: COL.text,
              },
            },
          }),
          yaxis: Object.assign({}, baseLayout().yaxis, {
            title: {
              text: yLabel,
              font: {
                family: '"EB Garamond", serif',
                size: 17,
                color: COL.text,
              },
            },
          }),
          legend: Object.assign({}, baseLayout().legend, {
            x: 0.99,
            y: 0.02,
            xanchor: "right",
            yanchor: "bottom",
          }),
          hovermode: "x unified",
        });

        Plotly.react("plot-dynamics", traces, layout, {
          displayModeBar: false,
          responsive: true,
        });

        animateBike(data);
      }

      function animateBike(data) {
        const xMax = Math.max(
          data.xL[data.xL.length - 1],
          data.xQ[data.xQ.length - 1],
          1,
        );
        document.getElementById("scale-marker").textContent =
          "escala: " +
          (xMax > 1000
            ? (xMax / 1000).toFixed(2) + " km"
            : xMax.toFixed(0) + " m");

        if (dynState._raf) cancelAnimationFrame(dynState._raf);

        animState.dynElapsed = 0;
        animState.lastDynFrameTime = null;

        const duration = 6500;
        const ts = data.ts;

        function frame(now) {
          if (animState.lastDynFrameTime !== null && !animState.paused) {
            animState.dynElapsed =
              (animState.dynElapsed + (now - animState.lastDynFrameTime)) %
              duration;
          }
          animState.lastDynFrameTime = now;

          const frac = animState.dynElapsed / duration;
          const idx = Math.min(
            ts.length - 1,
            Math.floor(frac * (ts.length - 1)),
          );
          const xL = data.xL[idx],
            xQ = data.xQ[idx];
          const pctL = Math.min(100, (xL / xMax) * 92);
          const pctQ = Math.min(100, (xQ / xMax) * 92);

          const bL = document.getElementById("bike-L");
          const bQ = document.getElementById("bike-Q");
          const tL = document.getElementById("trail-L");
          const tQ = document.getElementById("trail-Q");

          if (bL) bL.style.left = pctL + "%";
          if (bQ) bQ.style.left = pctQ + "%";
          if (tL) tL.style.width = pctL + "%";
          if (tQ) tQ.style.width = pctQ + "%";

          const canvas = bL ? bL.parentElement : null;
          if (canvas) {
            const cw = canvas.clientWidth;
            const distLpx = (pctL / 100) * cw;
            const distQpx = (pctQ / 100) * cw;
            updateBikeWheels(bL, distLpx);
            updateBikeWheels(bQ, distQpx);
          }

          dynState._raf = requestAnimationFrame(frame);
        }
        dynState._raf = requestAnimationFrame(frame);
      }

      function updateDynamics() {
        setVal("val-m", formatNum(dynState.m, 1) + " kg");
        setVal("val-F", formatNum(dynState.F, 1) + " N");
        setVal("val-P", formatNum(dynState.P, 0) + " W");
        setVal("val-b", formatNum(dynState.b, 2) + " N·s/m");
        setVal("val-c", formatNum(dynState.c, 3) + " N·s²/m²");
        setVal("val-tmax", formatNum(dynState.tmax, 0) + " s");
        updateDynStats();
        plotDynamics();
      }

      function bindRange(id, prop) {
        const el = document.getElementById(id);
        el.addEventListener("input", (e) => {
          dynState[prop] = parseFloat(e.target.value);
          setPaused(true);
          updateDynamics();
        });
      }
      bindRange("sl-m", "m");
      bindRange("sl-F", "F");
      bindRange("sl-P", "P");
      bindRange("sl-b", "b");
      bindRange("sl-c", "c");
      bindRange("sl-tmax", "tmax");

      document.getElementById("modeForce").addEventListener("click", () => {
        dynState.mode = "F";
        document.getElementById("modeForce").classList.add("active");
        document.getElementById("modePower").classList.remove("active");
        document.getElementById("rowF").style.display = "";
        document.getElementById("rowP").style.display = "none";
        setPaused(true);
        updateDynamics();
      });
      document.getElementById("modePower").addEventListener("click", () => {
        dynState.mode = "P";
        document.getElementById("modePower").classList.add("active");
        document.getElementById("modeForce").classList.remove("active");
        document.getElementById("rowF").style.display = "none";
        document.getElementById("rowP").style.display = "";
        setPaused(true);
        updateDynamics();
      });

      const playPauseBtn = document.getElementById("playPauseBtn");
      if (playPauseBtn) {
        playPauseBtn.addEventListener("click", () => {
          setPaused(!animState.paused);
        });
      }

      document.querySelectorAll(".plot-tab").forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll(".plot-tab")
            .forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          dynState.plotKind = btn.dataset.plot;
          plotDynamics();
        });
      });

      const enState = {
        P0: 80,
        b: 1.32,
        c: 0.165,
        Fr: 2.35,
        showLin: true,
        showQuad: true,
        showP0: true,
      };

      function eDLinear(v, P0, b, Fr, withP0) {
        return (withP0 ? P0 / v : 0) + Fr + b * v;
      }
      function eDQuad(v, P0, c, Fr, withP0) {
        return (withP0 ? P0 / v : 0) + Fr + c * v * v;
      }

      function plotEnergy() {
        const { P0, b, c, Fr, showLin, showQuad, showP0 } = enState;
        const vMin = 0.5,
          vMax = 20;
        const N = 400;
        const vs = [];
        for (let i = 0; i <= N; i++) vs.push(vMin + (i / N) * (vMax - vMin));

        const eL = vs.map((v) => eDLinear(v, P0, b, Fr, showP0));
        const eQ = vs.map((v) => eDQuad(v, P0, c, Fr, showP0));

        const vStarL = Math.sqrt(P0 / b);
        const vStarQ = Math.cbrt(P0 / (2 * c));
        const eStarL = showP0 ? 2 * Math.sqrt(P0 * b) + Fr : Fr + b * vMin;
        const eStarQ = showP0
          ? (3 / Math.pow(2, 2 / 3)) *
              Math.pow(P0, 2 / 3) *
              Math.pow(c, 1 / 3) +
            Fr
          : Fr + c * vMin * vMin;

        const traces = [];
        if (showLin) {
          traces.push({
            x: vs,
            y: eL,
            mode: "lines",
            name: "Modelo I:  P₀/v + F_r + bv",
            line: { color: COL.linear, width: 2.4 },
            hovertemplate:
              "<b>Modelo I</b><br>v = %{x:.2f} m/s<br>E/d = %{y:.2f} J/m<extra></extra>",
          });
          if (showP0 && vStarL > vMin && vStarL < vMax) {
            traces.push({
              x: [vStarL],
              y: [eStarL],
              mode: "markers+text",
              showlegend: false,
              marker: {
                color: COL.gold,
                size: 10,
                line: { color: COL.linear, width: 1.5 },
                symbol: "diamond",
              },
              text: ["  v*"],
              textposition: "middle right",
              textfont: {
                color: COL.gold,
                size: 16,
                family: '"EB Garamond", serif',
              },
              hovertemplate:
                "v*_lin = %{x:.2f} m/s<br>E/d* = %{y:.2f} J/m<extra></extra>",
            });
          }
        }
        if (showQuad) {
          traces.push({
            x: vs,
            y: eQ,
            mode: "lines",
            name: "Modelo II:  P₀/v + F_r + cv²",
            line: { color: COL.quadratic, width: 2.4 },
            hovertemplate:
              "<b>Modelo II</b><br>v = %{x:.2f} m/s<br>E/d = %{y:.2f} J/m<extra></extra>",
          });
          if (showP0 && vStarQ > vMin && vStarQ < vMax) {
            traces.push({
              x: [vStarQ],
              y: [eStarQ],
              mode: "markers+text",
              showlegend: false,
              marker: {
                color: COL.gold,
                size: 10,
                line: { color: COL.quadratic, width: 1.5 },
                symbol: "diamond",
              },
              text: ["  v*"],
              textposition: "middle right",
              textfont: {
                color: COL.gold,
                size: 16,
                family: '"EB Garamond", serif',
              },
              hovertemplate:
                "v*_quad = %{x:.2f} m/s<br>E/d* = %{y:.2f} J/m<extra></extra>",
            });
          }
        }

        const layout = baseLayout({
          xaxis: Object.assign({}, baseLayout().xaxis, {
            title: {
              text: "v (m/s)",
              font: {
                family: '"EB Garamond", serif',
                size: 17,
                color: COL.text,
              },
            },
            range: [0, vMax],
          }),
          yaxis: Object.assign({}, baseLayout().yaxis, {
            title: {
              text: "E/d (J/m)",
              font: {
                family: '"EB Garamond", serif',
                size: 17,
                color: COL.text,
              },
            },
            range: [
              0,
              Math.max(50, Math.min(2 * Math.max(eStarL, eStarQ), 200)),
            ],
          }),
          legend: Object.assign({}, baseLayout().legend, {
            x: 0.99,
            y: 0.98,
            xanchor: "right",
            yanchor: "top",
          }),
          hovermode: "x unified",
        });

        Plotly.react("plot-energy", traces, layout, {
          displayModeBar: false,
          responsive: true,
        });

        setVal("opt-vL", showP0 ? formatNum(vStarL, 2) + " m/s" : "—");
        setVal("opt-vQ", showP0 ? formatNum(vStarQ, 2) + " m/s" : "—");
        setVal("opt-EL", showP0 ? formatNum(eStarL, 2) + " J/m" : "—");
        setVal("opt-EQ", showP0 ? formatNum(eStarQ, 2) + " J/m" : "—");
        setVal(
          "opt-vLkmh",
          showP0 ? formatNum(vStarL * KMH, 1) + " km/h" : "—",
        );
        setVal(
          "opt-vQkmh",
          showP0 ? formatNum(vStarQ * KMH, 1) + " km/h" : "—",
        );
      }

      function updateEnergy() {
        setVal("val-P0", formatNum(enState.P0, 0) + " W");
        setVal("val-bE", formatNum(enState.b, 2) + " N·s/m");
        setVal("val-cE", formatNum(enState.c, 3) + " N·s²/m²");
        setVal("val-Fr", formatNum(enState.Fr, 2) + " N");
        plotEnergy();
      }

      document.getElementById("en-P0").addEventListener("input", (e) => {
        enState.P0 = parseFloat(e.target.value);
        updateEnergy();
      });
      document.getElementById("en-b").addEventListener("input", (e) => {
        enState.b = parseFloat(e.target.value);
        updateEnergy();
      });
      document.getElementById("en-c").addEventListener("input", (e) => {
        enState.c = parseFloat(e.target.value);
        updateEnergy();
      });
      document.getElementById("en-Fr").addEventListener("input", (e) => {
        enState.Fr = parseFloat(e.target.value);
        updateEnergy();
      });

      document.getElementById("toggleLin").addEventListener("click", () => {
        enState.showLin = !enState.showLin;
        document
          .getElementById("toggleLin")
          .classList.toggle("active", enState.showLin);
        plotEnergy();
      });
      document.getElementById("toggleQuad").addEventListener("click", () => {
        enState.showQuad = !enState.showQuad;
        document
          .getElementById("toggleQuad")
          .classList.toggle("active", enState.showQuad);
        plotEnergy();
      });
      document.getElementById("toggleP0").addEventListener("click", () => {
        enState.showP0 = !enState.showP0;
        document
          .getElementById("toggleP0")
          .classList.toggle("active", enState.showP0);
        plotEnergy();
      });

      function plotScaling() {
        const b = 1.32,
          c = 0.165;
        const P0s = [];
        for (let i = 0; i <= 200; i++) P0s.push(5 + i * 1.5);

        const vL = P0s.map((p) => Math.sqrt(p / b));
        const vQ = P0s.map((p) => Math.cbrt(p / (2 * c)));

        const traces = [
          {
            x: P0s,
            y: vL,
            mode: "lines",
            name: "Modelo I:  v* = √(P₀/b)",
            line: { color: COL.linear, width: 2.4 },
            hovertemplate:
              "<b>Modelo I</b><br>P₀ = %{x:.0f} W<br>v* = %{y:.2f} m/s<extra></extra>",
          },
          {
            x: P0s,
            y: vQ,
            mode: "lines",
            name: "Modelo II:  v* = ∛(P₀/2c)",
            line: { color: COL.quadratic, width: 2.4 },
            hovertemplate:
              "<b>Modelo II</b><br>P₀ = %{x:.0f} W<br>v* = %{y:.2f} m/s<extra></extra>",
          },
        ];

        const layout = baseLayout({
          xaxis: Object.assign({}, baseLayout().xaxis, {
            title: {
              text: "P₀  —  potência basal (W)",
              font: {
                family: '"EB Garamond", serif',
                size: 17,
                color: COL.text,
              },
            },
          }),
          yaxis: Object.assign({}, baseLayout().yaxis, {
            title: {
              text: "v*  —  velocidade ótima (m/s)",
              font: {
                family: '"EB Garamond", serif',
                size: 17,
                color: COL.text,
              },
            },
          }),
          legend: Object.assign({}, baseLayout().legend, {
            x: 0.02,
            y: 0.98,
            xanchor: "left",
            yanchor: "top",
          }),
          hovermode: "closest",
        });

        Plotly.newPlot("plot-scaling", traces, layout, {
          displayModeBar: false,
          responsive: true,
        });
      }

      const apState = {
        rho: 1.225,
        CdA: 0.269,
        P0: 80,
        m: 75,
        Crr: 0.0032,
        eta: 0.25,
      };

      function updatePractical() {
        setVal("val-rho", formatNum(apState.rho, 3) + " kg/m³");
        setVal("val-CdA", formatNum(apState.CdA, 3) + " m²");
        setVal("val-P0p", formatNum(apState.P0, 0) + " W");
        setVal("val-mp", formatNum(apState.m, 1) + " kg");
        setVal("val-Crr", formatNum(apState.Crr, 4));
        setVal("val-eta", formatNum(apState.eta, 2));

        const c = 0.5 * apState.rho * apState.CdA;
        const Fr = apState.Crr * apState.m * G;
        const vStar = Math.cbrt(apState.P0 / (2 * c));
        const eStar =
          (3 / Math.pow(2, 2 / 3)) *
            Math.pow(apState.P0, 2 / 3) *
            Math.pow(c, 1 / 3) +
          Fr;
        const eMet = eStar / apState.eta;

        setVal("ap-vstar", formatNum(vStar, 2) + "  m/s");
        setVal("ap-vstar-kmh", formatNum(vStar * KMH, 1) + " km/h");
        setVal("ap-Emin", formatNum(eStar, 1) + "  J/m");
        setVal("ap-Emin-met", "metabólico: " + formatNum(eMet, 1) + " J/m");
        setVal("calc-c", formatNum(c, 4));
        setVal("calc-Fr", formatNum(Fr, 2));
        setVal("calc-v", formatNum(vStar, 3));

        const vMin = 0.5,
          vMax = 20;
        const N = 300;
        const vs = [];
        for (let i = 0; i <= N; i++) vs.push(vMin + (i / N) * (vMax - vMin));
        const eds = vs.map((v) => apState.P0 / v + Fr + c * v * v);
        const edsMet = eds.map((e) => e / apState.eta);

        const traces = [
          {
            x: vs,
            y: eds,
            mode: "lines",
            name: "E/d mecânico (J/m)",
            line: { color: COL.accent, width: 2.4 },
            hovertemplate:
              "v = %{x:.2f} m/s<br>E/d = %{y:.2f} J/m<extra></extra>",
          },
          {
            x: vs,
            y: edsMet,
            mode: "lines",
            name: "E/d metabólico (÷η)",
            line: { color: COL.gold, width: 1.8, dash: "dash" },
            hovertemplate:
              "v = %{x:.2f} m/s<br>E_met/d = %{y:.2f} J/m<extra></extra>",
          },
          {
            x: [vStar],
            y: [eStar],
            mode: "markers+text",
            showlegend: false,
            marker: {
              color: COL.green,
              size: 11,
              line: { color: "#fff", width: 1.5 },
              symbol: "diamond",
            },
            text: ["  v* = " + formatNum(vStar * KMH, 1) + " km/h"],
            textposition: "top center",
            textfont: {
              color: COL.green,
              size: 16,
              family: '"EB Garamond", serif',
            },
            hoverinfo: "skip",
          },
        ];

        const layout = baseLayout({
          xaxis: Object.assign({}, baseLayout().xaxis, {
            title: {
              text: "v (m/s)",
              font: {
                family: '"EB Garamond", serif',
                size: 17,
                color: COL.text,
              },
            },
          }),
          yaxis: Object.assign({}, baseLayout().yaxis, {
            title: {
              text: "E/d (J/m)",
              font: {
                family: '"EB Garamond", serif',
                size: 17,
                color: COL.text,
              },
            },
            range: [0, Math.max(eStar * 2.5, eMet * 1.2)],
          }),
          legend: Object.assign({}, baseLayout().legend, {
            x: 0.99,
            y: 0.98,
            xanchor: "right",
            yanchor: "top",
          }),
          hovermode: "x unified",
        });

        Plotly.react("plot-practical", traces, layout, {
          displayModeBar: false,
          responsive: true,
        });
      }

      ["ap-rho", "ap-CdA", "ap-P0", "ap-m", "ap-Crr", "ap-eta"].forEach(
        (id) => {
          document.getElementById(id).addEventListener("input", (e) => {
            const propMap = {
              "ap-rho": "rho",
              "ap-CdA": "CdA",
              "ap-P0": "P0",
              "ap-m": "m",
              "ap-Crr": "Crr",
              "ap-eta": "eta",
            };
            apState[propMap[id]] = parseFloat(e.target.value);
            updatePractical();
          });
        },
      );

      function positionTip(tip) {
        const owner = tip.parentElement;
        if (!owner) return;
        const margin = 16;
        const gap = 12;
        const maxWidth = Math.max(
          240,
          Math.min(360, window.innerWidth - margin * 2),
        );
        tip.style.setProperty("--tip-max-width", maxWidth + "px");

        const ownerRect = owner.getBoundingClientRect();
        const center = ownerRect.left + ownerRect.width / 2;
        const left = Math.min(
          window.innerWidth - margin - maxWidth / 2,
          Math.max(margin + maxWidth / 2, center),
        );
        tip.style.setProperty("--tip-left", left + "px");

        const tipHeight = tip.getBoundingClientRect().height;
        let top = ownerRect.top - tipHeight - gap;
        const below = top < margin;
        if (below) top = ownerRect.bottom + gap;
        tip.classList.toggle("tip-below", below);
        tip.style.setProperty("--tip-top", top + "px");
      }

      function positionActiveTips() {
        document
          .querySelectorAll(
            ".slider-row:hover > .tip, .toggle-btn:hover > .tip, .slider-row:focus-within > .tip, .toggle-btn:focus-within > .tip",
          )
          .forEach(positionTip);
      }

      function setupTips() {
        document.querySelectorAll(".tip").forEach((tip) => {
          const owner = tip.parentElement;
          if (!owner) return;
          owner.addEventListener("pointerenter", () => positionTip(tip));
          owner.addEventListener("pointermove", () => positionTip(tip), {
            passive: true,
          });
          owner.addEventListener("mouseenter", () => positionTip(tip));
          owner.addEventListener("mousemove", () => positionTip(tip), {
            passive: true,
          });
          owner.addEventListener("focusin", () => positionTip(tip));
        });
        window.addEventListener("scroll", positionActiveTips, {
          passive: true,
        });
      }

      window.addEventListener("load", () => {
        setupTips();
        injectBikes();
        animateHeroBike();
        updateDynamics();
        updateEnergy();
        plotScaling();
        updatePractical();
      });

      window.addEventListener("resize", () => {
        Plotly.Plots.resize("plot-dynamics");
        Plotly.Plots.resize("plot-energy");
        Plotly.Plots.resize("plot-scaling");
        Plotly.Plots.resize("plot-practical");
        positionActiveTips();
      });
