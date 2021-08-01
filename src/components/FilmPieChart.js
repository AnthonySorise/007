import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as d3 from "d3";
import gunBarrelBackground from '../assets/gun-barrel-background.png'
import logo from '../assets/logo.png'
import Card from '@material-ui/core/Card';

const FilmPieChart = props => {
    const getChartData = () => {
        var chartData = [];

        let selectedKey = props.selectedKeyValuePair.key;
        let selectedValue = props.selectedKeyValuePair.value;
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
        if(props.selectedKeyValuePair.key == "SPECTRE"){
            return (props.selectedKeyValuePair.value == 1 ? "Has " : "Does not have ") + "SPECTRE"
        }
        else if(props.selectedKeyValuePair.key == "ColdWar"){
            return (props.selectedKeyValuePair.value == 1 ? "Has " : "Does not have ") + "Cold War themes";
        }
        else if(props.selectedKeyValuePair.key == "BondsWife"){
            return (props.selectedKeyValuePair.value == 1 ? "References " : "Does not reference ") + "Bond's wife";
        }
        else return props.selectedKeyValuePair.key + " - " + props.selectedKeyValuePair.value
    }

    const ref = useRef(null);
    const cache = useRef(getChartData());

    const useStyles = makeStyles({
        chartSection: {
            background:"black",
            height:"100vh",
            backgroundImage: `url(${gunBarrelBackground})`,
            backgroundPosition: "top",
        },
        chartContainer: {
            display: props.selectedKeyValuePair.key ? "block" : "none",
            width: "100%",
            position:"relative",
            '& svg': {
                position:"absolute",
                left: "calc(50% - 102px)",
                top: "220px",
            },
        },
        chartTitleCard: {
            background: "black",
        },
        chartTitle: {
            display: props.selectedKeyValuePair.key ? "block" : "none",
            color: 'white',
            margin: 0,
            paddingTop:"0.5em",
        },
        logoContainer: {
            position: "absolute",
            bottom:"48px",
            paddingLeft: "48px",
            paddingRight: "48px",
            '& img': {
                maxWidth: "100%",
            },
            
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
                    return t => d3.select(nodes[i]).text(format(interpolator(t).value) + " films");
                });

            cache.current = getChartData();
        },
        [props.selectedKeyValuePair]
    );

    const classes = useStyles();
    return (
        <div className={classes.chartSection} m={0} p={0}>
            <Card className={classes.chartTitleCard}>
                <h2 className={classes.chartTitle} align={"center"} m={0} p={0}>{getChartTitle()}</h2>
            </Card>
            
            <div className={classes.chartContainer} m={0} p={0}>
                <svg align={"center"} height={200}>
                    <g
                        ref={ref}
                        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
                    />
                </svg>
            </div>

            <div className={classes.logoContainer}>
                <img src={logo}/>
            </div>
        </div>
    );
};

export default FilmPieChart;