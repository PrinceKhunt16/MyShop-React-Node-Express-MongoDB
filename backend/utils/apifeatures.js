class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i"
                }
            } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        
        removeFields.forEach((key) => delete queryCopy[key]);

        if(queryCopy.color == ""){
            delete queryCopy.color
        }
         
        if(queryCopy.size == ""){
            delete queryCopy.size
        }

        if(queryCopy.subcategory == ""){
            delete queryCopy.subcategory
        }

        if(queryCopy.category == ""){
            delete queryCopy.category
        }
        
        // Price filter 
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        
        return this;
    }

    pagination(resultPerPage) {
        // Total Products
        const currentPage = Number(this.queryStr.page) || 1;

        // Skip Products before current page Products
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        
        return this;
    }

}

module.exports = ApiFeatures;