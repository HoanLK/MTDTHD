/// <reference path="admin.js" />
admin.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        redirectTo: function () {
            return '/dashboard';
        }
    })
    .when('/dashboard', {
        templateUrl: '/Scripts/BackEnd/Dashboard/Dashboard.html',
        controller: 'dashboardController'
    })
    .when('/post', {
        templateUrl: '/Scripts/BackEnd/Post/Post.min.html',
        controller: 'postController'
    })
    
});