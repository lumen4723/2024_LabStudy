import "./CoinChart.css";

import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
//npm install --save react-google-charts

const CandleOptions = {
    legend: "none",
    backgroundColor: "rgb(220, 220, 220)",
    chartArea: { bottom: 15, width: "80%", height: "80%" },
    series: { 0: { color: "black" } },
    bar: { groupWidth: "90%" }, // Remove space between bars.
    candlestick: {
        fallingColor: {
            strokeWidth: 0,
            fill: "rgb(246, 70, 93)", // red
        },
        risingColor: {
            strokeWidth: 0,
            fill: "rgb(14, 203, 129)", // green
        },
    },
    vAxis: {
        textStyle: { color: "black" },
    }, // y축
    hAxis: {
        textPosition: "none",
    }, // x축
};
const VolumeOptions = {
    legend: "none",
    bar: { groupWidth: "90%" },
    backgroundColor: "rgb(220, 220, 220)",
    chartArea: { top: 15, width: "80%", height: "50%" },
    hAxis: {
        textStyle: { color: "black" },
    }, // x축
    vAxis: {
        textStyle: { color: "black" },
    }, // y축
};

const CoinChart = () => {
    const [CandleData, setCandleData] = useState([]);
    const [VolumeData, setVolumeData] = useState([]);
    const [reload, setReload] = useState(false);
    const [term, setTerm] = useState("/minutes/15");
    const [coin, setCoin] = useState("KRW-BTC");
    const coinlist = [
        "BTC",
        "ETH",
        "ADA",
        "XRP",
        "DOGE",
        "ETC",
        "LTC",
        "NEO",
        "TRX",
        "ATOM",
        "VET",
        "THETA",
        "ICX",
        "EOS",
        "IOST",
    ];

    useEffect(() => {
        fetch(
            "https://api.upbit.com/v1/candles" +
                term +
                "?market=" +
                coin +
                "&count=" +
                Math.floor(window.innerWidth / 18), // 반응형 데이터 개수
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((json) => {
                return {
                    candle: json.map((item) => [
                        item.candle_date_time_kst,
                        item.low_price,
                        item.opening_price,
                        item.trade_price,
                        item.high_price,
                    ]),
                    volume: json.map((item) => [
                        item.candle_date_time_kst,
                        item.candle_acc_trade_volume,
                    ]),
                };
            })
            .then(({ candle, volume }) => {
                candle
                    .reverse()
                    .unshift(["Date", "Low", "Open", "Close", "High"]);
                setCandleData(candle);
                volume.reverse().unshift(["Date", "Volume"]);
                setVolumeData(volume);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [reload, coin, term]);

    const Header = () => {
        return (
            <div>
                <select value={coin} onChange={(e) => setCoin(e.target.value)}>
                    {coinlist.map((item) => (
                        <option value={"KRW-" + item}>{item}</option>
                    ))}
                </select>
                <select value={term} onChange={(e) => setTerm(e.target.value)}>
                    <option value="/minutes/1">1분</option>
                    <option value="/minutes/3">3분</option>
                    <option value="/minutes/5">5분</option>
                    <option value="/minutes/10">10분</option>
                    <option value="/minutes/15">15분</option>
                    <option value="/minutes/30">30분</option>
                    <option value="/minutes/60">1시간</option>
                    <option value="/minutes/240">4시간</option>
                    <option value="/days">1일</option>
                    <option value="/weeks">1주</option>
                    <option value="/months">1달</option>
                </select>
                <div>
                    <span>{coin.split("-")[1]} 차트</span>
                    <button onClick={() => setReload(!reload)}>Reload</button>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />
            <div className="charts">
                <Chart
                    chartType="CandlestickChart"
                    width="90%"
                    height="600px"
                    data={CandleData}
                    options={CandleOptions}
                />
                <Chart
                    chartType="ColumnChart"
                    width="90%"
                    height="300px"
                    data={VolumeData}
                    options={VolumeOptions}
                />
            </div>
            {/* <Info CandleData={CandleData} VolumeData={VolumeData} coin={coin} /> */}
        </>
    );
};

export default CoinChart;

// import "./MainPage.css";
// import Info from "./Info.jsx";
// // import { useEffect, useState } from "react";
// // import { Chart } from "react-google-charts";
// //npm install --save react-google-charts

// const MainPage = () => {

// };

// export default MainPage;

// https://developers.google.com/chart/interactive/docs/gallery/candlestickchart
// https://react-google-charts.com/
// https://docs.upbit.com/docs/upbit-quotation-restful-api
