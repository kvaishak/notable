const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_ID);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const minifyRecord = (records) => {
    return records.map(record => {
        return {
            id: record.id,
            fields: record.fields
        };
    });
}

export { table, minifyRecord };