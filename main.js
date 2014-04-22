var myApp = angular.module('myApp', []);
myApp.controller('GameController', function ($scope) {
	$scope.cells = ['', '', '', '', '', '', '', '', ''];
	$scope.isXTurn = true;
	$scope.moves = 9;
	$scope.clickPlay = function (Cellindex)
			{
				if($scope.cells[Cellindex] === '')
					{
					$scope.cells[Cellindex] = $scope.isXTurn?'X':'O';
					$scope.moves--;
					console.log($scope.moves);
					$scope.isXTurn = !$scope.isXTurn;
					$scope.checkWin();
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

		$scope.checkWin = function () 
		{

		// if ($scope.moves <=4) {
			for(var i=0; i < $scope.winColumn.length; i++) 
			{
				console.log("this is scope.wincolumn[i]: "+$scope.winColumn[i][0][0]);
				var	winRow = $scope.winColumn[i];
				console.log("this is winRow[0]: "+winRow[0]);
				// if(winRow[0]=='X') 
				// 	{ 
				// 		console.log("playerx win");
				// 	}
			// }
		}
		};

});