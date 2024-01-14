let mainbox=document.getElementById("board");
let snakearray=[{x:11,y:11}];let cur=0;
let dir={x:0,y:1};
let food={x:12,y:11};
let max=17;let min=2;
let currentscore=0;
let speed=5;
function playgame(){
   var e = document.getElementById("board"); 
        
    
   var child = e.lastElementChild;  
   while (child) { 
       e.removeChild(child); 
       child = e.lastElementChild; 
   } 
       
       
     if((food.x===snakearray[0].x) && (food.y===snakearray[0].y)){
        currentscore++;
        if(localStorage.getItem("highscore")===null){localStorage.setItem("highscore",currentscore)}
        else{
          var b=Number.parseInt(localStorage.getItem("highscore"));
          if(currentscore>b){localStorage.setItem("highscore",JSON.stringify(currentscore))}

        }
        

        snakearray.unshift({x:snakearray[0].x+dir.x,y:snakearray[0].y+dir.y})
        food={x:Math.floor(Math.random() * ((max-min)+1) + min),y:Math.floor(Math.random() * ((max-min)+1) + min)}

     }
     
     let foodelement=document.createElement("div");foodelement.setAttribute("class","food");
     mainbox.append(foodelement);foodelement.style.gridRowStart=food.y;foodelement.style.gridColumnStart=food.x;


     if(snakearray[0].x<=0 || snakearray[0].x>=18 || snakearray[0].y<=0 || snakearray[0].y>=18){
        alert("Game over");
        snakearray=[{x:Math.floor(Math.random() * ((17-2)+1) + 2),y:Math.floor(Math.random() * ((17-2)+1) + 2)}];
        food={x:Math.floor(Math.random() * ((17-2)+1) + 2),y:Math.floor(Math.random() * ((17-2)+1) + 2)}
        currentscore=0;

     }
     for(let i=1;i<snakearray.length;i++){
       if((snakearray[0].x===snakearray[i].x) && (snakearray[0].y===snakearray[i].y)){
        alert("Game over");
        snakearray=[{x:Math.floor(Math.random() * ((17-2)+1) + 2),y:Math.floor(Math.random() * ((17-2)+1) + 2)}];
        food={x:Math.floor(Math.random() * ((17-2)+1) + 2),y:Math.floor(Math.random() * ((17-2)+1) + 2)}
        currentscore=0;
       }

     }
     document.getElementById("currentscorebox").innerHTML=currentscore;
        document.getElementById("highscorebox").innerHTML=localStorage.getItem("highscore");
     for(let j=snakearray.length-2;j>=0;j--){
        snakearray[j+1]={...snakearray[j]}
     }
     snakearray[0].x=snakearray[0].x+dir.x;
     snakearray[0].y=snakearray[0].y+dir.y;
     
     console.log(snakearray);

     snakearray.forEach((value,index)=>{let box=document.createElement("div"); box.style.gridRowStart=value.y;
     box.style.gridColumnStart=value.x;
      if(index===0){
      
     
      box.classList.add("head");

      }
      else{
        
         box.classList.add("body");
      }
      mainbox.append(box);
    })
  
  
  }


function important(time){window.requestAnimationFrame(important); 
    
   if(((time-cur)/1000) <=1/speed){ 
    return;
   }

   cur=time;
    playgame();
   
   
}


window.requestAnimationFrame(important);

window.addEventListener("keydown",e=>{
    switch(e.key){
     case "ArrowUp":
        dir={x:0,y:-1};break;
     case "ArrowDown": dir={x:0,y:1};break;
     case "ArrowLeft": dir={x:-1,y:0};break;
     case "ArrowRight": dir={x:1,y:0};break;
     
    default:alert("invalid input")

    }
})
