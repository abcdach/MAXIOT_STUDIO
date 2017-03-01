



var w = window.innerWidth;
var h = window.innerHeight;


var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);
//svg.style("cursor", "move");


var nodes = [];
var links = [];

var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .charge(-400)
    .size([w, h])
    .on("tick", tick)
    .linkDistance(50);
    //.linkDistance(function(d) {return 50 }); 
       

    var node = svg.selectAll(".node");
    var link = svg.selectAll(".link");
    var xtext = svg.selectAll(".text");


//https://github.com/mbostock/d3/wiki/Ordinal-Scales
var myColor = [];
myColor[0] = "#d9d9d9";// birtvi 
myColor[1] = "#fdae6b"; // serverebi c6dbef
myColor[2] = "#e6550d"; // yurebi
myColor[3] = "#9ecae1"; // clientebi
myColor[4] = "#c7e9c0"; // sensors






function start() {
    
    link = link.data(force.links(), function(d) { return d.source.id + "-" + d.target.id; });
    link.enter().insert("line", ".node").attr("class", "link");
    link.exit().remove();

    node = node.data(force.nodes(), function(d) { return d.id;});
    
    node.enter().append("circle")
     .attr("class", function(d) { return "node " + d.id; })
     .attr("r", function(d) { return d.size; })
     .attr("fill", function(d) { return myColor[d.color]; });
          
        

        
//    node.enter().append("image")
//         .attr("xlink:href", function(d) { return d.img; })
//         .attr("x", function(d) { return d.img_x; })
//         .attr("y", function(d) { return d.img_y; })
//         .attr("width", function(d) { return d.img_width; })
//         .attr("height", function(d) { return d.img_height; });        
        



  


   node.exit().remove();
   
   xtext = xtext.data(force.nodes(), function(d) { return d.id;});
   xtext.enter().append("text")
    .attr("text-anchor", "middle")
    .attr("x", function(d) { return d.myText_X; })
    .attr("y", function(d) { return d.myText_Y + 6; })
    .text(function(d) { return d.myText; })
    .style("font-size",function(d){ return d.font_size ; });
    
    xtext.exit().remove();
    node.call(force.drag);
    force.start();
}

function tick() {
//  node.attr("cx", function(d) { return d.x; })
//      .attr("cy", function(d) { return d.y; })
      
    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    xtext.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}



