var myApp = angular.module('myApp', []);
myApp.controller('GameController', function ($scope) {
		$scope.cells = ['', '', '', '', '', '', '', '', ''];
		$scope.isXTurn = true;
		$scope.moves = 9;
		$scope.clickPlay = function (Cellindex) {
			if($scope.cells[Cellindex] === '') {
			$scope.cells[Cellindex] = $scope.isXTurn?'X':'O';
			$scope.moves--;
			console.log($scope.moves);
			$scope.isXTurn = !$scope.isXTurn;
			// $scope.checkWin();
					}
	};
	$scope.winColumn = [
								[$scope.cells[0], $scope.cells[1], $scope.cells[2]],
								[$scope.cells[3], $scope.cells[4], $scope.cells[5]],
								[$scope.cells[6], $scope.cells[7], $scope.cells[8]],
								[$scope.cells[0], $scope.cells[3], $scope.cells[6]],
								[$scope.cells[1], $scope.cells[4], $scope.cells[7]],
								[$scope.cells[2], $scope.cells[5], $scope.cells[8]],
								[$scope.cells[0], $scope.cells[4], $scope.cells[8]],
								[$scope.cells[2], $scope.cells[4], $scope.cells[6]]
							];

		$scope.checkWin = function () {
			// if ($scope.moves <=5) {
				for(var i=0; i < $scope.winColumn.length; i++) 
				{
				var	winRow = $scope.winColumn(i);
					if(winRow[0] == winRow[1] && winRow[0] == win[2]) 
						{ console.log("you win");}
				}
			// }
		};

});