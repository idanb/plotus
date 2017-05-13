
// var YourCtrl = function($scope, localStorageService, ...) {
//     // To add to local storage
//     localStorageService.set('localStorageKey','Add this!');
//     // Read that value back
//     var value = localStorageService.get('localStorageKey');
//     // To remove a local storage
//     localStorageService.remove('localStorageKey');
//     // Removes all local storage
//     localStorageService.clearAll();
//     // You can also play with cookies the same way
//     localStorageService.cookie.set('localStorageKey','I am a cookie value now');
// }

// Create the factory that share the Fact
PlotusApp.factory('SessionFactory', function(localStorageService){
    var data = {};

    var updateData = function(newObj) {
        localStorageService.set('localStorageKey',newObj);
        data = newObj;
    };

    var getData = function(){
        return data;
    };

    var destroyData = function(){
        localStorageService.remove('localStorageKey');
    };

    var addData = function(key, newObj){
        data[key] = newObj;
        localStorageService.set('localStorageKey',data);
    };

    // var addProduct = function(newObj) {
    //     productList.push(newObj);
    // };
    var resetSession = function(){
        data = localStorageService.get('localStorageKey');
    }

    resetSession();

    return {
        updateData: updateData,
        getData: getData,
        addData: addData,
        destroyData: destroyData,

    };
});
