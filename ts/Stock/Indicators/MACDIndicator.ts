/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

'use strict';

import type ColumnSeries from '../../Series/Column/ColumnSeries';
import type CSSObject from '../../Core/Renderer/CSSObject';
import type IndicatorValuesObject from './IndicatorValuesObject';
import type Point from '../../Core/Series/Point';
import type {
    SeriesStatesOptions,
    SeriesZonesOptions
} from '../../Core/Series/SeriesOptions';
const {
    seriesTypes: {
        sma: SMAIndicator,
        ema: EMAIndicator
    }
} = BaseSeries;
import type {
    SMAOptions,
    SMAParamsOptions
} from './SMA/SMAOptions';
import type SMAPoint from './SMA/SMAPoint';
import BaseSeries from '../../Core/Series/Series.js';
const { seriesTypes } = BaseSeries;
import H from '../../Core/Globals.js';
const { noop } = H;
import LineSeries from '../../Series/Line/LineSeries.js';
import U from '../../Core/Utilities.js';
const {
    extend,
    correctFloat,
    defined,
    merge
} = U;

declare module '../../Core/Series/SeriesLike' {
    interface SeriesLike {
        resetZones?: boolean;
    }
}

/**
 * Internal types
 * @private
 */
declare global {
    namespace Highcharts {
        interface MACDIndicatorGappedExtensionObject {
            options?: MACDIndicatorGappedExtensionOptions;
        }

        interface MACDIndicatorGappedExtensionOptions {
            gapSize?: number;
        }

        interface MACDIndicatorParamsOptions extends SMAParamsOptions {
            period?: number;
            shortPeriod?: number;
            longPeriod?: number;
            signalPeriod?: number;
        }

        class MACDIndicatorPoint extends SMAPoint {
            public series: MACDIndicator;
            public signal: number;
            public MACD: number;
            public y: number;
            public plotMACD?: number;
            public plotSignal?: number;
        }

        interface MACDIndicatorOptions extends SMAOptions {
            params?: MACDIndicatorParamsOptions;
            states?: SeriesStatesOptions<MACDIndicator>;
            threshold?: number;
            groupPadding?: number;
            pointPadding?: number;
            minPointLength?: number;
            tooltip?: TooltipOptions;
            signalLine?: MACDIndicatorLineOptions;
            macdLine?: MACDIndicatorLineOptions;
        }

        interface MACDIndicatorLineOptions {
            styles?: CSSObject;
            zones?: Array<SeriesZonesOptions>;
        }

        interface MACDIndicatorZonesOptions {
            startIndex?: number;
            zones?: MACDIndicatorLineOptions['zones'];
        }
    }
}

/**
 *
 * Class
 *
 */

/**
 * The MACD series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.macd
 *
 * @augments Highcharts.Series
 */
class MACDIndicator extends SMAIndicator {
    /**
     * Moving Average Convergence Divergence (MACD). This series requires
     * `linkedTo` option to be set and should be loaded after the
     * `stock/indicators/indicators.js` and `stock/indicators/ema.js`.
     *
     * @sample stock/indicators/macd
     *         MACD indicator
     *
     * @extends      plotOptions.sma
     * @since        6.0.0
     * @product      highstock
     * @requires     stock/indicators/indicators
     * @requires     stock/indicators/macd
     * @optionparent plotOptions.macd
     */
    public static defaultOptions: Highcharts.MACDIndicatorOptions =
    merge(SMAIndicator.defaultOptions, {
        params: {
            /**
             * The short period for indicator calculations.
             */
            shortPeriod: 12,
            /**
             * The long period for indicator calculations.
             */
            longPeriod: 26,
            /**
             * The base period for signal calculations.
             */
            signalPeriod: 9,
            period: 26
        },
        /**
         * The styles for signal line
         */
        signalLine: {
            /**
             * @sample stock/indicators/macd-zones
             *         Zones in MACD
             *
             * @extends plotOptions.macd.zones
             */
            zones: [],
            styles: {
                /**
                 * Pixel width of the line.
                 */
                lineWidth: 1,
                /**
                 * Color of the line.
                 *
                 * @type  {Highcharts.ColorString}
                 */
                lineColor: void 0
            }
        },
        /**
         * The styles for macd line
         */
        macdLine: {
            /**
             * @sample stock/indicators/macd-zones
             *         Zones in MACD
             *
             * @extends plotOptions.macd.zones
             */
            zones: [],
            styles: {
                /**
                 * Pixel width of the line.
                 */
                lineWidth: 1,
                /**
                 * Color of the line.
                 *
                 * @type  {Highcharts.ColorString}
                 */
                lineColor: void 0
            }
        },
        /**
         * @type {number|null}
         */
        threshold: 0,
        groupPadding: 0.1,
        pointPadding: 0.1,
        crisp: false,
        states: {
            hover: {
                halo: {
                    size: 0
                }
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
                'Value: {point.MACD}<br/>' +
                'Signal: {point.signal}<br/>' +
                'Histogram: {point.y}<br/>'
        },
        dataGrouping: {
            approximation: 'averages'
        },
        minPointLength: 0
    } as Highcharts.MACDIndicatorOptions);
}
interface MACDIndicator {
    applyZones(): void;
    crispCol: ColumnSeries['crispCol'];
    currentLineZone: (string|null);
    data: Array<Highcharts.MACDIndicatorPoint>;
    destroy(): void;
    drawGraph(): void;
    drawPoints: ColumnSeries['drawPoints'];
    getColumnMetrics: ColumnSeries['getColumnMetrics'];
    getValues<TLinkedSeries extends LineSeries>(
        series: TLinkedSeries,
        params: Highcharts.MACDIndicatorParamsOptions
    ): (IndicatorValuesObject<TLinkedSeries>|undefined);
    getZonesGraphs(
        props: Array<Array<string>>
    ): Array<Array<string>>;
    graphmacd: (Highcharts.SVGElement|undefined);
    graphsignal: (Highcharts.SVGElement|undefined);
    init(): void;
    macdZones: Highcharts.MACDIndicatorZonesOptions;
    nameComponents: Array<string>;
    options: Highcharts.MACDIndicatorOptions;
    parallelArrays: Array<string>;
    pointArrayMap: Array<string>;
    pointClass: typeof Highcharts.MACDIndicatorPoint;
    points: Array<Highcharts.MACDIndicatorPoint>;
    pointValKey: string;
    requiredIndicators: Array<string>;
    signalZones: Highcharts.MACDIndicatorZonesOptions;
    toYData(point: Point): Array<number>;
    translate(): void;
}
extend(MACDIndicator.prototype, {
    nameComponents: ['longPeriod', 'shortPeriod', 'signalPeriod'],
    requiredIndicators: ['ema'],
    // "y" value is treated as Histogram data
    pointArrayMap: ['y', 'signal', 'MACD'],
    parallelArrays: ['x', 'y', 'signal', 'MACD'],
    pointValKey: 'y',
    // Columns support:
    markerAttribs: (noop as any),
    getColumnMetrics: H.seriesTypes.column.prototype.getColumnMetrics,
    crispCol: H.seriesTypes.column.prototype.crispCol,
    // Colors and lines:
    init: function (
        this: MACDIndicator
    ): void {
        BaseSeries.seriesTypes.sma.prototype.init.apply(this, arguments);

        // Check whether series is initialized. It may be not initialized,
        // when any of required indicators is missing.
        if (this.options) {
            // Set default color for a signal line and the histogram:
            this.options = merge({
                signalLine: {
                    styles: {
                        lineColor: this.color
                    }
                },
                macdLine: {
                    styles: {
                        color: this.color
                    }
                }
            }, this.options);

            // Zones have indexes automatically calculated, we need to
            // translate them to support multiple lines within one indicator
            this.macdZones = {
                zones: (this.options.macdLine as any).zones,
                startIndex: 0
            };
            this.signalZones = {
                zones: (this.macdZones.zones as any).concat(
                    (this.options.signalLine as any).zones
                ),
                startIndex: (this.macdZones.zones as any).length
            };
            this.resetZones = true;
        }
    },
    toYData: function (
        point: Highcharts.MACDIndicatorPoint
    ): Array<number> {
        return [point.y, point.signal, point.MACD];
    },
    translate: function (this: MACDIndicator): void {
        var indicator = this,
            plotNames: Array<string> = ['plotSignal', 'plotMACD'];

        H.seriesTypes.column.prototype.translate.apply(indicator);

        indicator.points.forEach(
            function (point: Highcharts.MACDIndicatorPoint): void {
                [point.signal, point.MACD].forEach(
                    function (value: number, i: number): void {
                        if (value !== null) {
                            (point as any)[plotNames[i]] =
                            indicator.yAxis.toPixels(
                                value,
                                true
                            );
                        }
                    }
                );
            }
        );
    },
    destroy: function (this: MACDIndicator): void {
        // this.graph is null due to removing two times the same SVG element
        this.graph = (null as any);
        this.graphmacd = this.graphmacd && this.graphmacd.destroy();
        this.graphsignal = this.graphsignal && this.graphsignal.destroy();

        BaseSeries.seriesTypes.sma.prototype.destroy.apply(this, arguments);
    },
    drawPoints: H.seriesTypes.column.prototype.drawPoints,
    drawGraph: function (this: MACDIndicator): void {
        var indicator = this,
            mainLinePoints: Array<(
                Highcharts.MACDIndicatorPoint
            )> = indicator.points,
            pointsLength: number = mainLinePoints.length,
            mainLineOptions: Highcharts.MACDIndicatorOptions =
            indicator.options,
            histogramZones: Array<(SeriesZonesOptions)> = indicator.zones,
            gappedExtend: Highcharts.MACDIndicatorGappedExtensionObject = {
                options: {
                    gapSize: mainLineOptions.gapSize
                }
            },
            otherSignals: Array<(
                Array<Highcharts.MACDIndicatorPoint>
            )> = [[], []],
            point: Highcharts.MACDIndicatorPoint;

        // Generate points for top and bottom lines:
        while (pointsLength--) {
            point = mainLinePoints[pointsLength];
            if (defined(point.plotMACD)) {
                otherSignals[0].push(({
                    plotX: point.plotX,
                    plotY: point.plotMACD,
                    isNull: !defined(point.plotMACD)
                } as any));
            }
            if (defined(point.plotSignal)) {
                otherSignals[1].push(({
                    plotX: point.plotX,
                    plotY: point.plotSignal,
                    isNull: !defined(point.plotMACD)
                } as any));
            }
        }

        // Modify options and generate smoothing line:
        ['macd', 'signal'].forEach(
            function (lineName: string, i: number): void {
                indicator.points = otherSignals[i];
                indicator.options = merge(
                    (mainLineOptions as any)[lineName + 'Line'].styles,
                    gappedExtend
                );
                indicator.graph = (indicator as any)['graph' + lineName];

                // Zones extension:
                indicator.currentLineZone = lineName + 'Zones';
                indicator.zones =
                (indicator as any)[indicator.currentLineZone].zones;

                BaseSeries.seriesTypes.sma.prototype.drawGraph.call(indicator);
                (indicator as any)['graph' + lineName] = indicator.graph;
            }
        );

        // Restore options:
        indicator.points = mainLinePoints;
        indicator.options = mainLineOptions;
        indicator.zones = histogramZones;
        indicator.currentLineZone = null;
        // indicator.graph = null;
    },
    getZonesGraphs: function (
        this: MACDIndicator,
        props: Array<Array<string>>
    ): Array<Array<string>> {
        var allZones: Array<Array<string>> =
        BaseSeries.seriesTypes.sma.prototype.getZonesGraphs.call(this, props),
            currentZones: Array<Array<string>> = allZones;

        if (this.currentLineZone) {
            currentZones = allZones.splice(
                (this as any)[this.currentLineZone].startIndex + 1
            );

            if (!currentZones.length) {
                // Line has no zones, return basic graph "zone"
                currentZones = [props[0]];
            } else {
                // Add back basic prop:
                currentZones.splice(0, 0, props[0]);
            }
        }

        return currentZones;
    },
    applyZones: function (
        this: MACDIndicator
    ): void {
        // Histogram zones are handled by drawPoints method
        // Here we need to apply zones for all lines
        var histogramZones = this.zones;

        // signalZones.zones contains all zones:
        this.zones = (this.signalZones.zones as any);
        BaseSeries.seriesTypes.sma.prototype.applyZones.call(this);

        // applyZones hides only main series.graph, hide macd line manually
        if (this.graphmacd && (this.options.macdLine as any).zones.length) {
            (this.graphmacd as any).hide();
        }

        this.zones = histogramZones;
    },
    getValues: function<TLinkedSeries extends LineSeries> (
        series: TLinkedSeries,
        params: Highcharts.MACDIndicatorParamsOptions
    ): (IndicatorValuesObject<TLinkedSeries>|undefined) {
        var j = 0,
            MACD: Array<Array<(number|null)>> = [],
            xMACD: Array<(number|null)> = [],
            yMACD: Array<Array<(number|null)>> = [],
            signalLine: Array<Array<number>> = [],
            shortEMA: Array<Array<number>>,
            longEMA: Array<Array<number>>,
            i;

        if ((series.xData as any).length <
            (params.longPeriod as any) + params.signalPeriod
        ) {
            return;
        }

        // Calculating the short and long EMA used when calculating the MACD
        shortEMA = (BaseSeries.seriesTypes.ema.prototype.getValues(
            series,
            {
                period: params.shortPeriod
            }
        ) as any);

        longEMA = (BaseSeries.seriesTypes.ema.prototype.getValues(
            series,
            {
                period: params.longPeriod
            }
        ) as any);

        shortEMA = (shortEMA as any).values;
        longEMA = (longEMA as any).values;


        // Subtract each Y value from the EMA's and create the new dataset
        // (MACD)
        for (i = 1; i <= shortEMA.length; i++) {
            if (
                defined(longEMA[i - 1]) &&
                defined(longEMA[i - 1][1]) &&
                defined(shortEMA[i + (params.shortPeriod as any) + 1]) &&
                defined(shortEMA[i + (params.shortPeriod as any) + 1][0])
            ) {
                MACD.push([
                    shortEMA[i + (params.shortPeriod as any) + 1][0],
                    0,
                    null,
                    shortEMA[i + (params.shortPeriod as any) + 1][1] -
                        longEMA[i - 1][1]
                ]);
            }
        }

        // Set the Y and X data of the MACD. This is used in calculating the
        // signal line.
        for (i = 0; i < MACD.length; i++) {
            xMACD.push(MACD[i][0]);
            yMACD.push([0, null, MACD[i][3]]);
        }

        // Setting the signalline (Signal Line: X-day EMA of MACD line).
        signalLine = (BaseSeries.seriesTypes.ema.prototype.getValues(
            ({
                xData: xMACD,
                yData: yMACD
            } as any),
            {
                period: params.signalPeriod,
                index: 2
            }
        ) as any);

        signalLine = (signalLine as any).values;

        // Setting the MACD Histogram. In comparison to the loop with pure
        // MACD this loop uses MACD x value not xData.
        for (i = 0; i < MACD.length; i++) {
            // detect the first point
            if ((MACD[i] as any)[0] >= signalLine[0][0]) {

                MACD[i][2] = signalLine[j][1];
                yMACD[i] = [0, signalLine[j][1], MACD[i][3]];

                if (MACD[i][3] === null) {
                    MACD[i][1] = 0;
                    yMACD[i][0] = 0;
                } else {
                    MACD[i][1] = correctFloat((MACD[i] as any)[3] -
                    signalLine[j][1]);
                    yMACD[i][0] = correctFloat((MACD[i] as any)[3] -
                    signalLine[j][1]);
                }

                j++;
            }
        }

        return {
            values: MACD,
            xData: xMACD,
            yData: yMACD
        } as IndicatorValuesObject<TLinkedSeries>;
    }
});
/* *
 *
 *  Registry
 *
 * */
declare module '../../Core/Series/SeriesType' {
    interface SeriesTypeRegistry {
        macd: typeof MACDIndicator;
    }
}

BaseSeries.registerSeriesType('macd', MACDIndicator);
/* *
 *
 *  Default Export
 *
 * */
export default MACDIndicator;

/**
 * A `MACD` series. If the [type](#series.macd.type) option is not
 * specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.macd
 * @since     6.0.0
 * @product   highstock
 * @excluding dataParser, dataURL
 * @requires  stock/indicators/indicators
 * @requires  stock/indicators/macd
 * @apioption series.macd
 */

''; // to include the above in the js output
