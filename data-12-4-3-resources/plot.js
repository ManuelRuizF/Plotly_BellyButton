// d3.json("samples.json").then(function(data){
//     console.log(data);
// });
// d3.json("samples.json").then(function(data){
//     firstPerson = data.metadata[0];
//     Object.entries(firstPerson).forEach(([key, value]) =>
//       {console.log(key + ': ' + value);});
// });

function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("The ID is:  " + result.id);
    PANEL.append("h6").text("The ethnicity is:  " +result.ethnicity);
    PANEL.append("h6").text("The gender is:  " +result.gender);
    PANEL.append("h6").text("The age is:  " +result.age);
    PANEL.append("h6").text("The location is:  " +result.location);
    PANEL.append("h6").text("The bbtype is:  " +result.bbtype);
    PANEL.append("h6").text("The wfreq is:  " +result.wfreq);
  });
}

