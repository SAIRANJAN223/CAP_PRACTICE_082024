using { maven as m } from '../db/employee-model';

service emp_service{
    entity EmpDetails as projection on m.Employees;
    entity EmpAtt as projection on m.AttDetails;
    entity LunCnt as projection on m.LunchCount;
}
