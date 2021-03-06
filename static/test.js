function DrawBargraph(sampleId)
{
    console.log(`Calling DrawBargraph(${sampleId})`); 

    d3.json("samples.json").then((data) => {

        var samples =data.samples;
        var resultArray = samples.filter(s=> s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks, 
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h",

        };

        barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria's Found",
            margin: {t:30, 1: 150}
        };

        Plotly.newPlot("bar", barArray, barLayout);

     });
 }
 



 function DrawBubblechart(sampleId)
{
        console.log(`Calling DrawBubblechart(${sampleId})`);

    d3.json("samples.json").then((data)=>{
        var samples = data.samples;
        var resultArray = samples.filter(s=>s.id==sampleId);
        var result = resultArray[0];
       
        var otu_ids=result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubble = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            type: "scatter",
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values
            }
        };

        var bubbleData = [bubble];

        Plotly.newPlot("bubble", bubbleData);

    });
}


 

 function ShowMetadata(sampleId)
 {
     console.log(`Show MetaData(${sampleId})`);
     d3.json("samples.json").then((data) => {

        var metadata =data.metadata;
        var resultArray = metadata.filter( md => md.id == sampleId);
        var result = resultArray[0];


        var PANEL = d3.select("#sample-metadata");

        PANEL.html("");

        // flesh out, java script version of f string

        Object.entries(result).forEach(([key,value]) => {

            var textToShow = "Stuff! " + parseInt(value);
            PANEL.append("h6").text(`${key}: ${value}`);

        });

   });

 }

 
 function optionChanged(newSampleId)

 {
     console.log(`Userselected ${newSampleId}`);

     DrawBubblechart(newSampleId);
     DrawBargraph(newSampleId);
     ShowMetadata(newSampleId);

 }

 function InitDashboard()

 {
     console.log("Init Dashboard");
     
     var selector = d3.select("#selDataset");

     d3.json("samples.json").then((data) => {

        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach((sampleId) =>  {
            selector.append("option")
            .text(sampleId)
            .property("value", sampleId);

        });
        var sampleId = sampleNames[0];

        DrawBargraph(sampleId);
        DrawBubblechart(sampleId);
        ShowMetadata(sampleId);

     });


 }

 InitDashboard();

     
 


