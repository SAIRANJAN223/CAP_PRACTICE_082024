using {school as sh} from '../db/school-model';

service school_service{

    entity Student as projection on sh.Student;
    entity Parent  as projection on sh.Parent;
    entity Teacher as projection on sh.Teacher;

}
