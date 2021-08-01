import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as d3 from "d3";

const FilmPieChart = props => {
    const getChartData = () => {
        var chartData = [];

        let selectedKey = props.selectedKeyValue.key;
        let selectedValue = props.selectedKeyValue.value;
        if (!props.data || props.data.length == 0 || !selectedKey) {
            return [{label: "", value: ""}];
        }

        let matches = 0;
        let nonMatches = 0;

        for (let i = 0; i < props.data.length; i++) {
            let thisValue = props.data[i][selectedKey]

            if (thisValue == selectedValue) {
                matches++;
            }
            else {
                nonMatches++;
            }
        }

        let doesntmatchSelectionObj = {}
        doesntmatchSelectionObj["label"] = "";
        doesntmatchSelectionObj["value"] = nonMatches;
        let matchesSelectionObj = {}
        matchesSelectionObj["label"] = selectedValue;
        matchesSelectionObj["value"] = matches;

        chartData.push(doesntmatchSelectionObj, matchesSelectionObj);
        return chartData;
    }

    const getChartTitle = () =>{
        if(props.selectedKeyValue.key == "SPECTRE"){
            return "SPECTRE"
        }
        else if(props.selectedKeyValue.key == "ColdWar"){
            return "Cold War"
        }
        else if(props.selectedKeyValue.key == "BondsWife"){
            return "Bond's Wife"
        }
        else return props.selectedKeyValue.key + " - " + props.selectedKeyValue.value
    }

    const ref = useRef(null);
    const cache = useRef(getChartData());

    const useStyles = makeStyles({
        chartSection: {
            background:"black",
            height:"100vh",
            '& h3': {
                color: 'white',
                margin: 0,
                paddingTop:"1em",
            },
        },
        chartContainer: {
            display: props.selectedKeyValue.key ? "block" : "none",
            width: "100%",
            position:"relative",
            '& svg': {
                position:"absolute",
                left: "calc(50% - 100px)",
                top: "24px",
            },
        },
        chartH3: {
            display: props.selectedKeyValue.key ? "block" : "none",
        }
    });

    const createPie = d3
        .pie()
        .value(d => d.value)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius);
    const colors = d3.scaleOrdinal().range(['#6c7a86', '#b28116']);
    const format = d3.format(".0f");

    useEffect(
        () => {
            const data = createPie(getChartData());
            const prevData = createPie(cache.current);
            const group = d3.select(ref.current);
            const groupWithData = group.selectAll("g.arc").data(data);

            groupWithData.exit().remove();

            const groupWithUpdate = groupWithData
                .enter()
                .append("g")
                .attr("class", "arc");

            const path = groupWithUpdate
                .append("path")
                .merge(groupWithData.select("path.arc"));

            const arcTween = (d, i) => {
                const interpolator = d3.interpolate(prevData[i], d);
                return t => createArc(interpolator(t));
            };

            path
                .attr("class", "arc")
                .attr("fill", (d, i) => colors(i))
                .transition()
                .attrTween("d", arcTween);

            const text = groupWithUpdate
                .append("text")
                .merge(groupWithData.select("text"));

            text
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .style("fill", "white")
                .style("font-size", 10)
                .transition()
                .attr("transform", d => `translate(${createArc.centroid(d)})`)
                .tween("text", (d, i, nodes) => {
                    const interpolator = d3.interpolate(prevData[i], d);
                    return t => d3.select(nodes[i]).text(format(interpolator(t).value));
                });

            cache.current = getChartData();
        },
        [props.selectedKeyValue]
    );

    const classes = useStyles();
    return (
        <div className={classes.chartSection} m={0} p={0}>
            <h3 className={classes.chartH3} align={"center"} m={0} p={0}>{getChartTitle()}</h3>
            <div className={classes.chartContainer} m={0} p={0}>
                <svg align={"center"} height={200}>
                    <g
                        ref={ref}
                        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
                    />
                </svg>
            </div>
        </div>
    );
};

export default FilmPieChart;