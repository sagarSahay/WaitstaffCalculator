/**
 * Created by Sagar on 04/03/2015.
 */
    angular.module('waitStaffApp',[])
        .controller('mealDetailController',function($scope,$rootScope){
                $scope.mealDetail={
                    mealPrice:0,
                    taxRate:0,
                    tipPercentage:0
                };

                 $scope.submit=function(){
                     $rootScope.$broadcast('updateCustomerCharges',$scope.mealDetail);
                 };

                 $scope.cancel=function(){
                     $scope.mealDetail={};
                 };
            $scope.$on('reset',function(event,data){
                $scope.mealDetail=data;
            });
        })
        .controller('customerChargesController',function($scope,$rootScope){
            $scope.customerCharge={
                subTotal:0,
                tip:0,
                total:0
            };
            $scope.$on('updateCustomerCharges',function(event,data){
                $scope.customerCharge.subTotal=  data.mealPrice + ((data.taxRate*data.mealPrice)/100);
                $scope.customerCharge.tip= ((data.tipPercentage*data.mealPrice)/100);
                $scope.customerCharge.total=   $scope.customerCharge.subTotal + $scope.customerCharge.tip;

                $rootScope.$broadcast('updateMyEarnings',$scope.customerCharge);
            });
            $scope.$on('reset',function(event,data){
                $scope.customerCharge=data;
            });
        })
        .controller('myEarningsController',function($scope){
            $scope.myEarnings={
                tipTotal:0,
                mealCount:0,
                avgTipPerMeal:0
            };

            $scope.$on('updateMyEarnings',function(event,data){


                $scope.myEarnings.tipTotal= ($scope.myEarnings.tipTotal||0) + data.tip;
                $scope.myEarnings.mealCount= ($scope.myEarnings.mealCount||0)+1;
                $scope.myEarnings.avgTipPerMeal=  $scope.myEarnings.tipTotal/$scope.myEarnings.mealCount;
            });
            $scope.$on('reset',function(event,data){
                $scope.myEarnings=data;
            });
        })
        .controller('resetController',function($scope,$rootScope){
            $scope.reset=function(){
                $rootScope.$broadcast('reset',{});
            };
        })