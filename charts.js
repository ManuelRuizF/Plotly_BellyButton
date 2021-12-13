function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {    
    
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    //var PANEL = d3.select("#sample-metadata");
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let ids = result.otu_ids;
    let labels = result.otu_labels;
    let values = result.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    //var yticks = 

    // 8. Create the trace for the bar chart. 
    var trace = {
     y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"
    };
    var barData = [trace];
    // 9. Create the layout for the bar chart. 
    var barLayout = {  
      title: "Top 10 Bacteria Cultures Found",
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);


    // ------------------- BUBBLE CHART -------------------
    // 1. Create the trace for the bubble chart.
    var bubbleLayout = {
      yaxis: {title: 'Bacteria Cultures per Sample'},
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
      };

    // 2. Create the layout for the bubble chart.
    var bubbleData = [ 
      {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
          color: ids,
          size: values,
          }
      }
    ];

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    var freqValues = data.WFREQ;
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
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
          ], //ends the steps: section
      } //ends the gauge: section
  } //ends the curly brace after var data [

];
   

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      width: 500,
            height: 500,
            margin: { t: 15, r: 15, l: 15, b: 15 },
            font: { color: "black", family: "Arial" }
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('gauge', bubbleData, bubbleLayout); 
  });

  
}

