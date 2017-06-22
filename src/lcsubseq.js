// lcsubseq.js
// Longest common subsequence.

// X, Y are arrays representing two sequences.
// This object is used to compute the longest-common-subsequence of X & Y.
function LCSubseq(X, Y) {

    // The original problem size.
    var M = X.length;
    var N = Y.length;

    // The sizes of the matching items at the beginning & end.
    for (var i = 0; i < M && i < N && X[i] == Y[i]; ++i) {}
    for (var j = 0; j < M-i && j < N-i && X[M-1-j] == Y[N-1-j]; ++j) {}
    // The reduced problem set.
    this.X = X.slice(i, M - j + 1);
    this.Y = Y.slice(i, N - j + 1);
    // The reduced problem size.
    this.M = M - i - j;
    this.N = N - i - j;
    this.P = i;
    this.Q = j;

    this.L = null;

    // Result.
    this.R = null;

    this.createTable = function() {
        var row = this.M + 1;
        var col = this.N + 1;

        this.L = new Array(row);
        for (var i = 0; i < row; ++i) {
            this.L[i] = new Array(col);
            this.L[i][col-1] = 0;
        }
        this.L[row-1].assign(0);

        for (var i = row-2; i >= 0; --i) {
            for (var j = col-2; j >= 0; --j) {
                if (this.X[i] == this.Y[j])
                    this.L[i][j] = this.L[i+1][j+1] + 1;
                else
                    this.L[i][j] = Math.max(this.L[i+1][j], this.L[i][j+1]);
            }
        }
    }

    this.lcsLength = function() {
        return this.L[0][0];
    }

    this.backTrace = function() {
        this.R = new Array(this.lcsLength() * 2);

        var L = this.L;
        var X = this.X; var Y = this.Y;
        var M = this.M; var N = this.N;
        var R = this.R;
        var P = this.P;

        var i = 0; var j = 0; var k = 0;

        while (i < M && j < N) {
            if (X[i] == Y[j]) {
                R[k++] = P + i; R[k++] = P + j;
                ++i; ++j;
            }
            else {
                if (L[i+1][j] > L[i][j+1]) { ++i; } // >= ?
                else { ++j; }
            }
        }
    }

    this.__backTraceAll = function(i, j) {
        if (i == this.M || j == this.N) {
            return [[]];
        }

        if (this.X[i] == this.Y[j]) {
            var R = this.__backTraceAll(i+1, j+1);
            for (var r = 0; r < R.length; ++r) {
                R[r].push(i);
                R[r].push(j);
            }
            return R;
        }
        else {
            var R = [];
            if (this.L[i+1][j] >= this.L[i][j+1])
                R = this.__backTraceAll(i+1, j);
            if (this.L[i+1][j] <= this.L[i][j+1])
                R = this.__backTraceAll(i, j+1).unite(R, isEqualArray);
            return R
        }
    }

    this.backTraceAll = function(i, j) {
        this.R = this.__backTraceAll(0, 0);
    }
}

