import {table, minifyRecord} from './utils/Airtable';
import auth0 from './utils/auth0';
import OwnsRecord from "./middleware/OwnRecord";

export default OwnsRecord(async(req, res) => {

    const {user} = await auth0.getSession();

    try{
        const records = await table.select({
            filterByFormula: `userid = '${user.sub}'`
          }).firstPage();
        const minifiedRecords = minifyRecord(records);
        res.statusCode = 200;
        res.json(minifiedRecords);
    } catch (err){
        res.statusCode = 500;
        res.json({msg: 'Something went wrong'});
    }
})
  