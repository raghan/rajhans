/**
 * Created by divism on 7/30/2014.
 */
var global;

codeApp.controller('mainController',function mainController($scope,dataService){

    dataService.getData(function(data)
    {
        console.log(data);
        $scope.topic=data.topicArray;
        $scope.subTopic1=$scope.topic[0].subTopics;
        global=data;
    });

});

codeApp.controller('coreJavaController',function coreJavaController($scope)
{

    $scope.inc=0;
    $scope.score=0;
    $scope.topic=global.topicArray[0].topicName;
    $scope.question=global.topic[0].questions;
    console.log($scope.question.length);
    $scope.array=[];
    $scope.imagesrc="";

    $scope.checkedArray=[];
    for(var i=0;i<$scope.question.length;i++)
{
    $scope.checkedArray[i]=0;
}

    $scope.flag=function()
    {

        $scope.ansArray=$scope.question[$scope.inc].answer;



        if($scope.ansArray.length>1)
        {
            $scope.selectoption="choose the correct answers";
        }
        else
        $scope.selectoption="choose the correct option";

        if($scope.checkedArray[$scope.inc]==1) {

            document.getElementById("Check").disabled = true;
           /* for (var i = 0; i < $scope.ansArray.length; i++) {
                    document.getElementById($scope.ansArray[i]).innerHTML = "<img src='images.jpg'>";
            }*/

            for(var i=0;i<$scope.question[$scope.inc].options.length;i++) {

                for (var j = 0; j < $scope.ansArray.length; j++) {

                    if ($scope.question[$scope.inc].options[i].id == $scope.ansArray[j]) {

                        document.getElementById($scope.question[$scope.inc].options[i].id).innerHTML = "<span   class='glyphicon glyphicon-ok green' ></span>";
                        break;
                    }
                }
                if(j==$scope.ansArray.length)
                {
                       document.getElementById($scope.question[$scope.inc].options[i].id).innerHTML = "<span class='glyphicon glyphicon-remove red'></span>";
                }
            }
            return true;
        }
        return false;

    }

    $scope.next= function(inc)
    {

        document.getElementById("next").disabled=false;
        document.getElementById("prev").disabled=false;
        document.getElementById("Check").disabled=false;

        $scope.array=[];
        $scope.inc++;

        if(inc==($scope.question.length-2))
        {
            document.getElementById("next").disabled=true;
        }
    }


    $scope.prev= function(inc)
    {

        document.getElementById("Check").disabled=false;

        if($scope.inc==1)
            document.getElementById("prev").disabled = true;
        else
            document.getElementById("prev").disabled = false;
        document.getElementById("next").disabled=false;

        $scope.inc--;
        $scope.array=[];

    }
    $scope.result=function()
    {
        $scope.checkedArray[$scope.inc]=1;
        $scope.ansArray=$scope.question[$scope.inc].answer;

        if (angular.equals($scope.array,$scope.ansArray))
        {
            $scope.score++;

        }
        return $scope.score;
    }
}).directive("checkboxGroup", function () {

        return {

            restrict: "A",
            link: function (scope, elem, attrs) {
                // Determine initial checked boxes
                if (scope.array.indexOf(scope.item.id) !== -1) {
                    elem[0].checked = false;
                }

                // Update array on click
                elem.bind('click', function () {
                    var index = scope.array.indexOf(scope.item.id);
                    // Add if checked
                    if (elem[0].checked) {
                        if (index === -1) scope.array.push(scope.item.id);
                    }
                    // Remove if unchecked
                    else {
                        if (index !== -1) scope.array.splice(index, 1);
                    }
                    // Sort and update DOM display
                    scope.$apply(scope.array.sort(function (a, b) {
                        return a - b
                    }));
                });
            }
        }
    });

codeApp.controller('exceptionController',function exceptionController($scope)
{

    alert("inside exception controller");

    $scope.inc=0;
    $scope.question=global.topic[1].questions;

    /*  $scope.options=$scope.question[$scope.inc].options;*/


    $scope.next= function(inc)
    {
        document.getElementById("next").disabled=false;
        document.getElementById("prev").disabled=false;
        $scope.inc++;
        if(inc==$scope)
        {
            document.getElementById("prev").disabled=true;
        }
    }
    $scope.prev= function(inc)
    {
        document.getElementById("next").disabled=false;
        document.getElementById("prev").disabled=false;
        $scope.inc--;
        if(index<=0)
        {
            document.getElementById("prev").disabled=true;
        }
    }




});