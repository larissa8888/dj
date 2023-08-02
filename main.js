song="" ;
manoizquierdaX= 0 ;
manoizquierdaY=0;
manoderechaX= 0 ;
manoderechaY=0;
scoremanoizquierda=0;
scoremanoderecha=0;

function setup ()
{
 canvas=createCanvas(600 ,500);
 canvas.center();
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video, modeLoaded);
poseNet.on ('pose' , gotPoses);
}

function modeLoaded()
{
    console.log('PoseNet se esta inicializado')
}

function draw()
{
    image(video ,0 ,0 ,600 ,500)
    fill ("#D791EF");
    stroke ("#FF03E0");
    if(scoremanoizquierda > 0.2)
    {
    circle (manoizquierdaX , manoizquierdaY , 20);
   // circle (manoderechaX , manoderechaY , 20);
    ennumeromanoizquierday= Number(manoizquierdaY);
    quitardecimales=floor(ennumeromanoizquierday);
    volume= quitardecimales/500 ;
    document.getElementById("volume").innerHTML ="volumen =" + volume ;
    song.setVolume(volume);
    }

    if(scoremanoderecha > 0.2)
    {
      circle (manoderechaX , manoderechaY , 20);

      if(manoderechaY > 0 && manoderechaY <= 100)
      {
        document.getElementById("speed").innerHTML ="velocidad = 0.5x" ;
        song.rate(0.5);
      } else if (manoderechaY > 100 && manoderechaY <= 200 )
      {
        document.getElementById("speed").innerHTML ="velocidad = 1x" ;
        song.rate(1);
      }else if (manoderechaY > 200 && manoderechaY <= 300)
      {
        document.getElementById("speed").innerHTML ="velocidad = 1.5x" ;
        song.rate(1.5);
      }else if (manoderechaY > 300 && manoderechaY <= 400)
      {
        document.getElementById("speed").innerHTML ="velocidad = 2x" ;
        song.rate(2);
      }else (manoderechaY > 400 )
      {
        document.getElementById("speed").innerHTML ="velocidad = 2.5x" ;
        song.rate(2.5);
      }

    }
}

function preload()
{
    song=loadSound("ytm.mp3")
}

function play()
{
song.play();
song.setVolume(0.3);
song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log (results);

        scoremanoizquierda=results[0].pose.keypoints[9].score;
        console.log("score mano izquierda:" + scoremanoizquierda);

        scoremanoderecha=results[0].pose.keypoints[10].score;
        console.log("score mano derecha:" + scoremanoderecha)
        
        manoizquierdaX = results[0].pose.leftWrist.x;
        manoizquierdaY = results[0].pose.leftWrist.y;
        console.log("muñeca izquierda X="+ manoizquierdaX +"muñeca izquierda Y=" + manoizquierdaY);

        manoderechaX = results[0].pose.rightWrist.x;
        manoderechaY = results[0].pose.rightWrist.y;
        console.log("muñeca derecha X="+ manoderechaX +"muñeca derecha Y=" + manoderechaY);



    }

}