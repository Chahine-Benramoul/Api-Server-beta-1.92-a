export default class CollectionFilter {
    NOFILTER = null;
    constructor(list, params, model) {
        this.list = list;
        this.params = params;
        this.model = model;
    }

    get() {

        if (this.params == this.NOFILTER)
            return this.list;

        for (const [key, value] of Object.entries(this.params)) {
            // The parameter : prendre le premier param puis faire and le 2 eme ... and 3 eme
            switch (key) {
                case "limit":
                    console.log("LIMIT");
                    break;
                case "offset":
                    console.log("OFFSET");
                    break;
                case "sort":
                    console.log("SORT");
                    const sort = this.params[key].split(',');
                    const sortField = this.capitalizeFirstLetter(sort[0]);

                    this.list.sort(function (a, b) {
                        const valA = a[sortField];
                        const valB = b[sortField];
                        function innerCompare(x, y) {
                            if ((typeof x) === 'string')
                                return x.toLowerCase().localeCompare(y.toLowerCase());
                            else
                                return compareNum(x, y);
                        }
                        function compareNum(x, y) {
                            if (x === y) return 0;
                            else if (x < y) return -1;
                            return 1;
                        }
                        return innerCompare(valA, valB);
                    })
                    if (sort[1] == 'desc')
                        this.list.reverse();
                    break;
                case "field":
                    console.log("FIELD");
                    let set = new Set();
                    let fields = this.params[key].split(',');
                    const array = [];


                    for (let index = 0; index < this.list.length; index++) {
                        fields.forEach(field => {
                            set.add(index);
                            set[index].add(this.list[index][field]);
                        });
                    };

                    set.forEach(s => array.push({t:s}));

                    this.list = array;
                    break;
                case "id":
                    let arr = [];
                    for (let index = 0; index < this.list.length; index++) {
                        const entry = this.list[index];
                        if (!this.innerCompare(entry[this.capitalizeFirstLetter(key)], parseInt(value)) === 0) {
                            arr.push(entry);
                            break;
                        }
                    }
                    this.list = arr;
                    break;
                default:
                    let arr2 = [];
                    for (let index = 0; index < this.list.length; index++) {
                        const entry = this.list[index];
                        if (this.valueMatch(entry[this.capitalizeFirstLetter(key)], value)) {
                            arr2.push(entry);
                            console.log(entry[this.capitalizeFirstLetter(key)], value);
                        }
                    }
                    this.list = arr2;
                    break;
            }

            //console.log(this.list);

        }
        return this.list;
    }

    valueMatch(value, searchValue) {
        try {
            let exp = '^' + searchValue.toLowerCase().replace(/\*/g, '.*') + '$';
            return new RegExp(exp).test(value.toString().toLowerCase());
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    compareNum(x, y) {
        if (x === y) return 0;
        else if (x < y) return -1;
        return 1;
    }
    innerCompare(x, y) {
        if ((typeof x) === 'string')
            return x.localeCompare(y);
        else
            return this.compareNum(x, y);
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}