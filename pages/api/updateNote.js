import {table, minifyRecord} from './utils/Airtable';
import auth0 from './utils/auth0';

export default auth0.requireAuthentication(async(req, res) => {
    const {id, fields} = req.body;
    const {user} = await auth0.getSession();

    try{
        const updatedRecords = await table.update([
            {id, fields}
        ]);
        res.statusCode = 200;
        res.json(minifyRecord(updatedRecords));
    } catch (err){
        res.statusCode = 500;
        res.json({msg: 'Something went wrong'});
    }
})
  