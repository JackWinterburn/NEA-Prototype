// PROTOTYPE FOR SMART ALLOC
// CALCULATES RISK FOR A GIVEN TICKER SYMBOL
import { Return, EODTickerData } from "./types/types.ts"

const API_KEY = Deno.env.get("EOD_API_KEY")

async function getTickerInfo(ticker: string, dateFrom: string, dateTo: string) {
    const response = await fetch(`https://eodhistoricaldata.com/api/eod/${ticker}.US?api_token=${API_KEY}&period=m&from=${dateFrom}&to=${dateTo}&fmt=json`
    )
    const data = await response.json()
    Deno.writeTextFile("./tslainfo.json", JSON.stringify(data))
    console.log(data)
}

async function getStockInfoFromFile(fn: string) {
    const stockInfo: Array<EODTickerData> = JSON.parse(
        await Deno.readTextFile(fn)
        )
    
    return stockInfo
}

function getReturns(data: EODTickerData[]): Array<Return> {
    const Returns: Array<Return> = []

    for(let i = 1; i < data.length; i++) {
        const n = data[i]
        Returns.push({
            date: n.date,
            change: (n.close - data[i-1].close) / data[i-1].close
        })
    }

    return Returns
}

function getMean(series: number[]): number {
    let sum = 0
    series.forEach(i => sum += i)
    return sum / series.length
}

function getStandardDeviation(series: Array<number>, mean: number): number {
    let standardDeviation = 0
    let sumOfSquares = 0
    const differences: Array<number> = []
    series.forEach(s => differences.push(s - mean))
    sumOfSquares = differences
                    .map(d => Math.pow(d, 2))
                    .reduce((a,b) =>{ return a+b}, 0)

    standardDeviation = Math.sqrt(sumOfSquares / series.length)
    return standardDeviation
}

async function main() {
    // await getTickerInfo("AAPL", "2020-06-01", "2023-07-12")
    // console.log(API_KEY)
    const stockInfo = await getStockInfoFromFile("tslainfo.json")
    const returns = getReturns(stockInfo)
    const changes: number[] = []

    returns.forEach(r => changes.push(r.change))
    returns.forEach(r => console.log(`${r.date}: ${r.change}`))

    const mean = getMean(changes)
    console.log(`Average return: ${mean}`)

    const s = getStandardDeviation(changes, mean)
    console.log(`Standard deviation: ${s}`)


}

main()