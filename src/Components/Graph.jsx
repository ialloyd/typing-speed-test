import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Graph = ({graphData}) => {
    return (
        <>
            <Line
                data={
                    {
                        labels:graphData.map(i=>i[0]),
                        datasets:[
                            {

                                data:graphData.map(i=>i[1]),
                                label:'wpm',
                                borderColor:'red'
                            }

                        ]


                    }


                }

            />

        </>
    )
}

export default Graph