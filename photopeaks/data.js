window.SHOWCASE_DATA = {
 "speedup": 6.3,
 "nConcepts": 5,
 "nPhotos": 27,
 "race": {
  "photoagent": {
   "time": 470.0,
   "sims": 60
  },
  "photopeaks": {
   "time": 74.9,
   "sims": 0
  }
 },
 "avgDemo": {
  "scoreA": 4.2,
  "scoreB": 4.5,
  "scoreAvg": 4.2,
  "verdict": "实测：两个分支各自 4.2 / 4.5 分，像素平均只有 4.2 分——等于较差的那个峰。标量化的 argmax 与平均同性质：落在两峰之间的谷底。"
 },
 "concepts": [
  {
   "name": "vibrant tapestry",
   "utility": 10.25,
   "steps": "increase saturation by 20% uniformly across the image → boost contrast in the midtones to enhance texture details → apply a subtle glow effect to the edges of the tassels"
  },
  {
   "name": "pastel dream",
   "utility": 9.25,
   "steps": "reduce saturation by 30% → apply a light blue tint to the shadows and a pale yellow tint to the highlights → blur the background slightly to enhance depth and focus on the foreground"
  },
  {
   "name": "cinematic dusk",
   "utility": 9.25,
   "steps": "add a warm golden hue to the highlights and a cool blue tone to the shadows → deepen the shadows in the lower half of the image and shift them toward brown → apply a subtle vignette to darken the corners and frame the subject"
  },
  {
   "name": "minimalist monochrome",
   "utility": 9.25,
   "steps": "convert the image to black and white → enhance the contrast to emphasize the textures of the tassels and metal hooks → apply a slight sepia tone to add warmth to the grayscale image"
  },
  {
   "name": "psychedelic kaleidoscope",
   "utility": 6.75,
   "steps": "increase saturation by 50% and apply a radial gradient overlay with bright neon colors → add a subtle ripple distortion effect to the entire image → overlay a faint geometric pattern (e.g., hexagons) with low opacity"
  }
 ],
 "table": [
  {
   "name": "single（一把梭）",
   "time": 19.4,
   "vlm": 0.0,
   "edit": 1.0,
   "sim": 0.944,
   "brisque": 20.17,
   "aes": 4.23,
   "hl": false,
   "bestBrisque": true,
   "bestAes": false,
   "bestSim": true
  },
  {
   "name": "scalar（原子动作+标量分）",
   "time": 46.9,
   "vlm": 15.7,
   "edit": 1.0,
   "sim": 0.908,
   "brisque": 26.46,
   "aes": 4.21,
   "hl": false,
   "bestBrisque": false,
   "bestAes": false,
   "bestSim": false
  },
  {
   "name": "peaks（本文）",
   "time": 74.9,
   "vlm": 7.0,
   "edit": 5.8,
   "sim": 0.858,
   "brisque": 33.1,
   "aes": 4.3,
   "hl": true,
   "bestBrisque": false,
   "bestAes": true,
   "bestSim": false
  }
 ],
 "scatter": [
  {
   "x": -0.0264,
   "y": 0.3187,
   "kind": "single"
  },
  {
   "x": -0.0653,
   "y": 0.22,
   "kind": "scalar"
  },
  {
   "x": -0.0602,
   "y": 0.2621,
   "kind": "peaks"
  },
  {
   "x": -0.0212,
   "y": 0.2769,
   "kind": "original"
  },
  {
   "x": -0.2817,
   "y": 0.1191,
   "kind": "single"
  },
  {
   "x": -0.3065,
   "y": 0.1026,
   "kind": "scalar"
  },
  {
   "x": -0.2868,
   "y": 0.0714,
   "kind": "peaks"
  },
  {
   "x": -0.2859,
   "y": 0.1124,
   "kind": "original"
  },
  {
   "x": 0.0968,
   "y": 0.3091,
   "kind": "single"
  },
  {
   "x": 0.1166,
   "y": 0.3099,
   "kind": "scalar"
  },
  {
   "x": 0.0938,
   "y": 0.2329,
   "kind": "peaks"
  },
  {
   "x": 0.0933,
   "y": 0.3146,
   "kind": "original"
  },
  {
   "x": -0.2299,
   "y": 0.3388,
   "kind": "single"
  },
  {
   "x": -0.1927,
   "y": 0.2869,
   "kind": "scalar"
  },
  {
   "x": -0.2011,
   "y": 0.257,
   "kind": "peaks"
  },
  {
   "x": -0.2035,
   "y": 0.3412,
   "kind": "original"
  },
  {
   "x": -0.234,
   "y": -0.0476,
   "kind": "single"
  },
  {
   "x": -0.1909,
   "y": 0.0373,
   "kind": "scalar"
  },
  {
   "x": -0.2144,
   "y": -0.0628,
   "kind": "peaks"
  },
  {
   "x": -0.2161,
   "y": -0.0204,
   "kind": "original"
  },
  {
   "x": -0.2353,
   "y": -0.339,
   "kind": "single"
  },
  {
   "x": -0.157,
   "y": -0.2489,
   "kind": "scalar"
  },
  {
   "x": -0.2282,
   "y": -0.3941,
   "kind": "peaks"
  },
  {
   "x": -0.2872,
   "y": -0.3989,
   "kind": "original"
  },
  {
   "x": -0.0395,
   "y": 0.0219,
   "kind": "single"
  },
  {
   "x": -0.0239,
   "y": 0.0183,
   "kind": "scalar"
  },
  {
   "x": 0.0088,
   "y": 0.0469,
   "kind": "peaks"
  },
  {
   "x": -0.023,
   "y": 0.0232,
   "kind": "original"
  },
  {
   "x": 0.0903,
   "y": -0.2548,
   "kind": "single"
  },
  {
   "x": 0.1524,
   "y": -0.2164,
   "kind": "scalar"
  },
  {
   "x": 0.1419,
   "y": -0.245,
   "kind": "peaks"
  },
  {
   "x": 0.1844,
   "y": -0.2098,
   "kind": "original"
  },
  {
   "x": -0.2932,
   "y": -0.3017,
   "kind": "single"
  },
  {
   "x": -0.2634,
   "y": -0.3007,
   "kind": "scalar"
  },
  {
   "x": -0.2088,
   "y": -0.2567,
   "kind": "peaks"
  },
  {
   "x": -0.288,
   "y": -0.2721,
   "kind": "original"
  },
  {
   "x": -0.1938,
   "y": 0.052,
   "kind": "single"
  },
  {
   "x": -0.2016,
   "y": 0.1034,
   "kind": "scalar"
  },
  {
   "x": -0.1243,
   "y": 0.1735,
   "kind": "peaks"
  },
  {
   "x": -0.1676,
   "y": 0.0834,
   "kind": "original"
  },
  {
   "x": -0.0492,
   "y": 0.1843,
   "kind": "single"
  },
  {
   "x": -0.0741,
   "y": 0.2034,
   "kind": "scalar"
  },
  {
   "x": -0.0808,
   "y": 0.1809,
   "kind": "peaks"
  },
  {
   "x": -0.0893,
   "y": 0.1826,
   "kind": "original"
  },
  {
   "x": 0.2148,
   "y": 0.2741,
   "kind": "single"
  },
  {
   "x": 0.218,
   "y": 0.2321,
   "kind": "scalar"
  },
  {
   "x": 0.2327,
   "y": 0.2698,
   "kind": "peaks"
  },
  {
   "x": 0.2327,
   "y": 0.2704,
   "kind": "original"
  },
  {
   "x": -0.1669,
   "y": -0.5058,
   "kind": "single"
  },
  {
   "x": -0.1713,
   "y": -0.5104,
   "kind": "scalar"
  },
  {
   "x": -0.2016,
   "y": -0.4902,
   "kind": "peaks"
  },
  {
   "x": -0.1925,
   "y": -0.5091,
   "kind": "original"
  },
  {
   "x": 0.3353,
   "y": 0.0458,
   "kind": "single"
  },
  {
   "x": 0.331,
   "y": 0.0359,
   "kind": "scalar"
  },
  {
   "x": 0.3153,
   "y": 0.0592,
   "kind": "peaks"
  },
  {
   "x": 0.3331,
   "y": 0.0408,
   "kind": "original"
  },
  {
   "x": 0.0131,
   "y": -0.069,
   "kind": "single"
  },
  {
   "x": 0.0155,
   "y": -0.0689,
   "kind": "scalar"
  },
  {
   "x": 0.065,
   "y": -0.0764,
   "kind": "peaks"
  },
  {
   "x": 0.0384,
   "y": -0.0582,
   "kind": "original"
  },
  {
   "x": -0.0782,
   "y": 0.1466,
   "kind": "single"
  },
  {
   "x": -0.0794,
   "y": 0.1404,
   "kind": "scalar"
  },
  {
   "x": -0.0647,
   "y": 0.1613,
   "kind": "peaks"
  },
  {
   "x": -0.0626,
   "y": 0.15,
   "kind": "original"
  },
  {
   "x": -0.2677,
   "y": -0.4825,
   "kind": "single"
  },
  {
   "x": -0.2862,
   "y": -0.4765,
   "kind": "scalar"
  },
  {
   "x": -0.2657,
   "y": -0.475,
   "kind": "peaks"
  },
  {
   "x": -0.2847,
   "y": -0.4646,
   "kind": "original"
  },
  {
   "x": -0.2088,
   "y": 0.2072,
   "kind": "single"
  },
  {
   "x": -0.1776,
   "y": 0.1861,
   "kind": "scalar"
  },
  {
   "x": -0.1827,
   "y": 0.1692,
   "kind": "peaks"
  },
  {
   "x": -0.1948,
   "y": 0.2439,
   "kind": "original"
  },
  {
   "x": -0.1117,
   "y": 0.1351,
   "kind": "single"
  },
  {
   "x": -0.0732,
   "y": 0.1498,
   "kind": "scalar"
  },
  {
   "x": -0.086,
   "y": 0.1701,
   "kind": "peaks"
  },
  {
   "x": -0.1244,
   "y": 0.134,
   "kind": "original"
  },
  {
   "x": 0.1447,
   "y": 0.1162,
   "kind": "single"
  },
  {
   "x": 0.1711,
   "y": 0.1185,
   "kind": "scalar"
  },
  {
   "x": 0.1738,
   "y": 0.1157,
   "kind": "peaks"
  },
  {
   "x": 0.1777,
   "y": 0.1113,
   "kind": "original"
  },
  {
   "x": 0.6391,
   "y": -0.2473,
   "kind": "single"
  },
  {
   "x": 0.5594,
   "y": -0.2446,
   "kind": "scalar"
  },
  {
   "x": 0.6334,
   "y": -0.2602,
   "kind": "peaks"
  },
  {
   "x": 0.6521,
   "y": -0.2402,
   "kind": "original"
  },
  {
   "x": 0.6348,
   "y": -0.247,
   "kind": "single"
  },
  {
   "x": 0.6458,
   "y": -0.2585,
   "kind": "scalar"
  },
  {
   "x": 0.604,
   "y": -0.2778,
   "kind": "peaks"
  },
  {
   "x": 0.635,
   "y": -0.2408,
   "kind": "original"
  },
  {
   "x": -0.1495,
   "y": 0.0494,
   "kind": "single"
  },
  {
   "x": -0.1441,
   "y": 0.0457,
   "kind": "scalar"
  },
  {
   "x": -0.1656,
   "y": 0.0378,
   "kind": "peaks"
  },
  {
   "x": -0.1745,
   "y": 0.0594,
   "kind": "original"
  },
  {
   "x": -0.0062,
   "y": 0.1632,
   "kind": "single"
  },
  {
   "x": -0.0046,
   "y": 0.1456,
   "kind": "scalar"
  },
  {
   "x": 0.0248,
   "y": 0.1614,
   "kind": "peaks"
  },
  {
   "x": -0.0424,
   "y": 0.1815,
   "kind": "original"
  },
  {
   "x": -0.1782,
   "y": -0.2904,
   "kind": "single"
  },
  {
   "x": -0.1955,
   "y": -0.2928,
   "kind": "scalar"
  },
  {
   "x": -0.1038,
   "y": -0.2133,
   "kind": "peaks"
  },
  {
   "x": -0.1869,
   "y": -0.2583,
   "kind": "original"
  },
  {
   "x": 0.436,
   "y": 0.0256,
   "kind": "single"
  },
  {
   "x": 0.4351,
   "y": 0.0314,
   "kind": "scalar"
  },
  {
   "x": 0.3936,
   "y": 0.0133,
   "kind": "peaks"
  },
  {
   "x": 0.448,
   "y": 0.0147,
   "kind": "original"
  },
  {
   "x": -0.0022,
   "y": 0.1446,
   "kind": "single"
  },
  {
   "x": 0.0083,
   "y": 0.1531,
   "kind": "scalar"
  },
  {
   "x": -0.0035,
   "y": 0.1252,
   "kind": "peaks"
  },
  {
   "x": -0.0031,
   "y": 0.152,
   "kind": "original"
  },
  {
   "x": -0.014,
   "y": 0.1857,
   "kind": "peaks"
  },
  {
   "x": -0.0406,
   "y": 0.2693,
   "kind": "peaks"
  }
 ],
 "gallery": [
  {
   "before": "pair_10-DSC_1329_before.jpg",
   "after": "pair_10-DSC_1329_after.jpg",
   "caption": "10-DSC_1329.jpg · 拖动对比：左原图 / 右成品"
  },
  {
   "before": "pair_17-IMG_0961_before.jpg",
   "after": "pair_17-IMG_0961_after.jpg",
   "caption": "17-IMG_0961.jpg · 拖动对比：左原图 / 右成品"
  },
  {
   "before": "pair_25-DSC_1085_before.jpg",
   "after": "pair_25-DSC_1085_after.jpg",
   "caption": "25-DSC_1085.jpg · 拖动对比：左原图 / 右成品"
  },
  {
   "before": "pair_9-DSC_1524_before.jpg",
   "after": "pair_9-DSC_1524_after.jpg",
   "caption": "9-DSC_1524.jpg · 拖动对比：左原图 / 右成品"
  }
 ]
}