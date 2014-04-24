var myApp = angular.module('myApp', []);
myApp.controller('GameController', function ($scope) {
	$scope.cells = ['', '', '', '', '', '', '', '', ''];
	$scope.isXTurn = true;
	$scope.moves = 9;
	$scope.anyWinner = false;
	$scope.clickPlay = function (Cellindex)
			{
				if($scope.cells[Cellindex] === '')
					{
					$scope.cells[Cellindex] = $scope.isXTurn?'X':'O';
					$scope.moves--;
					$scope.isXTurn = !$scope.isXTurn;
					$scope.checkWin();
					}
			};
	$scope.winColumn = [
							[0, 1, 2],
							[3, 4, 5],
							[6, 7, 8],
							[0, 3, 6],
							[1, 4, 7],
							[2, 5, 8],
							[0, 4, 8],
							[2, 4, 6] 
						];

		$scope.checkWin = function () 
			{
				for(var i=0; i < $scope.winColumn.length; i++)
				{
					if($scope.cells[$scope.winColumn[i][0]] == $scope.cells[$scope.winColumn[i][1]] &&
					   $scope.cells[$scope.winColumn[i][0]] == $scope.cells[$scope.winColumn[i][2]])				
					{	
						$scope.anyWinner = true;
						if(	$scope.cells[$scope.winColumn[i][0]] == 'X')
						{
							console.log("playerX win");
						}
						else if($scope.cells[$scope.winColumn[i][0]] == 'Y')
						{
							console.log("playerO win");
						}
					}
					else if ($scope.moves==0 && $scope.anyWinner==false)
						{
							console.log("Tie Game");
						}
				}
			};

});