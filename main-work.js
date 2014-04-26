var myApp = angular.module('myApp', ['firebase']);
myApp.controller('GameController', function ($scope, $firebase) {
	var tttRef = new Firebase("https://room1super.firebaseio.com/games");
	var playerNum;
	
	tttRef.once("value", function(data)
	{
		var lastGame;
		var games = data.val();
		
		if (games != null) 
		{
		 	var keys = Object.keys(games); //Get all the screwy text keys
		    var lastKey = keys[keys.length-1]; //Find the last key
		    lastGame = games[lastKey]; //Use the last key to get the last game object
		    if (lastGame.waiting==true) 
		    {
		  		//Currently someone is waiting to play
		 		//Find the Angular version of this game
		 		lastGame = tttRef.child(lastKey);
		// 		//whose turn = 1 for player 1, 2 for player 2, 3 for player 1 won, 4 for player 2 won, and 5 for a draw
		 		lastGame.set ({moves: 9,isXTurn: true, anyWinner: false, waiting: false, message: '', cells: ['', '', '', '', '', '', '', '', '']} );
	 			playerNum = 2;
			} 
			else 
			{
		// 		//This is like when someone opened the page and wanted to start playing
				lastGame = tttRef.push( {waiting: true} );
		 		playerNum = 1;
		    }
		//we have no game
		}
		 else 
		 {
		  //This is like when someone opened the page and wanted to start playing
		  lastGame = tttRef.push({waiting:true});
		  playerNum = 1;
		}
		$scope.game = $firebase(lastGame);
		
	});

	function checkTurn () {
		if((playerNum==1 && $scope.game.isXTurn==true) || (playerNum==2 && $scope.game.isXTurn==false))
		{
			return true;
		}
		else
		{
			return false;
		}
	};

	$scope.clickPlay = function (Cellindex)
			{	
				if(($scope.game.cells[Cellindex] === '') && (checkTurn()) && ($scope.game.anyWinner==false))
				{
					$scope.game.cells[Cellindex] = $scope.game.isXTurn?'X':'O';
					$scope.game.moves--;
					$scope.game.isXTurn = !$scope.game.isXTurn;
					$scope.checkWin();
					$scope.game.$save();
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
				if(($scope.game.cells[$scope.winColumn[i][0]]!=0)&&
				   ($scope.game.cells[$scope.winColumn[i][0]] == $scope.game.cells[$scope.winColumn[i][1]]) &&
				   ($scope.game.cells[$scope.winColumn[i][0]] == $scope.game.cells[$scope.winColumn[i][2]]))				
				{	
					$scope.game.anyWinner = true;
					if(	$scope.game.cells[$scope.winColumn[i][0]] == 'X')
					{
						$scope.game.message="playerX Win";
					}
					else if($scope.game.cells[$scope.winColumn[i][0]] == 'Y')
					{
						$scope.game.message="playerY Win";
					}
				}
				else if ($scope.game.moves==0 && $scope.game.anyWinner==false)
					{
						$scope,game.message="Tie Game";
					}
			}
		};

});