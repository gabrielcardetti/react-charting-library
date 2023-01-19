const newCustomIndicator = function (PineJS) {
    return Promise.resolve([
        {
            name: "Caloco",
            metainfo: {
                _metainfoVersion: 51,

                id: "Caloco",
                name: "Caloco",
                description: "Caloco",
                shortDescription: "Caloco",

                isCustomIndicator: true,
                isTVScript: false,
                isTVScriptStub: false,

                format: {
                    type: "price",
                    precision: 4,
                },

                defaults: {
                    palettes: {
                        palette_0: {
                            // palette colors
                            // change it to the default colors that you prefer,
                            // but note that the user can change them in the Style tab
                            // of indicator settings
                            color_0: "#FF0000",
                            color_1: "#00FF00",
                            color_2: "#0000FF",
                            color_3: "#FF00FF",
                            color_4: "#00FFFF",
                            color_5: "#FFFF00",
                            color_6: "#000000",
                            color_7: "#FFFFFF",
                            color_8: "#FFA500",
                            color_9: "#800080",
                        },
                    },
                    styles: {
                        style_0: {
                            // style properties
                            // change it to the default properties that you prefer,
                            // but note that the user can change them in the Style tab
                            // of indicator settings
                            plottype: 2,
                            linetype: 1,
                            linewidth: 1,
                            trackPrice: false,
                            transparency: 0,
                            visible: true,
                        },
                    },
                    overrides: {
                        // overrides
                        // change it to the default overrides that you prefer,
                        // but note that the user can change them in the Overrides tab
                        // of indicator settings
                    },
                },
                inputs: [
                    {
                        id: "swingSize",
                        name: "Swing Length",
                        defval: 20,
                        type: "integer",
                        minval: 1,
                        maxval: 100,
                        step: 1,
                        tooltip: "The number of left and right bars checked when searching for a swing point. Higher value = less swing points plotted and lower value = more swing points plotted.",
                    },
                    {
                        id: "bosConfType",
                        name: "BOS Confirmation",
                        defval: ["Candle Close", "Wicks"],
                        type: "string",
                        tooltip: "Choose whether candle close/wick above previous swing point counts as a BOS.",
                    },
                    {
                        id: "choch",
                        defval: false,
                        type: "bool",
                        tooltip: "Renames the first counter trend BOS to CHoCH",
                    },
                    {
                        id: "showSwing",
                        defval: true,
                        type: "bool",
                    },
                    {
                        id: "showHalf",
                        defval: false,
                        type: "bool",
                    },
                    {
                        id: "halfColor",
                        defval: "#FF0000",
                        type: "color",
                    },
                    {
                        id: "halfStyle",
                        defval: "Solid",
                        type: "string",
                    },
                    {
                        id: "halfWidth",
                        defval: 1,
                        type: "integer",
                    },
                    {
                        id: "bosColor",
                        defval: "#FF0000",
                        type: "color",
                    },
                    {
                        id: "bosStyle",
                        defval: "Solid",
                        type: "string",
                    },
                    {
                        id: "bosWidth",
                        defval: 1,
                        type: "integer",
                    }],
                plots: [
                    {
                        id: "plot_0",
                        type: "line",
                        color: "color_0",
                        style: "style_0",
                    },
                    {
                        id: "plot_1",
                        type: "line",
                        color: "color_1",
                        style: "style_0",
                    },
                    {
                        id: "plot_2",
                        type: "line",
                        color: "color_2",
                        style: "style_0",
                    },
                    {
                        id: "plot_3",
                        type: "line",
                        color: "color_3",
                        style: "style_0",
                    },
                    {
                        id: "plot_4",
                        type: "line",
                        color: "color_4",
                        style: "style_0",
                    },
                    {
                        id: "plot_5",
                        type: "line",
                        color: "color_5",
                        style: "style_0",
                    },
                    {
                        id: "plot_6",
                        type: "line",
                        color: "color_6",
                        style: "style_0",
                    },
                    {
                        id: "plot_7",
                        type: "line",
                        color: "color_7",
                        style: "style_0",
                    },
                    {
                        id: "plot_8",
                        type: "line",
                        color: "color_8",
                        style: "style_0",
                    },
                    {
                        id: "plot_9",
                        type: "line",
                        color: "color_9",
                        style: "style_0",
                    },
                ]
            },
            constructor: function () {
                this.main = function (context, input) {
                    this._context = context;
                    this._input = input;

                    const swingSize = input.swingSize;
                    const bosConfType = input.bosConfType;
                    const choch = input.choch;
                    const showSwing = input.showSwing;
                    const showHalf = input.showHalf;
                    const halfColor = input.halfColor;
                    const halfStyle = input.halfStyle;
                    const halfWidth = input.halfWidth;
                    const bosColor = input.bosColor;
                    const bosStyle = input.bosStyle;
                    const bosWidth = input.bosWidth;

                    console.log(swingSize, "swingSize");
                    console.log(bosConfType, "bosConfType");
                    console.log(choch, "choch");
                    console.log(showSwing, "showSwing");
                    console.log(showHalf, "showHalf");
                    console.log(halfColor, "halfColor");
                    console.log(halfStyle, "halfStyle");
                    console.log(halfWidth, "halfWidth");
                    console.log(bosColor, "bosColor");
                    console.log(bosStyle, "bosStyle");
                    console.log(bosWidth, "bosWidth");
                    console.log(input);

                    console.log(this._context.high);
                    console.log(this._context.close);
                    console.log(this._context);

                    console.log(PineJS)
                    console.log(PineJS.Std)

                    
                    const high = PineJS.Std.high(this);
                    const low = PineJS.Std.low(this._context);
                    const close = PineJS.Std.close(this._context);

                    console.log(high);
                    console.log(low);
                    console.log(close);


                    const CLEAR = 0;

                    //Finding high and low pivots
                    const pivHi = PineJS.Std.pivothigh(this._context.high, swingSize, swingSize);
                    const pivLo = PineJS.Std.pivotlow(this._context.low, swingSize, swingSize);


                    //Tracking the previous swing levels to determine hh lh hl ll
                    let prevHigh = NaN;
                    let prevLow = NaN;
                    let prevHighIndex = NaN;
                    let prevLowIndex = NaN;

                    //Tracking whether previous levels have been breached
                    let highActive = false
                    let lowActive = false

                    let hh = false
                    let lh = false
                    let hl = false
                    let ll = false

                    //Variable to track the previous swing type, used later on to draw 0.5 Retracement Levels (HH = 2, LH = 1, HL = -1, LL = -2)
                    let prevSwing = 0

                    if (!isNaN(pivHi)) {
                        if (pivHi >= prevHigh) {
                            hh = true;
                            prevSwing = 2;
                        } else {
                            lh = true;
                            prevSwing = 1;
                        }
                        prevHigh = pivHi;
                        highActive = true;
                        prevHighIndex = this._context.bar_index - swingSize;
                    }

                    if (!isNaN(pivLo)) {
                        if (pivLo >= prevLow) {
                            hl = true;
                            prevSwing = -1;
                        } else {
                            ll = true;
                            prevSwing = -2;
                        }
                        prevLow = pivLo;
                        lowActive = true;
                        prevLowIndex = this._context.bar_index - swingSize;
                    }

                    //Generating the breakout signals
                    let highBroken = false
                    let lowBroken = false

                    //Tracking prev breakout
                    let prevBreakoutDir = 0

                    let highSrc = bosConfType == 'Candle Close' ? this._context.close : this._context.high
                    let lowSrc = bosConfType == 'Candle Close' ? this._context.close : this._context.low


                    if (highSrc > prevHigh && highActive) {
                        highBroken = true;
                        highActive = false;
                    }
                    if (lowSrc < prevLow && lowActive) {
                        lowBroken = true;
                        lowActive = false;
                    }

                    // Visual Output

                    //Swing level labels

                    if (hh && showSwing) {
                        this._context.new_label(prevHighIndex, prevHigh, "HH", "color_0", "style_0");
                    }
                    
                    return [
                        hh ? prevHigh : CLEAR,
                        lh ? prevHigh : CLEAR,
                        hl ? prevLow : CLEAR,
                        ll ? prevLow : CLEAR,
                        highBroken ? prevHigh : CLEAR,
                        lowBroken ? prevLow : CLEAR,
                        highBroken ? prevSwing : CLEAR,
                        lowBroken ? prevSwing : CLEAR,
                        highBroken ? prevBreakoutDir : CLEAR,
                        lowBroken ? prevBreakoutDir : CLEAR,
                    ];
                };
            },
        },
    ]);
};


export default newCustomIndicator;