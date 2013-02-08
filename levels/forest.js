Game.Level.Forest = function() {
	Game.Level.call(this);
}
Game.Level.Forest.extend(Game.Level);

Game.Level.Forest.prototype.fromTemplate = function(map, def) {
	this._minMaze = [Infinity, Infinity];
	this._maxMaze = [-Infinity, -Infinity];
	Game.Level.prototype.fromTemplate.call(this, map, def);

	/* postprocess by inserting a maze */
	var width = this._maxMaze[0]-this._minMaze[0]+1;
	var height = this._maxMaze[1]-this._minMaze[1]+1;
	var maze = new ROT.Map.EllerMaze(width, height);
	maze.create(function(x, y, type) {
		var cellType = (type == 1 ? "tree" : "path");
		var cell = Game.Cells.create(cellType);
		this.setCell(cell, x+this._minMaze[0], y+this._minMaze[1]);
	}.bind(this));

	var entry = this.getCellById("entry").getPosition();
	this.setCell(Game.Cells.create("path"), entry[0]+1, entry[1]);

	var exit = this.getCellById("exit").getPosition();
	this.setCell(Game.Cells.create("path"), exit[0]-1, exit[1]);

	return this;
}

Game.Level.Forest.prototype._fromChar = function(x, y, ch, def) {
	if (ch == "?") {
		this._minMaze[0] = Math.min(this._minMaze[0], x);
		this._minMaze[1] = Math.min(this._minMaze[1], y);
		this._maxMaze[0] = Math.max(this._minMaze[0], x);
		this._maxMaze[1] = Math.max(this._minMaze[1], y);
		return;
	}

	return Game.Level.prototype._fromChar.call(this, x, y, ch, def);
}
