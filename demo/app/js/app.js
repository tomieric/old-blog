(function(){
	'use strict';
	var myApp = angular.module('myApp', ['onsen.directives']);

    // 焦点图
    var slideData = [
        {id: 7719, poster: 'http://dna.yiihuu.com/wp-content/uploads/2014/04/20130422013035_4062.jpg', title: '超级英雄电影结合漫画欣赏'},
        {id: 7833, poster: 'http://dna.yiihuu.com/wp-content/uploads/2014/04/85f100eegw1efe5inerorj20c80gkt9y.jpg', title: '水面分开的两个世界'},
        {id: 7759, poster: 'http://dna.yiihuu.com/wp-content/uploads/2014/04/369806.jpg', title: '夏天露营最佳搭档'}
    ];

    myApp.directive('ngSlide', function(){
        return {
            restrict: 'E',
            replace: true,
            link: function(scope, element, attrs){

                TouchSlide({
                    slideCell: attrs.id,
                    titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                    mainCell: ".bd ul",
                    effect: "leftLoop",
                    autoPlay: true,//自动播放
                    autoPage: true //自动分页
                });

                // 重新绑定
                element.find("a").on("click", function(){
                   var url = this.getAttribute('data-url');
                    scope.ons.screen.presentPage(url);
                });
            },
            template: function(){
                var _tmpl = [];
                _tmpl.push('<div class="focus">');
                _tmpl.push('    <div class="hd">');
                _tmpl.push('        <ul></ul>');
                _tmpl.push('    </div>');
                _tmpl.push('    <div class="bd">');
                _tmpl.push('        <ul >');
                for(var i = 0; i < slideData.length; i++){
                    _tmpl.push('            <li>');
                    _tmpl.push('                <a data-url="detail.html?id='+ slideData[i].id +'">');
                    _tmpl.push('                    <img src="'+ slideData[i].poster +'" />');
                    _tmpl.push('                    <span>'+ slideData[i].title +'</span>');
                    _tmpl.push('                </a>');
                    _tmpl.push('            </li>');
                }
                _tmpl.push('        </ul>');
                _tmpl.push('   </div>');
                _tmpl.push('</div>');

                return _tmpl.join('');
            }
        };
    });

    // 跳转页
    myApp.directive('ngPresentPage', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attr){

                var pop = function(url){
                    scope.ons.screen.presentPage(url);
                };

                element.on('click', function(event){
                    pop(attr.tourl);
                    event.preventDefault();
                    return false;
                });
            }
        }
    });


    // 首页
    myApp.controller('homeCtrl', ['$scope', function($scope){
        // 分类频道
        var channels = [
            {id : 0, title: '今日看点', poster: ''},
            {id: 7, title: '经验', poster: ''},
            {id: 3, title: '作品', poster: ''},
            {id: 1, title: '资讯', poster: ''},
        ];

        // 查看分类页
        function viewCatePage(id){
            //console.log(this);
            var id = this.channel.id;
            $scope.ons.screen.presentPage('channel.html?id='+id);
        }

        // 查看详细页
        function viewDetailPage(url){
            $scope.ons.screen.presentPage(url);
        }

        //console.log($scope.ons);

        $scope.channels = channels;
        $scope.viewCatePage = viewCatePage;
        $scope.viewDetailPage = viewDetailPage;
        //$scope.ons = $scope.ons;
    }]);


    // 推荐
    myApp.controller('recommendCtrl', ['$scope', function($scope){
        // 推荐文章
        var articles = [
            {id : 0, title: '用宝丽莱相机拍下的照片拼成的画', poster: [], author: 'xuxl',
                pubdate: '2014-04-15',
                tag: '热门'
            },
            {id : 0, title: '水面分开的两个世界', poster: ['http://dna.yiihuu.com/wp-content/uploads/2014/04/85f100eegw1efe5inerorj20c80gkt9y-210x150.jpg'], author: 'xuxl',
                pubdate: '2014-04-15',
                tag: ''
            },
            {id : 0, title: '一组收藏于俄罗斯圣彼得堡国立冬宫博物馆的水彩画', poster: ['http://dna.yiihuu.com/wp-content/uploads/2014/04/85f100eegw1efe5inerorj20c80gkt9y-210x150.jpg', 'http://dna.yiihuu.com/wp-content/uploads/2014/04/85f100eegw1efe5inerorj20c80gkt9y-210x150.jpg', 'http://dna.yiihuu.com/wp-content/uploads/2014/04/85f100eegw1efe5inerorj20c80gkt9y-210x150.jpg'], author: 'xuxl',
                pubdate: '2014-04-15',
                tag: 'NEW'
            }
        ];

        $scope.articles = articles;
    }]);
})();
