

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("assets/data/data.csv").then(function (Data) {
    console.log(Data);
    Data.forEach(function (dataset) {
        dataset.poverty = +dataset.poverty;
            dataset.age = +dataset.age;
             dataset.healthcare = +dataset.healthcare;
            dataset.obesity = +dataset.obesity;
            dataset.income = +dataset.income;
            dataset.state = dataset.state;

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 22])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 26])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add dots
        // function renderCircles(circlesGroup, newXScale, chosenXAxis) {

        //     circlesGroup.transition()
        //         .duration(1000)
        //         .attr("cx", d => newXScale(d[chosenXAxis]));

        //     return circlesGroup;

            var path = svg.selectAll("circle")
                .data(Data)
                .enter()
                .append("circle")
                .attr("cx", function (d) { return x(d.GrLivArea); })
                .attr("cy", function (d) { return y(d.SalePrice); })
                .attr("r", 1.5)
                .style("fill", "#69b3a2")

                
        
            // // // Initial Params
            // var chosenXAxis = "Inpoverty(%)";

            // // // function used for updating x-scale var upon click on axis label
    //         function xScale(Data, chosenXAxis) {
    //             // //   // create scales
    //             var xLinearScale = d3.scaleLinear()
    //                 .domain([d3.min(Data, d => d[chosenXAxis]) * 0.8,
    //                 d3.max(Data, d => d[chosenXAxis]) * 1.2
    //                 ])
    //                 .range([0, width]);

    //             return xLinearScale;

    //             }

    //             // // // function used for updating xAxis var upon click on axis label
    //             function renderAxes(newXScale, xAxis) {
    //                 var bottomAxis = d3.axisBottom(newXScale);

    //                 xAxis.transition()
    //                     .duration(1000)
    //                     .call(bottomAxis);

    //                 return xAxis;

    //                 // // // function used for updating circles group with a transition to
    //                 // // // new circles

    //             });
    //         });
    //     }
    //                 // // // function used for updating circles group with new tooltip
    //                 // function updateToolTip(chosenXAxis, circlesGroup) {

    //                 var label;

    //                 if (chosenXAxis === "poverty") {
    //                     label = "Inpoverty (%)";
    //                 }
    //                 else {
    //                     label = "Lack of Healthcare";
    //                 }

    //                 var toolTip = d3.tip()
    //                     .attr("class", "tooltip")
    //                     .offset([80, -60])
    //                     .html(function (d) {
    //                         return (`${d.state}<br>${label} ${d[chosenXAxis]}`);
    //                     });
    //                 function chartGroup() {
    //                     chartGroup.call(toolTip);

    //                     chartGroup.on("mouseover", function (data) {
    //                         toolTip.show(data);

    //                         // onmouseout event
    //                         chartGroup.on("mouseout", function (data, index) {
    //                             toolTip.hide(data);
    //                             return x;


    //                             // //   // append x axis
    //                             var xAxis = chartGroup.append("g")
    //                                 .classed("x-axis", true)
    //                                 .attr("transform", `translate(0, ${height})`)
    //                                 .call(bottomAxis);

    //                             // //   // append y axis
    //                             chartGroup.append("g")
    //                                 .call(leftAxis);

    //                             // //   // append initial circles
    //                             var circlesGroup = chartGroup.selectAll("circle")
    //                                 .data(Data)
    //                                 .enter()
    //                                 .append("circle")
    //                                 .attr("cx", d => xLinearScale(d[chosenXAxis]))
    //                                 .attr("cy", d => yLinearScale(d.num_hits))
    //                                 .attr("r", 20)
    //                                 .attr("fill", "pink")
    //                                 .attr("opacity", ".5");


    //                             // //   // Create group for two x-axis labels
    //                             var labelsGroup = chartGroup.append("g")
    //                                 .attr("transform", `translate(${width / 2}, ${height + 20})`);

    //                             var Label = labelsGroup.append("text")
    //                                 .attr("x", 0)
    //                                 .attr("y", 20)
    //                                 .attr("value", "poverty") // value to grab for event listener
    //                                 .classed("active", true)
    //                                 .text("poverty");

    //                             var healthLabel = labelsGroup.append("text")
    //                                 .attr("x", 0)
    //                                 .attr("y", 40)
    //                                 .attr("value", "healthcare") // value to grab for event listener
    //                                 .classed("inactive", true)
    //                                 .text("#health");

    //                             // //   // append y axis
    //                             chartGroup.append("text")
    //                                 .attr("transform", "rotate(-90)")
    //                                 .attr("y", 0 - margin.left)
    //                                 .attr("x", 0 - (height / 2))
    //                                 .attr("dy", "1em")
    //                                 .classed("axis-text", true)
    //                                 .text("Number of Billboard 500 Hits");

    //                             // //   // updateToolTip function above csv import
    //                             var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    //                             //   // x axis labels event listener
    //                             labelsGroup.selectAll("text")
    //                                 .on("click", function () {
    //                                     //       // get value of selection
    //                                     var value = d3.select(this).attr("value");
    //                                     if (value !== chosenXAxis) {

    //                                         //         // replaces chosenXAxis with value
    //                                         chosenXAxis = value;

    //                                         console.log(chosenXAxis)


    //                                     }
    //                                 }
    //                     }
    //                 }
    //             }
     });
            
            
        
    
});
