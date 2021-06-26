$(function(){
    var currentQuiz = null;
    let point = {
        A:0,
        B:0,
        C:0
    }
    $("#startButton").on("click",function(){
        //開始作答
        if(currentQuiz == null){
            currentQuiz=0;
            $("#question").text(questions[0].question);
            $("#options").empty();
/*          //我無法解決Jquery抓值的問題*/
            //$('img[name="zizi"]').style = ""display:none;margin:auto;"";
            questions[0].answers.forEach(function(element,index,array){
                $("#options").append(`<input name ='options'
                type='radio'
                value='${index}'>
                <label>${element[0]}</label>
                <br><br>`);
            });
            //下一題
            $("#startButton").attr("value", "Next");
        }
        //已經開始作答
        else{
            //看看哪一個被選
            /*$.each($(":radio"),function(i, val){
                if(val.checked){
                    console.log(i);
                }
            });*/
            //是否要跳最後結果
            $.each($(":radio"),function(i, val){
                if(val.checked){
                     //看看是不是A, B, C, D
                    if(isNaN(questions[currentQuiz].answers[i][1])){ 
                        //把最終結果倒出來
                        var finalResult = questions[currentQuiz].answers[i][1];
                        //判斷為T還是F
                        if(finalResult=='F'){

                        }
                        else{
                            if(point.A>point.B&&point.A>point.C){
                                finalResult = 'A';
                            }
                            else if(point.B>point.A&&point.B>point.C){
                                finalResult = 'B';
                            }
                            else if(point.C>point.A&&point.C>point.B){
                                finalResult = 'C';
                            }
                            else{
                                finalResult = 'D';
                            }
                        }
                        //把question用來顯示最終結果的標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        //因為有選項在，所以把它們清空
                        $("#options").empty();
                        //顯示最終結果內容
                        $("#options").append(`${finalAnswers[finalResult][1]}<br><br>`);
                        switch(finalResult){
                            case 'F':
                                document.getElementById('F').style.display = "block";
                                break;
                            case 'A':
                                document.getElementById('A').style.display = "block";
                                break;
                            case 'B':
                                document.getElementById('B').style.display = "block";
                                break;
                            case 'C':
                                document.getElementById('C').style.display = "block";
                                break;
                            case 'D':
                                document.getElementById('D').style.display = "block";
                                 break;
                            }
                        
                        currentQuiz=null;
                        $("#startButton").attr("value","點我重新開始(可以蒐集各種諮諮圖片唷，共五張)");
                    }
                    //看看哪一個被選
                    else{
                        //指定下一題，data.js的ansewr[1]從1開始，所以要-1
                        currentQuiz = questions[currentQuiz].answers[i][1]-1;
                        //判斷加分加哪個
                        switch(questions[currentQuiz].answers[i][2]){
                            case 1:
                                point.A++;
                                break;
                            case 2:
                                point.B++;
                                break;
                            case 3:
                                point.C++;
                                break;
                            }
                        //尚諮看數據用
                        console.log(questions[currentQuiz].answers[i][2]);
                        for(x in point){
                            console.log(`${x}:${point[x]}`);
                        }
                        //顯示新的題目
                        $("#question").text(questions[currentQuiz].question);
                        $("#options").empty();
                        questions[currentQuiz].answers.forEach(function(element,index,array){
                            $("#options").append(`<input name ='options'
                            type='radio'
                            value='${index}'>
                            <label>${element[0]}</label>
                            <br><br>`);
                        });
                    }
                    return false;//脫離迴圈
                }
            });
        }
    });
});