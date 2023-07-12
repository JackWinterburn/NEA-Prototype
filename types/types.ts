// OLD API
export type EndOfDayData = {
    open:           number;
    high:           number;
    low:            number;
    close:          number;
    volume:         number;
    adj_high:       number;
    adj_low:        number;
    adj_close:      number;
    adj_open:       number;
    adj_volume:     number;
    split_factor:   number;
    dividend:       number;
    symbol:         string;
    exchange:       string;
    date:           Date;
}

// OLD API
export type EODApiResponse = {
    pagination: Record<string, number>;
    data:       Array<EndOfDayData>;
}


// NEW API
export type EODTickerData = {
    date:           Date;
    open:           number;
    high:           number;
    low:            number;
    close:          number;
    adjusted_close: number;
    volume:         number;
}

export type Return = {
    date:   Date;
    change: number;
}

export type MonthlyReturn = {
    date:   Date;
    change: number;
}