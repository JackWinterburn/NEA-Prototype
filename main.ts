// PROTOTYPE FOR SMART ALLOC
// CALCULATES RISK FOR A GIVEN TICKER SYMBOL


const API_KEY = Deno.env.get("API_KEY")
const getTickerInfo = 
async (ticker: string, dateFrom: string, dateTo: string) => {
    const response = await fetch(`
    http://api.marketstack.com/v1/eod
    ? access_key = ${API_KEY}
    & symbols = AAPL
    & date_from = 2022-06-19
    & date_to = 2023-06-29`
    )
    const data = await response.json()

}

function main(): void {
    
}

main()