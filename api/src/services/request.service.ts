const specialFields = [
    'page',
    'limit',
    'sort',
    'fields',
];

export const createMongooseQuery = (query: any) => {
    const mongooseQuery: any = {};

    for (let key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
            if (!specialFields.includes(key)) {
                mongooseQuery[key] = query[key];
            }
        }
    }

    return mongooseQuery;
}

export const createSortObj = (sortString: string) => {
    let sortFields = sortString.split(',');

    let sortOptions: any = {};
    sortFields.forEach(sortField => {
        let sortOrder = sortField.startsWith('-') ? -1 : 1;
        let field = sortField.replace(/^-/, '');
        sortOptions[field] = sortOrder;
    });

    return sortOptions;
}

export const createFieldSelectionObj = (fieldsString: string) => {
    let fields = fieldsString.split(',');

    let fieldSelection: any = {};
    fields.forEach(field => {
      fieldSelection[field] = 1;
    });
    
    return fieldSelection;
}
