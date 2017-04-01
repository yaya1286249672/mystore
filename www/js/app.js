// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'



angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider",function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
	$ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

	$stateProvider
	.state("tabs",{
		url:"/tab",
		templateUrl:"templates/tabs.html"
	})
	.state("tabs.home",{
		url:"/home",
		views:{
			"tab-home":{
				templateUrl:"templates/home.html",
				controller:"indexctrl"
			}
		}
	})
	.state("tabs.sort",{
		url:"/sort",
		views:{
			"tab-sort":{
				templateUrl:"templates/sort.html",
				controller:"sortctrl"
			}
		}
	})
	.state("tabs.detial",{
		url:"/sort/:gsort/:id",
		views:{
			"tab-sort":{
				templateUrl:"templates/detial.html",
				controller:"detctrl"
			}
		}
	})
	.state("tabs.car",{
		url:"/car",
		cache:"false",
		views:{
			"tab-car":{
				templateUrl:"templates/car.html",
				controller:"carctrl"
			}
		}
	})
	.state("tabs.mine",{
		url:"/mine",
		views:{
			"tab-mine":{
				templateUrl:"templates/mine.html",
				controller:"loginctrl"
			}
		}
	})
	$urlRouterProvider.otherwise("/tab/home")
	
}])
.controller("sortctrl",function($scope,$http,$ionicActionSheet,$ionicBackdrop,$timeout){
	$scope.sortclick=function(){
		//console.log(this.lis.detimg);
		$scope.loaddet=this.lis.detimg;
	}
	$http({
		url:"js/sort.json"
	}).success(function(data){
		//console.log(data);
		$scope.sortlist=data;
		$scope.sortFilter=data[0].sortFilter;
		//console.log($scope.data[0].sortFilter)
	});
	$scope.saleclick=function(){
		//console.log("haha");
		//console.log(this.fil);	
	}
	//添加分享
	 $scope.tap=function(){
      // 显示上拉菜单
       var hideSheet = $ionicActionSheet.show({
         buttons: [
           { text: '分享微信' },
           { text: '选分享QQ' },
           { text: '分享QQ好友'}
         ],
         titleText: 'action sheet',
         cancelText: '取消',
         cancel: function() {
              // 这里添加取消代码
              console.log('取消了')

          },
         buttonClicked: function(index) {
            if (index==0) {
              console.log('分享微信')
            }else{
              console.log('选分享QQ')
            };
         }
       });
       // 2秒后再次调用隐藏菜单
       $timeout(function() {
         hideSheet();
       }, 2000);
    };
})
.controller("detctrl",function($scope,$http,$stateParams){
	
	$http({
		url:"js/sort.json"
	}).success(function(data){
		//console.log(data);
		$scope.str=data[$stateParams.gsort].detimg[$stateParams.id]
		console.log($scope.str)
		$scope.gcount=1;
		$scope.minusone=function(){
				$scope.gcount--;
			}
			$scope.addone=function(){
				$scope.gcount++;
			}
		$scope.addcar=function(){
		//console.log("heihei");
			var gp=$scope.str.price;
			var gn=$scope.str.title;
			var gm=$scope.str.img;	
			var gc=$scope.gcount;
			gc=gc+$scope.gcount
			var gdmes=JSON.stringify({"gprice":gp,"gname":gn,"gimg":gm,"gcount":$scope.gcount})
			localStorage.setItem(gn,gdmes);
			console.log(localStorage.getItem(gn));
			
		}
	})
})
.controller("carctrl",function($scope){
	var arr=[];
	var arr1=[];
	for(var i=0;i<localStorage.length;i++){
		arr[i] = localStorage.key(i);
		//console.log(arr);
		var tar=localStorage.getItem(arr[i]);
		//console.log(tar);
		tar=JSON.parse(tar);
		//console.log(tar);
		arr1.push(tar);
		//console.log(arr1);
		$scope.frstr=arr1;
	}
})
.controller("indexctrl",function($scope,$http){
	$http({
		url:"js/index.json"
	}).success(function(data){
		//console.log(data);
		$scope.lunlist=data;
	});
	
})
    .controller("loginctrl",function($scope){
        function wy(method,url,un,ps,fn){

            var http;
            if (window.XMLHttpRequest) {
                http = new XMLHttpRequest();
            } else {
                http = new ActiveXObject("Microsoft.XMLHttp");
            }
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    console.log(http.responseText);
                    var json = JSON.parse(http.responseText);
                    console.log(json);
                    fn();
                    if (json.login == true) {
                        alert("登录成功");
                        window.location.href = "index.html"
                    }
                }
            }
            http.open(method,url,true);
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            console.log(un, ps);
            http.send("uname=" + un + "&psw=" + ps);
        }//封装函数
        $scope.logintap=function() {
            console.log("haha")
            var uname = document.getElementById("uname").value;
            var psw = document.getElementById("psw").value;

            wy("POST","js/login.php",uname,psw,function(){
                console.log("heihei")
            });
        }
        $scope.restap=function(){
            //console.log("gggg");
            var uname = document.getElementById("uname").value;
            var psw = document.getElementById("psw").value;
            console.log(uname+psw)
            wy("POST","js/regist.php",uname,psw,function(){
                console.log("lsldsd")
            });
        }
    })
