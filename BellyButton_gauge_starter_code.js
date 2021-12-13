// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.

    // Create a variable that holds the first sample in the array.
  

    // 2. Create a variable that holds the first sample in the metadata array.
    

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
   
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData =  [{
                type: "indicator",
                mode: "gauge+number",
                value: freqValues,
                title: { text: "Belly Button Washing Frequency</b> <br> Scrubs per Week", font: { size: 18 } },
                gauge: {
                    axis: { range: [null, 9], tickwidth: 1, tickcolor: "black" }, // Max value is 9
                    bar: { color: "black" }, // Color of the bar (black) that indicates the washing frequency value
                    borderwidth: 3,
                    bordercolor: "black",
                    // Set the colors for the different ranges on the gauge
                    steps: [
                        { range: [0, 1], color: "lightcoral" },
                        { range: [1, 2], color: "lightpink" },
                        { range: [2, 3], color: "yellowgreen" },
                        { range: [3, 4], color: "lightgreen" },
                        { range: [4, 5], color: "green" },
                        { range: [5, 6], color: "lightblue" },
                        { range: [6, 7], color: "cyan" },
                        { range: [7, 8], color: "royalblue" },
                        { range: [8, 9], color: "blue" }
                    ],
                } 
            }

        ]; 
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
            height: 500,
            margin: { t: 15, r: 15, l: 15, b: 15 },
            font: { color: "black", family: "Arial" }
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();
  });
}
