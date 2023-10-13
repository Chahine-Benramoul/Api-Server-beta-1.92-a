export default class CollectionFilter {
    NOFILTER = 0;
    constructor(list, params, model) {
        this.list = list;
        this.params = params;
        this.model = model;
    }

    get() {
        //console.log(typeof(this.params));   
        let outputList = [];
        for (const [key, value] of Object.entries(this.params)) {
            //console.log(`${key}: ${value}`);
            switch (key) {
                case "limit":
                    console.log("LIMIT");
                    break;
                case "offset":
                    console.log("OFFSET");
                    break;
                case "sort":
                    console.log("SORT");
                    break;
                case "field":
                    console.log("FIELD");
                    break;
                default:

                    this.list.forEach(entry => {                        
                        if (this.valueMatch(entry[this.capitalizeFirstLetter(key)], value))
                            outputList.push(entry);
                    });
                    break;
            }
        }
        if (Object.values(this.params).length == this.NOFILTER)
            outputList = this.list;
        console.log(outputList);
        return outputList;
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
    valueMatchStartWith(value, searchValue) {
        try {
            let exp = '^' + searchValue.toLowerCase().replace(/\*/g, '.*') + '$';
            return new RegExp(exp).test(value.toString().toLowerCase());
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    valueMatchEndWith(value, searchValue) {
        try {
            let exp = '^' + searchValue.toLowerCase().replace(/\*/g, '.*') + '$';
            return new RegExp(exp).test(value.toString().toLowerCase());
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    valueMatchContain(value, searchValue) {
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
    capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
}