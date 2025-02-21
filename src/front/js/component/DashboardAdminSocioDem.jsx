import React from 'react'
import { useState } from 'react';
import Chart1_1 from '../component/Chart1_1.jsx';
import Chart1_2 from '../component/Chart1_2.jsx';
import Chart1_3 from '../component/Chart1_3.jsx';
import Chart1_4 from '../component/Chart1_4.jsx';
import Chart1_5 from '../component/Chart1_5.jsx';
import Chart1_6 from '../component/Chart1_6.jsx';
import Chart2_1 from '../component/Chart2_1.jsx';
import Chart2_2 from '../component/Chart2_2.jsx';
import Chart2_3 from '../component/Chart2_3.jsx';
import Chart2_4 from '../component/Chart2_4.jsx';
import Chart2_5 from '../component/Chart2_5.jsx';
import Chart2_6 from '../component/Chart2_6.jsx';
import Chart3_1 from '../component/Chart3_1.jsx';
import Chart3_2 from '../component/Chart3_2.jsx';
import Chart3_3 from '../component/Chart3_3.jsx';
import Chart3_4 from '../component/Chart3_4.jsx';
import Chart3_5 from '../component/Chart3_5.jsx';
import Chart3_6 from '../component/Chart3_6.jsx';

const DashboardAdminSocioDem = () => {
    const [activeChart, setActiveChart] = React.useState(null);

    const handleShowChart = (event, chart) => {
        event.preventDefault();
        setActiveChart(chart);
    };

    const charts = [
        { component: Chart1_1, label: "Chart1_1" },
        { component: Chart1_2, label: "Chart1_2" },
        { component: Chart1_3, label: "Chart1_3" },
        { component: Chart1_4, label: "Chart1_4" },
        { component: Chart1_5, label: "Chart1_5" },
        { component: Chart1_6, label: "Chart1_6" },
        { component: Chart2_1, label: "Chart2_1" },
        { component: Chart2_2, label: "Chart2_2" },
        { component: Chart2_3, label: "Chart2_3" },
        { component: Chart2_4, label: "Chart2_4" },
        { component: Chart2_5, label: "Chart2_5" },
        { component: Chart2_6, label: "Chart2_6" },
        { component: Chart3_1, label: "Chart3_1" },
        { component: Chart3_2, label: "Chart3_2" },
        { component: Chart3_3, label: "Chart3_3" },
        { component: Chart3_4, label: "Chart3_4" },
        { component: Chart3_5, label: "Chart3_5" },
        { component: Chart3_6, label: "Chart3_6" },
    ];

    return (
        <div>
            <div className='container row w-auto d-flex justify-content-between'>
                {charts.map((chart, index) => (
                    <div key={index} className='col-3 card bg-dark' style={{ width: "30%" }}>
                        <div className="grid gap-0 column-gap-3">
                            <div className="p-2 g-col-6" style={{ height: "80px" }}>
                                <button type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={(event) => handleShowChart(event, chart.component)}>
                                    {chart.label}
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {activeChart}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardAdminSocioDem