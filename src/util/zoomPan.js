

 export default function configureZoom(svgEl, svgContainerEl){
    // refs
    let svg = svgEl.current;
    let svgContainer = svgContainerEl.current;


    // set intial viewbox for svg 
    let viewBox = {x:0, y:0, w:svg.clientWidth, h: svg.clientHeight};
    svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    const svgSize = {w:svg.clientWidth,h:svg.clientHeight};

    // initial variables
    let isPanning = false;
    let startPoint = {x:0,y:0};
    let endPoint = {x:0,y:0};
    let scale = 1;

    // on mousewheel, scale viewbox according to mouse position, and scroll
    svgContainer.onmousewheel = function(e) {
      e.preventDefault();
      
      // calculate scaling
      var w = viewBox.w;//viewbox width
      var h = viewBox.h;//viewbox height
      var mx = e.offsetX;//mouse x  
      var my = e.offsetY;//mouse.y
      var dw = w*Math.sign(e.deltaY)*0.05;
      var dh = h*Math.sign(e.deltaY)*0.05;
      var dx = dw*mx/svgSize.w;
      var dy = dh*my/svgSize.h;
      
      // disallow if scale is < 0.5 || > 1.3
      if(svgSize.w/(viewBox.w-dw) > 1.3 || svgSize.w/(viewBox.w-dw) < 0.5 )  return; 

      // set new viewbox and new scale
      viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w-dw,h:viewBox.h-dh};
      scale = svgSize.w/viewBox.w; 
      svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
   };

   svgContainer.onmousedown = function(e){
   // on clicking the svg container set panning to true and startpoint to mouse x and y
    isPanning = true;
    startPoint = {x:e.x,y:e.y};   
 };
 
 svgContainer.onmousemove = function(e){
    // if mouse held down, end point = new mouse x and y
    if (isPanning){
      // calculate movement
   endPoint = {x:e.x,y:e.y};
   var dx = (startPoint.x - endPoint.x)/scale;
   var dy = (startPoint.y - endPoint.y)/scale;

   // set new viewbox
   var movedViewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
   svg.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
    }
 };
 
 svgContainer.onmouseup = function(e){
   // if mouse has been held down, set final viewbox position and panning flag set to false
    if (isPanning){ 
   endPoint = {x:e.x,y:e.y};
   var dx = (startPoint.x - endPoint.x)/scale;
   var dy = (startPoint.y - endPoint.y)/scale;
   viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
   svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
   isPanning = false;
    }
 };
 
 svgContainer.onmouseleave = function(e){
    // if mouse leaves canvas, do not pan
  isPanning = false;
 };
  
  };