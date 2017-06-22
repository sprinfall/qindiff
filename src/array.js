// array.js

function isEqual(a, b) { return a == b; }

function isEqualArray(a, b) {
    if (a.length != b.length) { return false; }
    for (var i = 0; i < a.length; ++i) {
        if (a[i] != b[i]) { return false; }
    }
    return true;
}

// Add extra methods to object Array.
function extendArray() {

    // If the given array b is equal to this array; suppose the array
    // elements are with type number, string, etc. which can be compared with !=.
    Array.prototype.equal = function(b) {
        if (this.length != b.length) { return false; }
        for (var i = 0; i < this.length; ++i) {
            if (this[i] != b[i]) { return false; }
        }
        return true;
    }

    // If the given element e exists in this array or not; use method isEqual
    // to do the comparison.
    Array.prototype.exist = function(e, isEqual) {
        for (var i = 0; i < this.length; ++i) {
            if (isEqual(e, this[i])) { return true }
        }
        return false
    }

    // Join this array with the given array b but don't duplicate between them.
    // Note: this array won't change.
    Array.prototype.unite = function(b, isEqual) {
        var t = [];
        for (var i = 0; i < b.length; ++i) {
            if (!this.exist(b[i], isEqual)) {
                t.push(b[i]);
            }
        }
        return this.concat(t)
    }

    // Empty the array.
    Array.prototype.clear = function() {
        while (this.pop() != null) {}
    }

    // Assign the given value to each element of the array.
    Array.prototype.assign = function(value) {
        for (var i = 0; i < this.length; ++i) {
            this[i] = value;
        }
    }
}

//extendArray();

