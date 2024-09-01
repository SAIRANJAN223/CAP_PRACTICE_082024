namespace maven;

entity Employees {

    key emp_id : String(10);
        access : Boolean;
}

entity AttDetails
{
    key emp_id : String(10);    
    key date : Timestamp;
        entry_type : String(3);
}

entity LunchCount
{
    key lunch_date : Date;
        count : Int16;
}

