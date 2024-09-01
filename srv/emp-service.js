//Import Libraries
const cds = require ('@sap/cds');
const { count } = require('console');

//Using the imported library
//module.exports assigned to make the function globally avaliable
//If the function is not assigned the function cannot be accessd out side the this file
module.exports = cds.service.impl(

    async function(){

        this.before('CREATE','EmpAtt',async req=>{
            let data = req.data;
            let empID = data.emp_id;
            let empD = await SELECT.from('maven_Employees').where({emp_id:empID});
            let access = empD[0].access;
            //req.data.date = new Date().toISOString();

            if (access == false)
            {
                req.reject({
                    code:'100',
                    message : 'Access Denied. Please contact administrator'
                });
            }
           
            
        })

        

        this.after('CREATE','EmpAtt', async req=>
        {   
            //Get today's date and conert to ddmmyyyyformat
            let d = new Date().toISOString().split('T')[0];
            //Get the entity from the lunch table for today
            let lunid = await SELECT.from('maven_LunchCount').columns().where({lunch_date:d});
            //If todays lunch date is not found create the entity in the table with count 1
            let options = {
                hour12 : false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }
            if (await d.toLocaleString("en-US", options) > 18)
            {
                req.reject({
                    code : '300',
                    message : 'Lunch count not updated'
                })
            }
            if (lunid[0] == null)
            {
                //lunid[0].lunch_date = d;
                //lunid[0].count = 1;
                await INSERT.into('maven_LunchCount').entries({ lunch_date : d, count : 1 });
            }
            // If entity is found increase the count and update the entity
            else
            {
                lunid[0].count+=1;
                await UPDATE.entity('maven_LunchCount').with({ count : lunid[0].count })
                      .where({lunch_date:d})
            }

        })
    }
)