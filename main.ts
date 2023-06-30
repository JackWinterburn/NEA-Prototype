// PROTOTYPE FOR SMART ALLOC
// CALCULATES RISK FOR A GIVEN TICKER SYMBOL
import { EODApiResponse } from "./types/types.ts"

const API_KEY = Deno.env.get("API_KEY")
const TSLA_INFO: EODApiResponse = await JSON.parse(Deno.readTextFileSync("./tslainfo.json"))

async function getTickerInfo(ticker: string, dateFrom: string, dateTo: string) {
    const response = await fetch(`
    http://api.marketstack.com/v1/eod?access_key=${API_KEY}&symbols=${ticker}&date_from=${dateFrom}&date_to=${dateTo}`
    )
    const data = await response.json()
    console.log(data);   
}


function main(): void {
    getTickerInfo("TSLA", "2023-06-01", "2023-06-20")
}

main()