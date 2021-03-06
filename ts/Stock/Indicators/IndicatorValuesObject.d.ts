/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Imports
 *
 * */

import type Series from '../../Core/Series/Series';

/* *
 *
 *  Declarations
 *
 * */

export interface IndicatorValuesObject<TLinkedSeries extends typeof Series.prototype> {
    values: Array<Array<(
        Highcharts.ExtractArrayType<TLinkedSeries['xData']>|
        Highcharts.ExtractArrayType<TLinkedSeries['yData']>
    )>>;
    xData: NonNullable<TLinkedSeries['xData']>;
    yData: NonNullable<TLinkedSeries['yData']>;
}

export default IndicatorValuesObject;
